import React, { useState } from 'react';
import {
  HelpCircle,
  Bug,
  BookOpen,
  Send,
  Download,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Sparkles,
  X,
  Terminal,
  Activity,
  Cpu,
  ShieldAlert,
  Mic,
  Camera,
  Layers,
  FileText
} from 'lucide-react';

export default function HelpPracaModal({
  isOpen,
  onClose,
  activeCrew,
  currentEnv,
  missionProfile,
  theme
}) {
  const [activeTab, setActiveTab] = useState('help'); // 'help' | 'praca'

  // PRACA Bug Report Form State
  const [severity, setSeverity] = useState('medium'); // 'low' | 'medium' | 'high' | 'critical'
  const [category, setCategory] = useState('ui_hud'); // 'ui_hud' | 'biometrics' | 'avatar_3d' | 'voice_stealth' | 'comm_dsn' | 'other'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reportedBy, setReportedBy] = useState(activeCrew?.name ? activeCrew.name.split(',')[0] : 'Commander');
  const [transmissionStatus, setTransmissionStatus] = useState('idle'); // 'idle' | 'transmitting' | 'sent'
  const [trackingId, setTrackingId] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  if (!isOpen) return null;

  const handleTransmitReport = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setTransmissionStatus('transmitting');
    const generatedId = `PRACA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrackingId(generatedId);

    const reportPayload = {
      trackingId: generatedId,
      timestamp: new Date().toISOString(),
      missionDay: missionProfile?.missionDay || 142,
      missionProfile: missionProfile?.name || 'Ares IV Mars Surface Expedition',
      environment: currentEnv,
      reportedBy,
      activeCrewMember: activeCrew?.name || 'CDR Sarah Connor',
      severity,
      category,
      incidentTitle: title.trim(),
      incidentDescription: description.trim() || 'No additional narrative provided.',
      telemetrySnapshot: {
        heartRate: activeCrew?.hr || '72 bpm',
        bloodPressure: activeCrew?.bp || '118/76',
        healthIndex: `${activeCrew?.overallHealthIndex || 88}%`,
        screenResolution: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'
      },
      nasaStandardAlignment: 'NASA-STD-3001 Vol 1 & NASA-HRP PRACA Rev D'
    };

    setSubmittedData(reportPayload);

    // Simulate Deep Space burst transmission delay
    setTimeout(() => {
      setTransmissionStatus('sent');
    }, 1800);
  };

  const handleDownloadJSON = () => {
    if (!submittedData) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submittedData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `NASA_${submittedData.trackingId}_DISCREPANCY_LOG.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetForm = () => {
    setTitle('');
    setDescription('');
    setTransmissionStatus('idle');
    setSubmittedData(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-colors">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md z-10 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white shrink-0">
              {activeTab === 'help' ? (
                <HelpCircle className="w-5 h-5 text-cyan-500" />
              ) : (
                <Bug className="w-5 h-5 text-amber-500 animate-pulse" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-hud font-bold text-base sm:text-lg text-zinc-900 dark:text-white tracking-wide uppercase truncate">
                  {activeTab === 'help' ? "Flight Deck Help & System Guide" : "NASA PRACA Anomaly Dispatch"}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono-space bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 font-bold uppercase shrink-0">
                  {activeTab === 'help' ? "OPERATIONS MANUAL" : "FORM 1048-A"}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-space truncate">
                {activeTab === 'help'
                  ? "Interactive astronaut operations guide & NASA Space Apps Challenge context"
                  : "Problem Reporting and Corrective Action • Avionics telemetry discrepancy log"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-300 dark:border-zinc-700 transition-colors shrink-0 cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector Segment */}
        <div className="px-4 sm:px-6 pt-3 pb-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900/50">
          <button
            onClick={() => setActiveTab('help')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-hud text-xs font-bold transition-all cursor-pointer border ${
              activeTab === 'help'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Flight Deck User Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('praca')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-hud text-xs font-bold transition-all cursor-pointer border ${
              activeTab === 'praca'
                ? 'bg-amber-500 text-black border-amber-500 shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Bug className="w-3.5 h-3.5" />
            <span>Report Anomaly / Bug (PRACA)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">

          {/* ============================================================ */}
          {/* TAB 1: FLIGHT DECK HELP & USER GUIDE                         */}
          {/* ============================================================ */}
          {activeTab === 'help' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Mission Summary Callout */}
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-3">
                <Radio className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                <div className="text-xs text-zinc-800 dark:text-zinc-200 font-sans leading-relaxed">
                  <strong className="text-zinc-900 dark:text-white block font-hud text-sm mb-0.5">
                    MARK XI • NASA Space Apps Challenge 2026
                  </strong>
                  Autonomous astronaut clinical decision support solving the <strong>14–22 min communication latency</strong> between Earth and deep-space crews (Artemis Lunar Basecamp & Crewed Mars missions).
                </div>
              </div>

              {/* Quick Operation Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                
                {/* 3D Bio-Avatar */}
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-hud font-bold text-zinc-900 dark:text-white uppercase">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    3D Digital Twin Navigation
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    • <strong>Rotate 360°</strong>: Click and drag anywhere on the human model.<br />
                    • <strong>Zoom</strong>: Scroll mouse wheel or use +/- buttons.<br />
                    • <strong>Inspect Organs</strong>: Click highlighted anatomical nodes (Brain, Heart, Viscera) to launch clinical countermeasures.
                  </p>
                </div>

                {/* S.T.E.A.L.T.H. Voice Assistant */}
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-hud font-bold text-zinc-900 dark:text-white uppercase">
                    <Mic className="w-4 h-4 text-cyan-400" />
                    Hands-Free Voice Assistant
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    • Click the <strong>floating mic orb</strong> at the bottom-left corner.<br />
                    • Say: <em>"Read my vitals"</em>, <em>"Open pharmacy"</em>, <em>"Select Dr. Rostova"</em>, or <em>"Trigger Code Red"</em>.<br />
                    • Fully operational with speech synthesis audio readback.
                  </p>
                </div>

                {/* Optical Biometrics Scanner */}
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-hud font-bold text-zinc-900 dark:text-white uppercase">
                    <Camera className="w-4 h-4 text-purple-400" />
                    Webcam rPPG & PERCLOS Eye Tracker
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    • Navigate to the <strong>Optical Biometrics</strong> module.<br />
                    • Real-time remote photoplethysmography extracts pulse from micro-color skin shifts.<br />
                    • Tracks blink duration to catch astronaut cognitive fatigue.
                  </p>
                </div>

                {/* Anomaly Simulator Test Bench */}
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-hud font-bold text-zinc-900 dark:text-white uppercase">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Judge's Test Bench Anomaly Pill
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    • Click the centered bottom pill <strong>JUDGE'S TEST BENCH</strong>.<br />
                    • Live-inject acute hypoxia, solar proton flare, or severe SANS edema.<br />
                    • Watch the Bio-Avatar and J.A.R.V.I.S. react autonomously in real-time.
                  </p>
                </div>

              </div>

              {/* Troubleshooting & Offline Resilience Notice */}
              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 space-y-2">
                <span className="font-hud font-bold text-xs uppercase text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  Offline Deep Space Resilience
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono-space leading-relaxed">
                  MARK XI operates 100% client-side without relying on cloud APIs, adhering to NASA-STD-3001 spaceflight autonomy mandates.
                </p>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: NASA PRACA DISCREPANCY & BUG REPORTER                 */}
          {/* ============================================================ */}
          {activeTab === 'praca' && (
            <div className="space-y-5 animate-in fade-in">
              
              {transmissionStatus === 'sent' ? (
                /* Success Screen */
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-hud font-bold text-lg text-emerald-800 dark:text-emerald-300 uppercase">
                      Anomaly Dispatched to Houston Flight Operations
                    </h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono-space mt-1">
                      Tracking ID: <strong className="text-zinc-900 dark:text-white font-bold">{trackingId}</strong> • Logged into Mission Day {missionProfile?.missionDay || 142} Archive
                    </p>
                  </div>

                  <p className="text-xs text-zinc-700 dark:text-zinc-300 font-sans max-w-md mx-auto leading-relaxed">
                    Telemetry payload encrypted and buffered for Deep Space Network (DSN) uplink. Your discrepancy report has been documented under NASA PRACA protocol.
                  </p>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleDownloadJSON}
                      className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-hud text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PRACA Dossier (.JSON)</span>
                    </button>
                    <button
                      onClick={handleResetForm}
                      className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-hud text-xs font-semibold border border-zinc-300 dark:border-zinc-700 transition-colors cursor-pointer"
                    >
                      File Another Report
                    </button>
                  </div>
                </div>
              ) : (
                /* Submission Form */
                <form onSubmit={handleTransmitReport} className="space-y-4">
                  
                  {/* Context Auto-Capture Banner */}
                  <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-space">
                    <div>
                      <span className="text-zinc-500">AUTO-CAPTURED TELEMETRY:</span>
                      <div className="font-bold text-zinc-900 dark:text-white mt-0.5">
                        Day {missionProfile?.missionDay || 142} • {currentEnv.toUpperCase()} 0G • Patient: {activeCrew?.name ? activeCrew.name.split(',')[0] : 'CDR'}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-300 dark:border-emerald-500/40">
                      TELEMETRY MESH ATTACHED
                    </span>
                  </div>

                  {/* Severity & Category Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-mono-space uppercase text-zinc-500 mb-1 font-semibold">
                        Anomaly Severity Level
                      </label>
                      <select
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-mono-space text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 cursor-pointer"
                      >
                        <option value="low">Low: Cosmetic UI / Display Glitch</option>
                        <option value="medium">Medium: Telemetry Latency / Lag</option>
                        <option value="high">High: Biometric Discrepancy / Math</option>
                        <option value="critical">Critical: Spaceflight Hardware Anomaly</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-space uppercase text-zinc-500 mb-1 font-semibold">
                        Affected Subsystem / Module
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-mono-space text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 cursor-pointer"
                      >
                        <option value="ui_hud">HUD / Viewport Layout & Alignment</option>
                        <option value="avatar_3d">3D Bio-Avatar Anatomical Rig</option>
                        <option value="biometrics">Webcam rPPG / Eye Tracker Scanner</option>
                        <option value="voice_stealth">S.T.E.A.L.T.H. Voice Assistant</option>
                        <option value="comm_dsn">Deep Space Comm Latency Uplink</option>
                        <option value="pharmacy">Space Pharmacy / Radiation Radiolysis</option>
                        <option value="other">General Feedback / Feature Suggestion</option>
                      </select>
                    </div>
                  </div>

                  {/* Incident Title */}
                  <div>
                    <label className="block text-[11px] font-mono-space uppercase text-zinc-500 mb-1 font-semibold">
                      Incident Summary / Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. SANS Frisén calculation offset or mobile viewport wrapping..."
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-sans text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  {/* Incident Description */}
                  <div>
                    <label className="block text-[11px] font-mono-space uppercase text-zinc-500 mb-1 font-semibold">
                      Discrepancy Details & Observed Symptoms
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what occurred, steps to reproduce, or suggestions for Johnson Space Center engineering..."
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-sans text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={transmissionStatus === 'transmitting'}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-hud text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {transmissionStatus === 'transmitting' ? (
                        <>
                          <Radio className="w-4 h-4 animate-spin text-black" />
                          <span>Uplinking to Deep Space Network...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit PRACA Anomaly to Houston Flight Operations</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:px-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between text-[11px] font-mono-space text-zinc-500">
          <span>NASA HUMAN RESEARCH PROGRAM (HRP)</span>
          <span className="font-bold text-zinc-900 dark:text-white">MARK XI v1.0.0</span>
        </div>

      </div>

    </div>
  );
}
