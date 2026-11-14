import React, { useState } from 'react';
import { 
  Sliders, 
  AlertTriangle, 
  Zap, 
  RotateCcw, 
  Activity, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Radio
} from 'lucide-react';

export default function AnomalySimulatorBar({ onInjectAnomaly, onResetNominal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeScenarioName, setActiveScenarioName] = useState('Nominal Baseline');

  const scenarios = [
    {
      id: 'nominal',
      name: 'Nominal Baseline',
      desc: 'All systems within standard NASA-STD-3001 tolerances',
      action: () => {
        setActiveScenarioName('Nominal Baseline');
        onResetNominal();
      }
    },
    {
      id: 'hypoxia',
      name: 'Acute Hypoxia & Tachycardia',
      desc: 'SpO2 drops to 84%, HR surges to 124 bpm',
      action: () => {
        setActiveScenarioName('Acute Hypoxia');
        onInjectAnomaly({
          organId: 'metabolic_respiratory',
          status: 'critical',
          triageLevel: 'RED',
          overrideMetric: 'SpO2: 84% (Critical Deficit)'
        });
      }
    },
    {
      id: 'spe_flare',
      name: 'Solar Particle Event (SPE) Radiation Surge',
      desc: 'Proton flux > 100 MeV, dose surges to 42 mSv/hr',
      action: () => {
        setActiveScenarioName('SPE Radiation Surge');
        onInjectAnomaly({
          organId: 'radiation_immune',
          status: 'critical',
          triageLevel: 'RED',
          overrideMetric: 'Radiation Rate: 42 mSv/hr (SPE ALARM)'
        });
      }
    },
    {
      id: 'sans_spike',
      name: 'Severe SANS Frisén Grade 3.0',
      desc: 'ONSD 6.8 mm, choroidal folds & severe blur',
      action: () => {
        setActiveScenarioName('Severe SANS Edema');
        onInjectAnomaly({
          organId: 'neuro_ocular',
          status: 'critical',
          triageLevel: 'RED',
          overrideMetric: 'Frisén Grade 3.0 (ONSD: 6.8mm)'
        });
      }
    },
    {
      id: 'hypercapnia',
      name: 'Cabin Hypercapnia CO2 Spike',
      desc: 'pCO2 surges to 4.2 mmHg (stagnant micro-pocket)',
      action: () => {
        setActiveScenarioName('Hypercapnia CO2 Spike');
        onInjectAnomaly({
          organId: 'metabolic_respiratory',
          status: 'warning',
          triageLevel: 'AMBER',
          overrideMetric: 'Cabin pCO2: 4.2 mmHg (Elevated)'
        });
      }
    }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
      
      {/* Collapsible Trigger Pill - Centered HUD Control Bar */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-zinc-900/95 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-hud text-xs font-semibold shadow-2xl backdrop-blur-md transition-all cursor-pointer ring-1 ring-black/5 dark:ring-white/10"
        >
          <Sliders className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          <span className="font-bold tracking-wider">JUDGE'S TEST BENCH:</span>
          <span className="text-amber-600 dark:text-amber-400 font-mono-space font-bold">{activeScenarioName}</span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Anomaly Control Tray */}
      {isOpen && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-88 sm:w-96 max-w-[calc(100vw-2rem)] p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-2 duration-150 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="font-hud font-bold text-xs text-zinc-900 dark:text-white uppercase tracking-wider">
                Interactive Anomaly Injection Panel
              </span>
            </div>
            <span className="text-[10px] font-mono-space text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 font-semibold">
              DEMO BENCH
            </span>
          </div>

          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            Inject real-time spaceflight medical anomalies to test how MARK XI, the Bio-Avatar, and J.A.R.V.I.S. react autonomously.
          </p>

          <div className="space-y-1.5">
            {scenarios.map(sc => {
              const isSelected = activeScenarioName === sc.name;
              return (
                <button
                  key={sc.id}
                  onClick={sc.action}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all text-xs font-mono-space flex items-center justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-800 border-amber-500 shadow-md ring-1 ring-amber-500/80 text-zinc-900 dark:text-white font-bold'
                      : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-hud font-bold text-xs truncate text-zinc-900 dark:text-white">
                      {sc.name}
                    </div>
                    <div className="text-[10px] leading-tight mt-0.5 text-zinc-500 dark:text-zinc-400">
                      {sc.desc}
                    </div>
                  </div>

                  {isSelected ? (
                    <span className="text-amber-800 dark:text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 shrink-0">
                      ACTIVE
                    </span>
                  ) : (
                    <span className="text-zinc-500 dark:text-zinc-400 text-[10px] shrink-0 font-semibold">
                      INJECT →
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400">
            <span>NASA STD-3001 Engine</span>
            <button
              onClick={() => {
                setActiveScenarioName('Nominal Baseline');
                onResetNominal();
              }}
              className="text-zinc-900 dark:text-white hover:underline font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset Nominal
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
