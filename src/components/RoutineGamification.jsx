import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  CheckCircle, 
  Circle, 
  Award, 
  Dumbbell, 
  Heart, 
  Droplet, 
  Eye, 
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { DAILY_ROUTINE_HABITS } from '../data/nasaHrpData';

export default function RoutineGamification({ activeCrew }) {
  const [habits, setHabits] = useState(DAILY_ROUTINE_HABITS);

  const toggleHabit = (id) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const totalPoints = habits.reduce((acc, h) => acc + (h.completed ? h.points : 0), 0);
  const maxPoints = habits.reduce((acc, h) => acc + h.points, 0);
  const completionPercentage = Math.round((totalPoints / maxPoints) * 100);

  const badges = [
    {
      id: 'b1',
      title: 'Bone Density Defender',
      desc: 'Completed 30 consecutive ARED heavy resistance training cycles.',
      tier: 'Gold',
      unlocked: true,
      icon: 'Dumbbell'
    },
    {
      id: 'b2',
      title: 'Circadian Master',
      desc: 'Maintained 85%+ sleep efficiency across 14 consecutive mission sols.',
      tier: 'Platinum',
      unlocked: true,
      icon: 'Zap'
    },
    {
      id: 'b3',
      title: 'SANS Optic Guardian',
      desc: 'Logged 100% of required weekly orbital ultrasonography exams.',
      tier: 'Silver',
      unlocked: false,
      icon: 'Eye'
    },
    {
      id: 'b4',
      title: 'Radiation Sentinel',
      desc: 'Zero GCR threshold exceedance through proactive habitat shielding.',
      tier: 'Gold',
      unlocked: true,
      icon: 'ShieldCheck'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner: AstroScore & Streak */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Total Points & Level */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-hud text-zinc-400 uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>AstroScore Biometric Points</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-hud text-4xl font-extrabold text-white tracking-tight">{totalPoints}</span>
              <span className="text-xs font-mono-space text-zinc-400">/ {maxPoints} PTS</span>
            </div>
            <p className="text-[11px] text-zinc-200 font-mono-space mt-1">
              Status: Mission Flight-Ready
            </p>
          </div>

          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="#1e293b" strokeWidth="5" fill="none" />
              <circle 
                cx="32" 
                cy="32" 
                r="26" 
                stroke="#ffffff" 
                strokeWidth="5" 
                fill="none" 
                strokeDasharray={163} 
                strokeDashoffset={163 - (163 * completionPercentage) / 100}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute font-hud font-bold text-xs text-white">
              {completionPercentage}%
            </span>
          </div>
        </div>

        {/* Mission Day Streak */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-hud text-zinc-400 uppercase tracking-wider">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Countermeasure Streak</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-hud text-4xl font-extrabold text-orange-400 tracking-tight">142</span>
              <span className="text-xs font-mono-space text-zinc-400">SOLS</span>
            </div>
            <p className="text-[11px] text-orange-300/80 font-mono-space mt-1">
              All 6 Crew Members on Schedule
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <Flame className="w-7 h-7 animate-bounce" />
          </div>
        </div>

        {/* Active Astronaut Status */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-hud text-zinc-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Overall Health Readiness</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-hud text-4xl font-extrabold text-emerald-400 tracking-tight">
                {activeCrew.overallHealthIndex}%
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono-space mt-1">
              {activeCrew.name.split(',')[0]} (CDR)
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Award className="w-7 h-7" />
          </div>
        </div>

      </div>

      {/* Routine Task List */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
          <div>
            <h3 className="font-hud text-base font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <Zap className="w-5 h-5 text-white" />
              Daily Spaceflight Medical Routine Checklist
            </h3>
            <p className="text-xs text-zinc-400 font-mono-space">
              NASA Human Research Program mandated daily countermeasures
            </p>
          </div>

          <span className="text-xs font-mono-space text-zinc-200">
            {habits.filter(h => h.completed).length} of {habits.length} Complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {habits.map((habit) => (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                habit.completed
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <button className="text-zinc-400 hover:text-white transition-colors">
                  {habit.completed ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-500" />
                  )}
                </button>

                <div>
                  <div className={`text-xs font-hud font-bold ${habit.completed ? 'text-zinc-300 line-through' : 'text-white'}`}>
                    {habit.title}
                  </div>
                  <div className="text-[11px] font-mono-space text-zinc-400">
                    {habit.target} • <span className="text-white">{habit.category}</span>
                  </div>
                </div>
              </div>

              <span className={`text-xs font-mono-space font-bold px-2 py-0.5 rounded ${
                habit.completed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-950 text-zinc-400'
              }`}>
                +{habit.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* NASA Space Medicine Achievement Badges */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
          <div>
            <h3 className="font-hud text-base font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              NASA Human Exploration Badges & Accreditations
            </h3>
            <p className="text-xs text-zinc-400 font-mono-space">
              Recognizing sustained physical conditioning and psychological resilience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                b.unlocked
                  ? 'bg-zinc-900 border-amber-500/40 glow-amber'
                  : 'bg-zinc-950/60 border-zinc-800 opacity-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="p-2 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    <Award className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-mono-space px-1.5 py-0.5 rounded uppercase font-bold text-amber-300 bg-amber-500/20">
                    {b.tier}
                  </span>
                </div>
                <h4 className="font-hud font-bold text-xs text-white mb-1">
                  {b.title}
                </h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  {b.desc}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-zinc-800 text-[10px] font-mono-space text-zinc-400">
                {b.unlocked ? '✓ UNLOCKED & VERIFIED' : 'IN PROGRESS'}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

