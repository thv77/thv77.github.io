import React from 'react';
import { 
  Users, 
  Heart, 
  Activity, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Radio, 
  Sparkles, 
  ChevronRight,
  UserPlus,
  Settings
} from 'lucide-react';

export default function SquadHealthRadar({
  missionMode,
  missionProfile,
  crewList,
  activeCrew,
  setActiveCrew,
  onOpenMissionManager
}) {
  if (missionMode !== 'expedition') {
    return null;
  }

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-3.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white shrink-0">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-hud font-bold text-xs uppercase text-zinc-900 dark:text-white tracking-wider truncate">
                Expedition Squad Health Radar <span className="hidden md:inline">(Peer-to-Peer Mesh)</span>
              </h3>
              <span className="text-[9px] px-1.5 py-0.2 rounded font-mono-space bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-300 dark:border-emerald-500/30 shrink-0">
                LIVE MESH ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono-space truncate">
              {missionProfile.name} • {crewList.length} Astronauts Monitored in Real-Time
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenMissionManager}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-hud font-bold border border-zinc-300 dark:border-zinc-700 transition-colors shadow-sm shrink-0"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Manage Mission & Roster</span>
          </button>
        </div>
      </div>

      {/* Cross-Crew Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {crewList.map((astronaut) => {
          const isSelected = activeCrew.id === astronaut.id;
          const health = astronaut.overallHealthIndex || 88;
          const isCaution = health < 90 && health >= 75;
          const isWarning = health < 75;

          return (
            <div
              key={astronaut.id}
              onClick={() => setActiveCrew(astronaut)}
              className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-emerald-500/10 dark:bg-emerald-950/40 text-zinc-900 dark:text-white border-emerald-500 shadow-lg ring-2 ring-emerald-500/80'
                  : isWarning 
                    ? 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-500/50 hover:border-red-400' 
                    : isCaution 
                      ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300/80 dark:border-amber-500/40 hover:border-amber-400' 
                      : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200/50 dark:border-zinc-800/60">
                <div className="min-w-0 pr-2">
                  <div className="font-hud font-bold text-xs truncate text-zinc-900 dark:text-white">
                    {astronaut.name.split(',')[0]}
                  </div>
                  <div className="text-[10px] font-mono-space truncate text-zinc-500 dark:text-zinc-400">
                    {astronaut.role}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`font-hud font-extrabold text-sm ${
                    isWarning ? 'text-red-500' : isCaution ? 'text-amber-500' : 'text-emerald-500 dark:text-emerald-400'
                  }`}>
                    {health}%
                  </span>
                </div>
              </div>

              {/* Vitals row */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono-space mb-2">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-red-500 animate-pulse shrink-0" />
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {astronaut.hr || '72 bpm'}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-1">
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                    astronaut.evaStatus && astronaut.evaStatus.includes('RESTRICTED')
                      ? 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30'
                      : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {astronaut.evaStatus && astronaut.evaStatus.includes('RESTRICTED') ? 'EVA RESTRICTED' : 'EVA CLEARED'}
                  </span>
                </div>
              </div>

              {/* Status indicator bar */}
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    isWarning ? 'bg-red-500' : isCaution ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${health}%` }}
                />
              </div>

              {isSelected && (
                <div className="mt-2 text-[9px] font-mono-space font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                  <span>ACTIVE TWIN</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

