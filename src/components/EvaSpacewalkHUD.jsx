import React, { useState, useEffect } from 'react';
import {
  Compass,
  Heart,
  Droplet,
  Radio,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Wind,
  Flame,
  Clock,
  Maximize2,
  Minimize2,
  X,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function EvaSpacewalkHUD({
  activeCrew,
  currentEnv = 'mars',
  onClose
}) {
  const [missionElapsed, setMissionElapsed] = useState(14820); // 4 hrs 7 mins (14820s)
  const [heartRate, setHeartRate] = useState(82);
  const [suitPressure, setSuitPressure] = useState(4.3); // 4.3 psi pure O2
  const [o2Primary, setO2Primary] = useState(88); // %
  const [co2Scrubber, setCo2Scrubber] = useState(24); // % saturation
  const [coolingWater, setCoolingWater] = useState(79); // %
  const [metabolicRate, setMetabolicRate] = useState(1280); // BTU/hr
  const [radLevel, setRadLevel] = useState(18.4); // µSv/hr

  useEffect(() => {
    const timer = setInterval(() => {
      setMissionElapsed(prev => prev + 1);
      // Small realistic fluctuations
      setHeartRate(prev => Math.floor(80 + Math.sin(Date.now() / 2000) * 4));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatElapsed = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-700/60 text-blue-600 dark:text-blue-400">
              <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud font-bold text-base text-zinc-900 dark:text-white tracking-wide uppercase">
                  EVA Spacewalk Visor & Extravehicular HUD
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono-space bg-blue-500 text-white font-bold">
                  PLSS SUIT TELEMETRY
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono-space mt-0.5">
                NASA xEMU / Artemis Surface Mobility Suit Interface • Operator: <strong>{activeCrew.name}</strong> • Location: <strong>Jezero Crater Traverse</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-space text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-medium">
            EVA TIME: <strong className="text-emerald-600 dark:text-emerald-400">{formatElapsed(missionElapsed)} MET</strong>
          </span>
        </div>
      </div>

      {/* Realistic Curved Helmet Visor Simulation Viewport */}
      <div className="relative rounded-3xl overflow-hidden bg-black border-2 border-emerald-500/60 shadow-2xl p-6 md:p-8 min-h-[480px] flex flex-col justify-between text-emerald-400 font-hud">
        
        {/* Visor Glare & Curved Glass Edge Lighting */}
        <div className="absolute inset-0 bg-radial from-emerald-950/20 via-black to-zinc-950 pointer-events-none opacity-90" />
        <div className="absolute inset-x-8 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent pointer-events-none blur-[1px]" />
        <div className="absolute inset-x-8 bottom-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent pointer-events-none blur-[1px]" />

        {/* Top Visor Telemetry Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-emerald-500/30 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <span className="text-xs font-bold tracking-widest text-emerald-300">
                SUIT ID: NASA-xEMU-042 • AIRLOCK DEPLOYED
              </span>
              <div className="text-[10px] font-mono-space text-emerald-500/80">
                Primary Oxygen Pressure Regulated: 100% O2 Microclimate
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono-space">
            <div>
              <span className="text-[10px] text-zinc-500 block">SUIT PRESSURE</span>
              <span className="font-bold text-base text-white">{suitPressure} PSI</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 block">O2 TIME LEFT</span>
              <span className="font-bold text-base text-emerald-300">05h 42m</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 block">METABOLIC WORK</span>
              <span className="font-bold text-base text-amber-400">{metabolicRate} BTU/hr</span>
            </div>
          </div>
        </div>

        {/* Center Visor Crosshair & Heads-Up Display */}
        <div className="relative z-10 my-8 flex items-center justify-center">
          <div className="relative w-48 h-48 border border-emerald-500/20 rounded-full flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 border border-emerald-500/30 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 border border-emerald-500/50 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              </div>
            </div>
            <div className="absolute inset-x-0 h-px bg-emerald-500/30" />
            <div className="absolute inset-y-0 w-px bg-emerald-500/30" />
            <span className="absolute -top-3 text-[10px] font-mono-space bg-black/80 px-2 text-emerald-400">
              HORIZON PITCH 00°
            </span>
          </div>
        </div>

        {/* Bottom Visor Life-Support Array */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-emerald-500/30 pt-4 text-xs font-mono-space">
          
          {/* Heart & Biometrics */}
          <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 backdrop-blur-md">
            <div className="text-[10px] text-zinc-400 flex items-center gap-1.5">
              <Heart className="w-3 h-3 text-red-500 animate-pulse" />
              HEART RATE
            </div>
            <div className="text-xl font-bold text-white mt-1">
              {heartRate} <span className="text-xs text-zinc-400">BPM</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">SpO2: 99% • Sinus Rhythm</div>
          </div>

          {/* O2 Remaining */}
          <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 backdrop-blur-md">
            <div className="text-[10px] text-zinc-400 flex items-center gap-1.5">
              <Wind className="w-3 h-3 text-blue-400" />
              PRIMARY O2 BOTTLE
            </div>
            <div className="text-xl font-bold text-white mt-1">
              {o2Primary}%
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1 mt-1.5">
              <div className="bg-emerald-400 h-1 rounded-full" style={{ width: `${o2Primary}%` }} />
            </div>
          </div>

          {/* CO2 Scrubber */}
          <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 backdrop-blur-md">
            <div className="text-[10px] text-zinc-400 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-amber-400" />
              LiOH CO2 SCRUBBER
            </div>
            <div className="text-xl font-bold text-white mt-1">
              {co2Scrubber}% <span className="text-xs text-zinc-400">Sat</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">pCO2: 1.8 mmHg (Nominal)</div>
          </div>

          {/* Liquid Cooling Garment */}
          <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 backdrop-blur-md">
            <div className="text-[10px] text-zinc-400 flex items-center gap-1.5">
              <Droplet className="w-3 h-3 text-cyan-400" />
              LCG WATER LOOP
            </div>
            <div className="text-xl font-bold text-white mt-1">
              14.2°C
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Sublimator: {coolingWater}% Full</div>
          </div>

        </div>

      </div>

      {/* Safety Matrix Footer */}
      <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-space">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>NASA-STD-3001 EVA Spacewalk Limit: Max heart rate 145 bpm • Abort trigger 4.0 psi.</span>
        </div>
        <button
          onClick={() => alert("Emergency EVA Abort Signal Sent to Artemis Basecamp Airlock.")}
          className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-hud text-xs font-bold transition-all shadow cursor-pointer"
        >
          Signal Emergency Airlock Ingress
        </button>
      </div>

    </div>
  );
}

