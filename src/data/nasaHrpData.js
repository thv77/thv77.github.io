// NASA Human Research Program (HRP) Data & Clinical Knowledge Base
// Based on NASA Human Research Roadmap (HRR), Life Sciences Data Archive (LSDA), and SOMA

export const MISSION_ENVIRONMENTS = {
  transit: {
    id: 'transit',
    name: 'Deep Space Transit (Mars Cruise)',
    gravity: '0.00 g (Microgravity)',
    radiationBaseline: 1.8, // mSv / day
    commsDelay: '14m 24s',
    pCO2Baseline: 3.2, // mmHg
    icon: 'Rocket',
    description: 'Long-duration transit vessel en route to Mars. High cosmic ray exposure and prolonged zero-gravity fluid cephalad shift.',
  },
  lunar: {
    id: 'lunar',
    name: 'Artemis Lunar Basecamp (Malapert Point)',
    gravity: '0.16 g (Lunar 1/6th)',
    radiationBaseline: 0.9, // mSv / day
    commsDelay: '01m 18s',
    pCO2Baseline: 2.1, // mmHg
    icon: 'Moon',
    description: 'South Pole lunar habitat. Partial gravity mitigation with acute surface regolith particulate exposure risk.',
  },
  mars: {
    id: 'mars',
    name: 'Mars Surface Habitat (Acidalia Planitia)',
    gravity: '0.38 g (Martian 3/8th)',
    radiationBaseline: 1.1, // mSv / day
    commsDelay: '21m 45s',
    pCO2Baseline: 2.8, // mmHg
    icon: 'Globe',
    description: 'Planetary surface operations. 24.6h circadian Sol cycle, atmospheric thin shielding, and mission autonomy necessity.',
  }
};

export const CREW_MEMBERS = [
  {
    id: 'crew-01',
    name: 'CDR Sarah Chen, Ph.D.',
    role: 'Mission Commander & Astrobiologist',
    age: 41,
    bloodType: 'O-Positive',
    missionDay: 142,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'Nominal - Minor SANS Alert',
    overallHealthIndex: 88,
  },
  {
    id: 'crew-02',
    name: 'PLT Marcus Vance',
    role: 'Flight Systems Specialist',
    age: 38,
    bloodType: 'A-Positive',
    missionDay: 142,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'Caution - Muscle Mass Atrophy Drift',
    overallHealthIndex: 82,
  },
  {
    id: 'crew-03',
    name: 'Dr. Elena Rostova, MD',
    role: 'Crew Medical Officer & Flight Surgeon',
    age: 44,
    bloodType: 'B-Positive',
    missionDay: 142,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    status: 'Nominal - Optimal Fitness',
    overallHealthIndex: 94,
  }
];

export const ORGAN_SYSTEMS = [
  {
    id: 'neuro_ocular',
    name: 'Neuro-Ocular System (SANS)',
    shortName: 'SANS & Vision',
    region: 'head',
    status: 'warning', // 'nominal' | 'warning' | 'critical'
    triageLevel: 'AMBER',
    hazard: 'Gravity Fields (Cephalad Fluid Shift)',
    hrpCode: 'HRP-RISK-SANS-01',
    primaryMetric: 'Optic Disc Frisén Grade',
    primaryValue: 'Grade 1.5 (Mild Edema)',
    normalRange: 'Grade 0 (Flat Disc)',
    summary: 'Spaceflight-Associated Neuro-ocular Syndrome caused by venous engorgement and cephalad fluid shift in microgravity, causing optic disc swelling and hyperopic shift.',
    indicators: [
      { name: 'Optic Disc Swelling (ONSD)', value: '5.9 mm', normal: '4.5 - 5.0 mm', status: 'warning', unit: 'mm' },
      { name: 'Visual Acuity (Snellen)', value: '20/30 (R) / 20/25 (L)', normal: '20/20', status: 'warning', unit: 'ratio' },
      { name: 'Choroidal Folds', value: 'Present (Inferior)', normal: 'Absent', status: 'warning', unit: 'eval' },
      { name: 'Intracranial Pressure Proxy', value: '18 mmHg (Elevated)', normal: '10 - 15 mmHg', status: 'warning', unit: 'mmHg' }
    ],
    explanation: 'In microgravity, ~1.5 to 2 liters of blood and interstitial fluid shift towards the head. Without gravitational drainage, chronic venous pressure in the brain flattens the posterior globe and swells the optic nerve head, degrading near vision.',
    countermeasures: [
      {
        step: 1,
        title: 'Apply Chibis Lower Body Negative Pressure (LBNP)',
        desc: 'Perform 45-minute LBNP session at -25 mmHg to draw ~1.2L fluid volume caudally to lower extremities.'
      },
      {
        step: 2,
        title: '30° Head-Up Sleeping Posture',
        desc: 'Reconfigure sleeping bag tether to 30-degree incline using elastic harness to reduce nocturnal venous pooling.'
      },
      {
        step: 3,
        title: 'Self-Administered Amsler Grid & Visual Acuity Test',
        desc: 'Run the integrated digital Snellen chart self-exam to log retinal distortion before next EVA.'
      }
    ]
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular & Hemodynamics',
    shortName: 'Cardiovascular',
    region: 'chest',
    status: 'nominal',
    triageLevel: 'GREEN',
    hazard: 'Gravity Fields & Confinement',
    hrpCode: 'HRP-RISK-CARDIO-02',
    primaryMetric: 'Resting Heart Rate & HRV',
    primaryValue: '72 bpm / 48 ms RMSSD',
    normalRange: '60 - 80 bpm / >40 ms',
    summary: 'Cardiac remodeling occurs as the heart does not work against gravity. Left ventricular mass can decrease by 8-10% without intense daily aerobic counter-loading.',
    indicators: [
      { name: 'Resting Heart Rate', value: '72', normal: '60 - 80', status: 'nominal', unit: 'bpm' },
      { name: 'Blood Pressure', value: '118/76', normal: '110-120 / 70-80', status: 'nominal', unit: 'mmHg' },
      { name: 'Heart Rate Variability (RMSSD)', value: '48.2', normal: '40 - 65', status: 'nominal', unit: 'ms' },
      { name: 'Cardiac Output', value: '5.2', normal: '4.8 - 6.5', status: 'nominal', unit: 'L/min' },
      { name: 'Orthostatic Index', value: 'Low Risk', normal: 'Low Risk', status: 'nominal', unit: 'tier' }
    ],
    explanation: 'Plasma volume contracts by 15-20% within the first 48 hours of microgravity. Daily aerobic high-intensity interval training (T2 Treadmill or Cycle Ergometer) is essential to preserve stroke volume.',
    countermeasures: [
      {
        step: 1,
        title: 'Complete Daily T2 Ergometer Protocol',
        desc: 'Execute 30 minutes of 85% VO2 max interval cycling with heart rate telemetry broadcast.'
      },
      {
        step: 2,
        title: 'Fluid & Electrolyte Maintenance',
        desc: 'Consume 750ml electrolyte solution (0.9% NaCl equivalent) before scheduled vigorous physical duty.'
      }
    ]
  },
  {
    id: 'musculoskeletal',
    name: 'Musculoskeletal & Bone Density',
    shortName: 'Bone & Muscle',
    region: 'legs',
    status: 'warning',
    triageLevel: 'AMBER',
    hazard: 'Gravity Fields (Absence of Mechanical Loading)',
    hrpCode: 'HRP-RISK-OSTEOP-03',
    primaryMetric: 'BMD Loss Rate (Femoral Neck)',
    primaryValue: '-1.1% / 30 Days',
    normalRange: '< -0.5% / 30 Days',
    summary: 'Unloaded cancellous bone exhibits osteoclastic resorption exceeding osteoblastic synthesis. High risk of hypercalciuria and nephrolithiasis (kidney stones).',
    indicators: [
      { name: 'Bone Mineral Density (Spine)', value: '-0.9%', normal: '< -0.5%', status: 'warning', unit: 'loss/mo' },
      { name: 'Calcitriol (Active Vit D)', value: '38.4', normal: '30 - 60', status: 'nominal', unit: 'pg/mL' },
      { name: 'Urinary Free Calcium', value: '310 (Elevated)', normal: '100 - 250', status: 'warning', unit: 'mg/24h' },
      { name: 'Soleus Muscle Cross-Section', value: '-4.2%', normal: '< -2.0%', status: 'warning', unit: 'volume' }
    ],
    explanation: 'Without mechanical axial impact, bones shed calcium into the bloodstream. Astronauts must generate high mechanical ground reaction forces using the ARED (Advanced Resistive Exercise Device).',
    countermeasures: [
      {
        step: 1,
        title: 'ARED Heavy Axial Loading Session',
        desc: 'Execute 4 sets of 10 repetitions deadlifts and squats at 180 kg equivalent load on the pneumatic piston system.'
      },
      {
        step: 2,
        title: 'Hydration Surge for Renal Protection',
        desc: 'Increase daily water intake to 2.8L to prevent renal precipitation of calcium oxalate crystals.'
      },
      {
        step: 3,
        title: 'Bisphosphonate / Vitamin K2 Intake',
        desc: 'Check medication dispenser for weekly oral alendronate anti-resorption prophylaxis.'
      }
    ]
  },
  {
    id: 'neurobehavioral',
    name: 'Neurobehavioral & Circadian Rhythms',
    shortName: 'Cognition & Sleep',
    region: 'brain',
    status: 'nominal',
    triageLevel: 'GREEN',
    hazard: 'Isolation, Confinement & Hostile Environment',
    hrpCode: 'HRP-RISK-BEHAV-04',
    primaryMetric: 'Psychomotor Vigilance Task (PVT)',
    primaryValue: '218 ms (0 Lapses)',
    normalRange: '< 240 ms / < 2 lapses',
    summary: 'Confinement in deep space habitats triggers circadian desynchrony, sleep debt, and cognitive micro-lapses that can compromise mission-critical maneuvers.',
    indicators: [
      { name: 'Sleep Efficiency', value: '86%', normal: '> 80%', status: 'nominal', unit: 'pct' },
      { name: 'Total Sleep Duration', value: '7.2 hrs', normal: '7.0 - 8.5 hrs', status: 'nominal', unit: 'hrs' },
      { name: 'PVT Reaction Speed', value: '218 ms', normal: '180 - 250 ms', status: 'nominal', unit: 'ms' },
      { name: 'Cognitive Workload Index', value: 'Moderate (42/100)', normal: '< 65/100', status: 'nominal', unit: 'score' },
      { name: 'Crew Cohesion Matrix', value: 'Optimal (9.1/10)', normal: '> 7.5', status: 'nominal', unit: 'score' }
    ],
    explanation: 'Orbital velocity causes 16 sunrises every 24 hours in LEO, while deep space transit lacks natural solar zeitgebers. Solid-state dynamic LED lighting is tuned to entrain melatonin production.',
    countermeasures: [
      {
        step: 1,
        title: 'Maintain 460nm Blue-Enriched Lighting',
        desc: 'Keep habitat lighting in daytime mode (6500K with 460nm blue peak) for 6 more hours to suppress melatonin.'
      },
      {
        step: 2,
        title: 'Daily PVT 3-Minute Cognitive Calibration',
        desc: 'Perform the daily vigilance clicker test to confirm alert status prior to robotic arm operation.'
      }
    ]
  },
  {
    id: 'radiation_immune',
    name: 'Space Radiation & Immune Response',
    shortName: 'Radiation & Immunity',
    region: 'immune',
    status: 'nominal',
    triageLevel: 'GREEN',
    hazard: 'Space Radiation (GCR & Solar Particles)',
    hrpCode: 'HRP-RISK-RAD-05',
    primaryMetric: 'Cumulative Dose Equivalent',
    primaryValue: '128.4 mSv',
    normalRange: '< 600 mSv (Career Limit)',
    summary: 'Galactic Cosmic Rays (high-Z and energy ions) penetrate spacecraft hulls, causing double-strand DNA breaks and immune cell dysregulation.',
    indicators: [
      { name: 'Current Ambient Dose Rate', value: '1.42 mSv/day', normal: '< 2.0 mSv/day', status: 'nominal', unit: 'rate' },
      { name: 'Cumulative Mission Dose', value: '128.4 mSv', normal: '< 600 mSv', status: 'nominal', unit: 'mSv' },
      { name: 'Solar Proton Event (SPE) Monitor', value: 'QUIET (Flux < 10 pfu)', normal: 'QUIET', status: 'nominal', unit: 'status' },
      { name: 'Lymphocyte CD4/CD8 Ratio', value: '1.8', normal: '1.5 - 2.5', status: 'nominal', unit: 'ratio' },
      { name: 'Latent EBV Shedding', value: 'Negative', normal: 'Negative', status: 'nominal', unit: 'test' }
    ],
    explanation: 'Beyond Earth\'s magnetosphere, astronauts receive 20 to 50 times the terrestrial background radiation. Autonomous biodosimetry tracks DNA repair fidelity and alerts crew to seek water-shielded storm shelters during solar flares.',
    countermeasures: [
      {
        step: 1,
        title: 'Inspect Personal Dosimeter Telemetry',
        desc: 'Sync active silicon pixel dosimeter (CPDS) with bio-monitor cradle for hourly ionization logging.'
      },
      {
        step: 2,
        title: 'Solar Particle Storm Protocol Ready',
        desc: 'In case of SPE alarm (>100 MeV protons), enter the central water-wall shielded crew storm shelter within 15 minutes.'
      }
    ]
  },
  {
    id: 'metabolic_respiratory',
    name: 'Metabolic & Cabin Environment',
    shortName: 'Metabolic & CO2',
    region: 'lungs',
    status: 'nominal',
    triageLevel: 'GREEN',
    hazard: 'Hostile Closed Environments (Life Support)',
    hrpCode: 'HRP-RISK-ENV-06',
    primaryMetric: 'Ambient Cabin pCO2',
    primaryValue: '2.8 mmHg',
    normalRange: '< 3.0 mmHg (NASA Std)',
    summary: 'In microgravity, air convection ceases. Exhaled CO2 pockets can form around astronaut heads if ventilation fans fail, triggering hypercapnia, headaches, and lethargy.',
    indicators: [
      { name: 'Blood Oxygen (SpO2)', value: '98.5%', normal: '96 - 100%', status: 'nominal', unit: 'pct' },
      { name: 'Cabin Partial Pressure CO2', value: '2.8 mmHg', normal: '< 3.0 mmHg', status: 'nominal', unit: 'mmHg' },
      { name: 'Core Body Temp (Circadian Peak)', value: '37.4 °C', normal: '36.8 - 37.6 °C', status: 'nominal', unit: 'temp' },
      { name: 'Capillary Blood Glucose', value: '92 mg/dL', normal: '70 - 110 mg/dL', status: 'nominal', unit: 'mg/dL' },
      { name: 'Hydration Bio-Impedance', value: 'Optimal (61%)', normal: '55 - 65%', status: 'nominal', unit: 'pct' }
    ],
    explanation: 'NASA spaceflight data shows astronauts develop mild chronic "space fever" (0.8°C core body temperature rise) due to impaired evaporative heat dissipation. Cabin CO2 scrubbers must maintain pCO2 under strict thresholds.',
    countermeasures: [
      {
        step: 1,
        title: 'Verify Cabin Air Scrubber Flow',
        desc: 'Confirm Amine-bed regenerative CO2 scrubber flow rate is nominal at 45 CFM.'
      },
      {
        step: 2,
        title: 'Maintain Active Air Circulator Fan',
        desc: 'Ensure personal sleep cubicle ventilation nozzle is aligned to avoid localized carbon dioxide pocket formation.'
      }
    ]
  }
];

export const VITAL_SIGNS_STREAM = [
  { time: '00:00', hr: 68, bpSys: 116, bpDia: 74, spo2: 99, temp: 37.1, pvt: 210 },
  { time: '04:00', hr: 64, bpSys: 112, bpDia: 70, spo2: 98, temp: 36.8, pvt: 225 },
  { time: '08:00', hr: 75, bpSys: 120, bpDia: 78, spo2: 99, temp: 37.3, pvt: 205 },
  { time: '12:00', hr: 82, bpSys: 122, bpDia: 80, spo2: 98, temp: 37.5, pvt: 215 },
  { time: '16:00', hr: 78, bpSys: 119, bpDia: 76, spo2: 99, temp: 37.4, pvt: 220 },
  { time: '20:00', hr: 71, bpSys: 117, bpDia: 75, spo2: 98, temp: 37.2, pvt: 232 },
];

export const BMD_DEGRADATION_DATA = [
  { month: 'Month 0', withARED: 100, withoutARED: 100, earthBaseline: 100 },
  { month: 'Month 1', withARED: 99.4, withoutARED: 98.5, earthBaseline: 100 },
  { month: 'Month 2', withARED: 98.9, withoutARED: 97.0, earthBaseline: 100 },
  { month: 'Month 3', withARED: 98.5, withoutARED: 95.5, earthBaseline: 100 },
  { month: 'Month 4', withARED: 98.1, withoutARED: 94.0, earthBaseline: 100 },
  { month: 'Month 5', withARED: 97.8, withoutARED: 92.5, earthBaseline: 100 },
  { month: 'Month 6', withARED: 97.5, withoutARED: 91.0, earthBaseline: 100 },
];

export const RADIATION_ACCUMULATION_DATA = [
  { day: 0, cumulativeDose: 0, safeThreshold: 600 },
  { day: 30, cumulativeDose: 42, safeThreshold: 600 },
  { day: 60, cumulativeDose: 85, safeThreshold: 600 },
  { day: 90, cumulativeDose: 128, safeThreshold: 600 },
  { day: 120, cumulativeDose: 172, safeThreshold: 600 },
  { day: 150, cumulativeDose: 215, safeThreshold: 600 },
  { day: 180, cumulativeDose: 258, safeThreshold: 600 },
];

export const DAILY_ROUTINE_HABITS = [
  { id: 'h1', title: 'ARED High-Resistance Strength Training', target: '45 mins (Squats/Deadlifts)', points: 50, completed: true, category: 'Musculoskeletal' },
  { id: 'h2', title: 'T2 Ergometer Aerobic Conditioning', target: '30 mins (HIIT 85% VO2)', points: 40, completed: true, category: 'Cardiovascular' },
  { id: 'h3', title: 'Electrolyte & Water Rehydration Check', target: '2.5 Liters Ingested', points: 25, completed: true, category: 'Renal' },
  { id: 'h4', title: 'SANS Digital Visual Acuity Exam', target: 'Log Snellen & Amsler Grid', points: 30, completed: false, category: 'Neuro-Ocular' },
  { id: 'h5', title: 'Chibis LBNP Suit Decompression Session', target: '45 mins @ -25 mmHg', points: 45, completed: false, category: 'Fluid Shifts' },
  { id: 'h6', title: 'Psychomotor Vigilance (PVT) Test', target: '3-Minute Reaction Test', points: 20, completed: true, category: 'Cognition' },
  { id: 'h7', title: '460nm Blue Circadian Light Exposure', target: 'Morning Entrainment 60 min', points: 20, completed: true, category: 'Circadian' },
];

