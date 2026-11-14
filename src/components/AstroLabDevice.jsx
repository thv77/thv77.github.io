import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Droplet, 
  Activity, 
  RotateCcw, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Radio, 
  Sparkles, 
  ArrowRight,
  Bluetooth,
  Layers,
  Thermometer,
  Zap,
  Package
} from 'lucide-react';

export default function AstroLabDevice({ activeCrew, onUpdateBiometrics }) {
  // Connection & Device State
  const [bleConnected, setBleConnected] = useState(true);
  const [selectedCartridge, setSelectedCartridge] = useState('metabolic');
  const [samplingState, setSamplingState] = useState('idle'); // 'idle' | 'drawing' | 'centrifuging' | 'scanning' | 'complete'
  const [progress, setProgress] = useState(0);
  const [testResult, setTestResult] = useState(null);

  // Cartridge Definitions & Consumable Inventory
  const [cartridges, setCartridges] = useState([
    {
      id: 'metabolic',
      name: 'Metabolic & Glycemic Micro-Strip',
      category: 'Blood Chemistry',
      sampleType: 'Capillary Blood (10 µL)',
      inventory: 142,
      shelfLife: 'Nominal (88%)',
      metrics: ['Blood Glucose', 'Lactate', 'Ketones', 'Hematocrit'],
      icon: 'Droplet',
      desc: 'Rapid photometric enzymatic strip evaluating carbohydrate metabolism and early spaceflight glycemic shifts.'
    },
    {
      id: 'renal_bone',
      name: 'Renal & Bone Demineralization Chip',
      category: 'Musculoskeletal & Renal',
      sampleType: 'Capillary Blood (15 µL)',
      inventory: 64,
      shelfLife: 'Optimal (94%)',
      metrics: ['Serum Free Calcium (Ca²⁺)', 'Sodium (Na⁺)', 'Potassium (K⁺)', 'Nephrolithiasis Risk'],
      icon: 'Layers',
      desc: 'Ion-selective microelectrode array tracking osteoclastic calcium dumping and acute kidney stone precipitation.'
    },
    {
      id: 'radiation_dna',
      name: 'Radiation Biodosimetry & DNA Strip',
      category: 'Space Radiation',
      sampleType: 'Whole Blood (20 µL)',
      inventory: 28,
      shelfLife: 'Moderate (76% - Cosmic Ray Shielded)',
      metrics: ['γ-H2AX DNA Double-Strand Breaks', 'Lymphocyte Viability', 'Micronucleus Index'],
      icon: 'Radio',
      desc: 'Fluorescent antibody assay measuring immediate ionizing radiation double-strand DNA cleavage.'
    },
    {
      id: 'stress_cortisol',
      name: 'Neuro-Endocrine Salivary Swab',
      category: 'Behavioral & Circadian',
      sampleType: 'Saliva Swab (50 µL)',
      inventory: 86,
      shelfLife: 'Nominal (91%)',
      metrics: ['Free Salivary Cortisol', 'Melatonin Rhythm', 'Secretory IgA (Immune)'],
      icon: 'Zap',
      desc: 'Non-invasive bioluminescent immunoassay quantifying isolation stress and circadian phase.'
    }
  ]);

  // Execute Automated Robotic Sampling Sequence
  const handleInitiateSample = () => {
    setSamplingState('drawing');
    setProgress(0);
    setTestResult(null);

    // Step 1: Robotic Micro-Needle / Vacuum Draw (0 - 25%)
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);

      if (currentProgress === 25) {
        setSamplingState('centrifuging'); // Step 2: Microgravity Acoustic Centrifuge
      } else if (currentProgress === 65) {
        setSamplingState('scanning'); // Step 3: Dual-Laser Fluorescence Scan
      } else if (currentProgress >= 100) {
        clearInterval(interval);
        setSamplingState('complete');
        generateResults();
      }
    }, 140);
  };

  // Generate realistic NASA telemetry results based on cartridge
  const generateResults = () => {
    if (selectedCartridge === 'metabolic') {
      setTestResult({
        timestamp: new Date().toLocaleTimeString(),
        parameters: [
          { name: 'Blood Glucose', value: '94 mg/dL', normal: '70 - 100 mg/dL', status: 'nominal' },
          { name: 'Blood Lactate', value: '1.2 mmol/L', normal: '0.5 - 2.0 mmol/L', status: 'nominal' },
          { name: 'Hematocrit (Hct)', value: '43.5%', normal: '40 - 50%', status: 'nominal' },
          { name: 'Ketone Bodies', value: '0.2 mmol/L', normal: '< 0.6 mmol/L', status: 'nominal' }
        ],
        diagnosis: 'Metabolic & Glycemic homeostasis nominal.',
        actionTitle: 'Autonomous Action: Balanced Galley Diet Approved',
        actionDesc: 'Nutritional baseline confirmed. Dispense Standard Mission Ration #4 (3,100 kcal / Day).'
      });
    } else if (selectedCartridge === 'renal_bone') {
      setTestResult({
        timestamp: new Date().toLocaleTimeString(),
        parameters: [
          { name: 'Serum Free Calcium (Ca²⁺)', value: '5.6 mg/dL (Elevated)', normal: '4.6 - 5.3 mg/dL', status: 'warning' },
          { name: 'Sodium (Na⁺)', value: '141 mEq/L', normal: '136 - 145 mEq/L', status: 'nominal' },
          { name: 'Potassium (K⁺)', value: '4.2 mEq/L', normal: '3.5 - 5.0 mEq/L', status: 'nominal' },
          { name: 'Nephrolithiasis Index', value: 'Moderate Risk', normal: 'Low Risk', status: 'warning' }
        ],
        diagnosis: 'Elevated circulating free calcium secondary to cancellous bone resorption. Increased risk of renal calcium oxalate stone formation.',
        actionTitle: 'CLOSED-LOOP COUNTERMEASURE TRIGGERED',
        actionDesc: '1. Hydration Surge: Ingest 1,200 mL sterile electrolyte water within 3 hours. 2. ARED Axial Loading: Schedule 45-min heavy deadlifts to stimulate bone rebuilding osteoblasts.'
      });
    } else if (selectedCartridge === 'radiation_dna') {
      setTestResult({
        timestamp: new Date().toLocaleTimeString(),
        parameters: [
          { name: 'γ-H2AX DNA Foci', value: '3.2 foci/cell', normal: '< 5.0 foci/cell', status: 'nominal' },
          { name: 'Lymphocyte Viability', value: '96.2%', normal: '> 90%', status: 'nominal' },
          { name: 'Radiation Repair Index', value: 'Optimal (89%)', normal: '> 80%', status: 'nominal' }
        ],
        diagnosis: 'DNA repair kinetics operating nominally under active cosmic ray flux. No acute radiation damage markers detected.',
        actionTitle: 'Radiation Mitigation Nominal',
        actionDesc: 'Continue baseline dietary antioxidant protocol (Polyphenols + N-acetylcysteine). Maintain personal dosimeter sync.'
      });
    } else {
      setTestResult({
        timestamp: new Date().toLocaleTimeString(),
        parameters: [
          { name: 'Free Salivary Cortisol', value: '0.42 µg/dL', normal: '0.10 - 0.50 µg/dL', status: 'nominal' },
          { name: 'Melatonin Phase Offset', value: '+18 mins', normal: '±30 mins', status: 'nominal' },
          { name: 'Secretory IgA', value: '185 µg/mL', normal: '100 - 300 µg/mL', status: 'nominal' }
        ],
        diagnosis: 'Circadian neuro-endocrine entrainment stable.',
        actionTitle: 'Circadian Schedule Verified',
        actionDesc: 'Crew sleep architecture protected. Evening 2700K amber lighting program initiates at 21:00 MET.'
      });
    }

    // Decrement inventory
    setCartridges(prev => prev.map(c => c.id === selectedCartridge ? { ...c, inventory: c.inventory - 1 } : c));
  };

  const activeCartridgeObj = cartridges.find(c => c.id === selectedCartridge) || cartridges[0];

  return (
    <div className="space-y-6">
      
      {/* Top Hardware Device Status HUD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-xl bg-zinc-900/90 border border-zinc-700/50 flex items-center justify-center text-white shadow-md">
            <Cpu className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-hud font-bold text-base text-zinc-900 dark:text-white tracking-wide">
                ASTRO-LAB™ ROBOTIC BIO-ANALYZER
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono-space bg-zinc-800 text-zinc-200 border border-zinc-700/30">
                HARDWARE IoT BRIDGE
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono-space">
              Device ID: <span className="text-zinc-200">ASTRO-POCD-9042</span> • Protocol: <span className="text-white font-medium">BLE 5.3 / Spacecraft Avionics Bus</span>
            </p>
          </div>
        </div>

        {/* Hardware Link Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs font-mono-space">
            <Bluetooth className="w-4 h-4 text-white" />
            <span>LINK: <strong className="text-emerald-400">PAIRED & SYNCED</strong></span>
          </div>

          <button
            onClick={() => setBleConnected(!bleConnected)}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-mono-space transition-colors"
          >
            {bleConnected ? 'Simulate Reconnect' : 'Connect Device'}
          </button>
        </div>
      </div>

      {/* Main Grid: Cartridge Selector & Robotic Sequence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Cartridge Selection & Consumable Inventory */}
        <div className="lg:col-span-5 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <span className="font-hud font-bold text-sm text-white tracking-wide uppercase flex items-center gap-2">
                <Package className="w-4 h-4 text-white" />
                Select Diagnostic Micro-Cartridge
              </span>
              <span className="text-xs font-mono-space text-zinc-400">
                Active Slot: #1
              </span>
            </div>

            <p className="text-xs text-zinc-300 mb-4 font-sans">
              Choose the targeted test panel. The robotic dock utilizes microgravity capillary channels and acoustic separation to process the sample automatically.
            </p>

            <div className="space-y-2.5">
              {cartridges.map((c) => {
                const isSelected = selectedCartridge === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      if (samplingState === 'idle' || samplingState === 'complete') {
                        setSelectedCartridge(c.id);
                        setTestResult(null);
                        setSamplingState('idle');
                      }
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-900/60 border-zinc-700 shadow-md text-white'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-hud font-bold text-xs flex items-center gap-1.5">
                        <Droplet className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-zinc-500'}`} />
                        {c.name}
                      </span>
                      <span className="text-[10px] font-mono-space px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-200">
                        {c.inventory} left
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-400 font-mono-space">
                      Type: <span className="text-zinc-200">{c.sampleType}</span> • Shelf: <span className="text-emerald-400">{c.shelfLife}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] font-mono-space text-zinc-400 flex items-center justify-between">
            <span>NASA Spaceflight Reagent Spec: MIL-STD-1472</span>
            <span className="text-white">Zero-G Certified</span>
          </div>
        </div>

        {/* Right Column: Robotic Sampling Simulator & Zero-G Microfluidics */}
        <div className="lg:col-span-7 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <span className="font-hud font-bold text-sm text-white tracking-wide uppercase flex items-center gap-2">
                <Activity className="w-4 h-4 text-white" />
                Robotic Microfluidic Chamber (0.00g Simulation)
              </span>
              <span className={`text-xs font-mono-space font-bold ${
                samplingState === 'complete' ? 'text-emerald-400' : 'text-zinc-200'
              }`}>
                STATUS: {samplingState.toUpperCase()}
              </span>
            </div>

            {/* Visual Microfluidic Chip Animation Box */}
            <div className="relative rounded-2xl bg-zinc-950 border-2 border-zinc-800 p-6 min-h-[200px] flex flex-col items-center justify-center overflow-hidden">
              
              {/* Background Chip Geometry */}
              <div className="absolute inset-0 space-grid-bg opacity-30 pointer-events-none" />

              {samplingState === 'idle' && (
                <div className="text-center p-4">
                  <Cpu className="w-12 h-12 text-zinc-500 mx-auto mb-2" />
                  <div className="font-hud text-base font-bold text-zinc-200">
                    {activeCartridgeObj.name} Loaded
                  </div>
                  <p className="text-xs text-zinc-400 font-mono-space mt-1">
                    Sample required: {activeCartridgeObj.sampleType}. Place finger on robotic suction port.
                  </p>
                </div>
              )}

              {samplingState === 'drawing' && (
                <div className="text-center animate-in fade-in">
                  <div className="relative w-14 h-14 mx-auto mb-3 flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-zinc-200">
                      <Droplet className="w-6 h-6 animate-pulse" />
                    </div>
                  </div>
                  <div className="font-hud text-sm font-bold text-zinc-200">
                    STEP 1: ROBOTIC CAPILLARY DRAW ACTIVE
                  </div>
                  <p className="text-xs text-zinc-400 font-mono-space mt-1">
                    Vacuum-sealed micro-port drawing 10 µL sample into capillary channels...
                  </p>
                </div>
              )}

              {samplingState === 'centrifuging' && (
                <div className="text-center animate-in fade-in">
                  <div className="relative w-14 h-14 mx-auto mb-3 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-amber-400 animate-spin flex items-center justify-center text-amber-300" style={{ animationDuration: '1s' }}>
                      <RotateCcw className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="font-hud text-sm font-bold text-amber-300">
                    STEP 2: ZERO-G ACOUSTIC CENTRIFUGATION
                  </div>
                  <p className="text-xs text-zinc-400 font-mono-space mt-1">
                    Ultrasonic standing waves separating plasma from erythrocytes in microgravity...
                  </p>
                </div>
              )}

              {samplingState === 'scanning' && (
                <div className="text-center animate-in fade-in">
                  <div className="relative w-14 h-14 mx-auto mb-3 flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <div className="w-12 h-12 rounded-full bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-300">
                      <Radio className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                  <div className="font-hud text-sm font-bold text-emerald-300">
                    STEP 3: DUAL-WAVELENGTH FLUORESCENCE SCAN
                  </div>
                  <p className="text-xs text-zinc-400 font-mono-space mt-1">
                    Photometric detector measuring fluorophore emission spectrum...
                  </p>
                </div>
              )}

              {samplingState === 'complete' && (
                <div className="text-center animate-in zoom-in-95">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                  <div className="font-hud text-base font-bold text-white">
                    LAB ANALYSIS COMPLETE & VERIFIED
                  </div>
                  <p className="text-xs text-emerald-300 font-mono-space mt-1">
                    Telemetry digitized and encrypted into astronaut clinical database.
                  </p>
                </div>
              )}

              {/* Progress Bar */}
              {samplingState !== 'idle' && samplingState !== 'complete' && (
                <div className="w-full max-w-xs mt-4">
                  <div className="flex justify-between text-[10px] font-mono-space text-zinc-400 mb-1">
                    <span>PROCESSING SAMPLE</span>
                    <span className="text-zinc-200 font-bold">{progress}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                    <div 
                      className="bg-gradient-to-r from-zinc-400 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Trigger Button */}
            <div className="mt-4">
              <button
                onClick={handleInitiateSample}
                disabled={samplingState !== 'idle' && samplingState !== 'complete'}
                className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-hud font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <Play className="w-4 h-4" />
                INITIATE ROBOTIC BLOOD DRAW & ANALYSIS
              </button>
            </div>
          </div>

          {/* Test Results Output & Closed-Loop Protocol */}
          {testResult && (
            <div className="mt-4 p-4 rounded-xl bg-zinc-900 border border-zinc-700/50 animate-in fade-in space-y-3 font-mono-space text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-700">
                <span className="font-bold text-white">
                  ANALYSIS RESULTS ({testResult.timestamp})
                </span>
                <span className="text-[10px] text-white">
                  PATIENT: {activeCrew.name.split(',')[0]}
                </span>
              </div>

              {/* Biomarker Parameters Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {testResult.parameters.map((p, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block">{p.name}</span>
                    <span className={`font-bold ${p.status === 'warning' ? 'text-amber-400' : 'text-white'}`}>
                      {p.value}
                    </span>
                    <span className="text-[9px] text-zinc-500 block">Norm: {p.normal}</span>
                  </div>
                ))}
              </div>

              {/* Closed-Loop Autonomous Action Alert */}
              <div className="p-3 rounded-lg bg-zinc-950 border border-amber-500/50">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>{testResult.actionTitle}</span>
                </div>
                <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                  {testResult.actionDesc}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

