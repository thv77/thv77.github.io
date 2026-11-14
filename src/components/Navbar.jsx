import React, { useState } from 'react';
import { 
  Rocket, 
  Moon, 
  Globe, 
  WifiOff, 
  Activity, 
  ShieldAlert, 
  ShieldCheck, 
  User, 
  Clock, 
  Volume2, 
  VolumeX, 
  Radio, 
  Bot, 
  Users, 
  Cpu, 
  Utensils, 
  AlertOctagon,
  Camera,
  Pill,
  TreePine,
  FileText,
  Sun,
  Eye,
  LineChart,
  Award,
  BookOpen,
  Menu,
  X,
  ChevronRight,
  Zap,
  Compass,
  HelpCircle,
  Bug
} from 'lucide-react';
import { MISSION_ENVIRONMENTS, CREW_MEMBERS } from '../data/nasaHrpData';

export default function Navbar({ 
  currentEnv, 
  setCurrentEnv, 
  activeCrew, 
  setActiveCrew,
  crewList = CREW_MEMBERS,
  missionMode = 'expedition',
  missionProfile = { name: 'Ares IV Expedition' },
  onOpenMissionManager,
  onOpenJudgeTour,
  soundEnabled, 
  setSoundEnabled, 
  activeTab, 
  setActiveTab, 
  onOpenEmergency, 
  onOpenDossier, 
  onOpenHelp,
  theme, 
  setTheme 
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const envData = MISSION_ENVIRONMENTS[currentEnv];

  const TABS = [
    { id: 'overview', label: 'Bio-Avatar & Vitals', category: 'DIGITAL TWIN & VITALS', icon: Activity },
    { id: 'mission_ops', label: 'Mission & Squad Operations', category: 'SOLO / SQUAD ROSTER', icon: Users },
    { id: 'ai_surgeon', label: 'J.A.R.V.I.S. AI Copilot', category: 'CLINICAL DECISION SUPPORT', icon: Bot },
    { id: 'comm_uplink', label: 'Earth-Mars Latency & DSN', category: 'DEEP SPACE TELEMETRY', icon: Radio },
    { id: 'robotic_bay', label: 'Robotic Medical Bay & LBNP', category: 'AUTONOMOUS INTERVENTION', icon: Zap },
    { id: 'eva_hud', label: 'EVA Spacewalk Visor HUD', category: 'SURFACE SUIT TELEMETRY', icon: Compass },
    { id: 'biometrics', label: 'Optical Biometrics (rPPG)', category: 'WEBCAM EYE & VITALS', icon: Camera },
    { id: 'astrolab', label: 'Robotic Bio-Dock (Astro-Lab)', category: 'MICROFLUIDIC BLOOD LAB', icon: Cpu },
    { id: 'pharmacy', label: 'Space Pharmacy & Radiation', category: 'MOLECULAR 3D PRINTING', icon: Pill },
    { id: 'nutrition', label: 'Galley Nutrition & Hydration', category: 'COUNTERMEASURES & DIET', icon: Utensils },
    { id: 'exams', label: 'Self-Exams & SANS Vision', category: 'ULTRASOUND & PVT COGNITIVE', icon: Eye },
    { id: 'trends', label: '180-Day Longitudinal Trends', category: 'DEEP SPACE EPIDEMIOLOGY', icon: LineChart },
    { id: 'crew_matrix', label: 'Crew Matrix & EVA Clearance', category: 'MISSION READINESS', icon: ShieldCheck },
    { id: 'routine', label: 'AstroScore Routine', category: 'GAMIFIED COUNTERMEASURES', icon: Award },
    { id: 'biophilia', label: 'Earth Biophilia Soundscapes', category: 'NEURO-PSYCH RESILIENCE', icon: TreePine },
    { id: 'protocols', label: 'Clinical Protocols Library', category: 'NASA-STD-3001 MANUAL', icon: BookOpen },
  ];

  const activeTabObj = TABS.find(t => t.id === activeTab) || TABS[0];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-black/95 backdrop-blur-xl sticky top-0 z-40 px-3 sm:px-4 lg:px-6 py-2 transition-colors">
        <div className="w-full max-w-[1720px] mx-auto flex items-center justify-between gap-3 min-w-0">
          
          {/* Left: 3-Lines Hamburger Icon + Brand + Telemetry Delay Badge */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* 3-Lines Hamburger Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 sm:px-2.5 sm:py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 transition-all flex items-center gap-1.5 group shadow-sm shrink-0 cursor-pointer"
              title="Open Navigation Menu (All 13 Modules)"
            >
              <Menu className="w-4 h-4 group-hover:scale-110 transition-transform text-zinc-900 dark:text-white" />
              <span className="hidden xl:inline font-hud font-bold text-xs uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Modules
              </span>
            </button>

            {/* Brand Logo & Status */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-white/20 text-zinc-900 dark:text-white shadow-sm shrink-0">
                <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse text-cyan-500" />
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
              </div>

              <div className="whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="font-hud font-bold text-base sm:text-lg tracking-wider text-zinc-900 dark:text-white whitespace-nowrap">
                    MARK <span className="text-zinc-500 dark:text-zinc-400">XI</span>
                  </span>
                  <span className="text-[8px] sm:text-[9px] px-1 py-0.5 rounded font-mono-space uppercase tracking-widest bg-zinc-100 dark:bg-white/10 border border-zinc-300 dark:border-white/20 text-zinc-700 dark:text-zinc-300 font-semibold">
                    NASA HRP
                  </span>
                </div>
                <div className="hidden sm:flex text-[9px] text-zinc-500 dark:text-zinc-400 font-mono-space items-center gap-1 -mt-0.5">
                  <span>DEEP-SPACE CDSS</span>
                  <span className="text-zinc-400 dark:text-zinc-600">•</span>
                  <span className="flex items-center gap-1 font-semibold text-cyan-500">
                    <Radio className="w-2 h-2" /> AUTONOMOUS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Full Earth Delay Notice as before */}
          <div 
            onClick={() => handleSelectTab('comm_uplink')}
            className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-amber-500/40 hover:border-amber-500 text-xs shrink-0 whitespace-nowrap cursor-pointer transition-colors"
            title="Open Deep Space Comm Delay Simulator"
          >
            <WifiOff className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <div className="flex items-center gap-1.5 font-mono-space text-xs">
                <span className="text-amber-700 dark:text-amber-300 font-bold">EARTH DELAY: {envData.commsDelay}</span>
                <span className="text-zinc-400 dark:text-zinc-600">|</span>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">AUTONOMOUS</span>
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                Ground comms delayed. Click to inspect DSN latency buffer.
              </p>
            </div>
          </div>

          {/* Right Controls: Theme, Dossier, Code Red, Environment, Crew, Audio */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 min-w-0">
            
            {/* 60-SECOND JUDGE TOUR BUTTON */}
            <button
              onClick={onOpenJudgeTour}
              className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-100 dark:text-white border border-zinc-300 dark:border-zinc-700 font-hud text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
              title="Launch 60-Second Guided Tour for NASA Judges"
            >
              <Rocket className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-200" />
              <span className="hidden xl:inline">60-Sec Tour</span>
            </button>

            {/* THEME TOGGLE: LIGHT / DARK */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-1.5 rounded-lg border transition-all text-xs font-mono-space shrink-0 cursor-pointer ${
                theme === 'light'
                  ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-zinc-300 font-bold shadow-sm'
                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white'
              }`}
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-zinc-900" />}
            </button>

            {/* HELP & PRACA BUG REPORTER BUTTON */}
            <button
              onClick={onOpenHelp}
              className="p-1.5 rounded-lg border transition-all text-xs font-mono-space shrink-0 cursor-pointer bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 shadow-sm"
              title="Open Flight Deck Help & NASA PRACA Bug Dispatch"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
            </button>

            {/* Flight Dossier Report Button */}
            <button
              onClick={onOpenDossier}
              className="hidden 2xl:flex items-center gap-1 px-2 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white border border-zinc-300 dark:border-zinc-700 font-hud text-xs font-semibold transition-all shadow-sm shrink-0 cursor-pointer"
              title="Open NASA Medical Dossier (Form 1047)"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
              <span>Dossier</span>
            </button>

            {/* CODE RED EMERGENCY BUTTON */}
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-hud text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-red-900/30 animate-pulse shrink-0 cursor-pointer"
              title="Open Emergency Action System"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CODE RED</span>
            </button>

            {/* Environment Selector: Compact Aerospace Segmented Toggle */}
            <div className="hidden sm:flex items-center rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-0.5 text-xs shrink-0">
              <button
                onClick={() => setCurrentEnv('transit')}
                className={`flex items-center gap-1 px-1.5 py-1 rounded transition-all cursor-pointer ${
                  currentEnv === 'transit'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-black font-bold shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
                title="Deep Space Transit (0g Microgravity)"
              >
                <Rocket className="w-3 h-3" />
                <span className="text-[11px] font-mono-space">0g</span>
              </button>

              <button
                onClick={() => setCurrentEnv('lunar')}
                className={`flex items-center gap-1 px-1.5 py-1 rounded transition-all cursor-pointer ${
                  currentEnv === 'lunar'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-black font-bold shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
                title="Lunar Surface (1/6g Partial Gravity)"
              >
                <Moon className="w-3 h-3" />
                <span className="text-[11px] font-mono-space">1/6g</span>
              </button>

              <button
                onClick={() => setCurrentEnv('mars')}
                className={`flex items-center gap-1 px-1.5 py-1 rounded transition-all cursor-pointer ${
                  currentEnv === 'mars'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-black font-bold shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
                title="Mars Surface (3/8g Surface Gravity)"
              >
                <Globe className="w-3 h-3" />
                <span className="text-[11px] font-mono-space">3/8g</span>
              </button>
            </div>

            {/* Quick Mission Ops Icon Button */}
            <button
              onClick={() => setActiveTab('mission_ops')}
              className={`hidden 2xl:flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-hud font-bold transition-all shadow-sm shrink-0 cursor-pointer border ${
                activeTab === 'mission_ops'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white'
                  : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-300 dark:border-zinc-700'
              }`}
              title="Open Mission & Squad Operations"
            >
              <Users className="w-3.5 h-3.5 text-emerald-500" />
              <span>Mission Ops</span>
            </button>

            {/* Crew Member Dropdown - Guaranteed within bounds on all mobile screens */}
            <div className="relative shrink-0">
              <select
                value={activeCrew.id}
                onChange={(e) => {
                  const member = crewList.find(c => c.id === e.target.value);
                  if (member) setActiveCrew(member);
                }}
                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg px-2 py-1.5 text-[11px] sm:text-xs text-zinc-900 dark:text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono-space cursor-pointer shadow-sm w-[90px] sm:w-[130px] md:w-[145px] truncate"
                title="Select Active Patient Biometric Feed"
              >
                {crewList.map(c => {
                  const shortName = c.name.split(',')[0];
                  return (
                    <option key={c.id} value={c.id} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                      {shortName} ({c.overallHealthIndex}%)
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Sound Alarm Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                soundEnabled 
                  ? 'bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white' 
                  : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500'
              }`}
              title={soundEnabled ? 'Acoustic Alerts Active' : 'Alarms Muted'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-900 dark:text-white" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* ============================================================ */}
      {/* LEFT-SIDE SLIDING WINDOW DRAWER (UP TO DOWN MODULE LIST)     */}
      {/* ============================================================ */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          
          {/* Backdrop Blur Overlay (Click outside to close) */}
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
          />

          {/* Left Drawer Container */}
          <aside className="relative z-50 w-80 sm:w-88 max-w-[85vw] h-full bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-left duration-250 transition-colors">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                  <Activity className="w-4 h-4 text-zinc-900 dark:text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-hud font-bold text-base text-zinc-900 dark:text-white tracking-wider">
                    MARK <span className="text-zinc-500 dark:text-zinc-400">XI</span>
                  </h3>
                  <span className="text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400 block -mt-0.5">
                    CLINICAL MODULES
                  </span>
                </div>
              </div>

              {/* Close Button (X) */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-300 dark:border-zinc-700 transition-colors"
                title="Close Navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mission Mode Quick Status */}
            <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono-space">
              <span className="text-zinc-500 dark:text-zinc-400">PATIENT:</span>
              <span className="font-bold text-zinc-900 dark:text-white">{activeCrew.name.split(',')[0]}</span>
              <span className="text-zinc-400">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{activeCrew.overallHealthIndex}% HEALTH</span>
            </div>

            {/* Mobile Gravity Toggle (Visible inside drawer on mobile) */}
            <div className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800 sm:hidden flex items-center justify-between text-xs">
              <span className="text-[10px] font-mono-space text-zinc-500 uppercase font-bold">Gravity:</span>
              <div className="flex items-center rounded-lg bg-zinc-200 dark:bg-zinc-800 p-0.5 text-xs">
                <button
                  onClick={() => setCurrentEnv('transit')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono-space ${currentEnv === 'transit' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-bold' : 'text-zinc-600 dark:text-zinc-300'}`}
                >
                  0g
                </button>
                <button
                  onClick={() => setCurrentEnv('lunar')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono-space ${currentEnv === 'lunar' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-bold' : 'text-zinc-600 dark:text-zinc-300'}`}
                >
                  1/6g
                </button>
                <button
                  onClick={() => setCurrentEnv('mars')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono-space ${currentEnv === 'mars' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-bold' : 'text-zinc-600 dark:text-zinc-300'}`}
                >
                  3/8g
                </button>
              </div>
            </div>

            {/* Vertical Module List (Up to Down) */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar smooth-scroll">
              {TABS.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSelectTab(tab.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between group border ${
                      isActive
                        ? 'bg-zinc-900 dark:bg-zinc-800 text-white border-zinc-700 dark:border-zinc-600 shadow-md ring-1 ring-emerald-500/50'
                        : 'bg-zinc-50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 border-zinc-200/80 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                      <div className={`p-2 rounded-lg transition-colors shrink-0 ${
                        isActive
                          ? 'bg-zinc-800 dark:bg-zinc-700 text-white'
                          : 'bg-white dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 group-hover:border-zinc-400'
                      }`}>
                        <Icon className="w-4 h-4 shrink-0" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={`font-hud font-bold text-xs tracking-wide truncate ${
                          isActive ? 'text-white' : 'text-zinc-900 dark:text-white'
                        }`}>
                          {tab.label}
                        </div>
                        <div className={`text-[10px] font-mono-space uppercase tracking-wider truncate ${
                          isActive ? 'text-zinc-300' : 'text-zinc-500 dark:text-zinc-400'
                        }`}>
                          {tab.category}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isActive
                        ? 'text-white'
                        : 'text-zinc-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5'
                    }`} />
                  </button>
                );
              })}
            </nav>

            {/* Drawer Quick Actions: Help & PRACA Bug Log */}
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between gap-2 text-xs font-mono-space">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  if (onOpenHelp) onOpenHelp();
                }}
                className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-cyan-500 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
                <span>Help Guide</span>
              </button>

              <button
                onClick={() => {
                  setSidebarOpen(false);
                  if (onOpenHelp) onOpenHelp();
                }}
                className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-amber-500 transition-colors cursor-pointer"
              >
                <Bug className="w-3.5 h-3.5 text-amber-500" />
                <span>PRACA Bug Log</span>
              </button>
            </div>

            {/* Drawer Spec Footer */}
            <div className="px-3 py-2 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 flex items-center justify-between text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400">
              <span>NASA HRP DEEP SPACE SPEC</span>
              <span className="font-bold text-zinc-900 dark:text-white">13 MODULES</span>
            </div>

          </aside>
        </div>
      )}
    </>
  );
}
