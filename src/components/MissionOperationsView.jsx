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
  Check,
  Sparkles,
  FileText,
  Globe,
  Moon,
  AlertTriangle,
  Lock,
  Trash2,
  ChevronRight,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export default function MissionOperationsView({
  missionMode,
  setMissionMode,
  missionProfile,
  setMissionProfile,
  crewList,
  setCrewList,
  activeCrew,
  setActiveCrew,
  currentEnv,
  setCurrentEnv,
  onFocusTwin
}) {
  // New Crew Member Form State
  const [isAddingCrew, setIsAddingCrew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Flight Systems Engineer');
  const [newAge, setNewAge] = useState(36);
  const [newBloodType, setNewBloodType] = useState('O-Positive');
  const [newBaselineHR, setNewBaselineHR] = useState(72);

  // Mission Config Form State
  const [missionName, setMissionName] = useState(missionProfile.name);
  const [missionDestination, setMissionDestination] = useState(currentEnv);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveMission = (e) => {
    e.preventDefault();
    setMissionProfile({
      ...missionProfile,
      name: missionName,
      destination: missionDestination
    });
    setCurrentEnv(missionDestination);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
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
      status: 'Nominal - Ready for Duty',
      overallHealthIndex: 94,
      hr: `${newBaselineHR} bpm`,
      bp: '118/76',
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

  const loadPresetCrew = (count) => {
    const fullRoster = [
      {
        id: 'crew-01',
        name: 'CDR Sarah Chen, Ph.D.',
        role: 'Mission Commander & Astrobiologist',
        age: 38,
        bloodType: 'O-Positive',
        missionDay: missionProfile.missionDay || 142,
        status: 'Nominal - Minor SANS Alert',
        overallHealthIndex: 88,
        hr: '72 bpm',
        bp: '118/76',
        spo2: '98%',
        evaStatus: 'CLEARED FOR EVA',
        evaClass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
      },
      {
        id: 'crew-02',
        name: 'PLT Marcus Vance',
        role: 'Flight Systems Specialist',
        age: 41,
        bloodType: 'A-Positive',
        missionDay: missionProfile.missionDay || 142,
        status: 'Caution - Muscle Mass Atrophy Drift',
        overallHealthIndex: 82,
        hr: '78 bpm',
        bp: '122/80',
        spo2: '97%',
        evaStatus: 'RESTRICTED (FATIGUE)',
        evaClass: 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
      },
      {
        id: 'crew-03',
        name: 'Dr. Elena Rostova',
        role: 'Crew Medical Officer & Flight Surgeon',
        age: 35,
        bloodType: 'B-Positive',
        missionDay: missionProfile.missionDay || 142,
        status: 'Optimal - Full EVA Clearance',
        overallHealthIndex: 94,
        hr: '64 bpm',
        bp: '112/70',
        spo2: '99%',
        evaStatus: 'OPTIMAL (LEAD)',
        evaClass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
      },
      {
        id: 'crew-04',
        name: 'Dr. Liam Tanaka',
        role: 'Lunar Geochemist & EVA Specialist',
        age: 36,
        bloodType: 'O-Negative',
        missionDay: missionProfile.missionDay || 142,
        status: 'Nominal - Bone Density Stable',
        overallHealthIndex: 91,
        hr: '68 bpm',
        bp: '116/74',
        spo2: '99%',
        evaStatus: 'CLEARED FOR EVA',
        evaClass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
      },
      {
        id: 'crew-05',
        name: 'Eng. Amara Okafor',
        role: 'Life Support ECLSS Specialist',
        age: 39,
        bloodType: 'A-Negative',
        missionDay: missionProfile.missionDay || 142,
        status: 'Optimal - Circadian Sync Nominal',
        overallHealthIndex: 93,
        hr: '66 bpm',
        bp: '114/72',
        spo2: '99%',
        evaStatus: 'CLEARED FOR EVA',
        evaClass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
      },
      {
        id: 'crew-06',
        name: 'Maj. Alexey Volkov',
        role: 'Avionics & Orbital Mechanics Pilot',
        age: 44,
        bloodType: 'AB-Positive',
        missionDay: missionProfile.missionDay || 142,
        status: 'Nominal - Ready for EVA',
        overallHealthIndex: 89,
        hr: '74 bpm',
        bp: '120/78',
        spo2: '98%',
        evaStatus: 'CLEARED FOR EVA',
        evaClass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
      },
      {
        id: 'crew-07',
        name: 'Dr. Sofia Morales',
        role: 'Microbiology & Space Botany Lead',
        age: 34,
        bloodType: 'O-Positive',
        missionDay: missionProfile.missionDay || 142,
        status: 'Optimal - High Immune Resilience',
        overallHealthIndex: 96,
        hr: '62 bpm',
        bp: '110/68',
        spo2: '100%',
        evaStatus: 'OPTIMAL (LEAD)',
        evaClass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
      },
      {
        id: 'crew-08',
        name: 'Specialist Kenji Sato',
        role: 'Robotic Arm & Rover Teleoperation Lead',
        age: 37,
        bloodType: 'B-Negative',
        missionDay: missionProfile.missionDay || 142,
        status: 'Nominal - Cognitive Reaction 205ms',
        overallHealthIndex: 92,
        hr: '70 bpm',
        bp: '115/75',
        spo2: '98%',
        evaStatus: 'CLEARED FOR EVA',
        evaClass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
      }
    ];

    const selectedSlice = fullRoster.slice(0, count);
    setCrewList(selectedSlice);
    if (!selectedSlice.find(c => c.id === activeCrew.id)) {
      setActiveCrew(selectedSlice[0]);
    }
  };

  return (
    <div className="space-y-6">

      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
              <Users className="w-4 h-4 text-emerald-500" />
            </div>
            <h2 className="font-hud font-bold text-base text-zinc-900 dark:text-white tracking-wide uppercase">
              Mission & Crew Operations Center
            </h2>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono-space mt-1">
            NASA Human Research Program (HRP) Flight Deployment Architecture • Solo & Expedition Configurations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-space text-zinc-700 dark:text-zinc-300 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-medium">
            DEPLOYMENT: <strong className="text-zinc-900 dark:text-zinc-100 uppercase">{missionMode} ({crewList.length} ASTRONAUTS)</strong>
          </span>
        </div>
      </div>

      {/* Mode Selector Segmented Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setMissionMode('expedition')}
          className={`p-4 rounded-xl flex items-center justify-between text-left transition-all border ${missionMode === 'expedition'
              ? 'bg-emerald-500/10 dark:bg-emerald-950/40 text-zinc-900 dark:text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/80'
              : 'bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${missionMode === 'expedition' ? 'bg-emerald-500/20 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700'}`}>
              <Users className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="font-hud font-bold text-sm uppercase tracking-wide">
                Multi-Crew Expedition Mode
              </div>
              <div className={`text-[11px] font-mono-space ${missionMode === 'expedition' ? 'text-zinc-600 dark:text-zinc-300' : 'text-zinc-500 dark:text-zinc-400'}`}>
                Artemis Basecamp / Mars Transit • Peer-to-Peer Vital Sharing
              </div>
            </div>
          </div>
          <span className={`text-xs font-hud font-bold px-2 py-0.5 rounded ${missionMode === 'expedition' ? 'bg-emerald-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
            {crewList.length} Crew
          </span>
        </button>

        <button
          onClick={() => setMissionMode('solo')}
          className={`p-4 rounded-xl flex items-center justify-between text-left transition-all border ${missionMode === 'solo'
              ? 'bg-emerald-500/10 dark:bg-emerald-950/40 text-zinc-900 dark:text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/80'
              : 'bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${missionMode === 'solo' ? 'bg-emerald-500/20 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700'}`}>
              <User className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <div className="font-hud font-bold text-sm uppercase tracking-wide">
                Solo Astronaut Recon Mode
              </div>
              <div className={`text-[11px] font-mono-space ${missionMode === 'solo' ? 'text-zinc-600 dark:text-zinc-300' : 'text-zinc-500 dark:text-zinc-400'}`}>
                Single Operator Pilot / Scouting • Private Biometric Enclave
              </div>
            </div>
          </div>
          <span className={`text-xs font-hud font-bold px-2 py-0.5 rounded ${missionMode === 'solo' ? 'bg-emerald-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
            1 Operator
          </span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SECTION: MULTI-CREW EXPEDITION WORKSPACE                  */}
      {/* ========================================================= */}
      {missionMode === 'expedition' && (
        <div className="space-y-6">

          {/* Mission Flight Plan Parameters */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 gap-2">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-emerald-500" />
                <h3 className="font-hud font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wider">
                  Active Mission Flight Plan & Operational Parameters
                </h3>
              </div>
              <span className="text-[10px] font-mono-space text-zinc-500">
                MISSION ELAPSED TIME: <strong>SOL {missionProfile.missionDay || 142}</strong>
              </span>
            </div>

            <form onSubmit={handleSaveMission} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-6">
                <label className="block text-[10px] font-mono-space text-zinc-500 uppercase mb-1">
                  Mission Designation / Callsign
                </label>
                <input
                  type="text"
                  value={missionName}
                  onChange={(e) => setMissionName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs font-hud font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500"
                  placeholder="e.g. Ares IV Mars Surface Expedition"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-[10px] font-mono-space text-zinc-500 uppercase mb-1">
                  Destination & Gravitational Baseline
                </label>
                <select
                  value={missionDestination}
                  onChange={(e) => setMissionDestination(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs font-mono-space text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 cursor-pointer"
                >
                  <option value="transit">Deep Space Transit (0.00g Microgravity)</option>
                  <option value="lunar">Artemis Lunar Base (0.16g Partial Gravity)</option>
                  <option value="mars">Mars Surface Outpost (0.38g Surface Gravity)</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2 sm:pt-4">
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-hud text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  {saveSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                  <span>{saveSuccess ? 'Saved' : 'Update Plan'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Roster & Cross-Crew Peer Telemetry */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <h3 className="font-hud font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wider">
                    Squad Biometric Roster ({crewList.length} Enrolled)
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 font-mono-space mt-0.5">
                  Peer-to-peer telemetry mesh active: every astronaut can monitor teammates' vitals in real-time.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
                <div className="flex items-center gap-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1 border border-zinc-200 dark:border-zinc-700 text-xs font-mono-space">
                  <span className="text-[10px] text-zinc-500 uppercase px-1 font-bold">Crew Presets:</span>
                  <button
                    onClick={() => loadPresetCrew(3)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-hud font-bold transition-all cursor-pointer ${
                      crewList.length === 3 ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    3 Crew (Trio)
                  </button>
                  <button
                    onClick={() => loadPresetCrew(4)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-hud font-bold transition-all cursor-pointer ${
                      crewList.length === 4 ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    4 (Artemis)
                  </button>
                  <button
                    onClick={() => loadPresetCrew(6)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-hud font-bold transition-all cursor-pointer ${
                      crewList.length === 6 ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    6 (ISS)
                  </button>
                  <button
                    onClick={() => loadPresetCrew(8)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-hud font-bold transition-all cursor-pointer ${
                      crewList.length === 8 ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    8 (Mars)
                  </button>
                </div>

                <button
                  onClick={() => setIsAddingCrew(!isAddingCrew)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-hud text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isAddingCrew ? 'Cancel' : '+ Enroll Custom'}</span>
                </button>
              </div>
            </div>

            {/* Inline Add Astronaut Form */}
            {isAddingCrew && (
              <form onSubmit={handleAddAstronaut} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="font-hud font-bold text-xs text-zinc-900 dark:text-white uppercase">
                    New Astronaut Medical Enrolment (NASA Form 1047-B)
                  </span>
                  <span className="text-[10px] font-mono-space text-zinc-500">Autonomous Biosensor Pairing</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono-space text-zinc-500 uppercase mb-1">Full Name & Rank</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Liam Tanaka"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-hud font-bold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono-space text-zinc-500 uppercase mb-1">Mission Role</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-mono-space focus:outline-none"
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
                        className="w-2/3 px-2 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-mono-space focus:outline-none"
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
                        className="w-1/3 px-2 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-mono-space focus:outline-none"
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
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-mono-space focus:outline-none"
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

            {/* Cross-Crew Telemetry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {crewList.map((astronaut) => {
                const isActive = activeCrew.id === astronaut.id;
                const health = astronaut.overallHealthIndex || 88;
                const isOptimal = health >= 90;
                const isCaution = health < 90 && health >= 75;

                return (
                  <div
                    key={astronaut.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${isActive
                        ? 'bg-emerald-500/10 dark:bg-emerald-950/40 text-zinc-900 dark:text-white border-emerald-500 shadow-xl ring-2 ring-emerald-500/80'
                        : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:border-zinc-400 dark:hover:border-zinc-700'
                      }`}
                  >
                    <div>
                      {/* Astronaut Header */}
                      <div className="flex items-start justify-between pb-3 border-b border-zinc-200/50 dark:border-zinc-800/60">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-hud font-bold text-sm tracking-wide text-zinc-900 dark:text-white">
                              {astronaut.name}
                            </h4>
                            {isActive && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded font-mono-space font-bold bg-emerald-500 text-white">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono-space block text-zinc-500 dark:text-zinc-400">
                            {astronaut.role} • {astronaut.bloodType}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className={`font-hud text-2xl font-bold ${isOptimal ? 'text-emerald-500 dark:text-emerald-400' : isCaution ? 'text-amber-500' : 'text-red-500'
                            }`}>
                            {health}%
                          </span>
                          <span className="text-[9px] block font-mono-space uppercase text-zinc-500">
                            Readiness
                          </span>
                        </div>
                      </div>

                      {/* Live Biometrics Row */}
                      <div className="grid grid-cols-3 gap-2 my-3 text-[11px] font-mono-space">
                        <div className="p-2 rounded-lg border bg-white dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800">
                          <div className="text-[9px] text-zinc-400">HEART RATE</div>
                          <div className="font-bold flex items-center gap-1 text-zinc-900 dark:text-white">
                            <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                            <span>{astronaut.hr || '72 bpm'}</span>
                          </div>
                        </div>

                        <div className="p-2 rounded-lg border bg-white dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800">
                          <div className="text-[9px] text-zinc-400">BLOOD PRESS.</div>
                          <div className="font-bold text-zinc-900 dark:text-white">
                            {astronaut.bp || '118/76'}
                          </div>
                        </div>

                        <div className="p-2 rounded-lg border bg-white dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800">
                          <div className="text-[9px] text-zinc-400">EVA STATUS</div>
                          <div className="font-bold text-[10px] text-emerald-600 dark:text-emerald-400 truncate">
                            {astronaut.evaStatus || 'CLEARED'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-200/50 dark:border-zinc-800/60 mt-2">
                      <span className="text-[10px] font-mono-space truncate pr-2 text-zinc-500">
                        {astronaut.status || 'Nominal Status'}
                      </span>

                      <div className="flex items-center gap-2 shrink-0">
                        {crewList.length > 1 && (
                          <button
                            onClick={() => handleRemoveCrew(astronaut.id)}
                            className="p-1 rounded text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="Remove from roster"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setActiveCrew(astronaut);
                            if (onFocusTwin) onFocusTwin();
                          }}
                          className={`px-3 py-1.5 rounded-lg font-hud text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${isActive
                              ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700'
                              : 'bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black shadow-sm'
                            }`}
                        >
                          <span>{isActive ? 'Current View' : 'Focus Twin'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

{/* ========================================================= */ }
{/* SECTION: SOLO ASTRONAUT PROFILE                           */ }
{/* ========================================================= */ }
{
  missionMode === 'solo' && (
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-white">
          <User className="w-5 h-5 text-emerald-500" />
        </div>
        <div>
          <h3 className="font-hud font-bold text-base text-zinc-900 dark:text-white uppercase tracking-wide">
            Solo Astronaut Reconnaissance Profile
          </h3>
          <p className="text-xs text-zinc-500 font-mono-space">
            Single-operator deployment • Private medical enclave active • Local autonomous CDSS
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="text-[10px] font-mono-space text-zinc-400 uppercase">Registered Operator</div>
          <div className="font-hud font-bold text-base text-zinc-900 dark:text-white">{activeCrew.name}</div>
          <div className="text-xs font-mono-space text-zinc-500">{activeCrew.role} • Blood: {activeCrew.bloodType}</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="text-[10px] font-mono-space text-zinc-400 uppercase">Data Stream Security</div>
          <div className="font-hud font-bold text-base text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Lock className="w-4 h-4" /> SECURE PRIVATE ENCLAVE
          </div>
          <div className="text-xs font-mono-space text-zinc-500">Peer broadcast disabled • Direct biosensor pipeline</div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-500/40 text-xs font-mono-space text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Solo Astronaut Flight Protocol (NASA-STD-3001):</strong> Without fellow crew members present, all critical physiological events (hypoxia, cardiac arrhythmias, radiation surge) trigger autonomous robotic intervention protocols and audible voice synth instructions via J.A.R.V.I.S.
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={() => {
            if (onFocusTwin) onFocusTwin();
          }}
          className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-hud text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <span>View Operator 3D Twin & Vitals</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

    </div >
  );
}

