export type Archetype = 
  | 'BOA' | 'SBM' | 'LCA' | 'CE' | 'CP' 
  | 'RE' | 'VR' | 'RO' | 'PCT' | 'ISG' 
  | 'DA' | 'SC' | 'PSV' | 'GD' | 'LRP';

export interface ArchetypeScore {
  code: Archetype;
  name: string;
  score: number;
}

export const archetypeNames: Record<Archetype, string> = {
  BOA: 'Burned-out Achiever',
  SBM: 'Stable But Meaningless',
  LCA: 'Late Creative Awakening',
  CE: 'Corporate Exit',
  CP: 'Career Plateau',
  RE: 'Reluctant Entrepreneur',
  VR: 'Values Rupture',
  RO: 'Responsibility Overload',
  PCT: 'Portfolio Career Transition',
  ISG: 'Identity–Skill Gap',
  DA: 'Delayed Ambition',
  SC: 'Specialist Ceiling',
  PSV: 'Post-Success Vacuum',
  GD: 'Geographic Displacement',
  LRP: 'Late Reinvention Path'
};

export function calculateScores(answers: Record<string, any>): ArchetypeScore[] {
  const scores: Record<Archetype, number> = {
    BOA: 0, SBM: 0, LCA: 0, CE: 0, CP: 0,
    RE: 0, VR: 0, RO: 0, PCT: 0, ISG: 0,
    DA: 0, SC: 0, PSV: 0, GD: 0, LRP: 0
  };

  // Q1: Current situation
  if (answers.q1 === 0) scores.SBM += 3;
  if (answers.q1 === 1) scores.BOA += 3;
  if (answers.q1 === 2) { scores.CE += 2; scores.LRP += 2; scores.PCT += 2; }
  if (answers.q1 === 3) { scores.ISG += 2; scores.CP += 2; }

  // Q2: Meaning/purpose (low = SBM, VR, BOA)
  if (answers.q2 <= 2) {
    scores.SBM += 2;
    scores.VR += 2;
    scores.BOA += 1;
  }

  // Q3: Values alignment (low = VR, high = aligned)
  if (answers.q3 <= 2) {
    scores.VR += 3;
    scores.CE += 1;
  }

  // Q4: Energy level
  if (answers.q4 === 0) scores.BOA += 3;
  if (answers.q4 === 1) { scores.BOA += 2; scores.RO += 1; }

  // Q5: Creative engagement (low = SBM, high = LCA)
  if (answers.q5 <= 2) {
    scores.SBM += 2;
    scores.CP += 1;
  }
  if (answers.q5 >= 4) {
    scores.LCA += 2;
  }

  // Q6: Expertise relationship
  if (answers.q6 === 0) scores.SC += 3;
  if (answers.q6 === 1) scores.SC += 2;
  if (answers.q6 === 3) { scores.LRP += 2; scores.LCA += 1; }

  // Q7: Career trajectory
  if (answers.q7 === 0) scores.CP += 3;
  if (answers.q7 === 1) { scores.BOA += 1; scores.CP += 1; }
  if (answers.q7 === 2) { scores.LRP += 2; scores.CE += 2; }
  if (answers.q7 === 3) scores.PCT += 3;

  // Q8: External constraints (high = RO, GD)
  if (answers.q8 >= 4) {
    scores.RO += 2;
    scores.GD += 1;
  }

  // Q9: Risk comfort (low = stable patterns, high = transition)
  if (answers.q9 <= 2) {
    scores.SBM += 1;
    scores.CP += 1;
  }
  if (answers.q9 >= 4) {
    scores.RE += 1;
    scores.LRP += 1;
  }

  // Q10: Achievement relationship
  if (answers.q10 === 0) scores.PSV += 3;
  if (answers.q10 === 1) scores.PSV += 2;
  if (answers.q10 === 2) scores.BOA += 2;
  if (answers.q10 === 4) scores.LRP += 1;

  // Q11: Creative desire (high = LCA)
  if (answers.q11 >= 4) {
    scores.LCA += 3;
  }

  // Q12: Entrepreneurship
  if (answers.q12 === 2) { scores.RE += 1; scores.PCT += 1; }
  if (answers.q12 === 3) scores.RE += 3;
  if (answers.q12 === 4) scores.PCT += 2;

  // Q13: Professional identity (high = BOA, low = ISG)
  if (answers.q13 >= 4) {
    scores.BOA += 1;
    scores.SC += 1;
  }
  if (answers.q13 <= 2) {
    scores.ISG += 2;
  }

  // Q14: Exit fantasies (high = CE, VR, BOA)
  if (answers.q14 >= 4) {
    scores.CE += 2;
    scores.VR += 2;
    scores.BOA += 1;
  }

  // Q15: Skills vs market
  if (answers.q15 === 0) scores.ISG += 3;
  if (answers.q15 === 1) scores.ISG += 2;
  if (answers.q15 === 3) scores.LRP += 1;
  if (answers.q15 === 4) scores.SC += 2;

  // Q16: Freedom (low = CE, VR)
  if (answers.q16 <= 2) {
    scores.CE += 1;
    scores.VR += 1;
  }

  // Q17: Organizational fit
  if (answers.q17 === 1) { scores.CE += 1; scores.CP += 1; }
  if (answers.q17 === 2) scores.CE += 3;
  if (answers.q17 === 3) { scores.RE += 1; scores.PCT += 1; }

  // Q18: Financial satisfaction (low = RE, RO)
  if (answers.q18 <= 2) {
    scores.RE += 1;
    scores.RO += 1;
  }

  // Q19: Geographic constraints
  if (answers.q19 >= 4) {
    scores.GD += 3;
  }

  // Q20: Professional urgency
  if (answers.q20 === 0) { scores.DA += 3; scores.CP += 1; }
  if (answers.q20 === 1) scores.CP += 2;
  if (answers.q20 === 3) { scores.ISG += 1; scores.CP += 1; }
  if (answers.q20 === 4) { scores.LRP += 2; scores.DA += 1; }

  // Q21: Managing others (high = RO, low = IC)
  if (answers.q21 >= 4) {
    scores.RO += 2;
  }

  // Q22: Risk relationship
  if (answers.q22 === 0) scores.SBM += 1;
  if (answers.q22 === 2) { scores.RE += 1; scores.LRP += 1; }
  if (answers.q22 === 3) scores.RE += 2;

  // Q23: Multiple streams (high = PCT)
  if (answers.q23 >= 4) {
    scores.PCT += 3;
  }
  if (answers.q23 === 3) {
    scores.PCT += 1;
  }

  // Q24: Clarity (low = ISG, CP)
  if (answers.q24 <= 2) {
    scores.ISG += 2;
    scores.CP += 1;
  }

  // Q25: Ambition
  if (answers.q25 === 0) scores.DA += 3;
  if (answers.q25 === 2) { scores.BOA += 1; scores.PSV += 1; }
  if (answers.q25 === 4) scores.LRP += 1;

  // Q26: Anxiety/stress (high = BOA, RO)
  if (answers.q26 >= 4) {
    scores.BOA += 2;
    scores.RO += 2;
  }

  // Q27: Network support (low = GD, ISG)
  if (answers.q27 <= 2) {
    scores.GD += 1;
    scores.ISG += 1;
  }

  // Q28: Forward looking
  if (answers.q28 === 0) { scores.CP += 2; scores.ISG += 1; }
  if (answers.q28 === 1) { scores.CP += 1; scores.ISG += 1; }
  if (answers.q28 === 2) { scores.LRP += 2; scores.CE += 1; }
  if (answers.q28 === 3) { scores.LRP += 2; scores.LCA += 1; }

  // Convert to sorted array
  const results: ArchetypeScore[] = Object.entries(scores).map(([code, score]) => ({
    code: code as Archetype,
    name: archetypeNames[code as Archetype],
    score
  }));

  return results.sort((a, b) => b.score - a.score);
}
