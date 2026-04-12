export interface Story {
  name: string;
  text: string;
}

export const stories: Record<string, Story[]> = {
  BOA: [
    {
      name: 'Boa, 44 — VP of Marketing, Germany',
      text: 'Fourteen years of consecutive promotions. Strong results, zero internal satisfaction. Waking up at 3am reviewing campaign metrics. Had a panic attack during a board presentation — the first one. Had a second three weeks later at her daughter\'s school play. Negotiated a 4-month unpaid leave with no plan. Just stopped. Returned part-time as a consultant. Within three years was running a small consultancy with three clients, working 30 hours a week, income equivalent to before. Regret score: 1/5 — "I regret not doing it sooner."',
    },
    {
      name: 'Marcus, 47 — Senior Software Architect, USA',
      text: 'Technically respected, organizationally invisible. Had been passing on promotions for three years because more responsibility felt unbearable. His annual review described him as "reliable." That word broke something. He resigned that night. Took three months completely off. Moved into tech education. Income dropped 45%. Described it as the happiest he had been in a decade. No interest in returning to corporate.',
    },
    {
      name: 'Thomas, 41 — Head of Operations, Netherlands',
      text: 'Hit every target. Couldn\'t remember why any of it mattered. His father died suddenly — forced two weeks away from work. In those two weeks he realized he hadn\'t thought about work once and felt no guilt. That disturbed him more than the grief. Set a 12-month exit deadline. Moved to a smaller company in a lower-seniority role. Promoted twice within three years. "The plateau was the company, not me."',
    },
  ],
  SBM: [
    {
      name: 'Anders, 43 — Senior Accountant, Denmark',
      text: 'Nothing objectively wrong. Secure job, respected by colleagues, predictable income. Described his days as "moving numbers from one place to another for reasons I stopped understanding." One Sunday evening he sat in his car in the driveway for 40 minutes, unable to go inside. Wrote it in a journal. Reading it back a week later he recognized it as the clearest signal he\'d ignored for years. Enrolled part-time in a landscape architecture program while keeping his job. Described the effect as immediate — having something he was building toward changed the quality of every other day.',
    },
    {
      name: 'Sarah, 38 — HR Manager, Canada',
      text: 'Had built a career around competence rather than interest. Described herself as "very good at a job I never chose — I just kept saying yes to the next thing." A job offer — better title, better salary — produced three weeks of paralysis. Realized the paralysis wasn\'t about the offer. It was about not knowing what she actually wanted. Declined it. Gave herself 6 months to identify one thing she\'d pursue if advancement wasn\'t the goal. Landed on organizational psychology. Enrolled part-time. Now leads a small research function. "Finally mine."',
    },
    {
      name: 'Marek, 48 — Brand Manager, Poland',
      text: 'Well-paid, respected, bored. Had been running the same annual brand planning cycle for nine years. Started taking on every committee available — not from ambition but to fill the absence of meaning with activity. A restructuring removed him from a project he\'d expected to lead. His reaction was relief — and that relief disturbed him more than the disappointment. Used the restructuring as cover to move into an innovation scouting function. "I think about work when I\'m not at work, which I\'d stopped doing entirely."',
    },
  ],
  LCA: [
    {
      name: 'Pavel, 44 — Tax Lawyer, Czech Republic',
      text: 'Had studied photography seriously as a student, abandoned it entirely at 22 when law school consumed everything. Kept a camera in a drawer for twenty years. His firm asked him to photograph the office Christmas party. He borrowed a decent camera, spent three hours shooting, stayed up until 2am editing. Realized he hadn\'t lost interest — he\'d buried it. Enrolled in an evening workshop. Set a rule: one personal shoot per week, non-negotiable. Within three years had regular editorial and architectural commissions covering 15% of household costs. Still a lawyer. "I regret twenty years of the camera in the drawer. I don\'t regret where I am now."',
    },
    {
      name: 'Caroline, 49 — Operations Director, UK',
      text: 'Had written fiction throughout her 20s, stopped at 31 when career and family took over. Eighteen-year gap. During an office move found a printed manuscript from 1998 in a box. Read 30 pages standing in the corridor. Thought it was good. That shocked her. Committed to finishing a novel within two years — 45 minutes every morning before work, told no one for six months. First draft complete at 87,000 words. Now on submission with a literary agent. Has started a second book. "Writing is parallel to life, not instead of it."',
    },
    {
      name: 'Hana, 52 — Procurement Manager, Germany',
      text: 'Described herself as "not creative" — a self-description she\'d held so long she\'d stopped questioning it. A ceramics workshop at a team-building day revealed she was significantly better than her colleagues. Her manager said "you\'ve done this before, haven\'t you?" She hadn\'t. That discrepancy between her self-image and the actual evidence destabilised something. Enrolled in a weekly ceramics class. Now has an Etsy shop with consistent sales and teaches beginners two Saturdays a month. "I\'m genuinely angry it took me 34 years. Those are different feelings and both are true."',
    },
  ],
  CE: [
    {
      name: 'Dirk, 48 — Regional Director, Netherlands',
      text: '22 years with the same employer, started as a graduate trainee. Made redundant in a restructuring — not performance related. Given a generous package. Objectively fine. Described the first month as "feeling like a person without a country." Had not updated his CV in 19 years. Six weeks later at a dinner party someone asked "so what do you do?" He had no answer. Realized his entire self-description had been borrowed from his employer for two decades. Took 3 months doing nothing career-related. Then mapped what he had actually built — separate from the company brand. Joined a mid-size company as Commercial Director. "I don\'t regret leaving. I regret that it took someone else\'s decision to make me go."',
    },
    {
      name: 'Claire, 44 — Senior Product Manager, UK',
      text: '9 years at a large tech company, last 3 under new leadership she fundamentally disagreed with. Was asked to present a product roadmap she considered harmful to users. Prepared the presentation. Sat in the car park beforehand and couldn\'t go in. Resigned the following week without a job to go to. Began consulting independently for smaller tech companies. Income at 70% of previous level within a year. "The autonomy was something I didn\'t know I\'d been missing until I had it."',
    },
    {
      name: 'Erik, 53 — Finance Director, Poland',
      text: '16 years at a company he\'d grown from 200 to 800 employees. Felt the relationship as almost parental — even though he owned no equity. The acquisition felt like losing something he had built. His youngest daughter asked to see his office before he left. Walking her through it he narrated the history of every decision made in each room. She said: "you built all of this." He realized she was right — and that it would still be true after the building was gone. Moved into interim CFO work. Higher day rate than his previous salary implied. Now works 9 months per year by choice.',
    },
  ],
  CP: [
    {
      name: 'Mikael, 45 — Senior Project Manager, Finland',
      text: '11 years in the same role with incrementally larger projects but no title change. Every promotion conversation ended with "you\'re too valuable where you are." Described himself as a load-bearing wall — essential, permanent, and never going to be the facade. A younger colleague was brought in above him as Programme Director. The hiring was fair. The effect was clarifying — he realized he had been waiting for recognition that the organisation had no structural mechanism to deliver. Updated his CV for the first time in 8 years. Moved to a larger firm as Programme Director. 28% salary increase. "The plateau was the company, not me."',
    },
    {
      name: 'Ana, 42 — Graphic Designer, Spain',
      text: 'Technically excellent, structurally stuck. The agency had one art director who showed no signs of leaving. Described her situation as "waiting for someone else\'s life to change so mine could." A freelance client offered her a retainer covering 40% of her salary. She did the math and realized she was three clients away from financial independence — and had been for two years without noticing. Resigned. Built the freelance practice to full capacity in four months. Income now 40% above previous salary. Works from home. Selective about clients. "The plateau pushed me somewhere I wouldn\'t have gone voluntarily."',
    },
    {
      name: 'Niamh, 49 — Nurse Manager, Ireland',
      text: 'Sole income earner, two teenage children. Been at nurse manager grade for 9 years. Multiple applications for senior management blocked by lack of formal qualification. Described the system as "requiring a piece of paper to confirm what I\'ve been doing for a decade." Enrolled in a part-time Healthcare Management postgraduate program — two years, distance learning, while working full time and parenting. Appointed Deputy Director of Nursing at a larger hospital within three years. 35% salary increase. "The qualification was the key I had to cut myself."',
    },
  ],
  RE: [
    {
      name: 'Laurent, 43 — Senior Marketing Manager, Belgium',
      text: 'Had been running a food blog evenings and weekends for four years with a growing audience. Each year he set a revenue target that would justify the leap. Each year the target was hit. Each year he moved the target higher. His employer announced a voluntary redundancy program. He applied within 48 hours. Described it as "the permission I\'d been manufacturing reasons not to give myself." Relaunched the blog as a proper media business. Within three years revenue equivalent to his previous salary. "I regret four years of moving the goalposts. The redundancy just called my bluff."',
    },
    {
      name: 'Erik, 47 — IT Project Manager, Sweden',
      text: 'Had been building a software tool for freelance project managers for three years. It had been 70% complete for 18 months. Each time he got close to launching he found something to fix. A former colleague built and launched a simpler version. It got traction. His reaction was not admiration — it was a specific uncomfortable jealousy he recognized as the emotion of someone overtaken by their own hesitation. Launched his tool within six weeks. 340 paying users within a year. "The 18 months of perfecting something no one had seen yet — that\'s the regret. Not the launch."',
    },
    {
      name: 'Maria, 39 — UX Designer, UK',
      text: 'Had freelanced briefly before taking a permanent role at 31. Missed the autonomy immediately. Spent 7 years talking about going back. Was passed over for a principal designer role. Her reaction surprised her — not anger, but relief. Realized she had been hoping for an external event to make the decision for her. Resigned four months later. Income 35% above previous salary within a year. "I\'d priced myself below market for years without realizing it. Seven years of talking about it. That\'s the regret."',
    },
  ],
  VR: [
    {
      name: 'Daniel, 45 — Senior Account Director, UK',
      text: '18 years in PR, last several managing reputation campaigns for clients he privately considered harmful. Not illegal. Not unusual by industry standards. Just consistently misaligned with what he thought was true. Described the daily experience as "renting my skills to purposes I wouldn\'t defend at home." His 14-year-old daughter asked him directly whether his client was lying. He gave her the official line. She looked at him without speaking. He resigned within two months. Moved into communications for an environmental NGO at 45% of previous salary. "The work is the same. The purpose isn\'t. That turns out to be the entire difference."',
    },
    {
      name: 'Stefan, 48 — Corporate Lawyer, Germany',
      text: 'Fourteen years structuring complex financial instruments. The 2008 financial crisis changed something he never fully acknowledged. Described his relationship to the work as "technically engaged, morally absent." A junior colleague asked with genuine curiosity whether he thought what they were doing was good. He gave a careful professional answer. That night he wrote in a journal the answer he would have given if the question had been asked by someone who couldn\'t affect his career. The two answers were completely different. Moved into financial regulation at 40% of previous income. "Fourteen years of the second answer. That\'s what I\'d change."',
    },
    {
      name: 'Marta, 53 — Senior Manager, Immigration Services, Australia',
      text: 'Had joined the public service believing in the institutional mission. Policy direction had shifted significantly over 15 years. She had stayed believing internal advocates could influence outcomes better than external critics. That belief had eroded. Was asked to sign off on a procedural decision she considered unjust. The decision was within policy. She signed it. Spent the following week unable to describe what she did for work without significant internal editing. Recognized that level of editing as unsustainable. Moved to a refugee support organization at 35% of previous salary. "The first time in six years I haven\'t had to edit what I do before I say it out loud."',
    },
  ],
  RO: [
    {
      name: 'Aoife, 44 — Vice Principal, Ireland',
      text: 'Three children, mother with early-stage dementia 20 minutes away, two siblings abroad. Every hour accounted for by someone else\'s need. Professional ambitions — she had wanted to apply for a principal role — completely suspended. Her youngest child asked her what she liked doing. She couldn\'t answer quickly. The pause lasted long enough that her child noticed. Did not change her external situation — couldn\'t. Instead restructured her time with surgical precision. Hired a part-time care coordinator using state support she hadn\'t previously claimed. Reclaimed Tuesday evenings and Sunday mornings as non-negotiable personal time. Applied for a principal role — shortlisted within a year. Appointed within three.',
    },
    {
      name: 'David, 47 — Senior Developer, Germany',
      text: 'Divorced, primary custody of two children, father with chronic illness requiring regular hospital coordination across two cities. No local support network. Fell asleep during a video call with his team. Woke up to 11 messages. Negotiated a fully remote 4-day week at 80% salary. Used the freed day for school pickups, medical coordination, and unstructured time. "The best financial decision I\'ve made because the alternative was a health crisis I couldn\'t afford." Returned to 5-day week when children were older and father\'s care stabilized. Now leads a fully remote team.',
    },
    {
      name: 'Petra, 39 — Marketing Director, UK',
      text: 'One child with additional support needs, mother increasingly frail. Was passed over for a promotion — the hiring manager had quietly calculated her availability as a concern. Left the company within 6 months. Moved to a smaller business with explicit flexibility provisions and a culture she had researched carefully. Lateral move in title, equivalent salary. "The difference between being accommodated and being valued." Promoted within three years. "I was carrying everything alone because I didn\'t know I was allowed to put some of it down."',
    },
  ],
  PCT: [
    {
      name: 'Mikkel, 46 — Senior UX Researcher, Denmark',
      text: 'Had been building small side projects for three years alongside his full-time role — occasional freelance research, a workshop he ran twice a year, a paid newsletter with 800 subscribers. Side income covering 25% of monthly costs. His employer was acquired. The uncertainty removed his sense of the job as a stable anchor. He realized the stability he\'d been protecting had been partly illusory. Accelerated the portfolio deliberately during the restructuring period. When his role was confirmed as safe he resigned anyway. Within three years: newsletter grown to 3,200 subscribers generating 35% of income, two online courses added, income above previous salary, working 4 days per week equivalent. "Less of a leap and more of a slow migration that I made faster when I stopped being afraid."',
    },
    {
      name: 'James, 51 — Strategy Consultant, UK',
      text: 'Had been declining invitations for 15 years — board roles, teaching engagements, advisory work — because the full-time role consumed everything. Was invited to join the board of a social enterprise. Accepted impulsively. Spent three weeks trying to make it work within his current schedule. Couldn\'t. Resigned from the firm. Structured a portfolio from existing invitations: two consulting retainers, the board role, one teaching day per month at a business school. Income at 70% of previous level year one, recovered to 95% by year three. "Fifteen years of declining invitations I should have accepted."',
    },
    {
      name: 'Marie, 43 — Science Teacher, France',
      text: 'Had been writing a popular science blog for six years with 14,000 monthly readers — zero monetization. A science museum commissioned three paid articles and two workshops. The fee equalled two weeks of teaching salary. "This is what I\'ve been giving away for six years." Applied for a 60% teaching contract available under French education provisions she\'d been eligible for but unaware of. Science communication work filled the income gap. Within three years teaching reduced to 40%, income 20% above previous full-time salary. "Something I built accidentally over six years and then consciously in one."',
    },
  ],
  ISG: [
    {
      name: 'Klára, 42 — Senior Copywriter, Netherlands',
      text: 'Objectively among the strongest writers in her agency. Had informally mentored junior staff for three years. Had never applied for a creative director role despite being the obvious internal candidate twice over. Every time the role opened she found a reason the timing was wrong. Was asked to onboard an external candidate hired into the role she hadn\'t applied for. Spent two weeks teaching a director the job she\'d been doing informally for years. Applied for the next creative director role at a competitor. Got the offer. Accepted before she could talk herself out of it. "I spent so long preparing for exposure that I almost missed the evidence I was doing it right." Promoted to executive creative director within three years.',
    },
    {
      name: 'Lars, 46 — Operations Manager, Sweden',
      text: 'Opposite problem — had overestimated his readiness for a COO role, accepted it, lasted 18 months before being asked to step back. The role required financial modelling fluency and board-level communication skills he didn\'t have. Described the 18 months as "performing competence I didn\'t have in rooms where the absence was visible." The step-back conversation came. Initial reaction: devastation. One week later: relief. "I had been holding a position I wasn\'t ready for with both hands. Putting it down was the first honest thing that had happened in 18 months." Enrolled in a part-time executive finance program. Appointed COO at a smaller organisation three years later. Performing at level.',
    },
    {
      name: 'Tomáš, 39 — Data Scientist, Germany',
      text: 'Had published 14 peer-reviewed papers. Had been offered three industry positions in four years at significantly higher salaries. Had declined all three citing insufficient expertise — a self-assessment no hiring manager shared. A former colleague with objectively weaker publications took an industry role and described the technical work as less rigorous than expected. The gap between the colleague\'s self-assessment and his own was impossible to rationalize. Accepted the next industry approach. Salary 85% above academic equivalent. "I had confused unfamiliarity with inadequacy for years." Now leads a team of six.',
    },
  ],
  DA: [
    {
      name: 'Tomáš, 43 — Accountant, Hungary',
      text: 'Had wanted to study architecture since secondary school. Chose accounting at 18 on family advice — safer, more employable, more practical. Twenty-five years of the practical choice. His 13-year-old son announced he wanted to study architecture. The pride and the pain arrived simultaneously. "Watching someone pick up something I\'d put down and pretending it was fine." Enrolled in a part-time architecture conversion program — five years, evenings and weekends, while maintaining his accounting practice. Qualified at 48. Now works at a small architecture firm handling commercial fit-outs, leveraging his accounting background in cost management. "I don\'t regret doing it. I regret the twenty-five years it took me to start."',
    },
    {
      name: 'Helena, 46 — HR Director, Switzerland',
      text: 'Had wanted to write narrative journalism since university. Chose HR for job security at 22 after a humanities degree with no clear vocational path. Twenty-four years of work she was good at and had never chosen. An internal newsletter article she\'d written was forwarded externally and picked up by a business publication. The commission fee was modest. The effect was not. Began pitching independently to three publications. Negotiated a 3-day week in the HR role. Writing income covering the gap within two years. Byline in two major European business publications. "The ambition didn\'t expire. I just kept telling myself it had."',
    },
    {
      name: 'James, 41 — Maths Teacher, South Africa',
      text: 'Had wanted to build software since his late 20s. Kept deferring because teaching felt too important to leave and retraining felt too slow. Twelve years of teaching, valued by students, personally stagnant. Had been coding self-taught, evenings only, for a decade — never shown to anyone. A student found his work and said: "you should still be making this." Published one tool publicly. Applied for a part-time junior developer role to get structured feedback. "Going back to being junior at 41, which was the most uncomfortable thing I\'ve done professionally and the most necessary." Now a mid-level developer at an edtech company. "Twelve years of evenings that finally became a morning."',
    },
  ],
  SC: [
    {
      name: 'Richard, 47 — Print Production Specialist, UK',
      text: '22 years mastering offset litho production and colour management — skills that were premium in 2003 and increasingly marginal by 2020. The magazine sector had contracted by over 60% in his working lifetime. His largest remaining client moved all production in-house. Lost 40% of income in a single month. Reframed the expertise deliberately — print knowledge repositioned as premium brand quality assurance for luxury goods companies moving to digital but making expensive production errors from ignorance of physical output constraints. "I stopped selling print and started selling the cost of getting it wrong." Four clients within three years, income above previous peak.',
    },
    {
      name: 'Dieter, 51 — Diesel Powertrain Engineer, Germany',
      text: '26 years of deep technical expertise in diesel engine calibration — a domain under existential pressure from electrification. Was asked to present at an internal transition planning meeting mapping which competencies were transferable to EV development. Midway through preparing the presentation realized he was describing his own obsolescence with unusual clarity — and that the analysis itself was the valuable skill, not the diesel knowledge. Pivoted to technical transition consulting — advising automotive suppliers on managing the engineering capability shift from combustion to electric. "I turned my obsolescence into the offer." Now contributing to two industry working groups on engineering capability transfer.',
    },
    {
      name: 'Anna, 48 — Analytical Chemist, Switzerland',
      text: 'Specialised in a specific analytical technique increasingly automated by software, reducing the human expertise premium substantially. Her company announced AI-assisted systems that would reduce the QC team by 30%. Was told her role was safe. Described that reassurance as "the thing that made me understand I needed to leave — I didn\'t want to be the last one standing in a shrinking room." Identified that her real expertise was not the technique but the regulatory compliance knowledge built around it. Repositioned as a QC regulatory affairs specialist. Income increased 25% within three years. "I didn\'t change careers. I changed which part of my career I stood on."',
    },
  ],
  PSV: [
    {
      name: 'Jari, 47 — Founder, Finland',
      text: 'Built a B2B software company over 11 years, sold it to a strategic acquirer. The exit was everything he had worked toward — right acquirer, right timing, right number. Three months after closing he described sitting in his home office with no calls scheduled, no decisions pending, no team needing anything. "Arriving at a destination that turned out to be a waiting room." Spent 8 months doing smaller things deliberately — angel investing, advising a non-profit, learning ceramics badly. Identified that what he\'d actually valued was early-stage problem definition, not scale. Joined a seed-stage venture fund as an operating partner focused on the 0–12 month company building phase. "Finally the right shape for what I\'m good at."',
    },
    {
      name: 'Professor Willem, 52 — Molecular Biologist, Netherlands',
      text: 'Spent 24 years pursuing a specific research question. Published the definitive paper. The field recognized it as landmark work. Then the question that had organized his professional life for a quarter century was answered. Described the period after publication as "the silence after a very long sentence." A PhD student asked him what research question he\'d pursue if he could start over. He gave three answers, each progressively less convincing. Applied for a sabbatical. Used it to step entirely outside his specialism — attended conferences in adjacent fields, spent two months at a science policy institute. Was looking for a question, not an answer. Found one at the intersection of molecular biology and environmental science.',
    },
    {
      name: 'Sofia, 46 — Architect, Sweden',
      text: 'Spent 12 years designing a major cultural landmark — a museum that became internationally recognized upon completion. Attended the opening, gave interviews, received awards. Two months later sat at her desk looking at the new project pipeline — competent, well-budgeted, professionally appropriate — and felt nothing. "Not a quality difference but a meaning difference." Initiated a self-directed research project — unpaid, unfunded, no brief — exploring adaptive reuse of industrial heritage structures. The speculative proposal attracted a municipal authority running a tender for exactly that building type. Won the commission. "I made the work I wanted to do and the work found its brief."',
    },
  ],
  GD: [
    {
      name: 'Eva, 44 — Marketing Strategist, relocated Amsterdam to Lisbon',
      text: '16 years building a professional network in the Netherlands — now geographically inaccessible. The move was a genuine choice, made with open eyes. The professional consequence was nonetheless significant. "Being senior and invisible simultaneously — I had everything except anyone who knew it." Applied for a marketing director role at a Portuguese company. Rejected at first screening — her Dutch client list meant nothing, references in a different language, LinkedIn optimized for a market she\'d left. Stopped pursuing Portuguese-market roles. Pivoted to international companies with Lisbon offices where her Dutch market knowledge was an asset. Simultaneously rebuilt local network: two industry events per month, one coffee meeting per week. Income recovered within three years. "Two years longer than I thought it would take and worth the patience."',
    },
    {
      name: 'Thomas, 47 — Software Engineer, relocated Berlin to Singapore',
      text: 'Employer-assigned posting that extended twice without clear endpoint. Three years in, described feeling "professionally itinerant — competent everywhere, rooted nowhere." Passed over for a senior architect role — feedback: insufficient local stakeholder relationships. Made an active decision about geography for the first time rather than allowing the employer to make it passively. Chose Singapore deliberately — committed to a 3-year personal timeline, signed a lease, joined three professional communities, began cultivating local relationships as a professional priority. Promoted to senior architect within a year. "The difference between being somewhere and being from somewhere — even if \'from\' is a choice rather than a fact."',
    },
    {
      name: 'Claire, 42 — Headteacher, relocated UK to rural France',
      text: 'UK teaching qualifications not recognized in France. French language insufficient for the French school system. Had resigned her headteacher role before fully understanding the qualification recognition gap. "I had accidentally retired at 42 without planning to." Identified an unmet need — English-language educational support for the region\'s growing anglophone community. Established a tutoring practice. Eight regular families within a year. 14 families and two part-time tutors within three years. Income above her London teaching salary on fewer hours. "The move broke my career and gave me a better one. I couldn\'t have designed it."',
    },
  ],
  LRP: [
    {
      name: 'Zsolt, 54 — Bank Branch Manager, Romania',
      text: '32 years in banking. Branch closed in a sector-wide contraction. The path forward in banking was narrowing. Described himself as "a very experienced person in something the world needs less of." His wife suggested he teach. He dismissed it immediately. Thought about it for three weeks. Recognized the dismissal had been reflexive — banking had status, teaching didn\'t, and that hierarchy had nothing to do with what he was actually capable of. Applied to a vocational college to teach financial literacy. Accepted at entry lecturer level — significant status reduction, salary at 55% of previous. First semester student feedback strong. Senior lecturer within three years. "Slower and harder and more worthwhile than anything I did in the second half of my banking career."',
    },
    {
      name: 'Anne, 51 — HR Director, Belgium',
      text: 'Decided — not pushed — to retrain as a psychotherapist. No psychology background. Retraining timeline: five to seven years part-time. At 51 that meant qualifying at 57 or 58. Did the arithmetic. Started anyway. Enrolled in a part-time program while maintaining her HR role. Attended foundational psychology modules alongside people 25 years younger without visible discomfort. "The only question I had was whether to start. I started." Qualified at 57. Built a private practice alongside reduced HR work. "Arriving somewhere I decided to go when I was 51, which felt like a long time and also like no time at all."',
    },
    {
      name: 'Ciarán, 48 — PE Teacher, UK',
      text: 'Wanted to move into physiotherapy for 20 years — adjacent to his work through student injuries and sports rehabilitation throughout his career. The barrier was a three-year full-time degree. At 48 that meant qualifying at 51, entering a new profession at entry level, accepting a significant income gap. A physiotherapist he\'d worked with told him directly: "You ask the right questions. You should be doing this." Applied for and received a career development loan. Enrolled full-time. Oldest student in his cohort by 14 years. "I had forgotten what it felt like to not know things. It was uncomfortable and completely necessary." Qualified physiotherapist within four years.',
    },
  ],
};
