import React, { useState, useEffect } from 'react';
import {
  Zap,
  Activity,
  Heart,
  Droplet,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Cpu,
  Layers,
  Radio,
  Sliders,
  Sparkles,
  Lock,
  Unlock,
  Power
} from 'lucide-react';

export default function RoboticMedicalBay({
  activeCrew,
  soundEnabled = true
}) {
  // Infusion Pumps State
  const [pumps, setPumps] = useState([
    {
      id: 'pump-a',
      drug: 'Ondansetron HCl (Zofran)',
      indication: 'Space Adaptation Syndrome (SAS) & Severe Emesis',
      concentration: '4 mg / 50 mL Normal Saline',
      targetRate: 25, // mL/hr
      currentRate: 0,
      infusedVol: 12.4,
      totalVol: 50,
      active: false,
      status: 'Standby / Armed'
    },
    {
      id: 'pump-b',
      drug: 'Epinephrine Emergency Syringe',
      indication: 'Cardiac Arrest / Anaphylaxis / Asystole Override',
      concentration: '1 mg / 10 mL (1:10,000)',
      targetRate: 60,
      currentRate: 0,
      infusedVol: 0,
      totalVol: 10,
      active: false,
      status: 'Safety Interlock Engaged'
    },
    {
      id: 'pump-c',
      drug: 'Sterile Electrolyte Rehydration Surge',
      indication: 'Acute Hypovolemia & Calcium Resorption Flush',
      concentration: 'Balanced Ringer Lactate',
      targetRate: 150,
      currentRate: 0,
      infusedVol: 340,
      totalVol: 1000,
      active: true,
      status: 'Infusing at 150 mL/hr'
    }
  ]);

  // LBNP (Lower Body Negative Pressure) Chamber State
  const [lbnpActive, setLbnpActive] = useState(false);
  const [lbnpPressure, setLbnpPressure] = useState(-35); // -35 mmHg target
  const [lbnpSessionTime, setLbnpSessionTime] = useState(1200); // 20 mins (1200s)
  const [fluidShiftIndex, setFluidShiftIndex] = useState(62); // % cephalad fluid centralization

  useEffect(() => {
    let interval;
    if (lbnpActive) {
      interval = setInterval(() => {
        setLbnpSessionTime(prev => Math.max(0, prev - 1));
        setFluidShiftIndex(prev => Math.max(22, prev - 0.4)); // Fluid drains back to legs!
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lbnpActive]);

  const togglePump = (id) => {
    setPumps(pumps.map(p => {
      if (p.id === id) {
        const nextState = !p.active;
        return {
          ...p,
          active: nextState,
          currentRate: nextState ? p.targetRate : 0,
          status: nextState ? `Actively Infusing (${p.targetRate} mL/hr)` : 'Standby / Paused'
        };
      }
      return p;
    }));
  };

  const toggleLbnp = () => {
    setLbnpActive(!lbnpActive);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 text-emerald-600 dark:text-emerald-400">
              <Zap className="w-4 h-4 text-emerald-500 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud font-bold text-base text-zinc-900 dark:text-white tracking-wide uppercase">
                  Robotic Medical Bay & Closed-Loop Actuators
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono-space bg-emerald-500 text-white font-bold">
                  AUTONOMOUS INTERVENTION
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono-space mt-0.5">
                Automated Micro-Infusion Syringe Arrays • Chibis LBNP Cephalad Fluid Countermeasure • Active Patient: <strong>{activeCrew.name}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-space text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-medium">
            HARDWARE INTERLOCK: <strong className="text-emerald-600 dark:text-emerald-400">AUTO-ARMED</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Automated Micro-Infusion Pumps */}
        <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <span className="font-hud font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
              <Droplet className="w-4 h-4 text-emerald-500" />
              Closed-Loop Syringe Pumps & Drug Delivery
            </span>
            <span className="text-[10px] font-mono-space text-zinc-500">
              TITRATION SAFETY PROTOCOL
            </span>
          </div>

          <div className="space-y-3">
            {pumps.map((pump) => (
              <div
                key={pump.id}
                className={`p-4 rounded-xl border transition-all ${
                  pump.active
                    ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/60'
                    : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-hud font-bold text-sm text-zinc-900 dark:text-white">
                        {pump.drug}
                      </h4>
                      {pump.active && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-mono-space bg-emerald-500 text-white font-bold animate-pulse">
                          INFUSING
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono-space text-zinc-500 mt-0.5">
                      Indication: {pump.indication}
                    </div>
                    <div className="text-[10px] font-mono-space text-zinc-400 mt-0.5">
                      Concentration: {pump.concentration}
                    </div>
                  </div>

                  <button
                    onClick={() => togglePump(pump.id)}
                    className={`px-3 py-1.5 rounded-lg font-hud text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      pump.active
                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow'
                        : 'bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black shadow'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{pump.active ? 'Stop Infusion' : 'Deploy Dose'}</span>
                  </button>
                </div>

                {/* Progress bar of infused volume */}
                <div className="space-y-1 mt-3">
                  <div className="flex justify-between text-[10px] font-mono-space text-zinc-500">
                    <span>Flow Rate: <strong>{pump.currentRate} mL/hr</strong></span>
                    <span>Delivered: <strong>{pump.infusedVol} / {pump.totalVol} mL</strong></span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${pump.active ? 'bg-emerald-500' : 'bg-zinc-400 dark:bg-zinc-600'}`}
                      style={{ width: `${(pump.infusedVol / pump.totalVol) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Chibis Lower Body Negative Pressure (LBNP) Chamber */}
        <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-3">
              <span className="font-hud font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-500" />
                Chibis LBNP Vacuum Countermeasure
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono-space bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold border border-zinc-300 dark:border-zinc-700">
                SANS MITIGATION
              </span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono-space leading-relaxed mb-4">
              Counteracts microgravity cephalad fluid shift by applying negative vacuum pressure to the astronaut's lower extremities. Restores normal ocular perfusion and reduces Optic Nerve Sheath Diameter (ONSD).
            </p>

            {/* Live Chamber HUD readout */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center space-y-3">
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-[9px] font-mono-space text-zinc-400 uppercase">CHAMBER VACUUM</div>
                  <div className="text-xl font-hud font-extrabold text-emerald-600 dark:text-emerald-400">
                    {lbnpActive ? `${lbnpPressure} mmHg` : '0.0 mmHg'}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-[9px] font-mono-space text-zinc-400 uppercase">SESSION TIMER</div>
                  <div className="text-xl font-hud font-extrabold text-zinc-900 dark:text-white">
                    {formatTime(lbnpSessionTime)}
                  </div>
                </div>
              </div>

              {/* Cephalad Fluid Shift Gauge */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between text-[10px] font-mono-space text-zinc-500">
                  <span>Cephalad Fluid Pressure Index:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{fluidShiftIndex.toFixed(0)}% (Normalizing)</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${fluidShiftIndex}%` }}
                  />
                </div>
              </div>

              <button
                onClick={toggleLbnp}
                className={`w-full py-2.5 px-4 rounded-xl font-hud text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  lbnpActive
                    ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                <Power className="w-4 h-4" />
                <span>{lbnpActive ? 'Disengage LBNP Vacuum' : 'Execute 20-Min LBNP Decompression'}</span>
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 text-xs font-mono-space text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Closed-loop algorithms automatically adjust infusion rate and LBNP seal based on real-time heart rate and blood pressure telemetry.</span>
          </div>
        </div>

      </div>

    </div>
  );
}

