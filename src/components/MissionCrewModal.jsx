import React, { useState } from 'react';
import { 
  Users, 
  User, 
  UserPlus, 
  Rocket, 
  ShieldCheck, 
  ShieldAlert, 
  Heart, 
  Activity, 
  Radio, 
  X, 
  Check, 
  Sparkles, 
  FileText, 
  Globe, 
  Moon, 
  AlertTriangle,
  Lock,
  Trash2
} from 'lucide-react';

export default function MissionCrewModal({
  isOpen,
  onClose,
  missionMode,
  setMissionMode,
  missionProfile,
  setMissionProfile,
  crewList,
  setCrewList,
  activeCrew,
  setActiveCrew,
  currentEnv,
  setCurrentEnv
}) {
  const [activeTab, setActiveTab] = useState(missionMode); // 'expedition' | 'solo'

  // New Crew Member Form State
  const [isAddingCrew, setIsAddingCrew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Flight Engineer');
  const [newAge, setNewAge] = useState(36);
  const [newBloodType, setNewBloodType] = useState('O-Positive');
  const [newBaselineHR, setNewBaselineHR] = useState(70);

  // Mission Config Form State
  const [missionName, setMissionName] = useState(missionProfile.name);
  const [missionDestination, setMissionDestination] = useState(currentEnv);

  if (!isOpen) return null;

  const handleSaveMission = (e) => {
    e.preventDefault();
    setMissionProfile({
      ...missionProfile,
      name: missionName,
      destination: missionDestination
    });
    setCurrentEnv(missionDestination);
  };

  const handleAddAstronaut = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newId = `crew-${Date.now().toString().slice(-4)}`;
    const newAstronaut = {
      id: newId,
      name: newName.trim(),
      role: newRole,
      age: parseInt(newAge) || 35,
      bloodType: newBloodType,
      missionDay: missionProfile.missionDay || 142,
      avatar: '',
      status: 'Nominal - Mission Ready',
      overallHealthIndex: 95,
      hr: `${newBaselineHR} bpm`,
      bp: '120/78',
      spo2: '98%',
      evaStatus: 'CLEARED FOR EVA',
      evaClass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
    };

    const updated = [...crewList, newAstronaut];
    setCrewList(updated);
    setActiveCrew(newAstronaut);
    setNewName('');
    setIsAddingCrew(false);
  };

  const handleRemoveCrew = (id) => {
    if (crewList.length <= 1) {
      alert("A mission must have at least one registered crew member.");
      return;
    }
    const updated = crewList.filter(c => c.id !== id);
    setCrewList(updated);
    if (activeCrew.id === id) {
      setActiveCrew(updated[0]);
    }
  };

  const handleSelectMode = (mode) => {
    setActiveTab(mode);
    setMissionMode(mode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative z-50 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col transition-colors custom-scrollbar">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-white shadow-sm">
              <Users className="w-5 h-5 text-zinc-900 dark:text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud font-bold text-lg text-zinc-900 dark:text-white tracking-wide uppercase">
                  Mission & Crew Operations Center
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono-space bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 font-bold uppercase">
                  NASA HRP
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-space">
                Configure flight deployment mode, register astronauts, and inspect squad-wide biometrics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-300 dark:border-zinc-700 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Segmented Tabs */}
        <div className="p-4 sm:p-5 pb-0">
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => handleSelectMode('expedition')}
              className={`p-3 rounded-lg flex items-center justify-center gap-2.5 font-hud text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === 'expedition'
                  ? 'bg-emerald-500/15 dark:bg-emerald-950/60 text-zinc-900 dark:text-white border border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-500" />
              <span>Multi-Crew Expedition ({crewList.length} Active)</span>
            </button>

            <button
              onClick={() => handleSelectMode('solo')}
              className={`p-3 rounded-lg flex items-center justify-center gap-2.5 font-hud text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === 'solo'
                  ? 'bg-emerald-500/15 dark:bg-emerald-950/60 text-zinc-900 dark:text-white border border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <User className="w-4 h-4 text-emerald-500" />
              <span>Solo Astronaut Recon</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-6">

          {/* ========================================================= */}
          {/* TAB 1: MULTI-CREW EXPEDITION MODE                         */}
          {/* ========================================================= */}
          {activeTab === 'expedition' && (
            <div className="space-y-6">

              {/* Mission Metadata Card */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-hud font-bold text-xs uppercase text-zinc-900 dark:text-white tracking-wider">
                      Active Mission Flight Plan
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-space text-zinc-500">
                    MISSION ELAPSED TIME: <strong>SOL {missionProfile.missionDay || 142}</strong>
                  </span>
                </div>

                <form onSubmit={handleSaveMission} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-6">
                    <label className="block text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                      Mission Designation
                    </label>
                    <input
                      type="text"
                      value={missionName}
                      onChange={(e) => setMissionName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs font-hud font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500"
                      placeholder="e.g. Ares IV Mars Surface Expedition"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                      Destination & Shielding
                    </label>
                    <select
                      value={missionDestination}
                      onChange={(e) => setMissionDestination(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs font-mono-space text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 cursor-pointer"
                    >
                      <option value="transit">Deep Space Transit (0.00g)</option>
                      <option value="lunar">Artemis Lunar Base (0.16g)</option>
                      <option value="mars">Mars Surface Colony (0.38g)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 pt-4 sm:pt-0">
                    <button
                      type="submit"
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-hud text-xs font-bold transition-all shadow-sm"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>

              {/* Cross-Crew Health Peer-to-Peer Telemetry Overview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <h3 className="font-hud font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wider">
                      Cross-Crew Telemetry Radar (Buddy System)
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsAddingCrew(!isAddingCrew)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 font-hud text-xs font-bold transition-all shadow-sm"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>{isAddingCrew ? 'Cancel' : 'Register Astronaut'}</span>
                  </button>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans">
                  In autonomous deep-space operations with 14–24 min communication delays, every crew member can inspect the live vitals, radiation exposure, and EVA clearance of their fellow astronauts.
                </p>

                {/* Inline Add Astronaut Form */}
                {isAddingCrew && (
                  <form onSubmit={handleAddAstronaut} className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-700 space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="font-hud font-bold text-xs text-zinc-900 dark:text-white uppercase">
                        New Astronaut Enrollment (NASA Form 1047-B)
                      </span>
                      <span className="text-[10px] font-mono-space text-zinc-500">Autonomous Biosensor Pairing</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono-space text-zinc-500 uppercase mb-1">Full Name & Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Liam Tanaka"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-hud font-bold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono-space text-zinc-500 uppercase mb-1">Mission Role</label>
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-mono-space focus:outline-none"
                        >
                          <option value="Mission Commander">Mission Commander</option>
                          <option value="Chief Medical Officer">Chief Medical Officer</option>
                          <option value="Flight Systems Engineer">Flight Systems Engineer</option>
                          <option value="Astrobiologist Specialist">Astrobiologist Specialist</option>
                          <option value="Payload Specialist">Payload Specialist</option>
                          <option value="EVA Lead Specialist">EVA Lead Specialist</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono-space text-zinc-500 uppercase mb-1">Blood Type & Age</label>
                        <div className="flex gap-2">
                          <select
                            value={newBloodType}
                            onChange={(e) => setNewBloodType(e.target.value)}
                            className="w-2/3 px-2 py-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-mono-space focus:outline-none"
                          >
                            <option value="O-Positive">O+</option>
                            <option value="O-Negative">O-</option>
                            <option value="A-Positive">A+</option>
                            <option value="A-Negative">A-</option>
                            <option value="B-Positive">B+</option>
                            <option value="AB-Positive">AB+</option>
                          </select>
                          <input
                            type="number"
                            value={newAge}
                            onChange={(e) => setNewAge(e.target.value)}
                            className="w-1/3 px-2 py-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-mono-space focus:outline-none"
                            placeholder="Age"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono-space text-zinc-500 uppercase mb-1">Resting Heart Rate</label>
                        <input
                          type="number"
                          value={newBaselineHR}
                          onChange={(e) => setNewBaselineHR(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-mono-space focus:outline-none"
                          placeholder="bpm"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingCrew(false)}
                        className="px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono-space"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-hud text-xs font-bold shadow-md transition-colors"
                      >
                        Enroll into Biosensor Network
                      </button>
                    </div>
                  </form>
                )}

                {/* Astronaut Cards Grid (Peer Vitals) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {crewList.map((astronaut) => {
                    const isActive = activeCrew.id === astronaut.id;
                    const isOptimal = astronaut.overallHealthIndex >= 90;
                    const isCaution = astronaut.overallHealthIndex < 90 && astronaut.overallHealthIndex >= 75;

                    return (
                      <div
                        key={astronaut.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isActive
                            ? 'bg-emerald-500/10 dark:bg-emerald-950/40 text-zinc-900 dark:text-white border-emerald-500 shadow-lg ring-2 ring-emerald-500/80'
                            : 'bg-white dark:bg-zinc-900/70 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:border-zinc-400 dark:hover:border-zinc-600'
                        }`}
                      >
                        <div className="flex items-start justify-between pb-3 border-b border-zinc-200/40 dark:border-zinc-700/40">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-hud font-bold text-sm tracking-wide text-zinc-900 dark:text-white">
                                {astronaut.name}
                              </h4>
                              {isActive && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded font-mono-space font-bold bg-emerald-500 text-white">
                                  CURRENT PATIENT
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-mono-space block text-zinc-500 dark:text-zinc-400">
                              {astronaut.role} • {astronaut.bloodType}
                            </span>
                          </div>

                          <div className="text-right">
                            <span className={`font-hud text-xl font-bold ${
                              isOptimal ? 'text-emerald-500 dark:text-emerald-400' : isCaution ? 'text-amber-500' : 'text-red-500'
                            }`}>
                              {astronaut.overallHealthIndex}%
                            </span>
                            <span className="text-[9px] block font-mono-space uppercase text-zinc-500 dark:text-zinc-400">
                              Health Index
                            </span>
                          </div>
                        </div>

                        {/* Live Peer Telemetry Chips */}
                        <div className="grid grid-cols-3 gap-2 my-3 text-[11px] font-mono-space">
                          <div className={`p-2 rounded-lg border ${
                            isActive ? 'bg-white dark:bg-zinc-900/90 border-emerald-500/30' : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800'
                          }`}>
                            <div className="text-[9px] text-zinc-400">HEART RATE</div>
                            <div className="font-bold flex items-center gap-1 text-zinc-900 dark:text-white">
                              <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                              <span>{astronaut.hr || '72 bpm'}</span>
                            </div>
                          </div>

                          <div className={`p-2 rounded-lg border ${
                            isActive ? 'bg-white dark:bg-zinc-900/90 border-emerald-500/30' : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800'
                          }`}>
                            <div className="text-[9px] text-zinc-400">BLOOD PRESS.</div>
                            <div className="font-bold text-zinc-900 dark:text-white">
                              {astronaut.bp || '118/76'}
                            </div>
                          </div>

                          <div className={`p-2 rounded-lg border ${
                            isActive ? 'bg-white dark:bg-zinc-900/90 border-emerald-500/30' : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800'
                          }`}>
                            <div className="text-[9px] text-zinc-400">EVA STATUS</div>
                            <div className="font-bold text-[10px] text-emerald-600 dark:text-emerald-400 truncate">
                              {astronaut.evaStatus || 'CLEARED'}
                            </div>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-zinc-200/40 dark:border-zinc-700/40">
                          <span className="text-[10px] font-mono-space text-zinc-500">
                            {astronaut.status || 'Nominal Status'}
                          </span>

                          <div className="flex items-center gap-2">
                            {crewList.length > 1 && (
                              <button
                                onClick={() => handleRemoveCrew(astronaut.id)}
                                className={`p-1 rounded text-zinc-400 hover:text-red-500 transition-colors`}
                                title="Remove Astronaut from Roster"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {!isActive && (
                              <button
                                onClick={() => {
                                  setActiveCrew(astronaut);
                                  onClose();
                                }}
                                className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-hud text-[11px] font-bold shadow-sm transition-all"
                              >
                                Focus 3D Twin →
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: SOLO ASTRONAUT MODE                                */}
          {/* ========================================================= */}
          {activeTab === 'solo' && (
            <div className="space-y-5">
              
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-white">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-hud font-bold text-base text-zinc-900 dark:text-white uppercase tracking-wide">
                      Solo Astronaut Reconnaissance Profile
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-space">
                      Private medical encryption active • Standalone local clinical CDSS
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <div className="text-[10px] font-mono-space text-zinc-400 uppercase">Registered Operator</div>
                    <div className="font-hud font-bold text-sm text-zinc-900 dark:text-white">{activeCrew.name}</div>
                    <div className="text-xs font-mono-space text-zinc-500">{activeCrew.role} • Blood: {activeCrew.bloodType}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <div className="text-[10px] font-mono-space text-zinc-400 uppercase">Operational Mode</div>
                    <div className="font-hud font-bold text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" /> SECURE PRIVATE ENCLAVE
                    </div>
                    <div className="text-xs font-mono-space text-zinc-500">Peer-to-peer vital mesh broadcast disabled</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-500/40 text-xs font-mono-space text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Solo Astronaut Flight Rule (NASA-STD-3001):</strong> Without fellow crew members present, all critical physiological anomalies (e.g. acute hypoxia, radiation surge) trigger autonomous robotic intervention protocols and voice synth alarm instructions.
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-hud text-xs font-bold shadow-md transition-all"
                >
                  Confirm Solo Configuration & Return to Dashboard
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between text-xs font-mono-space text-zinc-500 dark:text-zinc-400 sticky bottom-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>MESH MODE: <strong className="text-zinc-900 dark:text-white uppercase">{activeTab}</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors"
          >
            Close Operations Window
          </button>
        </div>

      </div>

    </div>
  );
}

