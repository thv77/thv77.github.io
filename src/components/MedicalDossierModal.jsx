import React from 'react';
import { 
  X, 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Activity,
  Award
} from 'lucide-react';

export default function MedicalDossierModal({ activeCrew, currentEnv, organSystems, onClose }) {
  if (!activeCrew) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const reportData = {
      mission: 'Artemis Deep Space Mars Transit',
      missionDay: activeCrew.missionDay,
      patient: activeCrew.name,
      role: activeCrew.role,
      bloodType: activeCrew.bloodType,
      readinessIndex: activeCrew.overallHealthIndex,
      environment: currentEnv,
      timestamp: new Date().toISOString(),
      vitalSigns: {
        heartRate: '72 bpm',
        bloodPressure: '118/76 mmHg',
        bloodOxygen: '98.5%',
        coreBodyTemp: '37.4 C',
        cumulativeRadiation: '128.4 mSv'
      },
      organSystems: organSystems.map(o => ({
        system: o.name,
        status: o.status,
        triageLevel: o.triageLevel,
        primaryValue: o.primaryValue
      })),
      jarvisClinicalSummary: 'SANS Frisén Grade 1.5 identified. Chibis LBNP suit countermeasure completed. Patient cleared for mission duty.'
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `NASA_MEDICAL_DOSSIER_${activeCrew.id}_MD142.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Dossier Card */}
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-zinc-900 border-2 border-zinc-700/60 shadow-2xl overflow-hidden scanlines">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-700/40 text-white">
              <FileText className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-hud font-bold text-base text-white tracking-wide uppercase">
                  NASA FORM 1047: FLIGHT MEDICAL DOSSIER
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono-space bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  VERIFIED FLIGHT RECORD
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono-space">
                Deep Space Exploration Medical Certification • Mission Day 142
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

        {/* Scrollable Printable Document Area */}
        <div className="p-6 overflow-y-auto space-y-5 text-zinc-200 font-mono-space text-xs">
          
          {/* Official Letterhead Header */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex justify-between items-center text-xs">
            <div>
              <div className="font-hud font-extrabold text-sm text-zinc-200">
                NATIONAL AERONAUTICS AND SPACE ADMINISTRATION
              </div>
              <div className="text-[11px] text-zinc-400">
                Space Medicine Operations Division • Johnson Space Center (JSC)
              </div>
            </div>
            <div className="text-right text-[11px] text-zinc-400">
              <div>DOC ID: <strong className="text-white">NASA-MED-2026-142A</strong></div>
              <div>SECURITY: <strong className="text-emerald-400">MISSION RESTRICTED</strong></div>
            </div>
          </div>

          {/* Astronaut Profile Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block">Crew Member</span>
              <span className="font-bold text-white text-xs">{activeCrew.name}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block">Mission Duty</span>
              <span className="font-bold text-white text-xs">{activeCrew.role}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block">Blood Group</span>
              <span className="font-bold text-zinc-200 text-xs">{activeCrew.bloodType}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block">Flight Readiness</span>
              <span className="font-bold text-emerald-400 text-xs">{activeCrew.overallHealthIndex}% (Optimal)</span>
            </div>
          </div>

          {/* Vitals Summary Table */}
          <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950">
            <div className="px-4 py-2 bg-zinc-900 text-zinc-400 font-bold text-[11px] border-b border-zinc-800">
              OFFICIAL 24-HOUR BIOMETRIC BASELINE
            </div>
            <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>Resting HR: <strong className="text-white">72 bpm</strong></div>
              <div>Blood Pressure: <strong className="text-white">118/76 mmHg</strong></div>
              <div>Blood Oxygen: <strong className="text-white">98.5% SpO2</strong></div>
              <div>Core Body Temp: <strong className="text-white">37.4 °C</strong></div>
              <div>Cumulative Dose: <strong className="text-zinc-200">128.4 mSv</strong></div>
              <div>PVT Reaction: <strong className="text-emerald-400">218 ms (0 lapses)</strong></div>
              <div>BMD Loss Rate: <strong className="text-amber-400">-1.1% / mo</strong></div>
              <div>SANS Grade: <strong className="text-amber-400">Grade 1.5</strong></div>
            </div>
          </div>

          {/* Clinical Sign-Off */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs font-sans">
            <div className="font-hud font-bold text-white uppercase text-xs">
              J.A.R.V.I.S. Space Surgeon Diagnostic Summary & Endorsement:
            </div>
            <p className="text-zinc-300 leading-relaxed text-[11px]">
              "Astronaut presents with mild Spaceflight-Associated Neuro-ocular Syndrome (SANS Grade 1.5) secondary to microgravity cephalad fluid redistribution. Successfully managed via 45-minute Chibis LBNP suit decompression. Bone mineral density retention stabilized at 97.5% through daily ARED mechanical loading. Patient is medically CLEARED for mission orbital duties and scheduled 6.5-hr EVA spacewalk."
            </p>
            <div className="pt-2 flex justify-between items-center text-[10px] font-mono-space text-zinc-400 border-t border-zinc-800">
              <span>DIGITAL SIGNATURE: J.A.R.V.I.S. MD-AI / JSC FLIGHT SURGEON</span>
              <span className="text-emerald-400">CRYPTOGRAPHICALLY STAMPED</span>
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-zinc-800 bg-zinc-900">
          <div className="text-xs text-zinc-400 font-mono-space">
            Compliant with NASA-STD-3001 Telemetry Standards
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-space-700 text-white font-hud text-xs font-bold transition-all border border-zinc-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-hud text-xs font-bold transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Telemetry JSON</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

