/**
 * Complete mapping of Tally UUID option IDs to diagnostic.json question/answer IDs
 * Generated from actual Tally webhook payload structure
 */

export interface TallyQuestionMapping {
  tallyKey: string;
  diagnosticId: string;
  type: 'single_select' | 'slider' | 'rank' | 'multi_select' | 'email';
}

export interface TallyOptionMapping {
  uuid: string;
  diagnosticId: string;
  label: string;
}

// Question key mappings
export const TALLY_QUESTION_MAP: TallyQuestionMapping[] = [
  { tallyKey: 'question_0ERbYy', diagnosticId: 'Q01', type: 'single_select' },
  { tallyKey: 'question_zK50AR', diagnosticId: 'Q02', type: 'single_select' },
  { tallyKey: 'question_5dPlYo', diagnosticId: 'Q03', type: 'single_select' },
  { tallyKey: 'question_dYeZoo', diagnosticId: 'Q04', type: 'single_select' },
  { tallyKey: 'question_YZlobB', diagnosticId: 'Q05', type: 'slider' },
  { tallyKey: 'question_DV6XoR', diagnosticId: 'Q06', type: 'single_select' },
  { tallyKey: 'question_lNk0jk', diagnosticId: 'Q07', type: 'single_select' },
  { tallyKey: 'question_RzyZQ9', diagnosticId: 'Q08', type: 'single_select' },
  { tallyKey: 'question_oAL0ZP', diagnosticId: 'Q09', type: 'rank' },
  { tallyKey: 'question_GrAoVZ', diagnosticId: 'Q10', type: 'single_select' },
  { tallyKey: 'question_OAMjZR', diagnosticId: 'Q11', type: 'single_select' },
  { tallyKey: 'question_VZO9ag', diagnosticId: 'Q12', type: 'slider' },
  { tallyKey: 'question_PAJ2NV', diagnosticId: 'Q13', type: 'single_select' },
  { tallyKey: 'question_EP7BG4', diagnosticId: 'Q14', type: 'single_select' },
  { tallyKey: 'question_rlM0QN', diagnosticId: 'Q15', type: 'single_select' },
  { tallyKey: 'question_42V10X', diagnosticId: 'Q16', type: 'single_select' },
  { tallyKey: 'question_jBA04a', diagnosticId: 'Q17', type: 'multi_select' },
  { tallyKey: 'question_24Gbdj', diagnosticId: 'Q18', type: 'single_select' },
  { tallyKey: 'question_xd50br', diagnosticId: 'Q19', type: 'single_select' },
  { tallyKey: 'question_RzyZed', diagnosticId: 'Q20', type: 'single_select' },
  { tallyKey: 'question_oAL0Ne', diagnosticId: 'Q21', type: 'single_select' },
  { tallyKey: 'question_GrAoEp', diagnosticId: 'Q22', type: 'single_select' },
  { tallyKey: 'question_OAMjq7', diagnosticId: 'Q23', type: 'single_select' },
  { tallyKey: 'question_VZO97J', diagnosticId: 'Q24', type: 'single_select' },
  { tallyKey: 'question_PAJ2Q5', diagnosticId: 'Q25', type: 'single_select' },
  { tallyKey: 'question_EP7BVX', diagnosticId: 'Q26', type: 'single_select' },
  { tallyKey: 'question_rlM09l', diagnosticId: 'Q27', type: 'single_select' },
  { tallyKey: 'question_42V10k', diagnosticId: 'Q28', type: 'single_select' },
  { tallyKey: 'question_jBA04x', diagnosticId: 'EMAIL', type: 'email' }
];

// Complete UUID to diagnostic ID mapping for all options
export const TALLY_UUID_MAP: Record<string, TallyOptionMapping> = {
  // Q01: How long in current role
  'a9f544cf-c7a8-471b-bad1-c7823faa5f85': { uuid: 'a9f544cf-c7a8-471b-bad1-c7823faa5f85', diagnosticId: 'Q01A', label: 'Less than 2 years' },
  'fea23410-16dc-404c-94df-c8f95eb252a8': { uuid: 'fea23410-16dc-404c-94df-c8f95eb252a8', diagnosticId: 'Q01B', label: '2–5 years' },
  '7266fa3c-b305-417c-9f90-cbd34d1b536e': { uuid: '7266fa3c-b305-417c-9f90-cbd34d1b536e', diagnosticId: 'Q01C', label: '5–10 years' },
  '37839c70-f08c-4a2c-bc99-678c467a4810': { uuid: '37839c70-f08c-4a2c-bc99-678c467a4810', diagnosticId: 'Q01D', label: '10–20 years' },
  '384c1570-6de7-4bb7-b1b3-3872fdf66774': { uuid: '384c1570-6de7-4bb7-b1b3-3872fdf66774', diagnosticId: 'Q01E', label: 'More than 20 years' },
  
  // Q02: Career trajectory
  'b86b81a3-566b-4757-804a-7e1bf062eb0e': { uuid: 'b86b81a3-566b-4757-804a-7e1bf062eb0e', diagnosticId: 'Q02A', label: 'Actively advancing' },
  'ca7165c1-ba7a-43f8-bb40-9ab2eb8947c7': { uuid: 'ca7165c1-ba7a-43f8-bb40-9ab2eb8947c7', diagnosticId: 'Q02B', label: 'Stable' },
  '7aad4a3d-9dbf-436e-b0cc-e9ac08b280e7': { uuid: '7aad4a3d-9dbf-436e-b0cc-e9ac08b280e7', diagnosticId: 'Q02C', label: 'Declining' },
  '87c900b0-cc87-49bd-b11b-8f716a59705c': { uuid: '87c900b0-cc87-49bd-b11b-8f716a59705c', diagnosticId: 'Q02D', label: 'Disrupted' },
  '79c48cd9-8414-473f-ba61-79710f386ef0': { uuid: '79c48cd9-8414-473f-ba61-79710f386ef0', diagnosticId: 'Q02E', label: 'In transition' },
  
  // Q03: Last felt moving forward
  '09358e37-2148-4816-b088-bdfbf2023c43': { uuid: '09358e37-2148-4816-b088-bdfbf2023c43', diagnosticId: 'Q03A', label: 'Within the past year' },
  'fc40be0d-bac4-4abd-99b4-9c463eafff8b': { uuid: 'fc40be0d-bac4-4abd-99b4-9c463eafff8b', diagnosticId: 'Q03B', label: '1–2 years ago' },
  '84a5de93-1a9e-4e3d-955f-5f6207b27814': { uuid: '84a5de93-1a9e-4e3d-955f-5f6207b27814', diagnosticId: 'Q03C', label: '2–4 years ago' },
  'c9010e85-ace0-4796-993a-b9bbd9720e8a': { uuid: 'c9010e85-ace0-4796-993a-b9bbd9720e8a', diagnosticId: 'Q03D', label: 'More than 4 years ago' },
  '2e4d0e91-2e05-4c32-b2af-57edf71731a4': { uuid: '2e4d0e91-2e05-4c32-b2af-57edf71731a4', diagnosticId: 'Q03E', label: "I'm not sure it ever did" },
  
  // Q04: Employer type
  'b4d9b740-77a6-4781-8a69-4a5979879a3c': { uuid: 'b4d9b740-77a6-4781-8a69-4a5979879a3c', diagnosticId: 'Q04A', label: 'Large corporation (500+ employees)' },
  'ff68bd58-5275-4806-9532-d445b4d94827': { uuid: 'ff68bd58-5275-4806-9532-d445b4d94827', diagnosticId: 'Q04B', label: 'Mid-size company (50–500 employees)' },
  '13462098-ba9b-4246-b9ce-42a9d02b8ee9': { uuid: '13462098-ba9b-4246-b9ce-42a9d02b8ee9', diagnosticId: 'Q04C', label: 'Small company or startup (under 50)' },
  '92a2a159-4631-4e72-baba-aa56d937f0b3': { uuid: '92a2a159-4631-4e72-baba-aa56d937f0b3', diagnosticId: 'Q04D', label: 'Public sector or institution' },
  '13c2991a-0764-4058-a86c-98f6896a310e': { uuid: '13c2991a-0764-4058-a86c-98f6896a310e', diagnosticId: 'Q04E', label: 'Self-employed or freelance' },
  '4ddf25da-de0f-4acc-a5b7-667437fb631e': { uuid: '4ddf25da-de0f-4acc-a5b7-667437fb631e', diagnosticId: 'Q04F', label: 'Currently between roles' },
  
  // Q05: Energy level (slider) - handled separately
  
  // Q06: Energy change
  'c4dcebf3-1eaf-4e42-b2c9-507a4f6b9c36': { uuid: 'c4dcebf3-1eaf-4e42-b2c9-507a4f6b9c36', diagnosticId: 'Q06A', label: 'Sharply increased' },
  '3693958a-a5bf-4a90-8660-a6c23a2e2fb1': { uuid: '3693958a-a5bf-4a90-8660-a6c23a2e2fb1', diagnosticId: 'Q06A', label: 'Significantly increased' },
  '39472d66-5437-4f07-9ab1-0ccb5ff89d9b': { uuid: '39472d66-5437-4f07-9ab1-0ccb5ff89d9b', diagnosticId: 'Q06B', label: 'Roughly the same' },
  '5847f0c9-d351-4054-8e0e-908441083f62': { uuid: '5847f0c9-d351-4054-8e0e-908441083f62', diagnosticId: 'Q06C', label: 'Gradually declining' },
  'd68c6efb-88ee-4333-bd3a-8cebf774f6ec': { uuid: 'd68c6efb-88ee-4333-bd3a-8cebf774f6ec', diagnosticId: 'Q06D', label: 'Sharply declined' },
  
  // Q07: Frequent feeling
  '5cac3f48-9118-4e43-b814-18aa5f1fc755': { uuid: '5cac3f48-9118-4e43-b814-18aa5f1fc755', diagnosticId: 'Q07A', label: 'Engaged and interested' },
  '2d9b85af-d707-4cb9-a790-4f0e8f78e515': { uuid: '2d9b85af-d707-4cb9-a790-4f0e8f78e515', diagnosticId: 'Q07B', label: 'Competent but indifferent' },
  '89b67640-7804-4dd2-9edc-286c685494ef': { uuid: '89b67640-7804-4dd2-9edc-286c685494ef', diagnosticId: 'Q07C', label: 'Frustrated and blocked' },
  '69631548-8a46-42b9-ae6d-75c19a9197ce': { uuid: '69631548-8a46-42b9-ae6d-75c19a9197ce', diagnosticId: 'Q07D', label: 'Exhausted and empty' },
  '6eba80d6-a10f-4339-b243-83fd1842541a': { uuid: '6eba80d6-a10f-4339-b243-83fd1842541a', diagnosticId: 'Q07E', label: 'Conflicted' },
  'e54ca8ed-20d7-4280-bce2-9888e4421edb': { uuid: 'e54ca8ed-20d7-4280-bce2-9888e4421edb', diagnosticId: 'Q07F', label: 'Anxious' },
  
  // Q08: How often think about change
  'f550b71a-442d-4bba-812d-ec5512401eed': { uuid: 'f550b71a-442d-4bba-812d-ec5512401eed', diagnosticId: 'Q08A', label: 'Rarely' },
  'b1dc49be-370f-4942-919a-1ef173e8fb13': { uuid: 'b1dc49be-370f-4942-919a-1ef173e8fb13', diagnosticId: 'Q08B', label: 'Occasionally' },
  'e5359e86-3d17-4fc9-a870-450f2716a0fa': { uuid: 'e5359e86-3d17-4fc9-a870-450f2716a0fa', diagnosticId: 'Q08C', label: 'Regularly' },
  '866c1f14-ad45-4508-82d5-f27f8733fc74': { uuid: '866c1f14-ad45-4508-82d5-f27f8733fc74', diagnosticId: 'Q08D', label: 'Constantly' },
  'de8d9874-39b2-4ee2-b638-37f7d25b2d51': { uuid: 'de8d9874-39b2-4ee2-b638-37f7d25b2d51', diagnosticId: 'Q08E', label: 'Already decided' },
  
  // Q09: Ranking (handled separately)
  '43ac9f79-6a3b-4a49-9cd8-b8d3884c7751': { uuid: '43ac9f79-6a3b-4a49-9cd8-b8d3884c7751', diagnosticId: 'Q09A', label: "Can't advance" },
  'cb92d13c-9e4f-45f1-9b25-6f3d142dbab0': { uuid: 'cb92d13c-9e4f-45f1-9b25-6f3d142dbab0', diagnosticId: 'Q09B', label: "Don't believe in work" },
  '92b3d177-a88c-4e60-b1b3-231e87be274f': { uuid: '92b3d177-a88c-4e60-b1b3-231e87be274f', diagnosticId: 'Q09C', label: 'Creative path never took' },
  'eae2060e-5dbc-480a-90cc-a836b3209b48': { uuid: 'eae2060e-5dbc-480a-90cc-a836b3209b48', diagnosticId: 'Q09D', label: 'No time/space' },
  '8b3262a0-ab08-4510-92c6-822d8bf76918': { uuid: '8b3262a0-ab08-4510-92c6-822d8bf76918', diagnosticId: 'Q09E', label: "Don't control work" },
  '625f9bb8-f865-4884-b242-d48aa6c172b3': { uuid: '625f9bb8-f865-4884-b242-d48aa6c172b3', diagnosticId: 'Q09F', label: 'Not sure what I want' },
  
  // Q10: 5 years from now
  '80126cd1-9651-4fad-b24c-f7a319e31f14': { uuid: '80126cd1-9651-4fad-b24c-f7a319e31f14', diagnosticId: 'Q10A', label: 'Work for themselves' },
  '8b6bd3f5-d6a1-41f2-9282-e87a51d71008': { uuid: '8b6bd3f5-d6a1-41f2-9282-e87a51d71008', diagnosticId: 'Q10B', label: 'Work they believe in' },
  '102c77af-0745-432c-a20f-486cf5643844': { uuid: '102c77af-0745-432c-a20f-486cf5643844', diagnosticId: 'Q10C', label: 'Pursued thing set aside' },
  'e67f1605-ec0a-4a3d-9765-23dd71ffc1c8': { uuid: 'e67f1605-ec0a-4a3d-9765-23dd71ffc1c8', diagnosticId: 'Q10D', label: 'Changed field entirely' },
  'c903a1a6-3a97-4fdc-9f6d-7b3b080c63ed': { uuid: 'c903a1a6-3a97-4fdc-9f6d-7b3b080c63ed', diagnosticId: 'Q10E', label: 'Control over time' },
  '9c8fda08-0b82-4d18-adc6-8a628ffb15cc': { uuid: '9c8fda08-0b82-4d18-adc6-8a628ffb15cc', diagnosticId: 'Q10F', label: 'Know who they are' },
  'e2e32b0d-cef5-492b-ace7-d2957bf6034a': { uuid: 'e2e32b0d-cef5-492b-ace7-d2957bf6034a', diagnosticId: 'Q10G', label: 'Not much different' },
  
  // Q11: Something to pursue
  'e98224b8-bffc-428c-ac3d-a20a9a19e41e': { uuid: 'e98224b8-bffc-428c-ac3d-a20a9a19e41e', diagnosticId: 'Q11A', label: 'Creative/artistic practice' },
  'ff964948-0799-4424-b37a-d1bfe40857be': { uuid: 'ff964948-0799-4424-b37a-d1bfe40857be', diagnosticId: 'Q11B', label: 'Own business' },
  '399be367-917c-4e80-8b42-eda8e4d62858': { uuid: '399be367-917c-4e80-8b42-eda8e4d62858', diagnosticId: 'Q11C', label: 'Different profession' },
  '29dbdb3f-3201-45ce-a96b-58ae545d8b9f': { uuid: '29dbdb3f-3201-45ce-a96b-58ae545d8b9f', diagnosticId: 'Q11D', label: 'Something vague' },
  'd391295d-acf2-4ce8-a779-e73d73eafbad': { uuid: 'd391295d-acf2-4ce8-a779-e73d73eafbad', diagnosticId: 'Q11E', label: 'Need right conditions' },
  '35b9a4b9-8900-4db0-9ae4-8b088b2de4e4': { uuid: '35b9a4b9-8900-4db0-9ae4-8b088b2de4e4', diagnosticId: 'Q11F', label: 'Not sure there is' },
  
  // Q12: Identity percentage (slider) - handled separately
  
  // Q13: How you describe yourself
  'c4667976-c301-495a-a4a4-05b5943d8a35': { uuid: 'c4667976-c301-495a-a4a4-05b5943d8a35', diagnosticId: 'Q13A', label: 'Job title/employer' },
  '016a4a50-b86e-4b66-a6c1-59e66d04694c': { uuid: '016a4a50-b86e-4b66-a6c1-59e66d04694c', diagnosticId: 'Q13B', label: 'Field/profession' },
  '793e5e53-f60d-43c0-9ef0-9c12bfc1de1b': { uuid: '793e5e53-f60d-43c0-9ef0-9c12bfc1de1b', diagnosticId: 'Q13C', label: 'Outside work' },
  'b1cc8c38-9fff-4b4b-9bea-4f0843dc81e9': { uuid: 'b1cc8c38-9fff-4b4b-9bea-4f0843dc81e9', diagnosticId: 'Q13D', label: 'Genuinely difficult' },
  
  // Q14: Changed direction before
  '0a0cf7e0-7446-452d-89a1-adb0f58c18e4': { uuid: '0a0cf7e0-7446-452d-89a1-adb0f58c18e4', diagnosticId: 'Q14A', label: 'Same field since start' },
  'ad4067af-1384-4581-a525-41f9981e8ab6': { uuid: 'ad4067af-1384-4581-a525-41f9981e8ab6', diagnosticId: 'Q14B', label: 'Once - went well' },
  '0068815f-5015-41b8-acbe-ed72bad9d6d0': { uuid: '0068815f-5015-41b8-acbe-ed72bad9d6d0', diagnosticId: 'Q14C', label: 'Once - difficult' },
  '1ddd98a7-dbbf-4b49-956c-7ea0452c9a46': { uuid: '1ddd98a7-dbbf-4b49-956c-7ea0452c9a46', diagnosticId: 'Q14D', label: 'Multiple times' },
  '9ae86205-e78f-49c9-abec-2e88fbb3509d': { uuid: '9ae86205-e78f-49c9-abec-2e88fbb3509d', diagnosticId: 'Q14E', label: "Tried but didn't take" },
  
  // Q15: Relationship to work
  '0fe6d665-db03-45de-91f1-c0a543005cc7': { uuid: '0fe6d665-db03-45de-91f1-c0a543005cc7', diagnosticId: 'Q15A', label: "What I'd choose" },
  '8c465fd9-0ffd-497e-9f86-2e23eff9ca5b': { uuid: '8c465fd9-0ffd-497e-9f86-2e23eff9ca5b', diagnosticId: 'Q15B', label: "Suits reasonably well" },
  '0d6b59b9-5b2d-4eae-90d3-410396ecb143': { uuid: '0d6b59b9-5b2d-4eae-90d3-410396ecb143', diagnosticId: 'Q15C', label: 'Once right but no longer' },
  '580576ea-9dae-4084-ac37-faa465db71a8': { uuid: '580576ea-9dae-4084-ac37-faa465db71a8', diagnosticId: 'Q15D', label: 'Never right - practical' },
  '76a4208c-f062-49ed-9f4f-02306910b8dd': { uuid: '76a4208c-f062-49ed-9f4f-02306910b8dd', diagnosticId: 'Q15E', label: "Not sure what's right" },
  
  // Q16: Creative practice set aside
  'da32abeb-6749-4fa8-adf7-09dde56f1534': { uuid: 'da32abeb-6749-4fa8-adf7-09dde56f1534', diagnosticId: 'Q16A', label: 'Yes - think often' },
  '8aa25f81-c706-4cac-b700-746cabb23963': { uuid: '8aa25f81-c706-4cac-b700-746cabb23963', diagnosticId: 'Q16B', label: 'Yes - made peace' },
  'e413474a-4919-40bd-b2b9-ac4799f52e54': { uuid: 'e413474a-4919-40bd-b2b9-ac4799f52e54', diagnosticId: 'Q16C', label: 'Possibly' },
  '746f1878-faa4-4b39-b33d-9b59e61b73b7': { uuid: '746f1878-faa4-4b39-b33d-9b59e61b73b7', diagnosticId: 'Q16D', label: "No - not my identity" },
  
  // Q17: Constraints (multi-select)
  'c70a6e67-f1d7-46b5-b335-63bb5e9087a8': { uuid: 'c70a6e67-f1d7-46b5-b335-63bb5e9087a8', diagnosticId: 'Q17A', label: 'Mortgage/financial obligations' },
  '2a39ca75-e706-437d-9a4c-05ef0bcfe2f3': { uuid: '2a39ca75-e706-437d-9a4c-05ef0bcfe2f3', diagnosticId: 'Q17B', label: 'Children depend on income' },
  '70f22a81-0728-4cd2-9b2b-3f9c974c8c60': { uuid: '70f22a81-0728-4cd2-9b2b-3f9c974c8c60', diagnosticId: 'Q17C', label: 'Caring responsibilities' },
  'fc0ec09c-fe01-4ec0-a995-68fde337f7cd': { uuid: 'fc0ec09c-fe01-4ec0-a995-68fde337f7cd', diagnosticId: 'Q17D', label: "Partner's career limits location" },
  '04f9dfc5-2ee1-4686-8f08-a218bb7d1d89': { uuid: '04f9dfc5-2ee1-4686-8f08-a218bb7d1d89', diagnosticId: 'Q17E', label: 'Health issues' },
  '66471ad6-df53-4075-a52b-f8c78a999d03': { uuid: '66471ad6-df53-4075-a52b-f8c78a999d03', diagnosticId: 'Q17F', label: 'Limited savings' },
  '8167795c-b42d-4dc1-9241-923b644d988f': { uuid: '8167795c-b42d-4dc1-9241-923b644d988f', diagnosticId: 'Q17G', label: 'Geographic location' },
  '1f8c0123-380e-4a1a-8bb5-4d30cb10764e': { uuid: '1f8c0123-380e-4a1a-8bb5-4d30cb10764e', diagnosticId: 'Q17H', label: 'None significantly constrain' },
  
  // Q18: Financial runway
  '85fe8503-7e41-4e7a-b7ae-2470f926007d': { uuid: '85fe8503-7e41-4e7a-b7ae-2470f926007d', diagnosticId: 'Q18A', label: 'Less than 3 months' },
  'e0140fa6-701b-4c82-8a53-3ac1e0427f4c': { uuid: 'e0140fa6-701b-4c82-8a53-3ac1e0427f4c', diagnosticId: 'Q18B', label: '3–6 months' },
  '5f29003e-0a15-48b1-8c01-d2d9234e102a': { uuid: '5f29003e-0a15-48b1-8c01-d2d9234e102a', diagnosticId: 'Q18C', label: '6–12 months' },
  'd7e59c43-b4cc-402b-9993-bf836f0e9b62': { uuid: 'd7e59c43-b4cc-402b-9993-bf836f0e9b62', diagnosticId: 'Q18D', label: '12–24 months' },
  '5621052b-896d-4cef-bd10-8c5768d20e4e': { uuid: '5621052b-896d-4cef-bd10-8c5768d20e4e', diagnosticId: 'Q18E', label: 'More than 24 months' },
  'e7d76cc3-3cfa-4162-81fd-d5a8638a4277': { uuid: 'e7d76cc3-3cfa-4162-81fd-d5a8638a4277', diagnosticId: 'Q18F', label: "Haven't calculated" },
  
  // Q19: Relocated
  '63cf9731-423b-4747-bbb0-98e97fc5e314': { uuid: '63cf9731-423b-4747-bbb0-98e97fc5e314', diagnosticId: 'Q19A', label: 'Yes - still rebuilding' },
  'f38c1273-435c-4d5e-b467-b39d9db91722': { uuid: 'f38c1273-435c-4d5e-b467-b39d9db91722', diagnosticId: 'Q19B', label: 'Yes - largely rebuilt' },
  'e19eca27-fc47-43f1-9d47-26f619a5ab7b': { uuid: 'e19eca27-fc47-43f1-9d47-26f619a5ab7b', diagnosticId: 'Q19C', label: 'No - same location' },
  'cdafdd21-31b8-4e09-98c0-19b83e6f61fc': { uuid: 'cdafdd21-31b8-4e09-98c0-19b83e6f61fc', diagnosticId: 'Q19D', label: 'Considering relocating' },
  
  // Q20: Specialization
  '7270a1c2-490d-4fae-bc71-c2d27ca0d598': { uuid: '7270a1c2-490d-4fae-bc71-c2d27ca0d598', diagnosticId: 'Q20A', label: 'Very narrow' },
  '7532a878-eeca-42a6-bb74-1764000c0159': { uuid: '7532a878-eeca-42a6-bb74-1764000c0159', diagnosticId: 'Q20B', label: 'Moderately specialized' },
  '31d7b1b0-66b3-4887-a25e-3e52621bdf4c': { uuid: '31d7b1b0-66b3-4887-a25e-3e52621bdf4c', diagnosticId: 'Q20C', label: 'Broadly skilled' },
  '0caa6e1f-ffd0-4bad-a7fc-55e529b4a6c3': { uuid: '0caa6e1f-ffd0-4bad-a7fc-55e529b4a6c3', diagnosticId: 'Q20D', label: 'Specialized but want to leave' },
  
  // Q21: Urgency
  '88ae0e5c-bb49-431b-a82c-3d8bf77be60e': { uuid: '88ae0e5c-bb49-431b-a82c-3d8bf77be60e', diagnosticId: 'Q21A', label: 'Not urgent' },
  '825bd8e3-93fe-430f-8e22-e686cb2057ae': { uuid: '825bd8e3-93fe-430f-8e22-e686cb2057ae', diagnosticId: 'Q21B', label: 'Moderate - 1-2 years' },
  'd139417a-6028-4d4d-99fb-b09d55986257': { uuid: 'd139417a-6028-4d4d-99fb-b09d55986257', diagnosticId: 'Q21C', label: 'Significant - 6-12 months' },
  'f8eec26e-295e-4028-82e3-2bee34a07f2b': { uuid: 'f8eec26e-295e-4028-82e3-2bee34a07f2b', diagnosticId: 'Q21D', label: 'Very urgent' },
  'af5ee65a-bfae-4c93-be07-bf96ab5b241d': { uuid: 'af5ee65a-bfae-4c93-be07-bf96ab5b241d', diagnosticId: 'Q21E', label: 'No urgency' },
  
  // Q22: Type of change
  '211a3596-0066-49cf-9fcf-efeb552979ce': { uuid: '211a3596-0066-49cf-9fcf-efeb552979ce', diagnosticId: 'Q22A', label: 'Adjustment' },
  '8e14b85c-7349-4443-b0dc-aa72c0ab238f': { uuid: '8e14b85c-7349-4443-b0dc-aa72c0ab238f', diagnosticId: 'Q22B', label: 'Pivot' },
  '95ed8182-fe89-4729-8142-b8cb6448823c': { uuid: '95ed8182-fe89-4729-8142-b8cb6448823c', diagnosticId: 'Q22C', label: 'Reinvention' },
  '64753056-3980-43c2-94ed-407f32fc1097': { uuid: '64753056-3980-43c2-94ed-407f32fc1097', diagnosticId: 'Q22D', label: 'Independence' },
  '084bd8c1-dd8e-4960-bf76-1c384220234d': { uuid: '084bd8c1-dd8e-4960-bf76-1c384220234d', diagnosticId: 'Q22E', label: "Don't know yet" },
  
  // Q23: Dominant feeling
  '5810c27b-000d-4cd4-9908-7a5a40b0dbe0': { uuid: '5810c27b-000d-4cd4-9908-7a5a40b0dbe0', diagnosticId: 'Q23A', label: 'Excitement' },
  '44d12995-cebf-40a3-a587-c7877686c358': { uuid: '44d12995-cebf-40a3-a587-c7877686c358', diagnosticId: 'Q23B', label: 'Cautious optimism' },
  '05fd6f40-e7e4-4fb6-951c-4f5556ee047e': { uuid: '05fd6f40-e7e4-4fb6-951c-4f5556ee047e', diagnosticId: 'Q23C', label: 'Fear' },
  'caffa1e6-91f7-41c4-941f-d069b8a3de05': { uuid: 'caffa1e6-91f7-41c4-941f-d069b8a3de05', diagnosticId: 'Q23D', label: 'Relief' },
  'd1da2730-1197-49b6-87c8-1cbc1eb92652': { uuid: 'd1da2730-1197-49b6-87c8-1cbc1eb92652', diagnosticId: 'Q23E', label: 'Paralysis' },
  
  // Q24: Worst-case response
  '35f5d9ec-a9f2-4b41-aed0-325b0ae00264': { uuid: '35f5d9ec-a9f2-4b41-aed0-325b0ae00264', diagnosticId: 'Q24A', label: "Comfortable - I'd recover" },
  '449bd68d-ebff-4e96-83c4-f5a7a4562040': { uuid: '449bd68d-ebff-4e96-83c4-f5a7a4562040', diagnosticId: 'Q24B', label: 'Uncomfortable but manageable' },
  'e0492929-d8c8-4080-a2b2-32fe1cfbf860': { uuid: 'e0492929-d8c8-4080-a2b2-32fe1cfbf860', diagnosticId: 'Q24C', label: 'Genuinely scares me' },
  '8981623b-15d1-4fc6-b990-e95f8a6ab096': { uuid: '8981623b-15d1-4fc6-b990-e95f8a6ab096', diagnosticId: 'Q24D', label: 'Financial consequences serious' },
  
  // Q25: Planning without acting
  'f1227364-b11f-4a0a-bfb2-11c779484a31': { uuid: 'f1227364-b11f-4a0a-bfb2-11c779484a31', diagnosticId: 'Q25A', label: 'Yes - 1-2 years' },
  'e8c4d2ce-4655-4129-a2f9-d42c8ec4ea87': { uuid: 'e8c4d2ce-4655-4129-a2f9-d42c8ec4ea87', diagnosticId: 'Q25B', label: 'Yes - more than 2 years' },
  '82e75ee3-e9c6-4e81-8827-47925939ec50': { uuid: '82e75ee3-e9c6-4e81-8827-47925939ec50', diagnosticId: 'Q25C', label: 'No - thinking not planning' },
  '04c6941c-1aff-4298-bed4-919c82c20fdd': { uuid: '04c6941c-1aff-4298-bed4-919c82c20fdd', diagnosticId: 'Q25D', label: 'No - in middle of acting' },
  'ba21b5c1-76d6-45c1-ba54-34fe1a35c417': { uuid: 'ba21b5c1-76d6-45c1-ba54-34fe1a35c417', diagnosticId: 'Q25E', label: 'No - not sure I want to' },
  
  // Q26: Values conflict
  '846873db-a36d-43b3-b8d3-5f1961ed5ca9': { uuid: '846873db-a36d-43b3-b8d3-5f1961ed5ca9', diagnosticId: 'Q26A', label: 'Rarely or never' },
  '6e22a8be-9ecb-4567-956a-bb934f2ae819': { uuid: '6e22a8be-9ecb-4567-956a-bb934f2ae819', diagnosticId: 'Q26B', label: 'Occasionally - minor' },
  '95136fdd-0ca0-4e01-92a6-5e32c327cf6d': { uuid: '95136fdd-0ca0-4e01-92a6-5e32c327cf6d', diagnosticId: 'Q26C', label: 'Regularly - costs me' },
  '7b2bf78c-a115-49c1-a0ae-d2d7163f6f0e': { uuid: '7b2bf78c-a115-49c1-a0ae-d2d7163f6f0e', diagnosticId: 'Q26D', label: 'Constantly - significant conflict' },
  
  // Q27: After achievement
  '7d63d83f-ac0f-4d83-81cc-26fbe8564fed': { uuid: '7d63d83f-ac0f-4d83-81cc-26fbe8564fed', diagnosticId: 'Q27A', label: 'Energized for next' },
  '42e53e5c-17b8-4b0c-8d09-dcedd7c91325': { uuid: '42e53e5c-17b8-4b0c-8d09-dcedd7c91325', diagnosticId: 'Q27B', label: 'Satisfied then move on' },
  'ee73843a-017a-4ef7-bbff-61944f960889': { uuid: 'ee73843a-017a-4ef7-bbff-61944f960889', diagnosticId: 'Q27C', label: 'Strangely flat' },
  '90861a6a-033d-4886-81b4-ce85b36426fe': { uuid: '90861a6a-033d-4886-81b4-ce85b36426fe', diagnosticId: 'Q27D', label: 'Uncertain what next' },
  '9049a51f-079b-4f65-9c2c-083968de77c2': { uuid: '9049a51f-079b-4f65-9c2c-083968de77c2', diagnosticId: 'Q27E', label: 'No recent achievement' },
  
  // Q28: Why haven't changed
  '5b636e82-6be3-4c86-8683-8134c7566774': { uuid: '5b636e82-6be3-4c86-8683-8134c7566774', diagnosticId: 'Q28A', label: 'Financial risk' },
  '3e0bbdfc-f121-41e4-b009-89d0db8939a3': { uuid: '3e0bbdfc-f121-41e4-b009-89d0db8939a3', diagnosticId: 'Q28B', label: "Don't know what to change to" },
  '8b14056c-5d8f-4fc1-b816-8bc50701bf1b': { uuid: '8b14056c-5d8f-4fc1-b816-8bc50701bf1b', diagnosticId: 'Q28C', label: 'Responsibilities' },
  '56ff49d9-bd29-444f-a6bc-6bd1dbe376a5': { uuid: '56ff49d9-bd29-444f-a6bc-6bd1dbe376a5', diagnosticId: 'Q28D', label: 'Fear of failure' },
  'ecf6b15d-3058-447e-9235-da0f5dee765c': { uuid: 'ecf6b15d-3058-447e-9235-da0f5dee765c', diagnosticId: 'Q28E', label: 'Keep moving target' },
  'cfd594ec-975a-4948-8162-2b3a39a161d5': { uuid: 'cfd594ec-975a-4948-8162-2b3a39a161d5', diagnosticId: 'Q28F', label: 'Already started changing' },
  '66b9e6f2-f253-49fd-9589-e2515181e1f2': { uuid: '66b9e6f2-f253-49fd-9589-e2515181e1f2', diagnosticId: 'Q28G', label: 'Status quo fine' }
};
