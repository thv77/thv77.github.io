import pptxgen from 'pptxgenjs';

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// Colors
const BG_DARK = '05070F';
const CARD_BG = '0F172A';
const CYAN = '00E5FF';
const BLUE_LIGHT = '38BDF8';
const GOLD = 'F59E0B';
const RED = 'EF4444';
const WHITE = 'F8FAFC';
const GRAY = '94A3B8';
const MUTED = '64748B';

// Helper: Add consistent footer with repo link
function addFooter(slide, currentSlide) {
  slide.addShape(pres.ShapeType.line, {
    x: 0.8, y: 7.0, w: 11.73, h: 0,
    line: { color: '1E293B', width: 1 }
  });
  slide.addText('NASA SPACE APPS CHALLENGE 2026 • PROJECT MARK XI', {
    x: 0.8, y: 7.05, w: 5.5, h: 0.35,
    fontFace: 'Arial', fontSize: 10, color: MUTED
  });
  slide.addText('SOURCE CODE: https://github.com/thv77/PROJECT-XI', {
    x: 6.3, y: 7.05, w: 5.5, h: 0.35,
    fontFace: 'Courier New', fontSize: 10, color: CYAN, align: 'right'
  });
  slide.addText(`SLIDE 0${currentSlide} / 07`, {
    x: 11.8, y: 0.4, w: 1.2, h: 0.3,
    fontFace: 'Courier New', fontSize: 10, color: GRAY, align: 'right'
  });
}

// ----------------------------------------------------
// SLIDE 1: TITLE SLIDE
// ----------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG_DARK };

  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 0.6, w: 5.5, h: 0.38,
    fill: { color: '0E3A5A' }, line: { color: CYAN, width: 1 }, rectRadius: 0.1
  });
  slide.addText('NASA SPACE APPS CHALLENGE 2026 • GLOBAL SUBMISSION', {
    x: 0.8, y: 0.6, w: 5.5, h: 0.38,
    fontFace: 'Arial', fontSize: 10, color: CYAN, bold: true, align: 'center'
  });

  slide.addText('PROJECT MARK XI', {
    x: 0.8, y: 1.5, w: 11.73, h: 1.2,
    fontFace: 'Arial Black', fontSize: 44, color: WHITE, bold: true
  });

  slide.addText('Autonomous Astronaut Health Monitoring & Clinical Decision Support System (CDSS)', {
    x: 0.8, y: 2.7, w: 11.0, h: 0.6,
    fontFace: 'Arial', fontSize: 20, color: BLUE_LIGHT
  });

  slide.addText(
    'A mission-grade, 100% offline edge platform empowering deep space crews to detect early physiological degradation, conduct guided self-examinations, and deploy autonomous countermeasures during Earth communication blackouts.',
    {
      x: 0.8, y: 3.4, w: 10.5, h: 0.9,
      fontFace: 'Arial', fontSize: 13, color: GRAY, lineSpacing: 18
    }
  );

  // Cards
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 4.6, w: 3.6, h: 1.3,
    fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1
  });
  slide.addText('CHALLENGE TRACK', { x: 1.0, y: 4.75, w: 3.2, h: 0.25, fontFace: 'Arial', fontSize: 9, color: MUTED, bold: true });
  slide.addText('Create Health Monitoring Software for Astronauts', { x: 1.0, y: 5.05, w: 3.2, h: 0.65, fontFace: 'Arial', fontSize: 12, color: WHITE, bold: true });

  slide.addShape(pres.ShapeType.roundRect, {
    x: 4.8, y: 4.6, w: 3.6, h: 1.3,
    fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1
  });
  slide.addText('STANDARDS COMPLIANCE', { x: 5.0, y: 4.75, w: 3.2, h: 0.25, fontFace: 'Arial', fontSize: 9, color: MUTED, bold: true });
  slide.addText('NASA-STD-3001 • NASA HRP Guidelines • Flight Rule B13-102', { x: 5.0, y: 5.05, w: 3.2, h: 0.65, fontFace: 'Arial', fontSize: 11, color: CYAN, bold: true });

  slide.addShape(pres.ShapeType.roundRect, {
    x: 8.8, y: 4.6, w: 3.7, h: 1.3,
    fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1
  });
  slide.addText('TARGET MISSIONS', { x: 9.0, y: 4.75, w: 3.3, h: 0.25, fontFace: 'Arial', fontSize: 9, color: MUTED, bold: true });
  slide.addText('Artemis Lunar Basecamp • Deep Space Gateway • Crewed Mars Transit', { x: 9.0, y: 5.05, w: 3.3, h: 0.65, fontFace: 'Arial', fontSize: 11, color: GOLD, bold: true });

  addFooter(slide, 1);
}

// ----------------------------------------------------
// SLIDE 2: THE DEEP SPACE CHALLENGE
// ----------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText('THE MISSION CHALLENGE', { x: 0.8, y: 0.5, w: 5.0, h: 0.3, fontFace: 'Arial', fontSize: 11, color: RED, bold: true });
  slide.addText('When Earth is 14–22 Minutes Away, Autonomy is Survival', { x: 0.8, y: 0.85, w: 11.5, h: 0.7, fontFace: 'Arial Black', fontSize: 24, color: WHITE });
  slide.addText('During Mars transit and lunar exploration, real-time consultation with Johnson Space Center Ground Flight Surgeons is physically impossible.', { x: 0.8, y: 1.55, w: 11.5, h: 0.4, fontFace: 'Arial', fontSize: 13, color: GRAY });

  // 3 Threat Columns
  const threats = [
    { num: '22 min', title: 'Deep Space Signal Latency', desc: 'Up to 44 minutes round-trip delay. In acute hypoxia, arrhythmia, or arterial trauma, Earth recommendations arrive far too late.', color: RED },
    { num: '5 Hazards', title: 'NASA R.I.D.G.E. Framework', desc: 'Space Radiation (GCR/SPE), Isolation/Confinement, Distance from Earth, Gravity field transitions, and Hostile Closed Environments.', color: GOLD },
    { num: 'Zero MD', title: 'Non-Physician Crew Reliance', desc: 'Astronauts must independently execute eye exams, ultrasound scans, CPR resuscitation, and pharmaceutical dosage adjustment.', color: CYAN }
  ];

  threats.forEach((t, i) => {
    const xPos = 0.8 + i * 4.0;
    slide.addShape(pres.ShapeType.roundRect, {
      x: xPos, y: 2.2, w: 3.7, h: 3.2,
      fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1
    });
    slide.addText(t.num, { x: xPos + 0.3, y: 2.4, w: 3.1, h: 0.6, fontFace: 'Arial Black', fontSize: 28, color: t.color, bold: true });
    slide.addText(t.title, { x: xPos + 0.3, y: 3.1, w: 3.1, h: 0.5, fontFace: 'Arial', fontSize: 14, color: WHITE, bold: true });
    slide.addText(t.desc, { x: xPos + 0.3, y: 3.7, w: 3.1, h: 1.4, fontFace: 'Arial', fontSize: 11, color: GRAY, lineSpacing: 17 });
  });

  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 5.7, w: 11.7, h: 0.9,
    fill: { color: '0A192F' }, line: { color: CYAN, width: 1 }, rectRadius: 0.1
  });
  slide.addText('THE MARK XI SOLUTION: A 100% offline edge-native cockpit that synthesizes multi-system biometrics, predicts acute degradation, and guides crew through life-saving interventions in real time.', {
    x: 1.1, y: 5.85, w: 11.1, h: 0.6,
    fontFace: 'Arial', fontSize: 12, color: WHITE, bold: true
  });

  addFooter(slide, 2);
}

// ----------------------------------------------------
// SLIDE 3: SYSTEM ARCHITECTURE & 3D BIO-AVATAR
// ----------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText('EDGE-NATIVE ARCHITECTURE', { x: 0.8, y: 0.5, w: 5.0, h: 0.3, fontFace: 'Arial', fontSize: 11, color: CYAN, bold: true });
  slide.addText('100% Client-Side Architecture & Interactive 3D Bio-Avatar', { x: 0.8, y: 0.85, w: 11.5, h: 0.7, fontFace: 'Arial Black', fontSize: 24, color: WHITE });
  slide.addText('Zero cloud round-trips. Engineered to operate flawlessly in deep-space communication blackouts.', { x: 0.8, y: 1.55, w: 11.5, h: 0.4, fontFace: 'Arial', fontSize: 13, color: GRAY });

  // Left: 3D Twin
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 2.2, w: 5.7, h: 3.5,
    fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1
  });
  slide.addText('🩻 3D Digital Twin Bio-Avatar (Three.js)', { x: 1.1, y: 2.4, w: 5.1, h: 0.4, fontFace: 'Arial', fontSize: 16, color: CYAN, bold: true });
  slide.addText([
    { text: '• Anatomical Layer Toggles: ', options: { bold: true, color: WHITE } },
    { text: 'Filter between Neuro-Ocular (SANS), Cardiovascular & Fluids, and Musculoskeletal bone density.\n', options: { color: GRAY } },
    { text: '• Optical Laser Scanline: ', options: { bold: true, color: WHITE } },
    { text: 'Continuous animated HUD scanline visualizes biometric telemetry sweeps across 6 physiological systems.\n', options: { color: GRAY } },
    { text: '• Dynamic Anomaly Glow: ', options: { bold: true, color: WHITE } },
    { text: 'Organs dynamically illuminate with warning glows when simulated physiological anomalies occur.', options: { color: GRAY } }
  ], { x: 1.1, y: 2.9, w: 5.1, h: 2.5, fontFace: 'Arial', fontSize: 11, lineSpacing: 18 });

  // Right: Sensor Mesh
  slide.addShape(pres.ShapeType.roundRect, {
    x: 6.8, y: 2.2, w: 5.7, h: 3.5,
    fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1
  });
  slide.addText('⚡ Deep-Space Sensor Mesh & Telemetry', { x: 7.1, y: 2.4, w: 5.1, h: 0.4, fontFace: 'Arial', fontSize: 16, color: BLUE_LIGHT, bold: true });
  slide.addText([
    { text: '• 0.00 ms External Latency: ', options: { bold: true, color: WHITE } },
    { text: 'Vite 6 + React 18 PWA client-side engine runs completely offline inside habitat workstations.\n', options: { color: GRAY } },
    { text: '• Hardware-Accelerated Canvas: ', options: { bold: true, color: WHITE } },
    { text: '60 FPS real-time ECG cardiac trace and facial landmark tracking.\n', options: { color: GRAY } },
    { text: '• Multi-Gravity Dynamic Recalibration: ', options: { bold: true, color: WHITE } },
    { text: 'Auto-adjusts baseline vitals for Transit (0g), Lunar surface (1/6g), and Mars surface (3/8g).\n', options: { color: GRAY } },
    { text: '• Squad Health Radar: ', options: { bold: true, color: WHITE } },
    { text: 'Simultaneous comparative telemetry for Commander, Pilot, and Medical Officer.', options: { color: GRAY } }
  ], { x: 7.1, y: 2.9, w: 5.1, h: 2.5, fontFace: 'Arial', fontSize: 11, lineSpacing: 18 });

  // Bottom Stats
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 5.9, w: 11.7, h: 0.8,
    fill: { color: '0A192F' }, line: { color: '1E293B', width: 1 }, rectRadius: 0.1
  });
  slide.addText('6 Physiological Systems Monitored  •  13 Integrated Clinical Modules  •  100% Offline Edge Autonomy', {
    x: 0.8, y: 6.15, w: 11.7, h: 0.4,
    fontFace: 'Courier New', fontSize: 12, color: CYAN, bold: true, align: 'center'
  });

  addFooter(slide, 3);
}

// ----------------------------------------------------
// SLIDE 4: TOUCHLESS DIAGNOSTICS & GUIDED SELF-EXAMS
// ----------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText('DIAGNOSTIC CAPABILITIES', { x: 0.8, y: 0.5, w: 5.0, h: 0.3, fontFace: 'Arial', fontSize: 11, color: CYAN, bold: true });
  slide.addText('Touchless Optical Biometrics & Autonomous Self-Exams', { x: 0.8, y: 0.85, w: 11.5, h: 0.7, fontFace: 'Arial Black', fontSize: 24, color: WHITE });
  slide.addText('Eliminates wearable sensor mass while catching early microgravity-induced physiological degradation.', { x: 0.8, y: 1.55, w: 11.5, h: 0.4, fontFace: 'Arial', fontSize: 13, color: GRAY });

  // Feature 1: rPPG
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 2.2, w: 5.7, h: 3.3,
    fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1
  });
  slide.addText('📷 Webcam rPPG & PERCLOS Monitor', { x: 1.1, y: 2.4, w: 5.1, h: 0.4, fontFace: 'Arial', fontSize: 16, color: CYAN, bold: true });
  slide.addText([
    { text: '• Remote Photoplethysmography (rPPG): ', options: { bold: true, color: WHITE } },
    { text: 'Analyzes subtle color/absorption shifts in forehead capillary skin to extract touchless heart rate.\n\n', options: { color: GRAY } },
    { text: '• PERCLOS Drowsiness Monitoring: ', options: { bold: true, color: WHITE } },
    { text: 'Tracks eyelid closure duration and blink frequency to detect microsleep and operational fatigue before EVAs.\n\n', options: { color: GRAY } },
    { text: '• Mass & Wire Reduction: ', options: { bold: true, color: WHITE } },
    { text: 'Astronauts can be screened while seated at any workstation without applying ECG leads.', options: { color: GRAY } }
  ], { x: 1.1, y: 2.9, w: 5.1, h: 2.4, fontFace: 'Arial', fontSize: 11, lineSpacing: 17 });

  // Feature 2: SANS & Cognitive
  slide.addShape(pres.ShapeType.roundRect, {
    x: 6.8, y: 2.2, w: 5.7, h: 3.3,
    fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1
  });
  slide.addText('👁️ SANS Suite & Cognitive Testing', { x: 7.1, y: 2.4, w: 5.1, h: 0.4, fontFace: 'Arial', fontSize: 16, color: GOLD, bold: true });
  slide.addText([
    { text: '• Digital Snellen & Amsler Grid: ', options: { bold: true, color: WHITE } },
    { text: 'Self-administered visual acuity and distortion matrix to detect optic disc edema and choroidal folds.\n\n', options: { color: GRAY } },
    { text: '• Guided Eyelid Tele-Ultrasound: ', options: { bold: true, color: WHITE } },
    { text: 'Guides probe placement to measure Optic Nerve Sheath Diameter (ONSD >5.8mm = acute ICP warning).\n\n', options: { color: GRAY } },
    { text: '• 3-Minute NASA PVT Task: ', options: { bold: true, color: WHITE } },
    { text: 'Psychomotor Vigilance Task measuring millisecond reaction times to verify flight readiness.', options: { color: GRAY } }
  ], { x: 7.1, y: 2.9, w: 5.1, h: 2.4, fontFace: 'Arial', fontSize: 11, lineSpacing: 17 });

  // Bottom Box
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 5.7, w: 11.7, h: 0.9,
    fill: { color: '0E3A2F' }, line: { color: '10B981', width: 1 }, rectRadius: 0.1
  });
  slide.addText('🔬 ASTRO-LAB™ Microfluidics Integration: Simulates microgravity acoustic separation and dry-reagent test cartridges (Metabolic, Bone Demineralization, Biodosimetry, Salivary Stress Swabs).', {
    x: 1.1, y: 5.85, w: 11.1, h: 0.6,
    fontFace: 'Arial', fontSize: 11, color: WHITE, bold: true
  });

  addFooter(slide, 4);
}

// ----------------------------------------------------
// SLIDE 5: DUAL AUTONOMOUS AI COPILOTS
// ----------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText('VOICE & CLINICAL AI', { x: 0.8, y: 0.5, w: 5.0, h: 0.3, fontFace: 'Arial', fontSize: 11, color: CYAN, bold: true });
  slide.addText('Dual Autonomous AI Copilots: J.A.R.V.I.S. & S.T.E.A.L.T.H.', { x: 0.8, y: 0.85, w: 11.5, h: 0.7, fontFace: 'Arial Black', fontSize: 24, color: WHITE });
  slide.addText('Hands-free speech interaction designed specifically for astronauts wearing pressurized suits and bulky gloves.', { x: 0.8, y: 1.55, w: 11.5, h: 0.4, fontFace: 'Arial', fontSize: 13, color: GRAY });

  // J.A.R.V.I.S.
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 2.2, w: 5.7, h: 3.5,
    fill: { color: CARD_BG }, line: { color: CYAN, width: 1 }, rectRadius: 0.1
  });
  slide.addText('🤖 J.A.R.V.I.S. – Space Surgeon AI', { x: 1.1, y: 2.4, w: 5.1, h: 0.4, fontFace: 'Arial', fontSize: 16, color: CYAN, bold: true });
  slide.addText('Joint Autonomous Response & Vitals Intelligence Surgeon', { x: 1.1, y: 2.8, w: 5.1, h: 0.3, fontFace: 'Courier New', fontSize: 9, color: GRAY });
  slide.addText([
    { text: '• Differential Diagnostic Engine: ', options: { bold: true, color: WHITE } },
    { text: 'Matches astronaut symptoms against NASA HRP clinical database and outputs condition confidence percentages.\n\n', options: { color: GRAY } },
    { text: '• Audio Clinical Readback: ', options: { bold: true, color: WHITE } },
    { text: 'Speaks aloud diagnoses and step-by-step countermeasure protocols via Web Speech Synthesis.\n\n', options: { color: GRAY } },
    { text: '• Countermeasure Prescriptions: ', options: { bold: true, color: WHITE } },
    { text: 'Prescribes Chibis LBNP suit parameters, ARED loading, and acute hypercapnia ventilation steps.', options: { color: GRAY } }
  ], { x: 1.1, y: 3.2, w: 5.1, h: 2.3, fontFace: 'Arial', fontSize: 11, lineSpacing: 17 });

  // S.T.E.A.L.T.H.
  slide.addShape(pres.ShapeType.roundRect, {
    x: 6.8, y: 2.2, w: 5.7, h: 3.5,
    fill: { color: CARD_BG }, line: { color: BLUE_LIGHT, width: 1 }, rectRadius: 0.1
  });
  slide.addText('🗣️ S.T.E.A.L.T.H. – Hands-Free Hab Operator', { x: 7.1, y: 2.4, w: 5.1, h: 0.4, fontFace: 'Arial', fontSize: 16, color: BLUE_LIGHT, bold: true });
  slide.addText('Spacecraft Telemetry, Examination & Audio Link Tracking HUD', { x: 7.1, y: 2.8, w: 5.1, h: 0.3, fontFace: 'Courier New', fontSize: 9, color: GRAY });
  slide.addText([
    { text: '• Hands-Free Module Operation: ', options: { bold: true, color: WHITE } },
    { text: 'Astronauts speak commands like "Go to Mission Ops", "Inspect 3D Twin", or "Open Pharmacy".\n\n', options: { color: GRAY } },
    { text: '• Spoken Biometric Queries: ', options: { bold: true, color: WHITE } },
    { text: 'Responds with immediate status: "Commander Connor: Heart rate 64, BP 118/76, readiness 94%."\n\n', options: { color: GRAY } },
    { text: '• Voice Waveform HUD: ', options: { bold: true, color: WHITE } },
    { text: 'Visual audio equalizer indicates listening and speaking states directly on the flight deck.', options: { color: GRAY } }
  ], { x: 7.1, y: 3.2, w: 5.1, h: 2.3, fontFace: 'Arial', fontSize: 11, lineSpacing: 17 });

  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 5.9, w: 11.7, h: 0.8,
    fill: { color: '0A192F' }, line: { color: '1E293B', width: 1 }, rectRadius: 0.1
  });
  slide.addText('100% Client-Side Web Speech API: Functions seamlessly with zero external API calls or internet connection.', {
    x: 0.8, y: 6.15, w: 11.7, h: 0.4,
    fontFace: 'Arial', fontSize: 11, color: WHITE, bold: true, align: 'center'
  });

  addFooter(slide, 5);
}

// ----------------------------------------------------
// SLIDE 6: CODE RED RESUSCITATION & SPACE PHARMACY
// ----------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText('CRITICAL PROTOCOLS', { x: 0.8, y: 0.5, w: 5.0, h: 0.3, fontFace: 'Arial', fontSize: 11, color: RED, bold: true });
  slide.addText('CODE RED Resuscitation & Space Pharmacy Radiolysis', { x: 0.8, y: 0.85, w: 11.5, h: 0.7, fontFace: 'Arial Black', fontSize: 24, color: WHITE });
  slide.addText('Engineered to handle life-threatening trauma and deep-space medication degradation.', { x: 0.8, y: 1.55, w: 11.5, h: 0.4, fontFace: 'Arial', fontSize: 13, color: GRAY });

  // CPR Metronome
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 2.2, w: 5.7, h: 3.3,
    fill: { color: CARD_BG }, line: { color: RED, width: 1 }, rectRadius: 0.1
  });
  slide.addText('🚨 Zero-G CPR Metronome (Flight Rule B13-102)', { x: 1.1, y: 2.4, w: 5.1, h: 0.4, fontFace: 'Arial', fontSize: 16, color: RED, bold: true });
  slide.addText([
    { text: '• 110-BPM Audio/Visual Metronome: ', options: { bold: true, color: WHITE } },
    { text: 'Audible rhythmic clicker and flashing guide (PUSH 5cm - RELEASE) for microgravity chest compressions.\n\n', options: { color: GRAY } },
    { text: '• CMRS Guidance: ', options: { bold: true, color: WHITE } },
    { text: 'Calibrated to the NASA Crew Medical Restraint System to counter zero-G reactive push-off forces.\n\n', options: { color: GRAY } },
    { text: '• High-Stakes Triage Drills: ', options: { bold: true, color: WHITE } },
    { text: 'Step-by-step algorithms for VFib arrest, cabin decompression, toxic ammonia leaks, and solar flares.', options: { color: GRAY } }
  ], { x: 1.1, y: 2.9, w: 5.1, h: 2.4, fontFace: 'Arial', fontSize: 11, lineSpacing: 17 });

  // Pharmacy Radiolysis
  slide.addShape(pres.ShapeType.roundRect, {
    x: 6.8, y: 2.2, w: 5.7, h: 3.3,
    fill: { color: CARD_BG }, line: { color: GOLD, width: 1 }, rectRadius: 0.1
  });
  slide.addText('💊 Space Pharmacy & Radiolysis Engine', { x: 7.1, y: 2.4, w: 5.1, h: 0.4, fontFace: 'Arial', fontSize: 16, color: GOLD, bold: true });
  slide.addText([
    { text: '• Cosmic Ray Radiolysis Tracking: ', options: { bold: true, color: WHITE } },
    { text: 'Calculates active pharmaceutical ingredient (API) degradation caused by cumulative radiation.\n\n', options: { color: GRAY } },
    { text: '• Dynamic Dose Compensation: ', options: { bold: true, color: WHITE } },
    { text: 'Recalculates clinical dosage offsets (+15% Amoxicillin, +20% Zolpidem) to maintain therapeutic efficacy.\n\n', options: { color: GRAY } },
    { text: '• On-Demand 3D Synthesis: ', options: { bold: true, color: WHITE } },
    { text: 'Simulates molecular 3D printing of replacement medications when formulary stock expires.', options: { color: GRAY } }
  ], { x: 7.1, y: 2.9, w: 5.1, h: 2.4, fontFace: 'Arial', fontSize: 11, lineSpacing: 17 });

  // Bottom Box
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 5.7, w: 11.7, h: 0.9,
    fill: { color: '0A192F' }, line: { color: CYAN, width: 1 }, rectRadius: 0.1
  });
  slide.addText('📄 NASA Form 1047-B Medical Dossier & PRACA Anomaly Dispatch: One-click export of clinical flight certifications and Form 1048-A problem reports for Deep Space Network (DSN) transmission.', {
    x: 1.1, y: 5.85, w: 11.1, h: 0.6,
    fontFace: 'Arial', fontSize: 11, color: WHITE, bold: true
  });

  addFooter(slide, 6);
}

// ----------------------------------------------------
// SLIDE 7: MISSION HORIZONS & SOURCE CODE
// ----------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: BG_DARK };

  slide.addText('IMPACT & HORIZONS', { x: 0.8, y: 0.5, w: 5.0, h: 0.3, fontFace: 'Arial', fontSize: 11, color: CYAN, bold: true });
  slide.addText('Empowering Humanity’s Next Giant Leap to Deep Space', { x: 0.8, y: 0.85, w: 11.5, h: 0.7, fontFace: 'Arial Black', fontSize: 24, color: WHITE });
  slide.addText('From the Moon and Mars to the Most Extreme Remote Environments on Earth.', { x: 0.8, y: 1.55, w: 11.5, h: 0.4, fontFace: 'Arial', fontSize: 13, color: GRAY });

  // 3 Horizon Cards
  const horizons = [
    { title: '🌕 Artemis Lunar Basecamp', desc: 'Enables autonomous surface EVAs, cephalad fluid shift monitoring in 1/6g partial gravity, and radiation refuge triage during solar storm events.', color: CYAN },
    { title: '🔴 Crewed Mars Transit', desc: 'Maintains astronaut physiological stability and psychological resilience across 3-year voyages with zero real-time reliance on Earth medical teams.', color: BLUE_LIGHT },
    { title: '🌍 Earth Telemedicine', desc: 'Brings touchless optical vitals and offline differential diagnosis to rural clinics, Antarctic research bases, submarines, and disaster zones.', color: '10B981' }
  ];

  horizons.forEach((h, i) => {
    const xPos = 0.8 + i * 4.0;
    slide.addShape(pres.ShapeType.roundRect, {
      x: xPos, y: 2.2, w: 3.7, h: 2.4,
      fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.1
    });
    slide.addText(h.title, { x: xPos + 0.3, y: 2.4, w: 3.1, h: 0.4, fontFace: 'Arial', fontSize: 14, color: h.color, bold: true });
    slide.addText(h.desc, { x: xPos + 0.3, y: 2.9, w: 3.1, h: 1.5, fontFace: 'Arial', fontSize: 11, color: GRAY, lineSpacing: 17 });
  });

  // Big Call to Action Card with Links
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 4.8, w: 11.7, h: 1.9,
    fill: { color: '0A192F' }, line: { color: CYAN, width: 2 }, rectRadius: 0.1
  });
  slide.addText('PROJECT MARK XI • OFFICIAL LINKS & REPOSITORY', {
    x: 1.1, y: 5.0, w: 11.1, h: 0.35,
    fontFace: 'Arial Black', fontSize: 13, color: WHITE, align: 'center'
  });

  slide.addText('💻 Source Code Repository: https://github.com/thv77/PROJECT-XI', {
    x: 1.1, y: 5.45, w: 11.1, h: 0.4,
    fontFace: 'Courier New', fontSize: 13, color: CYAN, bold: true, align: 'center'
  });

  slide.addText('🌐 Live Interactive Web App: https://thv77.github.io/PROJECT-XI/', {
    x: 1.1, y: 5.95, w: 11.1, h: 0.4,
    fontFace: 'Courier New', fontSize: 13, color: BLUE_LIGHT, bold: true, align: 'center'
  });

  addFooter(slide, 7);
}

// Write to file
const outputPath = 'c:/Users/venka/Downloads/NASA/MARK_XI_NASA_Space_Apps.pptx';
pres.writeFile({ fileName: outputPath }).then(() => {
  console.log('SUCCESS: Generated ' + outputPath);
}).catch(err => {
  console.error('ERROR: ', err);
});
