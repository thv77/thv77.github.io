import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  AreaChart, 
  Area,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  Bone, 
  Radio, 
  Brain, 
  Thermometer, 
  ShieldCheck, 
  HelpCircle,
  Clock
} from 'lucide-react';
import { 
  BMD_DEGRADATION_DATA, 
  RADIATION_ACCUMULATION_DATA, 
  VITAL_SIGNS_STREAM 
} from '../data/nasaHrpData';

export default function TrendAnalytics() {
  const [selectedChart, setSelectedChart] = useState('bmd');

  // Custom Dark HUD Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg bg-zinc-950 border border-zinc-700 p-2.5 shadow-xl text-xs font-mono-space">
          <p className="font-bold text-zinc-200 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="flex justify-between gap-4">
              <span>{entry.name}:</span>
              <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Selector Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-white" />
            <h2 className="font-hud font-bold text-base text-white tracking-wide uppercase">
              NASA HRP Long-Duration Degradation Trends
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-mono-space">
            Longitudinal biometric modeling across 180-day deep space mission timeline
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 rounded-xl bg-zinc-900 p-1 border border-zinc-700/60 text-xs">
          <button
            onClick={() => setSelectedChart('bmd')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              selectedChart === 'bmd'
                ? 'bg-white text-black font-bold text-black font-bold shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Bone className="w-3.5 h-3.5" />
            <span>Bone Mineral Density</span>
          </button>

          <button
            onClick={() => setSelectedChart('radiation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              selectedChart === 'radiation'
                ? 'bg-white text-black font-bold text-black font-bold shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Radiation Dosimetry</span>
          </button>

          <button
            onClick={() => setSelectedChart('circadian')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              selectedChart === 'circadian'
                ? 'bg-white text-black font-bold text-black font-bold shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>24h Vitals & Temp</span>
          </button>
        </div>
      </div>

      {/* CHART VIEW 1: BONE MINERAL DENSITY (BMD) */}
      {selectedChart === 'bmd' && (
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-zinc-800 mb-6 gap-2">
            <div>
              <h3 className="font-hud text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Bone className="w-5 h-5 text-amber-400" />
                Cancellous Bone Mineral Loss vs. ARED Exercise Countermeasure
              </h3>
              <p className="text-xs text-zinc-400 font-mono-space">
                Demonstrating osteoclast mitigation through Advanced Resistive Exercise Device (ARED)
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono-space">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> With ARED (Current: 97.5%)
              </span>
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span> Without Countermeasure (91.0%)
              </span>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={BMD_DEGRADATION_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis domain={[85, 105]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="earthBaseline" 
                  name="Earth 1g Baseline" 
                  stroke="#38bdf8" 
                  strokeDasharray="5 5" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="withARED" 
                  name="With ARED Heavy Resistance" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#10b981' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="withoutARED" 
                  name="Zero-G Inaction Projection" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  strokeDasharray="3 3" 
                  dot={{ r: 3, fill: '#ef4444' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-hud font-bold text-white block">CLINICAL TAKEAWAY FOR THE CREW:</span>
              Without daily axial mechanical impact (deadlifts/squats), astronauts lose ~1% of bone density each month. 
              Consistently completing daily 45-minute ARED routines reduces cumulative loss by over 70%, preventing irreversible osteopenia before Mars arrival.
            </div>
          </div>
        </div>
      )}

      {/* CHART VIEW 2: SPACE RADIATION DOSIMETRY */}
      {selectedChart === 'radiation' && (
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-zinc-800 mb-6 gap-2">
            <div>
              <h3 className="font-hud text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Radio className="w-5 h-5 text-white" />
                Cumulative Radiation Ingestion vs. NASA Career Limit
              </h3>
              <p className="text-xs text-zinc-400 font-mono-space">
                Galactic Cosmic Rays (GCR) biodosimetry tracking (600 mSv max allowable exposure)
              </p>
            </div>

            <div className="text-xs font-mono-space text-zinc-200">
              Current Cumulative: <span className="font-bold text-white">128.4 mSv</span> / 600 mSv
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RADIATION_ACCUMULATION_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="radColor" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" label={{ value: 'Mission Day', position: 'insideBottom', offset: -5, fill: '#64748b' }} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis domain={[0, 700]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} unit=" mSv" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="cumulativeDose" 
                  name="Accumulated Dose (mSv)" 
                  stroke="#ffffff" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#radColor)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="safeThreshold" 
                  name="NASA Exploration Career Limit (600 mSv)" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  strokeDasharray="4 4" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-3">
            <Radio className="w-5 h-5 text-white mt-0.5 shrink-0" />
            <div>
              <span className="font-hud font-bold text-white block">RADIATION MONITORING PROTOCOL:</span>
              On deep space transit to Mars, radiation accumulation is ~1.4 mSv/day. If an SPE (Solar Particle Event) alert triggers, crew must shelter in the storm refuge bay surrounded by water and food ballast within 15 minutes.
            </div>
          </div>
        </div>
      )}

      {/* CHART VIEW 3: 24-HOUR CIRCADIAN CORE TEMP & VITALS */}
      {selectedChart === 'circadian' && (
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-zinc-800 mb-6 gap-2">
            <div>
              <h3 className="font-hud text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-zinc-200" />
                24-Hour Circadian Core Temperature & Heart Rate Fluctuations
              </h3>
              <p className="text-xs text-zinc-400 font-mono-space">
                Tracking spaceflight circadian rhythm shifts and resting metabolic rate
              </p>
            </div>

            <div className="text-xs font-mono-space text-zinc-300">
              Peak Core Temp: <span className="text-zinc-200 font-bold">37.5 °C</span> (12:00 MET)
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={VITAL_SIGNS_STREAM} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis yAxisId="left" domain={[36.0, 38.0]} stroke="#ffffff" tick={{ fill: '#ffffff', fontSize: 11 }} unit="°C" />
                <YAxis yAxisId="right" orientation="right" domain={[55, 95]} stroke="#10b981" tick={{ fill: '#10b981', fontSize: 11 }} unit=" bpm" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="temp" 
                  name="Core Temp (°C)" 
                  stroke="#ffffff" 
                  strokeWidth={3} 
                  dot={{ r: 4 }} 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="hr" 
                  name="Heart Rate (BPM)" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-3">
            <Clock className="w-5 h-5 text-white mt-0.5 shrink-0" />
            <div>
              <span className="font-hud font-bold text-white block">SPACE CIRCDIAN ENTRAINMENT:</span>
              Due to microgravity convection impairment, astronauts exhibit ~0.8°C elevation in resting core body temperature ("Space Fever"). Cabin solid-state lighting shifts from 6500K blue-enriched daylight to 2700K amber in evening hours to preserve melatonin release.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

