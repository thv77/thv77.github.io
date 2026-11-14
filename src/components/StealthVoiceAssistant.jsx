import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  X,
  ChevronDown,
  ChevronUp,
  Terminal,
  Send,
  Zap,
  Radio,
  Check,
  Compass,
  ArrowRight
} from 'lucide-react';

export default function StealthVoiceAssistant({
  activeTab,
  setActiveTab,
  activeCrew,
  setActiveCrew,
  crewList = [],
  onOpenEmergency,
  onOpenDossier,
  onOpenMissionManager,
  onOpenJudgeTour,
  onOpenHelp,
  theme,
  setTheme,
  soundEnabled = true
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [lastResponse, setLastResponse] = useState(
    "S.T.E.A.L.T.H. online. I am your hands-free spacecraft flight assistant. Speak or type any command to operate the dashboard."
  );
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Initialize Speech Synthesis and Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        setVoiceSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);
          executeCommand(text);
        };

        recognition.onerror = (event) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [activeCrew, crewList, activeTab, theme]);

  // Voice Speech Synthesis Output
  const speak = (text) => {
    if (!synthRef.current || !soundEnabled) return;
    try {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      synthRef.current.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  // Start / Stop Voice Listening
  const toggleListening = () => {
    if (!recognitionRef.current) {
      setLastResponse("Voice microphone not supported on this browser. You can type commands below!");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Could not start recognition:', err);
      }
    }
  };

  // Natural Language Command Parser & App Operator
  const executeCommand = (rawText) => {
    const cmd = rawText.toLowerCase().trim();
    let reply = "";

    // 1. Navigation Commands
    if (cmd.includes('mission') || cmd.includes('squad') || cmd.includes('roster')) {
      setActiveTab('mission_ops');
      reply = "Affirmative. Navigating to Mission and Squad Operations.";
    } else if (cmd.includes('twin') || cmd.includes('avatar') || cmd.includes('3d') || cmd.includes('anatomy') || cmd.includes('blender')) {
      setActiveTab('overview');
      reply = "Switching to 3D Digital Twin and Anatomical Telemetry.";
    } else if (cmd.includes('pharmacy') || cmd.includes('medication') || cmd.includes('drug') || cmd.includes('radiation shelf')) {
      setActiveTab('pharmacy');
      reply = "Opening Space Pharmacy and Cosmic Radiation Degradation tracker.";
    } else if (cmd.includes('biometric') || cmd.includes('camera') || cmd.includes('optical') || cmd.includes('webcam') || cmd.includes('scan my face')) {
      setActiveTab('biometrics');
      reply = "Activating Optical Biometrics Scanner. Face tracking online.";
    } else if (cmd.includes('nutrition') || cmd.includes('galley') || cmd.includes('food') || cmd.includes('water') || cmd.includes('hydration')) {
      setActiveTab('nutrition');
      reply = "Accessing Space Galley and crew nutrition countermeasures.";
    } else if (cmd.includes('astrolab') || cmd.includes('robot') || cmd.includes('analyzer') || cmd.includes('blood test') || cmd.includes('hardware')) {
      setActiveTab('astrolab');
      reply = "Connecting to Astro-Lab Robotic Bio-Analyzer IoT dock.";
    } else if (cmd.includes('surgeon') || cmd.includes('jarvis') || cmd.includes('flight surgeon') || cmd.includes('ai doctor')) {
      setActiveTab('ai_surgeon');
      reply = "Opening J.A.R.V.I.S. Clinical Decision Support System.";
    } else if (cmd.includes('readiness') || cmd.includes('matrix') || cmd.includes('eva clearance')) {
      setActiveTab('crew_matrix');
      reply = "Displaying Crew Flight-Readiness Matrix.";
    } else if (cmd.includes('biophilia') || cmd.includes('mental') || cmd.includes('nature') || cmd.includes('earth sound') || cmd.includes('vr')) {
      setActiveTab('biophilia');
      reply = "Loading Earth Biophilia and Neuro-Psychological Resilience sanctuary.";
    } else if (cmd.includes('trend') || cmd.includes('chart') || cmd.includes('analytics') || cmd.includes('history')) {
      setActiveTab('trends');
      reply = "Opening Longitudinal Health Trends and NASA HRP analytics.";
    } else if (cmd.includes('exam') || cmd.includes('vision test') || cmd.includes('sans test')) {
      setActiveTab('exams');
      reply = "Opening Astronaut Self-Exam Suite.";
    } else if (cmd.includes('protocol') || cmd.includes('library') || cmd.includes('manual')) {
      setActiveTab('protocols');
      reply = "Loading NASA HRP Medical Protocols Library.";
    } else if (cmd.includes('latency') || cmd.includes('earth delay') || cmd.includes('comm') || cmd.includes('uplink') || cmd.includes('dsn')) {
      setActiveTab('comm_uplink');
      reply = "Displaying Deep Space Network radio latency and Earth ground control uplink buffer.";
    } else if (cmd.includes('infusion') || cmd.includes('pump') || cmd.includes('lbnp') || cmd.includes('chibis') || cmd.includes('medical bay')) {
      setActiveTab('robotic_bay');
      reply = "Connecting to Autonomous Robotic Medical Bay and Chibis LBNP countermeasure chamber.";
    } else if (cmd.includes('spacewalk') || cmd.includes('eva') || cmd.includes('visor') || cmd.includes('helmet') || cmd.includes('suit')) {
      setActiveTab('eva_hud');
      reply = "Engaging EVA Helmet Visor HUD and Portable Life Support System telemetry.";
    } else if (cmd.includes('tour') || cmd.includes('judge') || cmd.includes('demo') || cmd.includes('presentation')) {
      if (onOpenJudgeTour) onOpenJudgeTour();
      reply = "Launching 60-Second NASA Judge Tour and automated presentation walkthrough.";
    }

    // 2. Patient / Astronaut Selection Commands
    else if (cmd.includes('sarah') || cmd.includes('commander')) {
      const target = crewList.find(c => c.name.toLowerCase().includes('sarah')) || crewList[0];
      if (target) {
        setActiveCrew(target);
        reply = `Active focus set to Commander Sarah Chen. Readiness is ${target.overallHealthIndex || 88} percent.`;
      }
    } else if (cmd.includes('marcus') || cmd.includes('pilot')) {
      const target = crewList.find(c => c.name.toLowerCase().includes('marcus'));
      if (target) {
        setActiveCrew(target);
        reply = `Active focus set to Pilot Marcus Vance. Muscle fatigue warning active.`;
      }
    } else if (cmd.includes('elena') || cmd.includes('doctor') || cmd.includes('rostova')) {
      const target = crewList.find(c => c.name.toLowerCase().includes('elena'));
      if (target) {
        setActiveCrew(target);
        reply = `Active focus set to Dr. Elena Rostova. Flight readiness 94 percent, optimal.`;
      }
    } else if (cmd.includes('liam') || cmd.includes('tanaka')) {
      const target = crewList.find(c => c.name.toLowerCase().includes('liam'));
      if (target) {
        setActiveCrew(target);
        reply = `Active focus set to Dr. Liam Tanaka, Lunar Geochemist.`;
      }
    }

    // 3. Vital Sign Audio Readout
    else if (cmd.includes('vital') || cmd.includes('status') || cmd.includes('how am i') || cmd.includes('health')) {
      const hr = activeCrew.hr || '72 bpm';
      const bp = activeCrew.bp || '118/76';
      const health = activeCrew.overallHealthIndex || 88;
      reply = `Commander, your vitals for ${activeCrew.name}: Heart rate ${hr}, blood pressure ${bp}, overall readiness ${health} percent. All telemetry within NASA-STD-3001 baseline tolerances.`;
    }

    // 4. Emergency & Drills
    else if (cmd.includes('emergency') || cmd.includes('code red') || cmd.includes('alarm')) {
      if (onOpenEmergency) onOpenEmergency();
      reply = "WARNING: Code Red Emergency protocol initiated! Opening autonomous triage module.";
    } else if (cmd.includes('solar storm') || cmd.includes('spe') || cmd.includes('radiation drill')) {
      setActiveTab('crew_matrix');
      reply = "Solar Particle Event storm alert initiated. Navigating to crew matrix for storm shelter verification.";
    } else if (cmd.includes('dossier') || cmd.includes('export') || cmd.includes('report') || cmd.includes('form 1047')) {
      if (onOpenDossier) onOpenDossier();
      reply = "Generating and opening NASA Form 1047-B Medical Dossier export.";
    } else if (cmd.includes('help') || cmd.includes('guide') || cmd.includes('bug') || cmd.includes('praca') || cmd.includes('problem')) {
      if (onOpenHelp) onOpenHelp();
      reply = "Opening Flight Deck Help Guide and NASA PRACA Anomaly Dispatch.";
    }

    // 5. System & Theme Toggles
    else if (cmd.includes('dark mode') || cmd.includes('night mode') || cmd.includes('dark theme')) {
      setTheme('dark');
      reply = "Flight deck switched to Dark Mode.";
    } else if (cmd.includes('light mode') || cmd.includes('day mode') || cmd.includes('light theme')) {
      setTheme('light');
      reply = "Flight deck switched to Light Mode.";
    } else {
      reply = `Command recognized: "${rawText}". I have synchronized habitat telemetry. Try saying "Go to Mission Ops", "Read my vitals", or "Select Dr. Rostova".`;
    }

    setLastResponse(reply);
    speak(reply);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    executeCommand(textInput);
    setTextInput('');
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      
      {/* Floating Minimized Pill / Orb */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            speak("S.T.E.A.L.T.H. assistant ready for commands.");
          }}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-zinc-900/95 dark:bg-zinc-900/95 hover:bg-zinc-800 border border-zinc-400 dark:border-zinc-700 text-white shadow-2xl backdrop-blur-xl transition-all hover:scale-105 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
            <Radio className="w-3 h-3 text-cyan-400" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
          </div>

          <div className="text-left font-hud">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs tracking-wider text-white">S.T.E.A.L.T.H.</span>
              <span className="text-[9px] px-1 rounded bg-zinc-800 text-zinc-300 font-mono-space border border-zinc-700">
                VOICE AI
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono-space">
              Hands-Free Hab Operator
            </div>
          </div>
        </button>
      )}

      {/* Expanded Voice Console Overlay */}
      {isOpen && (
        <div className="w-80 sm:w-96 max-w-[calc(100vw-2rem)] rounded-2xl bg-white/95 dark:bg-zinc-950/95 border border-zinc-300 dark:border-zinc-700 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-3 duration-200 overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="p-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-900/80">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-hud font-bold text-xs tracking-wide uppercase text-zinc-900 dark:text-white">
                    S.T.E.A.L.T.H. Co-Pilot
                  </h3>
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-mono-space bg-zinc-900 dark:bg-white text-white dark:text-black font-bold">
                    ONLINE
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono-space">
                  Hands-Free Autonomous Habitat Navigator
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Minimize S.T.E.A.L.T.H."
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* AI Response Display & Animated Voice Waveform */}
          <div className="p-4 space-y-3 bg-zinc-100/50 dark:bg-zinc-900/40">
            <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between text-[10px] font-mono-space text-zinc-500 mb-1.5">
                <span className="flex items-center gap-1 text-zinc-900 dark:text-white font-bold">
                  <Sparkles className="w-3 h-3 text-cyan-400" /> S.T.E.A.L.T.H. AUDIO LINK
                </span>
                {isSpeaking && (
                  <span className="text-cyan-500 animate-pulse font-bold">
                    SPEAKING...
                  </span>
                )}
              </div>
              <p className="text-xs font-mono-space text-zinc-800 dark:text-zinc-200 leading-relaxed">
                "{lastResponse}"
              </p>
            </div>

            {/* Live Microphone Status & Audio Waveform */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <button
                onClick={toggleListening}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-hud text-xs font-bold transition-all cursor-pointer ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-md ring-2 ring-red-500/50'
                    : 'bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-black shadow'
                }`}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isListening ? 'Listening... (Speak Now)' : 'Click to Speak'}</span>
              </button>

              <div className="flex items-center gap-1 h-4">
                {[12, 24, 16, 28, 14, 20].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all ${
                      isListening
                        ? 'bg-cyan-400 animate-pulse'
                        : isSpeaking
                        ? 'bg-amber-400 animate-bounce'
                        : 'bg-zinc-300 dark:bg-zinc-700'
                    }`}
                    style={{
                      height: isListening ? `${h}px` : isSpeaking ? `${h * 0.7}px` : '4px',
                      animationDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Quick 1-Click Voice Command Suggestions */}
            <div>
              <div className="text-[10px] font-mono-space text-zinc-500 uppercase mb-1.5 font-bold flex items-center justify-between">
                <span>Quick Hands-Free Commands:</span>
                <span className="text-[9px] text-zinc-400">Click to execute</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono-space">
                {[
                  { label: '🗣️ "Go to Mission Ops"', cmd: 'go to mission operations' },
                  { label: '🗣️ "Read my vitals"', cmd: 'read my vitals' },
                  { label: '🗣️ "Select Dr. Rostova"', cmd: 'select elena rostova' },
                  { label: '🗣️ "Inspect 3D Twin"', cmd: 'show 3d model' },
                  { label: '🗣️ "Open Space Pharmacy"', cmd: 'open pharmacy' },
                  { label: '🗣️ "Launch 60-Sec Tour"', cmd: 'launch judge tour' },
                  { label: '🗣️ "Open Robotic Med-Bay"', cmd: 'open robotic medical bay' },
                  { label: '🗣️ "Open EVA Visor HUD"', cmd: 'open spacewalk visor' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setTranscript(item.cmd);
                      executeCommand(item.cmd);
                    }}
                    className="p-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-colors text-left truncate cursor-pointer text-[10px]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Text Command Input Fallback */}
          <form
            onSubmit={handleTextSubmit}
            className="p-2.5 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2 bg-white dark:bg-zinc-950"
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Or type a command (e.g. 'go to pharmacy')..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-mono-space text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white transition-colors shadow-sm cursor-pointer"
              title="Execute command"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}

