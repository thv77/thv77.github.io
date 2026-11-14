import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Target, 
  Brain, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Play, 
  Crosshair,
  Maximize2,
  FileText
} from 'lucide-react';

export default function SelfExamSuite({ onExamComplete }) {
  const [activeTool, setActiveTool] = useState('sans'); // 'sans' | 'ultrasound' | 'pvt'

  // ==========================================
  // 1. SANS VISION & AMSLER GRID TEST STATE
  // ==========================================
  const [visionLine, setVisionLine] = useState(3);
  const [visionResult, setVisionResult] = useState(null);
  const [gridDistortions, setGridDistortions] = useState([]);
  const snellenLines = [
    { level: '20/100', letters: 'E', size: 'text-6xl' },
    { level: '20/70', letters: 'F P', size: 'text-5xl' },
    { level: '20/50', letters: 'T O Z', size: 'text-4xl' },
    { level: '20/40', letters: 'L P E D', size: 'text-3xl' },
    { level: '20/30', letters: 'P E C F D', size: 'text-2xl' },
    { level: '20/25', letters: 'E D F C Z P', size: 'text-xl' },
    { level: '20/20', letters: 'F E L O P Z D', size: 'text-base' },
  ];

  const handleGridClick = (index) => {
    if (gridDistortions.includes(index)) {
      setGridDistortions(gridDistortions.filter(i => i !== index));
    } else {
      setGridDistortions([...gridDistortions, index]);
    }
  };

  const handleFinishVisionTest = () => {
    const acuity = snellenLines[visionLine]?.level || '20/30';
    const hasDistortion = gridDistortions.length > 0;
    setVisionResult({
      acuity,
      distortionsDetected: hasDistortion ? gridDistortions.length : 0,
      triage: (visionLine <= 4 || hasDistortion) ? 'AMBER (Mild SANS Drift)' : 'GREEN (Nominal)',
      recommendation: (visionLine <= 4 || hasDistortion) 
        ? 'Choroidal displacement detected. Initiate 45-min LBNP Chibis session and update Space Medicine log.'
        : 'Visual acuity stable. Repeat test in 7 mission days.'
    });
  };

  // ==========================================
  // 2. ULTRASOUND TELE-SIMULATION STATE
  // ==========================================
  const [probePosition, setProbePosition] = useState({ x: 50, y: 50 });
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScanTrigger = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      const dist = Math.hypot(probePosition.x - 50, probePosition.y - 50);
      if (dist < 18) {
        setScanResult({
          quality: 'Optimal Acoustic Window',
          onsd: '5.85 mm',
          status: 'Cautionary Elevation (Normal: 4.5 - 5.0 mm)',
          diagnosis: 'Optic Nerve Sheath Diameter engorgement consistent with Frisén Grade 1.5 SANS edema.'
        });
      } else {
        setScanResult({
          quality: 'Sub-Optimal Alignment',
          onsd: 'N/A',
          status: 'Re-align Probe',
          diagnosis: 'Acoustic shadow artifact. Re-center probe over the closed upper eyelid.'
        });
      }
    }, 1500);
  };

  // ==========================================
  // 3. PSYCHOMOTOR VIGILANCE TASK (PVT) STATE
  // ==========================================
  const [pvtState, setPvtState] = useState('idle'); // 'idle' | 'waiting' | 'ready' | 'result'
  const [pvtStartTime, setPvtStartTime] = useState(0);
  const [pvtReactionTime, setPvtReactionTime] = useState(null);
  const [pvtHistory, setPvtHistory] = useState([214, 228, 209, 218]);

  const startPvt = () => {
    setPvtState('waiting');
    setPvtReactionTime(null);
    const delay = Math.floor(Math.random() * 2500) + 1500;
    setTimeout(() => {
      setPvtStartTime(Date.now());
      setPvtState('ready');
    }, delay);
  };

  const handlePvtClick = () => {
    if (pvtState === 'waiting') {
      setPvtState('idle');
      alert('False start! Wait until the target triggers.');
    } else if (pvtState === 'ready') {
      const reaction = Date.now() - pvtStartTime;
      setPvtReactionTime(reaction);
      setPvtHistory([...pvtHistory.slice(-4), reaction]);
      setPvtState('result');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Tool Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div>
          <h2 className="font-hud font-bold text-base text-zinc-900 dark:text-white tracking-wide uppercase flex items-center gap-2">
            <Target className="w-5 h-5 text-zinc-700 dark:text-white" />
            Astronaut Autonomous Self-Examination Suite
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-space">
            Self-administered clinical diagnostics designed for deep-space autonomy
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 p-1 border border-zinc-300 dark:border-zinc-700/60 text-xs">
          {[
            { id: 'sans', label: 'SANS Vision & Amsler', icon: Eye },
            { id: 'ultrasound', label: 'Guided Ultrasound', icon: Crosshair },
            { id: 'pvt', label: 'PVT Cognitive Test', icon: Brain },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTool(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTool === id
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-black font-bold shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TOOL 1: SANS VISION & AMSLER GRID */}
      {activeTool === 'sans' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Snellen Visual Acuity Chart */}
          <div className="lg:col-span-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-4">
                <span className="font-hud font-bold text-sm text-zinc-900 dark:text-white tracking-wide uppercase flex items-center gap-2">
                  <Eye className="w-4 h-4 text-zinc-700 dark:text-white" />
                  Snellen Digital Visual Acuity (Near Focus)
                </span>
                <span className="text-xs font-mono-space font-bold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700">
                  Current: {snellenLines[visionLine].level}
                </span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-6 font-sans">
                Stand at arm's length (~50 cm). Focus on the line below without squinting. Select the smallest line you can read crisply.
              </p>

              {/* Display Current Line */}
              <div className="p-8 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center min-h-[160px] flex items-center justify-center shadow-inner">
                <div className={`font-mono-space font-extrabold tracking-widest text-zinc-900 dark:text-zinc-100 ${snellenLines[visionLine].size}`}>
                  {snellenLines[visionLine].letters}
                </div>
              </div>

              {/* Slider / Select Buttons */}
              <div className="flex items-center justify-between gap-2 mt-4">
                <button
                  onClick={() => setVisionLine(Math.max(0, visionLine - 1))}
                  disabled={visionLine === 0}
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 disabled:opacity-40 text-xs font-hud font-bold text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 transition-colors"
                >
                  ← Larger Line
                </button>
                <span className="text-xs font-mono-space font-bold text-zinc-700 dark:text-zinc-300">
                  Line {visionLine + 1} of {snellenLines.length}
                </span>
                <button
                  onClick={() => setVisionLine(Math.min(snellenLines.length - 1, visionLine + 1))}
                  disabled={visionLine === snellenLines.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 disabled:opacity-40 text-xs font-hud font-bold text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 transition-colors"
                >
                  Smaller Line →
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-[11px] font-mono-space text-zinc-500 dark:text-zinc-400">
              SANS pathophysiology leads to hyperopic shift (loss of near visual acuity) due to posterior globe flattening.
            </div>
          </div>

          {/* Amsler Grid Distortion Check */}
          <div className="lg:col-span-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-4">
                <span className="font-hud font-bold text-sm text-zinc-900 dark:text-white tracking-wide uppercase flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-zinc-700 dark:text-white" />
                  Amsler Grid Macular Distortion Matrix
                </span>
                <span className="text-xs font-mono-space font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-700">
                  {gridDistortions.length} Distortion Points
                </span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-3 font-sans">
                Focus on the central dot. Click any square where lines appear wavy, curved, or darkened (indicative of choroidal folds).
              </p>

              {/* Interactive Grid */}
              <div className="relative w-64 h-64 mx-auto bg-zinc-100 dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-700 rounded-lg p-1 grid grid-cols-8 gap-0.5 shadow-inner">
                {Array.from({ length: 64 }).map((_, i) => {
                  const isDistorted = gridDistortions.includes(i);
                  const isCenter = i === 27 || i === 28 || i === 35 || i === 36;
                  return (
                    <div
                      key={i}
                      onClick={() => handleGridClick(i)}
                      className={`border border-zinc-300 dark:border-zinc-800/80 cursor-pointer transition-all flex items-center justify-center ${
                        isDistorted 
                          ? 'bg-amber-500 shadow-sm' 
                          : 'hover:bg-zinc-200 dark:hover:bg-zinc-800 bg-white dark:bg-zinc-900'
                      }`}
                    >
                      {isCenter && (
                        <div className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-white pointer-events-none shadow" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Grid actions */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setGridDistortions([])}
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-mono-space border border-zinc-300 dark:border-zinc-700 transition-colors"
                >
                  Reset Grid
                </button>
                <button
                  onClick={handleFinishVisionTest}
                  className="px-4 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-hud font-bold shadow-md transition-colors"
                >
                  Evaluate Vision Telemetry
                </button>
              </div>
            </div>

            {/* Test Result Card */}
            {visionResult && (
              <div className="mt-4 p-3.5 rounded-xl bg-amber-50 dark:bg-zinc-900 border border-amber-400 dark:border-amber-500/40 text-xs font-mono-space animate-in fade-in">
                <div className="flex justify-between items-center text-amber-900 dark:text-amber-300 font-bold mb-1">
                  <span>RESULT: {visionResult.acuity} ({visionResult.triage})</span>
                  <span>Distortions: {visionResult.distortionsDetected}</span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 text-[11px] font-sans">
                  {visionResult.recommendation}
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TOOL 2: GUIDED ULTRASOUND TELE-SIMULATION */}
      {activeTool === 'ultrasound' && (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6 gap-2">
            <div>
              <h3 className="font-hud text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-zinc-700 dark:text-white" />
                Optic Nerve Sheath Diameter (ONSD) Ultrasound Simulator
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-space">
                Simulating tele-robotic / self-guided orbital ultrasonography for intracranial pressure assessment
              </p>
            </div>

            <div className="text-xs font-mono-space text-zinc-700 dark:text-zinc-300">
              TARGET: <span className="text-zinc-900 dark:text-white font-bold">Retrobulbar Optic Nerve @ 3mm depth</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Interactive Target Pad */}
            <div className="lg:col-span-7 relative h-72 rounded-xl bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-700 overflow-hidden flex items-center justify-center">
              
              {/* Scanline Grid */}
              <div className="absolute inset-0 space-grid-bg opacity-40 pointer-events-none" />

              {/* Target Area Indicator */}
              <div className="absolute w-24 h-24 rounded-full border border-dashed border-zinc-400 dark:border-zinc-700/50 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-emerald-500/60 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
              <div className="absolute top-3 left-3 text-[10px] font-mono-space text-zinc-600 dark:text-zinc-400">
                PATIENT: CLOSED EYELID (SUPERIOR TRANSVERSE PLANE)
              </div>

              {/* Movable Ultrasound Probe Icon */}
              <div 
                className="absolute z-20 cursor-move flex flex-col items-center transition-all duration-75"
                style={{ left: `${probePosition.x}%`, top: `${probePosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-10 h-10 rounded-full border-2 border-zinc-400 dark:border-zinc-700 bg-white dark:bg-zinc-900/80 flex items-center justify-center text-zinc-900 dark:text-zinc-200 shadow-md">
                  <Crosshair className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <span className="text-[9px] font-mono-space bg-zinc-200 dark:bg-zinc-950 px-1 py-0.5 rounded text-zinc-800 dark:text-zinc-200 mt-1 font-bold">
                  12 MHz PROBE
                </span>
              </div>

              {/* Position adjustment buttons */}
              <div className="absolute bottom-3 right-3 flex gap-1 z-30">
                <button onClick={() => setProbePosition(p => ({ ...p, y: Math.max(20, p.y - 10) }))} className="px-2 py-1 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono-space text-zinc-800 dark:text-zinc-300 rounded border border-zinc-300 dark:border-zinc-700">▲</button>
                <button onClick={() => setProbePosition(p => ({ ...p, x: Math.max(20, p.x - 10) }))} className="px-2 py-1 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono-space text-zinc-800 dark:text-zinc-300 rounded border border-zinc-300 dark:border-zinc-700">◀</button>
                <button onClick={() => setProbePosition({ x: 50, y: 50 })} className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-bold text-xs font-mono-space rounded">CENTER</button>
                <button onClick={() => setProbePosition(p => ({ ...p, x: Math.min(80, p.x + 10) }))} className="px-2 py-1 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono-space text-zinc-800 dark:text-zinc-300 rounded border border-zinc-300 dark:border-zinc-700">▶</button>
                <button onClick={() => setProbePosition(p => ({ ...p, y: Math.min(80, p.y + 10) }))} className="px-2 py-1 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono-space text-zinc-800 dark:text-zinc-300 rounded border border-zinc-300 dark:border-zinc-700">▼</button>
              </div>
            </div>

            {/* Diagnostic Output & Action */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-hud font-bold text-zinc-900 dark:text-zinc-300 block mb-1">
                  ULTRASOUND PROTOCOL STEPS:
                </span>
                <ol className="text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5 list-decimal list-inside font-sans">
                  <li>Apply sterile ophthalmic coupling gel to 12 MHz linear probe.</li>
                  <li>Rest probe lightly on closed superior eyelid with zero globe compression.</li>
                  <li>Align crosshairs until optic nerve hypoechoic column is centered.</li>
                  <li>Trigger autonomous freeze-frame edge detection scan.</li>
                </ol>
              </div>

              <button
                onClick={handleScanTrigger}
                disabled={isScanning}
                className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-hud font-bold text-xs tracking-wider uppercase transition-all shadow-md disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <Crosshair className="w-4 h-4" />
                {isScanning ? 'ACQUIRING ACOUSTIC FRAMES...' : 'CAPTURE ONSD ULTRASOUND SCAN'}
              </button>

              {/* Scan Results Output */}
              {scanResult && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-zinc-900 border border-amber-300 dark:border-amber-500/40 animate-in fade-in space-y-2 text-xs font-mono-space">
                  <div className="flex justify-between items-center pb-2 border-b border-amber-200 dark:border-zinc-800">
                    <span className="font-bold text-zinc-900 dark:text-white">ONSD: {scanResult.onsd}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 font-bold">
                      {scanResult.quality}
                    </span>
                  </div>
                  <div className="text-amber-800 dark:text-amber-300 font-semibold">{scanResult.status}</div>
                  <p className="text-zinc-700 dark:text-zinc-300 text-[11px] font-sans">
                    {scanResult.diagnosis}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* TOOL 3: PSYCHOMOTOR VIGILANCE TASK (PVT) */}
      {activeTool === 'pvt' && (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6 gap-2">
            <div>
              <h3 className="font-hud text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                NASA 3-Minute Psychomotor Vigilance Task (PVT-B)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-space">
                Objective cognitive fatigue and circadian lapse detection benchmark
              </p>
            </div>

            <div className="text-xs font-mono-space text-zinc-700 dark:text-zinc-300">
              NOMINAL REACTION: <span className="text-emerald-600 dark:text-emerald-400 font-bold">&lt; 250 ms</span> • LAPSES: <span className="text-emerald-600 dark:text-emerald-400 font-bold">0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Interactive Reaction Box */}
            <div className="lg:col-span-7">
              <div 
                onClick={handlePvtClick}
                className={`relative h-64 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all select-none ${
                  pvtState === 'ready' 
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white shadow-xl' 
                    : pvtState === 'waiting'
                    ? 'bg-red-100 dark:bg-red-950/30 border-red-500'
                    : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 hover:border-zinc-500'
                }`}
              >
                {pvtState === 'idle' && (
                  <div className="text-center p-4">
                    <Brain className="w-10 h-10 text-zinc-700 dark:text-white mx-auto mb-2 animate-bounce" />
                    <div className="font-hud text-lg font-bold text-zinc-900 dark:text-white">CLICK TO START TEST</div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-space mt-1">
                      Click as quickly as possible the millisecond the box flashes
                    </p>
                  </div>
                )}

                {pvtState === 'waiting' && (
                  <div className="text-center">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block animate-ping mb-2"></span>
                    <div className="font-hud text-lg font-bold text-red-600 dark:text-red-400 tracking-wider">
                      WAIT FOR TRIGGER...
                    </div>
                    <p className="text-xs text-red-700 dark:text-zinc-400 font-mono-space">Do not click prematurely</p>
                  </div>
                )}

                {pvtState === 'ready' && (
                  <div className="text-center">
                    <div className="font-hud text-4xl font-extrabold tracking-wider animate-pulse">
                      CLICK NOW!
                    </div>
                  </div>
                )}

                {pvtState === 'result' && (
                  <div className="text-center">
                    <div className="font-hud text-5xl font-extrabold text-zinc-900 dark:text-white">
                      {pvtReactionTime} <span className="text-xl font-normal text-zinc-600 dark:text-zinc-300">ms</span>
                    </div>
                    <p className="text-xs font-mono-space text-emerald-600 dark:text-emerald-400 font-bold mt-2">
                      {pvtReactionTime < 240 ? 'Optimal Cognitive Alertness' : 'Mild Fatigue Detected'}
                    </p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); startPvt(); }}
                      className="mt-3 px-3 py-1 rounded bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-mono-space text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700"
                    >
                      Test Again ↺
                    </button>
                  </div>
                )}
              </div>

              {pvtState === 'idle' && (
                <button
                  onClick={startPvt}
                  className="w-full mt-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-hud font-bold text-xs shadow-md transition-colors"
                >
                  START 3-MINUTE CALIBRATION
                </button>
              )}
            </div>

            {/* Reaction History & Statistics */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-hud font-bold text-zinc-900 dark:text-zinc-300 block mb-2">
                  RECENT REACTION SPEED SAMPLES
                </span>
                <div className="space-y-1.5 font-mono-space text-xs">
                  {pvtHistory.map((val, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 border-b border-zinc-200 dark:border-zinc-800/60">
                      <span className="text-zinc-600 dark:text-zinc-400">Trial #{idx + 1}</span>
                      <span className={`font-bold ${val < 230 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-300'}`}>
                        {val} ms
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-700 dark:text-zinc-300 font-sans">
                <strong className="text-zinc-900 dark:text-white block font-hud mb-1">NASA OPERATIONAL FLIGHT RULE:</strong>
                Astronauts with PVT mean response time &gt; 280 ms or &gt; 2 lapses (&gt; 500 ms) within a 24-hour cycle are restricted from robotic arm teleoperation and EVA spacewalk duties until a 60-minute sleep nap or circadian reset occurs.
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
