import React, { useState } from 'react';
import { 
  Pill, 
  Radio, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles, 
  Zap, 
  Clock, 
  Package,
  Layers,
  FlaskConical,
  Play
} from 'lucide-react';

export default function SpacePharmacyTracker() {
  const [medications, setMedications] = useState([
    {
      id: 'med-1',
      name: 'Amoxicillin / Clavulanate',
      category: 'Broad-Spectrum Antibiotic',
      indication: 'Bacterial infection, wound sepsis',
      stock: 48,
      unit: 'tablets',
      potency: 82.4, // percentage
      degradationRate: 'High (Radiation Accelerated)',
      doseComp: '+15% Dose Adjustment',
      status: 'warning'
    },
    {
      id: 'med-2',
      name: 'Epinephrine Autoinjector (1 mg)',
      category: 'Emergency Cardiovascular',
      indication: 'Cardiac arrest, anaphylactic shock',
      stock: 6,
      unit: 'syringes',
      potency: 91.8,
      degradationRate: 'Moderate (Shielded in Lead Ampule)',
      doseComp: 'Standard Dose',
      status: 'nominal'
    },
    {
      id: 'med-3',
      name: 'Alendronate Sodium (70 mg)',
      category: 'Bisphosphonate Antiresorptive',
      indication: 'Severe bone mineral density loss',
      stock: 24,
      unit: 'weekly doses',
      potency: 88.2,
      degradationRate: 'Moderate',
      doseComp: 'Standard Weekly Schedule',
      status: 'nominal'
    },
    {
      id: 'med-4',
      name: 'Zolpidem / Melatonin Extended-Release',
      category: 'Neuro-Hypnotic & Circadian Reset',
      indication: 'Severe sleep disruption, circadian desynchrony',
      stock: 60,
      unit: 'capsules',
      potency: 78.5,
      degradationRate: 'High Photolytic Sensitivity',
      doseComp: '+20% Dose Adjustment',
      status: 'warning'
    },
    {
      id: 'med-5',
      name: 'Morphine Sulfate (10 mg/mL)',
      category: 'Analgesia / Trauma Pain Control',
      indication: 'Bone fractures, major trauma',
      stock: 8,
      unit: 'vials',
      potency: 74.2,
      degradationRate: 'Severe Ionizing Radiolysis',
      doseComp: 'Requires Re-Synthesis',
      status: 'critical'
    }
  ]);

  // 3D Medicine Synthesizer Simulation State
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthSuccess, setSynthSuccess] = useState(null);

  const handleSynthesizeFresh = (medId) => {
    setIsSynthesizing(true);
    setSynthSuccess(null);

    setTimeout(() => {
      setIsSynthesizing(false);
      setMedications(prev => prev.map(m => {
        if (m.id === medId) {
          return {
            ...m,
            potency: 99.8,
            status: 'nominal',
            doseComp: 'Standard Pure Dose (Fresh Synthesis)'
          };
        }
        return m;
      }));
      setSynthSuccess(`Successfully synthesized 100% pure molecular batch!`);
      setTimeout(() => setSynthSuccess(null), 3500);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 scanlines">
        <div>
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-white" />
            <h2 className="font-hud font-bold text-base text-white tracking-wide uppercase">
              Autonomous Space Pharmacy & Radiation Degradation Tracker
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-mono-space">
            Tracking cosmic ray radiolysis of shelf-stable pharmaceuticals & on-demand molecular printing
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-space">
          <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300">
            RAD FACTOR: <strong className="text-zinc-200">1.42 mSv/day cumulative</strong>
          </span>
        </div>
      </div>

      {/* Synthesis Success Banner */}
      {synthSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-mono-space text-xs animate-in zoom-in-95 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{synthSuccess}</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-bold">NASA BIOMANUFACTURING SPEC</span>
        </div>
      )}

      {/* Medication Inventory & Potency Matrix */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
          <div>
            <h3 className="font-hud text-base font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <Package className="w-4 h-4 text-white" />
              Onboard Medical Pack (AMP) Drug Locker
            </h3>
            <p className="text-xs text-zinc-400 font-mono-space">
              Real-time active pharmaceutical ingredient (API) potency under deep space ionizing radiation
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {medications.map((m) => {
            const isDegraded = m.potency < 80;
            return (
              <div
                key={m.id}
                className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-hud font-bold text-sm text-white">{m.name}</span>
                    <span className={`text-[10px] px-2 py-0.2 rounded font-mono-space font-bold ${
                      m.status === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                      m.status === 'warning' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {m.potency}% POTENCY
                    </span>
                  </div>

                  <div className="text-[11px] text-zinc-400 font-mono-space">
                    Class: <span className="text-zinc-300">{m.category}</span> • Indication: {m.indication}
                  </div>

                  <div className="text-[11px] font-mono-space text-zinc-200">
                    Clinical Guidance: <span className="text-white font-semibold">{m.doseComp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right text-xs font-mono-space mr-2">
                    <div className="text-zinc-300 font-bold">{m.stock} {m.unit}</div>
                    <div className="text-[10px] text-zinc-500">In Locker 3-A</div>
                  </div>

                  <button
                    onClick={() => handleSynthesizeFresh(m.id)}
                    disabled={isSynthesizing}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/40 text-zinc-200 hover:text-white font-hud text-xs font-bold transition-all disabled:opacity-40"
                  >
                    <FlaskConical className="w-3.5 h-3.5 text-white" />
                    <span>3D Print Fresh Batch</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Space Pharmacokinetics Context */}
      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3 text-xs text-zinc-300 font-sans">
        <Radio className="w-5 h-5 text-white mt-0.5 shrink-0" />
        <div>
          <strong className="text-white block font-hud mb-1">
            NASA TRANSLATIONAL RESEARCH INSTITUTE FOR SPACE HEALTH (TRISH) INSIGHT:
          </strong>
          Terrestrial drug expiration dates assume a 1g environment with Earth's magnetosphere blocking solar cosmic rays. In deep space, high-energy heavy ions split complex molecules into inactive fragments, accelerating degradation. MARK XI automatically recalculates pharmacodynamic dosages and triggers on-demand microfluidic synthesis before toxic metabolite thresholds are reached.
        </div>
      </div>

    </div>
  );
}

