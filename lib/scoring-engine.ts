import diagnosticData from './diagnostic.json';
import archetypesData from './archetypes.json';
import { TALLY_UUID_MAP, TALLY_QUESTION_MAP } from './tally-uuid-mapping';

// Dimension scores type
interface DimensionScores {
  depletion: number;
  stagnation: number;
  creative_suppression: number;
  constraint_level: number;
  identity_fragmentation: number;
  meaning_deficit: number;
  financial_pressure: number;
  change_readiness: number;
  autonomy_frustration: number;
  values_conflict: number;
  network_disruption: number;
  ambition_deferral: number;
}

// Tally field structure
interface TallyField {
  key: string;
  value: string | number | string[];
  type: string;
}

// Archetype match result
interface ArchetypeMatch {
  id: string;
  name: string;
  score: number;
}

/**
 * Convert Tally payload to diagnostic-compatible answers
 */
export function convertTallyToAnswers(tallyFields: TallyField[]): Record<string, any> {
  const answers: Record<string, any> = {};
  
  for (const field of tallyFields) {
    // Find matching question mapping
    const questionMap = TALLY_QUESTION_MAP.find(q => q.tallyKey === field.key);
    if (!questionMap) continue;
    
    // Handle email separately
    if (questionMap.type === 'email') {
      answers['EMAIL'] = field.value;
      continue;
    }
    
    // Handle sliders (numeric values)
    if (questionMap.type === 'slider') {
      answers[questionMap.diagnosticId] = field.value;
      continue;
    }
    
    // Handle ranking
    if (questionMap.type === 'rank' && Array.isArray(field.value)) {
      const rankedOptions = field.value.map(uuid => {
        const mapping = TALLY_UUID_MAP[uuid];
        return mapping ? mapping.diagnosticId : null;
      }).filter(Boolean);
      answers[questionMap.diagnosticId] = rankedOptions;
      continue;
    }
    
    // Handle multi-select
    if (questionMap.type === 'multi_select' && Array.isArray(field.value)) {
      const selectedOptions = field.value.map(uuid => {
        const mapping = TALLY_UUID_MAP[uuid];
        return mapping ? mapping.diagnosticId : null;
      }).filter(Boolean);
      answers[questionMap.diagnosticId] = selectedOptions;
      continue;
    }
    
    // Handle single select
    if (questionMap.type === 'single_select' && Array.isArray(field.value) && field.value.length > 0) {
      const uuid = field.value[0];
      const mapping = TALLY_UUID_MAP[uuid];
      if (mapping) {
        answers[questionMap.diagnosticId] = mapping.diagnosticId;
      }
    }
  }
  
  return answers;
}

/**
 * Calculate dimension scores from answers
 */
export function calculateDimensionScores(answers: Record<string, any>): DimensionScores {
  const scores: DimensionScores = {
    depletion: 0,
    stagnation: 0,
    creative_suppression: 0,
    constraint_level: 0,
    identity_fragmentation: 0,
    meaning_deficit: 0,
    financial_pressure: 0,
    change_readiness: 0,
    autonomy_frustration: 0,
    values_conflict: 0,
    network_disruption: 0,
    ambition_deferral: 0
  };
  
  // Process each question in diagnostic.json
  for (const question of diagnosticData.questions) {
    const answer = answers[question.id];
    if (!answer) continue;
    
    // Handle sliders
    if (question.type === 'slider' && typeof answer === 'number') {
      const rangeWeights = question.weights_by_range || [];
      for (const rangeWeight of rangeWeights) {
        const [min, max] = rangeWeight.range;
        if (answer >= min && answer <= max) {
          Object.entries(rangeWeight.weights).forEach(([dim, weight]) => {
            scores[dim as keyof DimensionScores] += weight as number;
          });
          break;
        }
      }
      continue;
    }
    
    // Handle ranking
    if (question.type === 'rank' && Array.isArray(answer)) {
      const options = question.options || [];
      answer.forEach((answerId: string, index: number) => {
        const option = options.find(opt => opt.id === answerId);
        if (!option) return;
        
        // Top 2 ranked = full weight, 3rd = 0.5 weight, 4-6 = 0
        let multiplier = 0;
        if (index === 0 || index === 1) multiplier = 1.0;
        else if (index === 2) multiplier = 0.5;
        
        Object.entries(option.weights || {}).forEach(([dim, weight]) => {
          scores[dim as keyof DimensionScores] += (weight as number) * multiplier;
        });
      });
      continue;
    }
    
    // Handle multi-select
    if (question.type === 'multi_select' && Array.isArray(answer)) {
      const tempScores: Partial<DimensionScores> = {};
      const options = question.options || [];
      
      answer.forEach((answerId: string) => {
        const option = options.find(opt => opt.id === answerId);
        if (!option) return;
        
        Object.entries(option.weights || {}).forEach(([dim, weight]) => {
          if (!tempScores[dim as keyof DimensionScores]) {
            tempScores[dim as keyof DimensionScores] = 0;
          }
          tempScores[dim as keyof DimensionScores]! += weight as number;
        });
      });
      
      // Cap each dimension at 1.0 for multi-select
      Object.entries(tempScores).forEach(([dim, value]) => {
        scores[dim as keyof DimensionScores] += Math.min(value || 0, 1.0);
      });
      continue;
    }
    
    // Handle single select
    if (question.type === 'single_select' && typeof answer === 'string') {
      const options = question.options || [];
      const option = options.find(opt => opt.id === answer);
      if (option && option.weights) {
        Object.entries(option.weights).forEach(([dim, weight]) => {
          scores[dim as keyof DimensionScores] += weight as number;
        });
      }
    }
  }
  
  return scores;
}

/**
 * Normalize dimension scores to 0-1 range
 */
export function normalizeDimensionScores(scores: DimensionScores): DimensionScores {
  // Max possible values per dimension (calculated from diagnostic.json)
  const maxPossible: DimensionScores = {
    depletion: 4.5,
    stagnation: 4.8,
    creative_suppression: 3.0,
    constraint_level: 5.2,
    identity_fragmentation: 6.5,
    meaning_deficit: 5.8,
    financial_pressure: 4.2,
    change_readiness: 4.7,
    autonomy_frustration: 5.1,
    values_conflict: 3.5,
    network_disruption: 2.8,
    ambition_deferral: 5.9
  };
  
  const normalized: DimensionScores = {} as DimensionScores;
  
  for (const dim in scores) {
    const key = dim as keyof DimensionScores;
    normalized[key] = Math.min(scores[key] / maxPossible[key], 1.0);
  }
  
  return normalized;
}

/**
 * Calculate cosine similarity between two dimension vectors
 */
function cosineSimilarity(vecA: DimensionScores, vecB: DimensionScores): number {
  const dimensions = Object.keys(vecA) as (keyof DimensionScores)[];
  
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  for (const dim of dimensions) {
    dotProduct += vecA[dim] * vecB[dim];
    magnitudeA += vecA[dim] ** 2;
    magnitudeB += vecB[dim] ** 2;
  }
  
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  
  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

/**
 * Match user dimension vector against archetype signatures
 */
export function matchArchetypes(userVector: DimensionScores): {
  primary: ArchetypeMatch;
  secondary: ArchetypeMatch | null;
  confidence: number;
  allScores: ArchetypeMatch[];
} {
  const archetypes = archetypesData as any[];
  
  const scores: ArchetypeMatch[] = archetypes.map(archetype => ({
    id: archetype.id,
    name: archetype.name,
    score: cosineSimilarity(userVector, archetype.signature as DimensionScores)
  }));
  
  scores.sort((a, b) => b.score - a.score);
  
  const primary = scores[0];
  const secondary = scores[1];
  
  // Show secondary if close enough or high enough
  const showSecondary = (
    primary.score - secondary.score < 0.15 ||
    secondary.score > 0.68
  );
  
  return {
    primary,
    secondary: showSecondary ? secondary : null,
    confidence: Math.round(primary.score * 100),
    allScores: scores
  };
}

/**
 * Get match reasons based on high-signal dimensions
 */
export function getMatchReasons(
  userVector: DimensionScores,
  archetypeSignature: DimensionScores
): string[] {
  const dimensionLabels: Record<keyof DimensionScores, string> = {
    depletion: "Energy depletion signals",
    stagnation: "Career stagnation signals",
    creative_suppression: "Suppressed creative drive",
    constraint_level: "External constraints",
    identity_fragmentation: "Professional identity uncertainty",
    meaning_deficit: "Absence of meaning in work",
    financial_pressure: "Financial pressure",
    change_readiness: "Readiness for change",
    autonomy_frustration: "Desire for autonomy",
    values_conflict: "Values misalignment",
    network_disruption: "Network disruption",
    ambition_deferral: "Deferred ambition"
  };
  
  const reasons: string[] = [];
  
  for (const dim in userVector) {
    const key = dim as keyof DimensionScores;
    if (userVector[key] > 0.6 && archetypeSignature[key] > 0.6) {
      reasons.push(dimensionLabels[key]);
    }
  }
  
  return reasons.slice(0, 3);
}

/**
 * Complete scoring function - from Tally payload to archetype result
 */
export function scoreResponse(tallyFields: TallyField[]) {
  // Convert Tally UUIDs to diagnostic answer IDs
  const answers = convertTallyToAnswers(tallyFields);
  
  // Calculate dimension scores
  const dimensionScores = calculateDimensionScores(answers);
  
  // Normalize to 0-1 range
  const normalizedScores = normalizeDimensionScores(dimensionScores);
  
  // Match against archetypes
  const match = matchArchetypes(normalizedScores);
  
  // Get archetype signature for primary
  const primaryArchetype = archetypesData.find((a: any) => a.id === match.primary.id);
  const matchReasons = primaryArchetype 
    ? getMatchReasons(normalizedScores, primaryArchetype.signature as DimensionScores)
    : [];
  
  return {
    primary_archetype: match.primary.id,
    secondary_archetype: match.secondary?.id || null,
    confidence: match.confidence,
    match_reasons: matchReasons,
    dimension_scores: normalizedScores,
    all_scores: match.allScores,
    answers
  };
}
