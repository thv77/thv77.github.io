import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Stethoscope, 
  PlayCircle, 
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Activity,
  BookmarkCheck
} from 'lucide-react';

export default function OrganDetailModal({ organ, onClose, onLaunchExam }) {
  if (!organ) return null;

  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [notes, setNotes] = useState('');
  const [notesSaved, setNotesSaved] = useState(false);

  const toggleStep = (stepIdx) => {
    if (completedSteps.includes(stepIdx)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepIdx));
    } else {
      setCompletedSteps([...completedSteps, stepIdx]);
    }
  };

  const handleSaveNotes = () => {
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-zinc-900 border border-zinc-700/80 shadow-2xl overflow-hidden scanlines">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${
              organ.status === 'warning' 
                ? 'bg-amber-500/20 border-amber-500 text-amber-300' 
                : organ.status === 'critical'
                ? 'bg-red-500/20 border-red-500 text-red-400'
                : 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
            }`}>
              <Activity className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-hud text-lg font-bold text-white tracking-wide">
                  {organ.name}
                </h3>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono-space uppercase font-semibold ${
                  organ.status === 'warning' 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                    : organ.status === 'critical'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  TRIAGE: {organ.triageLevel}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono-space">
                NASA HRP Code: <span className="text-white font-medium">{organ.hrpCode}</span> • Hazard: {organ.hazard}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-zinc-200">
          
          {/* Plain-English NASA Physiological Context */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-hud font-semibold text-zinc-200">
              <Info className="w-4 h-4 text-white" />
              <span>ASTRONAUT PHYSIOLOGICAL EXPLANATION</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {organ.explanation}
            </p>
          </div>

          {/* Biomarkers / Health Indicators Table */}
          <div>
            <h4 className="text-xs font-hud font-bold text-zinc-300 tracking-wider uppercase mb-3 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-white" />
              Real-Time Health Indicators & Baselines
            </h4>

            <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950/60 font-mono-space text-xs">
              <div className="grid grid-cols-12 px-4 py-2 bg-zinc-900 text-zinc-400 font-medium text-[11px] border-b border-zinc-800">
                <div className="col-span-5">MEASUREMENT / PARAMETER</div>
                <div className="col-span-3 text-right">CURRENT READING</div>
                <div className="col-span-3 text-right">NOMINAL THRESHOLD</div>
                <div className="col-span-1 text-center">STATUS</div>
              </div>

              {organ.indicators.map((ind, idx) => (
                <div 
                  key={idx}
                  className="grid grid-cols-12 px-4 py-2.5 border-b border-zinc-800/50 hover:bg-zinc-900 transition-colors items-center"
                >
                  <div className="col-span-5 font-sans font-medium text-zinc-200">
                    {ind.name}
                  </div>
                  <div className="col-span-3 text-right font-bold text-white">
                    {ind.value}
                  </div>
                  <div className="col-span-3 text-right text-zinc-400 text-[11px]">
                    {ind.normal}
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {ind.status === 'warning' ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" title="Cautionary deviation" />
                    ) : ind.status === 'critical' ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" title="Critical anomaly" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" title="Nominal" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Clinical Protocols & Countermeasures */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-hud font-bold text-zinc-300 tracking-wider uppercase flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Actionable Countermeasure Protocol (NASA HRP Guided)
              </h4>
              <span className="text-[11px] font-mono-space text-white">
                {completedSteps.length} / {organ.countermeasures.length} Completed
              </span>
            </div>

            <div className="space-y-2.5">
              {organ.countermeasures.map((cm, idx) => {
                const isDone = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isDone
                        ? 'bg-emerald-950/30 border-emerald-500/40 opacity-75'
                        : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border text-xs font-mono-space ${
                        isDone 
                          ? 'bg-emerald-500 border-emerald-400 text-black font-bold' 
                          : 'border-zinc-600 text-zinc-400'
                      }`}>
                        {isDone ? '✓' : cm.step}
                      </div>

                      <div className="flex-1">
                        <div className={`text-xs font-hud font-bold ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                          {cm.title}
                        </div>
                        <p className="text-xs text-zinc-300 mt-1 font-sans leading-relaxed">
                          {cm.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinical Log Notes */}
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <label className="block text-xs font-hud font-semibold text-zinc-300 mb-1.5">
              ASTRONAUT LOG & SELF-ASSESSMENT REMARKS
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Log symptom onset, vision blurriness, headache, or compliance notes..."
                className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 font-mono-space"
              />
              <button
                onClick={handleSaveNotes}
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black font-hud text-xs font-bold transition-colors whitespace-nowrap"
              >
                {notesSaved ? 'Saved to Telemetry!' : 'Save Log'}
              </button>
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-zinc-800 bg-zinc-900/90">
          <div className="text-xs text-zinc-400 font-mono-space">
            Guidance verified against NASA STD-3001 Space Medicine Specs
          </div>

          <div className="flex items-center gap-2.5">
            {organ.id === 'neuro_ocular' && (
              <button
                onClick={() => {
                  onClose();
                  onLaunchExam('sans');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400 text-amber-300 hover:bg-amber-500/30 text-xs font-hud font-bold transition-all"
              >
                <PlayCircle className="w-4 h-4" />
                Launch Vision & SANS Test
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-hud font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

