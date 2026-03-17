export interface Question {
  id: string;
  text: string;
  type: 'single' | 'scale';
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
}

export const questions: Question[] = [
  {
    id: 'q1',
    text: 'How would you describe your current professional situation?',
    type: 'single',
    options: [
      'Stable and predictable, but feels stagnant',
      'Successful by external measures, but exhausting',
      'In transition or actively changing',
      'Uncertain or searching for direction',
      'Aligned with my values and energizing'
    ]
  },
  {
    id: 'q2',
    text: 'When you think about your work, how often do you feel a sense of meaning or purpose?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Rarely or never', max: 'Very frequently' }
  },
  {
    id: 'q3',
    text: 'How aligned is your current work with your core values?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Not aligned at all', max: 'Completely aligned' }
  },
  {
    id: 'q4',
    text: 'What best describes your energy level in relation to your work?',
    type: 'single',
    options: [
      'Chronically depleted, running on fumes',
      'Variable - some days good, some days drained',
      'Generally sustained, with occasional fatigue',
      'High and consistent',
      'Fluctuating based on specific projects or tasks'
    ]
  },
  {
    id: 'q5',
    text: 'How often do you feel creatively engaged or intellectually stimulated by your work?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Almost never', max: 'Constantly' }
  },
  {
    id: 'q6',
    text: 'Which statement best reflects your relationship to your expertise or specialization?',
    type: 'single',
    options: [
      'I have mastered my domain and want new challenges',
      'I feel constrained by my expertise',
      'I am still building my skills',
      'I am exploring a different direction entirely',
      'My expertise is deeply satisfying'
    ]
  },
  {
    id: 'q7',
    text: 'How would you characterize your current career trajectory?',
    type: 'single',
    options: [
      'Plateaued - no clear path upward',
      'Climbing steadily but questioning the destination',
      'In active reinvention or pivot',
      'Following a non-linear or portfolio path',
      'Clear and exciting'
    ]
  },
  {
    id: 'q8',
    text: 'To what extent do external responsibilities (family, finances, location) constrain your professional choices?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Not at all', max: 'Significantly' }
  },
  {
    id: 'q9',
    text: 'How comfortable are you with professional uncertainty or risk?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Very uncomfortable', max: 'Very comfortable' }
  },
  {
    id: 'q10',
    text: 'Which best describes your relationship with achievement and success?',
    type: 'single',
    options: [
      'Success feels hollow or unsatisfying',
      'I have achieved what I set out to do and feel lost',
      'Still striving but questioning if it is worth it',
      'Achievement energizes me',
      'I am redefining what success means to me'
    ]
  },
  {
    id: 'q11',
    text: 'How strong is your desire to pursue creative or artistic work?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'No desire', max: 'Strong, persistent desire' }
  },
  {
    id: 'q12',
    text: 'What is your relationship to entrepreneurship or independent work?',
    type: 'single',
    options: [
      'No interest - prefer stability',
      'Curious but hesitant',
      'Actively building something',
      'Reluctantly entrepreneurial out of necessity',
      'Naturally entrepreneurial and energized by it'
    ]
  },
  {
    id: 'q13',
    text: 'How much does your professional identity feel like who you are?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Completely separate', max: 'Inseparable from my identity' }
  },
  {
    id: 'q14',
    text: 'How often do you fantasize about or seriously consider leaving your current professional path?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Never', max: 'Daily' }
  },
  {
    id: 'q15',
    text: 'Which statement best describes your skills relative to the market or your aspirations?',
    type: 'single',
    options: [
      'My skills are outdated or mismatched',
      'I have the skills but lack the credentials or network',
      'My skills are strong and well-positioned',
      'I am actively building new skills',
      'My skills are deep but narrow'
    ]
  },
  {
    id: 'q16',
    text: 'How much freedom do you have in your current work?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Almost none', max: 'Complete autonomy' }
  },
  {
    id: 'q17',
    text: 'What is your relationship to structured organizational environments (corporate, institutional)?',
    type: 'single',
    options: [
      'I thrive in them',
      'Comfortable but increasingly constrained',
      'Actively exiting or have exited',
      'Never been my fit',
      'Neutral - depends on the organization'
    ]
  },
  {
    id: 'q18',
    text: 'How satisfied are you with your financial situation relative to your work?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Very dissatisfied', max: 'Very satisfied' }
  },
  {
    id: 'q19',
    text: 'How much does geography or location affect your professional options?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Not at all', max: 'Significantly limits me' }
  },
  {
    id: 'q20',
    text: 'Which best describes your sense of professional urgency?',
    type: 'single',
    options: [
      'I feel like I am running out of time',
      'I have time but feel stuck',
      'No urgency - I am content to let things unfold',
      'Urgency mixed with paralysis',
      'Energized urgency driving action'
    ]
  },
  {
    id: 'q21',
    text: 'How much of your work involves managing or coordinating others?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'None', max: 'Most of my time' }
  },
  {
    id: 'q22',
    text: 'How would you describe your relationship to risk in your professional life?',
    type: 'single',
    options: [
      'Risk-averse - I prioritize security',
      'Open to calculated risk',
      'Taking significant risks currently',
      'Want to take risks but feel blocked',
      'Comfortable with high uncertainty'
    ]
  },
  {
    id: 'q23',
    text: 'To what extent are you currently balancing multiple professional roles or income streams?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Single focus', max: 'Many parallel streams' }
  },
  {
    id: 'q24',
    text: 'How clearly can you articulate what you want professionally?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Very unclear', max: 'Crystal clear' }
  },
  {
    id: 'q25',
    text: 'What best describes your professional ambition?',
    type: 'single',
    options: [
      'Dormant or suppressed for years, now resurfacing',
      'Strong and consistent',
      'Fading or uncertain',
      'Never been particularly ambitious',
      'Shifting toward different definitions of success'
    ]
  },
  {
    id: 'q26',
    text: 'How often do you experience work-related anxiety or stress?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Rarely', max: 'Constantly' }
  },
  {
    id: 'q27',
    text: 'How supported do you feel by your professional network or community?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Not supported at all', max: 'Very well supported' }
  },
  {
    id: 'q28',
    text: 'Looking forward, which statement resonates most?',
    type: 'single',
    options: [
      'I need to change something but do not know what',
      'I know what I want but feel stuck',
      'I am in active transition',
      'I am experimenting and exploring',
      'I am aligned and building momentum'
    ]
  }
];
