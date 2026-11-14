import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertOctagon, 
  Heart, 
  Wind, 
  Radio, 
  Droplet, 
  Flame, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  CheckCircle2, 
  RotateCcw, 
  Clock, 
  ShieldAlert, 
  ArrowRight,
  Zap,
  Activity,
  X
} from 'lucide-react';

export default function EmergencyActionSystem({ activeCrew, onClose }) {
  const [selectedEmergency, setSelectedEmergency] = useState('cardiac');
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [beaconSent, setBeaconSent] = useState(false);

  // CPR Metronome State (110 BPM)
  const [cprPacerActive, setCprPacerActive] = useState(false);
  const [compressionPhase, setCompressionPhase] = useState('RELEASE'); // 'PUSH' | 'RELEASE'
  const cprIntervalRef = useRef(null);

  // Web Audio API Synthesizers
  const audioCtxRef = useRef(null);
  const metronomeCtxRef = useRef(null);

  const startSiren = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setSirenPlaying(true);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  const stopSiren = () => {
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    setSirenPlaying(false);
  };

  // 110-BPM CPR Metronome Audio Click (110 BPM = ~545ms interval)
  const toggleCprMetronome = () => {
    if (cprPacerActive) {
      clearInterval(cprIntervalRef.current);
      setCprPacerActive(false);
      return;
    }

    setCprPacerActive(true);
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const mCtx = new AudioContext();
    metronomeCtxRef.current = mCtx;

    let phase = 'PUSH';
    cprIntervalRef.current = setInterval(() => {
      // Audio beep
      try {
        const osc = mCtx.createOscillator();
        const gain = mCtx.createGain();
        osc.frequency.setValueAtTime(phase === 'PUSH' ? 880 : 440, mCtx.currentTime);
        gain.gain.setValueAtTime(0.06, mCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, mCtx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(mCtx.destination);
        osc.start();
        osc.stop(mCtx.currentTime + 0.09);
      } catch (e) {}

      phase = phase === 'PUSH' ? 'RELEASE' : 'PUSH';
      setCompressionPhase(phase);
    }, 272); // ~545ms full cycle / 2 for push and release
  };

  useEffect(() => {
    return () => {
      stopSiren();
      clearInterval(cprIntervalRef.current);
    };
  }, []);

  // Emergency Scenarios Catalog
  const scenarios = {
    cardiac: {
      id: 'cardiac',
      title: 'Sudden Cardiac Arrest & Ventricular Fibrillation (VF)',
      severity: 'CRITICAL - IMMEDIATE ACTION',
      color: 'red',
      icon: 'Heart',
      criticalWindow: '3 Minutes to irreversible cerebral anoxia',
      steps: [
        { id: 1, title: 'Deploy CMRS (Crew Medical Restraint System)', desc: 'Tether patient to the CMRS backboard to anchor them against the bulkhead. Unrestrained CPR is impossible in zero-g.' },
        { id: 2, title: 'Apply Automated External Defibrillator (AED)', desc: 'Open Pack #1 from the Emergency Medical Pack. Wipe chest dry and attach biphasic defibrillator pads (Anterior-Lateral).' },
        { id: 3, title: 'Execute Handstand or Reverse-Straddle CPR (110 BPM)', desc: 'Place feet against ceiling/bulkhead to generate compressive force. Deliver 100-120 compressions/min at 5 cm depth.' },
        { id: 4, title: 'Administer Epinephrine Autoinjector (1 mg IV/IO)', desc: 'Locate green autoinjector from Ampule Kit. Administer via intraosseous or peripheral venous line.' }
      ]
    },
    decompression: {
      id: 'decompression',
      title: 'Rapid Cabin Decompression & Acute Hypoxia',
      severity: 'CRITICAL - LIFE SUPPORT BREACH',
      color: 'red',
      icon: 'Wind',
      criticalWindow: '45 Seconds time of useful consciousness (TUC)',
      steps: [
        { id: 1, title: 'Don Emergency Oxygen Masks (Quick-Don)', desc: 'Every crew member must immediately don 100% positive-pressure O2 mask before assisting others.' },
        { id: 2, title: 'Isolate Breached Habitat Module', desc: 'Identify pressure gradient differential. Close and seal inter-module pressure hatch immediately.' },
        { id: 3, title: 'Emergency Nitrogen/O2 Equalization', desc: 'Trigger high-pressure reserve bottle dump to stabilize cabin pressure above 8.3 psi (57 kPa).' },
        { id: 4, title: 'Hyperbaric Oxygen Pre-Breathe', desc: 'Place affected crew member in hyperbaric bag to prevent decompression sickness (the bends).' }
      ]
    },
    ammonia: {
      id: 'ammonia',
      title: 'Toxic Ammonia Leak / Thermal Loop Breach',
      severity: 'EXTREME - TOXIC INHALATION',
      color: 'amber',
      icon: 'AlertOctagon',
      criticalWindow: '2 Minutes before respiratory tract caustic burns',
      steps: [
        { id: 1, title: 'Don PBBA (Personal Breathing Breathing Apparatus)', desc: 'Immediately don closed-circuit chemical breathing hood with P100 catalytic filter.' },
        { id: 2, title: 'Evacuate to Safe Haven Module', desc: 'Transit to Service Module, shut environmental ventilation ducts, and seal hatch.' },
        { id: 3, title: 'Initiate ECLSS Ammonia Scrubbing Mode', desc: 'Command life support avionics to route cabin atmosphere through carbon and phosphoric acid scrubbers.' },
        { id: 4, title: 'Administer Nebulized Albuterol & Dexamethasone', desc: 'Treat acute bronchospasm from caustic alkaline inhalation.' }
      ]
    },
    radiation_storm: {
      id: 'radiation_storm',
      title: 'Catastrophic Solar Particle Event (SPE) Proton Storm',
      severity: 'EMERGENCY - IONIZING FLUX > 500 mSv/hr',
      color: 'red',
      icon: 'Radio',
      criticalWindow: '15 Minutes before acute radiation sickness threshold',
      steps: [
        { id: 1, title: 'Sound Solar Proton Storm Klaxon', desc: 'All crew cease operations and prepare for central storm refuge shelter entry.' },
        { id: 2, title: 'Align Spacecraft Propulsion Axis to Sun', desc: 'Rotate spacecraft so the service module engines and fuel tanks act as a physical radiation shield.' },
        { id: 3, title: 'Seal Water-Wall Storm Bunker', desc: 'Enter central shelter surrounded by water bags and food rations. Dog the storm hatch.' },
        { id: 4, title: 'Ingest Radioprotectant Prophylaxis', desc: 'Administer Amifostine and high-dose antioxidants (Vitamin E + N-acetylcysteine) from emergency locker.' }
      ]
    }
  };

  const activeScenario = scenarios[selectedEmergency] || scenarios.cardiac;

  const handleSendDistressBeacon = () => {
    setBeaconSent(true);
    setTimeout(() => setBeaconSent(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-red-950/85 backdrop-blur-lg animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[94vh] flex flex-col rounded-3xl bg-zinc-950 border-2 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)] overflow-hidden scanlines">
        
        {/* Top Emergency Red Strobe Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-red-950 via-zinc-900 to-red-950 border-b-2 border-red-500 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500 animate-pulse shrink-0">
              <AlertOctagon className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-hud text-base sm:text-xl font-extrabold text-white tracking-widest uppercase truncate">
                  CODE RED: EMERGENCY ACTION SYSTEM
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono-space bg-red-500 text-black font-bold uppercase animate-ping shrink-0">
                  LIVE EMERGENCY
                </span>
              </div>
              <p className="text-xs text-red-300 font-mono-space truncate">
                Autonomous Emergency Decision Support • Patient: <strong className="text-white">{activeCrew.name.split(',')[0]}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            {/* Siren Toggle */}
            <button
              onClick={sirenPlaying ? stopSiren : startSiren}
              className={`p-2 rounded-xl border transition-all text-xs font-mono-space flex items-center gap-1.5 ${
                sirenPlaying
                  ? 'bg-red-500 text-black border-red-400 font-bold shadow-lg'
                  : 'bg-zinc-900 text-red-400 border-red-500/40 hover:bg-red-950'
              }`}
              title="Acoustic Emergency Klaxon"
            >
              {sirenPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{sirenPlaying ? 'SIREN ACTIVE' : 'TEST SIREN'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                stopSiren();
                clearInterval(cprIntervalRef.current);
                onClose();
              }}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Emergency Selector Grid */}
          <div>
            <span className="text-xs font-hud font-bold text-zinc-300 tracking-wider uppercase block mb-2.5">
              Select Immediate Clinical Incident Protocol:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {Object.values(scenarios).map(sc => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedEmergency(sc.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedEmergency === sc.id
                      ? 'bg-red-950/80 border-red-400 text-white shadow-lg glow-red'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-hud font-bold truncate">{sc.title.split('&')[0]}</span>
                  </div>
                  <div className="text-[10px] font-mono-space text-red-400 truncate">
                    {sc.severity}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Emergency Protocol Card */}
          <div className="p-6 rounded-2xl bg-zinc-900 border-2 border-red-500/80 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-red-500/40 gap-2">
              <div>
                <h3 className="font-hud text-lg font-bold text-white flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5 text-red-400" />
                  {activeScenario.title}
                </h3>
                <span className="text-xs text-amber-300 font-mono-space">
                  CRITICAL SURVIVAL WINDOW: <strong className="text-white">{activeScenario.criticalWindow}</strong>
                </span>
              </div>

              <button
                onClick={handleSendDistressBeacon}
                className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-hud text-xs font-bold transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
              >
                <Radio className="w-3.5 h-3.5 animate-spin" />
                {beaconSent ? 'TRANSMITTING DSN PACKET...' : 'BROADCAST DSN DISTRESS BEACON'}
              </button>
            </div>

            {/* EXPANSION: 110-BPM ZERO-G CPR PACER METRONOME (For Cardiac Arrest) */}
            {selectedEmergency === 'cardiac' && (
              <div className="p-4 rounded-xl bg-zinc-950 border-2 border-red-500/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-950 border border-red-500/50 flex items-center justify-center text-red-400">
                    <Heart className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="font-hud font-bold text-sm text-white block">
                      ZERO-G CPR METRONOME (110 COMPRESSIONS / MIN)
                    </span>
                    <span className="text-xs text-zinc-400 font-mono-space">
                      Audible rhythm guide calibrated to American Heart Assoc. / NASA CMRS standard
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {cprPacerActive && (
                    <div className={`px-4 py-1.5 rounded-lg font-hud font-extrabold text-xs tracking-widest uppercase transition-all ${
                      compressionPhase === 'PUSH' ? 'bg-red-500 text-black scale-105 shadow-[0_0_15px_#ef4444]' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {compressionPhase} (5 cm)
                    </div>
                  )}

                  <button
                    onClick={toggleCprMetronome}
                    className={`px-4 py-2 rounded-xl font-hud font-bold text-xs transition-all flex items-center gap-1.5 shadow-md ${
                      cprPacerActive 
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600' 
                        : 'bg-red-600 hover:bg-red-500 text-white glow-red'
                    }`}
                  >
                    {cprPacerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{cprPacerActive ? 'Stop CPR Pacer' : 'Start 110 BPM Metronome'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step-by-Step Action Checklist */}
            <div className="space-y-3 font-mono-space text-xs">
              <span className="text-zinc-300 font-hud font-bold uppercase block text-[11px]">
                MANDATORY CREW PHYSICAL ACTIONS (STEP-BY-STEP):
              </span>

              {activeScenario.steps.map((step) => (
                <div
                  key={step.id}
                  className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-red-500/40 transition-colors flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <div className="font-hud font-bold text-white text-xs mb-0.5">
                      {step.title}
                    </div>
                    <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* NASA Emergency Medical Pack (AMP) Hardware Callout */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300 font-sans flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-hud mb-0.5">NASA EMERGENCY MEDICAL PACK (AMP) SPECIFICATION:</strong>
                Hardware location: Locker 3-Alpha in Service Module. Contains pre-filled cardiac autoinjectors, biphasic defibrillator, quick-don positive pressure oxygen masks, and sterile microgravity surgical restraint kit.
              </div>
            </div>

          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-zinc-800 bg-zinc-900">
          <div className="text-xs text-zinc-400 font-mono-space">
            Emergency System operates 100% offline during DSN latency
          </div>

          <button
            onClick={() => {
              stopSiren();
              clearInterval(cprIntervalRef.current);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-hud text-xs font-bold transition-colors"
          >
            Acknowledge & Return to Control Deck
          </button>
        </div>

      </div>
    </div>
  );
}
