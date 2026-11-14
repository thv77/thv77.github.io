import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Heart, 
  Eye, 
  Bone, 
  Brain, 
  Radio, 
  Flame, 
  Play, 
  RotateCcw,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { CREW_MEMBERS } from '../data/nasaHrpData';

export default function CrewReadinessMatrix({ 
  onSelectCrew, 
  activeCrew,
  crewList = CREW_MEMBERS,
  onOpenMissionManager
}) {
  // SPE Emergency Drill State
  const [speDrillActive, setSpeDrillActive] = useState(false);
  const [drillTimeLeft, setDrillTimeLeft] = useState(900); // 15 minutes (900 seconds)
  const [drillSteps, setDrillSteps] = useState([
    { id: 1, text: 'Confirm CPDS active dosimeter alarm (> 100 MeV protons detected)', done: true },
    { id: 2, text: 'Power down non-essential habitat avionics to mitigate EMP latch-up', done: false },
    { id: 3, text: 'Reroute water-wall ballast to central shelter bulkhead', done: false },
    { id: 4, text: 'All 3 crew members secure within storm shelter sleeping modules', done: false }
  ]);

  const toggleDrillStep = (id) => {
    setDrillSteps(drillSteps.map(s => s.id === id ? { ...s, done: !s.done } : s));
  };

  const startDrill = () => {
    setSpeDrillActive(true);
    setDrillTimeLeft(900);
  };

  const crewDetails = [
    {
      id: 'crew-01',
      name: 'CDR Sarah Chen',
      role: 'Commander',
      evaStatus: 'CLEARED (WITH CHEATER LENS)',
      evaClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      hr: '72 bpm',
      bp: '118/76',
      sans: 'Grade 1.5 (Mild)',
      sansClass: 'text-amber-400',
      bmd: '-1.1% / mo',
      pvt: '218 ms (0 lapses)',
      rad: '128.4 mSv',
      sleep: '7.2 hrs (86%)',
      overall: 88
    },
    {
      id: 'crew-02',
      name: 'PLT Marcus Vance',
      role: 'Systems Pilot',
      evaStatus: 'RESTRICTED (MUSCLE FATIGUE)',
      evaClass: 'bg-red-500/20 text-red-400 border-red-500/40',
      hr: '78 bpm',
      bp: '122/80',
      sans: 'Grade 0.5 (Trace)',
      sansClass: 'text-emerald-400',
      bmd: '-1.8% / mo (High Loss)',
      pvt: '264 ms (1 lapse)',
      rad: '134.1 mSv',
      sleep: '5.8 hrs (68%)',
      overall: 82
    },
    {
      id: 'crew-03',
      name: 'Dr. Elena Rostova',
      role: 'Crew Medical Officer',
      evaStatus: 'OPTIMAL (PRIMARY LEAD)',
      evaClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      hr: '64 bpm',
      bp: '112/70',
      sans: 'Grade 0 (Nominal)',
      sansClass: 'text-emerald-400',
      bmd: '-0.4% / mo',
      pvt: '198 ms (0 lapses)',
      rad: '121.2 mSv',
      sleep: '7.8 hrs (92%)',
      overall: 94
    }
  ];

  const displayCrew = crewList.map((c) => {
    const existing = crewDetails.find(d => d.id === c.id);
    if (existing) {
      return { ...existing, ...c, overall: c.overallHealthIndex || existing.overall };
    }
    return {
      id: c.id,
      name: c.name,
      role: c.role,
      evaStatus: c.evaStatus || 'CLEARED FOR EVA',
      evaClass: c.evaClass || 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      hr: c.hr || '72 bpm',
      bp: c.bp || '118/76',
      sans: 'Grade 0 (Nominal)',
      sansClass: 'text-emerald-400',
      bmd: '-0.6% / mo',
      pvt: '210 ms (0 lapses)',
      rad: '124.0 mSv',
      sleep: '7.5 hrs (90%)',
      overall: c.overallHealthIndex || 92
    };
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header & Emergency Simulation Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
        <div>
          <h2 className="font-hud font-bold text-base text-zinc-900 dark:text-white tracking-wide uppercase flex items-center gap-2">
            <Users className="w-5 h-5 text-zinc-900 dark:text-white" />
            Crew Flight-Readiness Matrix & EVA Clearance
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-space">
            Mission-wide biomedical comparison for Artemis/Mars exploration duties ({crewList.length} Astronauts Enrolled)
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onOpenMissionManager && (
            <button
              onClick={onOpenMissionManager}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-hud text-xs font-bold transition-all shadow-sm"
            >
              <Users className="w-4 h-4 text-emerald-500" />
              <span>Manage Roster ({crewList.length})</span>
            </button>
          )}

          <button
            onClick={startDrill}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-500/60 text-red-300 font-hud text-xs font-bold transition-all shadow-lg glow-red"
          >
            <Radio className="w-4 h-4 animate-spin" />
            <span>Launch Solar Storm (SPE) Drill</span>
          </button>
        </div>
      </div>

      {/* SOLAR PARTICLE EVENT (SPE) EMERGENCY DRILL BANNER */}
      {speDrillActive && (
        <div className="p-5 rounded-2xl bg-red-950/80 border-2 border-red-500 text-zinc-100 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-red-500/40 mb-3 gap-2">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-6 h-6 text-red-400 animate-bounce" />
              <div>
                <h3 className="font-hud text-base font-extrabold text-red-200 tracking-wider">
                  SOLAR PARTICLE EVENT (SPE) ALERT DRILL ACTIVE
                </h3>
                <span className="text-xs text-red-300 font-mono-space">
                  Coronal Mass Ejection Inbound • Solar Proton Flux &gt; 100 MeV
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="font-mono-space text-lg font-bold text-white px-3 py-1 rounded bg-black/60 border border-red-500">
                T-MINUS 14:48
              </div>
              <button
                onClick={() => setSpeDrillActive(false)}
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-mono-space"
              >
                End Drill
              </button>
            </div>
          </div>

          <div className="space-y-2 font-mono-space text-xs">
            <span className="text-zinc-300 font-bold block mb-1">
              EMERGENCY SHELTER PROTOCOL CHECKLIST:
            </span>
            {drillSteps.map(step => (
              <div
                key={step.id}
                onClick={() => toggleDrillStep(step.id)}
                className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                  step.done ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' : 'bg-black/40 border-red-900/60 text-zinc-300'
                }`}
              >
                <span>{step.id}. {step.text}</span>
                <span>{step.done ? '✓ VERIFIED' : 'PENDING'}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Multi-Crew Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayCrew.map((c) => {
          const isSelected = activeCrew.id === c.id;
          return (
            <div
              key={c.id}
              onClick={() => {
                const member = crewList.find(m => m.id === c.id) || c;
                if (member) onSelectCrew(member);
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected 
                  ? 'bg-emerald-500/10 dark:bg-emerald-950/40 text-zinc-900 dark:text-white border-emerald-500 shadow-xl ring-2 ring-emerald-500/80' 
                  : 'bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:border-zinc-400 dark:hover:border-zinc-700'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-3">
                  <div>
                    <h3 className="font-hud font-bold text-sm text-zinc-900 dark:text-white">
                      {c.name}
                    </h3>
                    <span className="text-[11px] font-mono-space text-zinc-500 dark:text-zinc-400">{c.role}</span>
                  </div>

                  <div className="text-right">
                    <span className={`font-hud text-2xl font-extrabold ${isSelected ? 'text-emerald-500 dark:text-emerald-400' : 'text-zinc-900 dark:text-zinc-200'}`}>
                      {c.overall}%
                    </span>
                    <span className={`text-[10px] block font-mono-space ${isSelected ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-400'}`}>READINESS</span>
                  </div>
                </div>

                {/* EVA Spacewalk Clearance Badge */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono-space text-zinc-400 block mb-1">
                    EVA SPACEWALK STATUS:
                  </span>
                  <div className={`p-2 rounded-lg border font-mono-space text-xs font-bold text-center ${c.evaClass}`}>
                    {c.evaStatus}
                  </div>
                </div>

                {/* Parameter Matrix */}
                <div className="space-y-2 text-xs font-mono-space">
                  <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-emerald-400" /> Cardiovascular
                    </span>
                    <span className="text-white font-semibold">{c.hr} | {c.bp}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-amber-400" /> SANS Vision
                    </span>
                    <span className={`font-semibold ${c.sansClass}`}>{c.sans}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Bone className="w-3.5 h-3.5 text-zinc-300" /> Bone Density
                    </span>
                    <span className="text-white font-semibold">{c.bmd}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-white" /> PVT Vigilance
                    </span>
                    <span className="text-white font-semibold">{c.pvt}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-white" /> Cumulative Rad
                    </span>
                    <span className="text-white font-semibold">{c.rad}</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" /> Sleep Architecture
                    </span>
                    <span className="text-white font-semibold">{c.sleep}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-center">
                <span className={`text-xs font-hud font-bold ${isSelected ? 'text-emerald-500 dark:text-emerald-400' : 'text-zinc-600 dark:text-zinc-400'}`}>
                  {isSelected ? '● ACTIVE TELEMETRY PROFILE' : 'Select to Switch Profile →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

