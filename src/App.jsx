import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TelemetryCards from './components/TelemetryCards';
import BioAvatar from './components/BioAvatar';
import OrganDetailModal from './components/OrganDetailModal';
import TrendAnalytics from './components/TrendAnalytics';
import SelfExamSuite from './components/SelfExamSuite';
import RoutineGamification from './components/RoutineGamification';
import ProtocolsLibrary from './components/ProtocolsLibrary';
import FlightSurgeonAI from './components/FlightSurgeonAI';
import CrewReadinessMatrix from './components/CrewReadinessMatrix';
import AstroLabDevice from './components/AstroLabDevice';
import GalleyNutritionTracker from './components/GalleyNutritionTracker';
import EmergencyActionSystem from './components/EmergencyActionSystem';
import AnomalySimulatorBar from './components/AnomalySimulatorBar';
import OpticalBiometricsScanner from './components/OpticalBiometricsScanner';
import SpacePharmacyTracker from './components/SpacePharmacyTracker';
import BiophiliaMentalResilience from './components/BiophiliaMentalResilience';
import MedicalDossierModal from './components/MedicalDossierModal';
import MissionCrewModal from './components/MissionCrewModal';
import MissionOperationsView from './components/MissionOperationsView';
import SquadHealthRadar from './components/SquadHealthRadar';
import StealthVoiceAssistant from './components/StealthVoiceAssistant';
import DeepSpaceCommUplink from './components/DeepSpaceCommUplink';
import RoboticMedicalBay from './components/RoboticMedicalBay';
import EvaSpacewalkHUD from './components/EvaSpacewalkHUD';
import JudgeGuidedTour from './components/JudgeGuidedTour';
import HelpPracaModal from './components/HelpPracaModal';
import { 
  ORGAN_SYSTEMS, 
  CREW_MEMBERS, 
  MISSION_ENVIRONMENTS 
} from './data/nasaHrpData';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle, 
  Info, 
  ArrowRight, 
  Sparkles, 
  Radio, 
  Bot, 
  Cpu, 
  Utensils,
  AlertOctagon,
  Camera,
  Pill,
  TreePine,
  FileText,
  ChevronUp,
  HelpCircle
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [currentEnv, setCurrentEnv] = useState('transit'); // 'transit' | 'lunar' | 'mars'
  
  // Mission Deployment & Squad Roster State
  const [missionMode, setMissionMode] = useState('expedition'); // 'expedition' | 'solo'
  const [missionProfile, setMissionProfile] = useState({
    name: 'Ares IV Mars Surface Expedition',
    destination: 'transit',
    missionDay: 142
  });
  const [crewList, setCrewList] = useState(CREW_MEMBERS);
  const [activeCrew, setActiveCrew] = useState(CREW_MEMBERS[0]);
  const [missionModalOpen, setMissionModalOpen] = useState(false);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'biometrics' | 'pharmacy' | 'biophilia' | 'nutrition' | 'astrolab' | 'ai_surgeon' | 'crew_matrix' | 'trends' | 'exams' | 'routine' | 'protocols'
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [judgeTourOpen, setJudgeTourOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Dynamic Organ Systems State for Live Anomaly Injection
  const [dynamicOrganSystems, setDynamicOrganSystems] = useState(ORGAN_SYSTEMS);

  // Monitor scroll position for smooth scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll back to top upon module tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Synchronize light/dark classes on HTML root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLaunchExam = (examType) => {
    setActiveTab('exams');
  };

  const handleInjectAnomaly = ({ organId, status, triageLevel, overrideMetric }) => {
    setDynamicOrganSystems(prev => prev.map(org => {
      if (org.id === organId) {
        return {
          ...org,
          status,
          triageLevel,
          primaryValue: overrideMetric || org.primaryValue
        };
      }
      return org;
    }));
    setAlertDismissed(false);
  };

  const handleResetNominal = () => {
    setDynamicOrganSystems(ORGAN_SYSTEMS);
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-zinc-700 selection:text-zinc-200 relative transition-colors duration-200">
      
      {/* Top HUD Navigation Bar */}
      <Navbar
        currentEnv={currentEnv}
        setCurrentEnv={setCurrentEnv}
        activeCrew={activeCrew}
        setActiveCrew={setActiveCrew}
        crewList={crewList}
        missionMode={missionMode}
        missionProfile={missionProfile}
        onOpenMissionManager={() => setMissionModalOpen(true)}
        onOpenJudgeTour={() => setJudgeTourOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEmergency={() => setEmergencyOpen(true)}
        onOpenDossier={() => setDossierOpen(true)}
        onOpenHelp={() => setHelpModalOpen(true)}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Active Emergency / Clinical Alert Banner */}
        {!alertDismissed && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/60 shadow-md flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-3.5 animate-in fade-in">
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/40 shrink-0">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-hud font-bold text-sm text-amber-900 dark:text-amber-200 uppercase tracking-wide">
                    Autonomous Clinical Alert: SANS Frisén Grade 1.5 Detected
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-mono-space bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 font-bold">
                    ACTION RECOMMENDED
                  </span>
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-200/80 font-sans mt-0.5 leading-relaxed">
                  Cephalad fluid volume shift is causing mild optic nerve sheath dilation (ONSD 5.9mm). Execute Chibis LBNP protocol to restore lower body circulation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <button
                onClick={() => setSelectedOrgan(dynamicOrganSystems[0])}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-hud text-xs font-bold transition-all shadow-md flex items-center gap-1"
              >
                View Countermeasure <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTab('biometrics')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-hud text-xs font-semibold transition-all flex items-center gap-1"
              >
                <Camera className="w-3.5 h-3.5" /> Camera Scanner
              </button>
              <button
                onClick={() => setActiveTab('ai_surgeon')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-hud text-xs font-semibold transition-all flex items-center gap-1"
              >
                <Bot className="w-3.5 h-3.5" /> Consult J.A.R.V.I.S.
              </button>
              <button
                onClick={() => setAlertDismissed(true)}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-xs font-mono-space border border-zinc-300 dark:border-zinc-700"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* TAB 1: OVERVIEW (Bio-Avatar, Telemetry Cards, Quick Actions) */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Squad Peer Telemetry Radar (Only in Multi-Crew Expedition Mode) */}
            <SquadHealthRadar
              missionMode={missionMode}
              missionProfile={missionProfile}
              crewList={crewList}
              activeCrew={activeCrew}
              setActiveCrew={setActiveCrew}
              onOpenMissionManager={() => setActiveTab('mission_ops')}
            />

            {/* Real-Time Live Streaming Telemetry Cards */}
            <TelemetryCards activeCrew={activeCrew} theme={theme}
              currentEnv={currentEnv}
              onSelectOrgan={setSelectedOrgan}
              organSystems={dynamicOrganSystems}
            />

            {/* Interactive Anatomical Digital Twin with Layer Peeling */}
            <BioAvatar
              organSystems={dynamicOrganSystems}
              selectedOrgan={selectedOrgan}
              onSelectOrgan={setSelectedOrgan}
              theme={theme}
            />

            {/* Quick Challenge Context Callout for NASA Judges */}
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono-space text-zinc-700 dark:text-zinc-300 shadow-sm">
              <div className="flex items-center gap-3">
                <Radio className="w-5 h-5 text-zinc-900 dark:text-white shrink-0" />
                <div>
                  <strong className="text-zinc-900 dark:text-white block font-hud">NASA SPACE APPS CHALLENGE ALIGNMENT:</strong>
                  Autonomous clinical decision support solving the 14-22 min communication latency problem on long-duration exploration missions.
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setActiveTab('biometrics')}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-hud text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  Camera Biometrics →
                </button>
                <button
                  onClick={() => setEmergencyOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-hud text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <AlertOctagon className="w-3.5 h-3.5" />
                  Code Red Drill →
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white border border-zinc-300 dark:border-zinc-700 transition-all font-hud font-semibold flex items-center gap-1.5"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  Galley Nutrition →
                </button>
                <button
                  onClick={() => setDossierOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-white border border-zinc-300 dark:border-zinc-700 transition-all font-hud font-semibold flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  NASA Dossier →
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: OPTICAL BIOMETRICS SCANNER (WEBCAM rPPG & PERCLOS) */}
        {activeTab === 'biometrics' && (
          <OpticalBiometricsScanner activeCrew={activeCrew} />
        )}

        {/* TAB 3: SPACE PHARMACY & RADIATION DEGRADATION TRACKER */}
        {activeTab === 'pharmacy' && (
          <SpacePharmacyTracker />
        )}

        {/* TAB 4: EARTH BIOPHILIA & NEURO-PSYCHOLOGICAL RESILIENCE */}
        {activeTab === 'biophilia' && (
          <BiophiliaMentalResilience activeCrew={activeCrew} />
        )}

        {/* TAB 5: SPACE GALLEY NUTRITION & HYDRATION COUNTERMEASURES */}
        {activeTab === 'nutrition' && (
          <GalleyNutritionTracker activeCrew={activeCrew} />
        )}

        {/* TAB 6: ASTRO-LAB ROBOTIC BIO-ANALYZER & IoT DOCK */}
        {activeTab === 'astrolab' && (
          <AstroLabDevice activeCrew={activeCrew} onUpdateBiometrics={() => {}} />
        )}

        {/* TAB 7: J.A.R.V.I.S. FLIGHT SURGEON AI COPILOT */}
        {activeTab === 'ai_surgeon' && (
          <FlightSurgeonAI activeCrew={activeCrew} currentEnv={currentEnv} />
        )}

        {/* TAB: EARTH-MARS SPEED-OF-LIGHT RADIO LATENCY & DSN BUFFER */}
        {activeTab === 'comm_uplink' && (
          <DeepSpaceCommUplink
            activeCrew={activeCrew}
            currentEnv={currentEnv}
            onTriggerEmergency={() => setEmergencyOpen(true)}
          />
        )}

        {/* TAB: ROBOTIC MEDICAL BAY & CLOSED-LOOP INFUSION / LBNP */}
        {activeTab === 'robotic_bay' && (
          <RoboticMedicalBay
            activeCrew={activeCrew}
            soundEnabled={soundEnabled}
          />
        )}

        {/* TAB: EVA SPACEWALK HELMET VISOR HUD */}
        {activeTab === 'eva_hud' && (
          <EvaSpacewalkHUD
            activeCrew={activeCrew}
            currentEnv={currentEnv}
            onClose={() => setActiveTab('overview')}
          />
        )}

        {/* TAB 8: MISSION & SQUAD OPERATIONS (SOLO / EXPEDITION ROSTER) */}
        {activeTab === 'mission_ops' && (
          <MissionOperationsView
            missionMode={missionMode}
            setMissionMode={setMissionMode}
            missionProfile={missionProfile}
            setMissionProfile={setMissionProfile}
            crewList={crewList}
            setCrewList={setCrewList}
            activeCrew={activeCrew}
            setActiveCrew={setActiveCrew}
            currentEnv={currentEnv}
            setCurrentEnv={setCurrentEnv}
            onFocusTwin={() => setActiveTab('overview')}
          />
        )}

        {/* TAB 9: CREW READINESS MATRIX & SOLAR STORM DRILL */}
        {activeTab === 'crew_matrix' && (
          <CrewReadinessMatrix 
            onSelectCrew={setActiveCrew} 
            activeCrew={activeCrew} 
            crewList={crewList}
            onOpenMissionManager={() => setActiveTab('mission_ops')}
          />
        )}

        {/* TAB 9: LONGITUDINAL TREND CHARTS & HRP DATA */}
        {activeTab === 'trends' && (
          <TrendAnalytics />
        )}

        {/* TAB 10: SELF-EXAMS & SANS VISION TESTING */}
        {activeTab === 'exams' && (
          <SelfExamSuite onExamComplete={() => {}} />
        )}

        {/* TAB 11: ROUTINE CHECKLIST & GAMIFIED ASTROSCORE */}
        {activeTab === 'routine' && (
          <RoutineGamification activeCrew={activeCrew} />
        )}

        {/* TAB 12: CLINICAL PROTOCOLS LIBRARY */}
        {activeTab === 'protocols' && (
          <ProtocolsLibrary onSelectOrgan={setSelectedOrgan} />
        )}

      </main>

      {/* Judge's Test Bench: Floating Anomaly Simulator Pill */}
      <AnomalySimulatorBar
        onInjectAnomaly={handleInjectAnomaly}
        onResetNominal={handleResetNominal}
      />

      {/* Emergency Action System (CODE RED Modal HUD) */}
      {emergencyOpen && (
        <EmergencyActionSystem
          activeCrew={activeCrew}
          onClose={() => setEmergencyOpen(false)}
        />
      )}

      {/* Mission & Crew Operations Center Modal */}
      {missionModalOpen && (
        <MissionCrewModal
          isOpen={missionModalOpen}
          onClose={() => setMissionModalOpen(false)}
          missionMode={missionMode}
          setMissionMode={setMissionMode}
          missionProfile={missionProfile}
          setMissionProfile={setMissionProfile}
          crewList={crewList}
          setCrewList={setCrewList}
          activeCrew={activeCrew}
          setActiveCrew={setActiveCrew}
          currentEnv={currentEnv}
          setCurrentEnv={setCurrentEnv}
        />
      )}

      {/* NASA Medical Dossier (Form 1047 Export Modal) */}
      {dossierOpen && (
        <MedicalDossierModal
          activeCrew={activeCrew}
          currentEnv={currentEnv}
          organSystems={dynamicOrganSystems}
          onClose={() => setDossierOpen(false)}
        />
      )}

      {/* Deep-Dive Organ Detail Modal */}
      {selectedOrgan && (
        <OrganDetailModal
          organ={selectedOrgan}
          onClose={() => setSelectedOrgan(null)}
          onLaunchExam={handleLaunchExam}
        />
      )}

      {/* 60-Second Guided Tour for NASA Judges */}
      <JudgeGuidedTour
        isOpen={judgeTourOpen}
        onClose={() => setJudgeTourOpen(false)}
        onNavigateTab={setActiveTab}
      />

      {/* Flight Deck Help & NASA PRACA Bug Dispatch Modal */}
      <HelpPracaModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        activeCrew={activeCrew}
        currentEnv={currentEnv}
        missionProfile={missionProfile}
        theme={theme}
      />

      {/* S.T.E.A.L.T.H. Hands-Free Voice Assistant Floating Orb */}
      <StealthVoiceAssistant
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeCrew={activeCrew}
        setActiveCrew={setActiveCrew}
        crewList={crewList}
        onOpenEmergency={() => setEmergencyOpen(true)}
        onOpenDossier={() => setDossierOpen(true)}
        onOpenMissionManager={() => setActiveTab('mission_ops')}
        onOpenJudgeTour={() => setJudgeTourOpen(true)}
        onOpenHelp={() => setHelpModalOpen(true)}
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundEnabled}
      />

      {/* Floating Smooth Scroll to Top HUD Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top of flight deck"
        className={`fixed bottom-4 right-4 z-40 p-2 sm:px-2.5 sm:py-2 rounded-xl border font-mono-space text-xs transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-xl backdrop-blur-md group ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        } ${
          theme === 'dark'
            ? 'bg-zinc-950/85 border-cyan-500/40 text-cyan-400 hover:border-cyan-400 hover:bg-zinc-900/90 shadow-cyan-950/40 hover:shadow-cyan-500/25'
            : 'bg-white/90 border-slate-300 text-slate-800 hover:border-cyan-600 hover:text-cyan-700 shadow-slate-400/30'
        }`}
        title="Smooth Scroll to Top (Telemetry Deck)"
      >
        <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 text-cyan-400 dark:text-cyan-400" />
        <span className="hidden sm:inline text-[10px] font-hud tracking-wider uppercase font-bold">
          TOP
        </span>
      </button>

      {/* NASA Space Apps Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 py-4 px-4 text-xs text-zinc-500 font-mono-space mt-10">
        <div className="w-full max-w-[1720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>
              NASA Space Apps Challenge 2026 • Autonomous Astronaut Health Monitoring (AEGIS-BIO)
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            <button
              onClick={() => setHelpModalOpen(true)}
              className="text-xs font-mono-space text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5 cursor-pointer font-bold"
              title="Open Flight Operations Help & NASA PRACA Bug Dispatch"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help & PRACA Anomaly Log</span>
            </button>
            <span className="text-zinc-400 dark:text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-600 dark:text-zinc-400">
              NASA Human Research Program (HRP)
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
