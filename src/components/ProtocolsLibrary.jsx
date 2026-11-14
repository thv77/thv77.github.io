import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  FileText, 
  ExternalLink, 
  Activity, 
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { ORGAN_SYSTEMS } from '../data/nasaHrpData';

export default function ProtocolsLibrary({ onSelectOrgan }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHazard, setSelectedHazard] = useState('ALL');

  const hazards = ['ALL', 'Radiation', 'Isolation', 'Distance', 'Gravity', 'Environment'];

  const filteredSystems = ORGAN_SYSTEMS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.hrpCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHazard = selectedHazard === 'ALL' || s.hazard.toLowerCase().includes(selectedHazard.toLowerCase());
    return matchesSearch && matchesHazard;
  });

  return (
    <div className="space-y-6">
      
      {/* Search and Hazard Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div>
          <h2 className="font-hud font-bold text-base text-white tracking-wide uppercase flex items-center gap-2">
            <FileText className="w-5 h-5 text-white" />
            NASA Human Research Program (HRP) Clinical Protocols
          </h2>
          <p className="text-xs text-zinc-400 font-mono-space">
            Standard medical operating guidelines for deep-space missions (NASA-STD-3001)
          </p>
        </div>

        {/* Hazard Quick Filter */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono-space">
          {hazards.map(h => (
            <button
              key={h}
              onClick={() => setSelectedHazard(h)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedHazard === h
                  ? 'bg-white text-black font-bold text-black font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Protocols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSystems.map((sys) => (
          <div
            key={sys.id}
            className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono-space text-white font-semibold">
                  {sys.hrpCode}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono-space font-bold ${
                  sys.status === 'warning' 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  {sys.triageLevel}
                </span>
              </div>

              <h3 className="font-hud text-base font-bold text-white mb-1">
                {sys.name}
              </h3>

              <div className="text-[11px] font-mono-space text-zinc-400 mb-3">
                Hazard: <span className="text-zinc-200">{sys.hazard}</span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-4">
                {sys.summary}
              </p>

              {/* Protocol Steps Preview */}
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-sans space-y-2 mb-4">
                <span className="text-[11px] font-hud font-bold text-zinc-300 uppercase block">
                  Mandated Countermeasures:
                </span>
                {sys.countermeasures.map((cm, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-zinc-300 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                    <span><strong>{cm.title}:</strong> {cm.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectOrgan(sys)}
              className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 font-hud text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              Open Full Clinical Guideline <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

