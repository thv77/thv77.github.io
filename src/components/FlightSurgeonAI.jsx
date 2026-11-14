import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Activity, 
  ShieldAlert, 
  FileText,
  RotateCcw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { ORGAN_SYSTEMS } from '../data/nasaHrpData';

export default function FlightSurgeonAI({ activeCrew, currentEnv }) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      text: `Greetings, ${activeCrew.name.split(',')[0]}. I am J.A.R.V.I.S. (Joint Autonomous Response & Vitals Intelligence Surgeon). Due to our current Earth communication latency, I am operating in full local diagnostic mode. How are you feeling today, or what symptoms are you experiencing?`,
      timestamp: '08:14 MET',
      diagnosis: null
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceSpeechEnabled, setVoiceSpeechEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Voice Speech Synthesis (J.A.R.V.I.S. Speaking Aloud)
  const speakText = (text) => {
    if (!voiceSpeechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Hands-Free Microphone Speech Recognition (Web Speech API)
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. You can type your symptoms directly!");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          handleSendMessage(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  // Pre-configured quick symptoms buttons
  const quickPrompts = [
    "I have pressure behind my eyes and my near vision is blurry.",
    "I have a throbbing headache and cabin pCO2 reads 2.9 mmHg.",
    "Feeling lightheaded after unstrapping from the ARED machine.",
    "Can you run my pre-EVA spacewalk medical clearance check?"
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Analyze query using NASA Space Medicine Diagnostic Knowledge Base
    setTimeout(() => {
      let responseText = "";
      let diagnosisCard = null;
      const lower = query.toLowerCase();

      if (lower.includes('eye') || lower.includes('vision') || lower.includes('blur') || lower.includes('pressure')) {
        responseText = `Based on your symptoms and telemetry, this presentation strongly correlates with Spaceflight-Associated Neuro-ocular Syndrome (SANS) Grade 1.5, induced by cephalad fluid shifts in microgravity.`;
        diagnosisCard = {
          condition: 'Spaceflight-Associated Neuro-ocular Syndrome (SANS)',
          confidence: '94%',
          hazard: 'Gravity Fields (Cephalad Fluid Volume Shift)',
          severity: 'MODERATE (AMBER)',
          steps: [
            'Immediate: Execute 45-minute Chibis Lower Body Negative Pressure (LBNP) session at -25 mmHg to draw venous blood down.',
            'Diagnostic: Conduct the onboard digital Snellen near-vision test and Amsler grid self-check.',
            'Sleep Configuration: Adjust sleep compartment bag tether to a 30° head-up angle to eliminate overnight intracranial pooling.'
          ]
        };
      } else if (lower.includes('co2') || lower.includes('headache') || lower.includes('pco2')) {
        responseText = `Your symptoms indicate localized hypercapnia (carbon dioxide re-breathing). In zero gravity, exhaled air lacks convective buoyancy and can create stagnant CO2 micro-pockets around your head.`;
        diagnosisCard = {
          condition: 'Microgravity Hypercapnia / Air Stagnation',
          confidence: '91%',
          hazard: 'Hostile Closed Environments (ECLSS)',
          severity: 'MODERATE (AMBER)',
          steps: [
            'Inspect sleep cubicle air circulation fan nozzle to ensure unobstructed 35 CFM velocity.',
            'Verify regenerative Amine CO2 scrubbers are maintaining cabin pCO2 < 2.5 mmHg.',
            'Hydrate with 500 mL water and rest for 20 minutes in an open module with central airflow.'
          ]
        };
      } else if (lower.includes('lightheaded') || lower.includes('dizzy') || lower.includes('orthostatic')) {
        responseText = `This is classic post-exercise orthostatic intolerance. Microgravity reduces overall intravascular plasma volume by 15-20%, diminishing venous return to the heart following heavy physical exertion.`;
        diagnosisCard = {
          condition: 'Orthostatic Intolerance / Hypovolemia',
          confidence: '88%',
          hazard: 'Gravity Fields & Cardiovascular Remodeling',
          severity: 'MILD-MODERATE',
          steps: [
            'Rest horizontally in restraint harness with legs slightly elevated.',
            'Consume 750 mL isotonic electrolyte fluid (0.9% NaCl equivalent) immediately.',
            'Put on lower extremity elastic compression garments (G-suit or graded socks).'
          ]
        };
      } else if (lower.includes('eva') || lower.includes('clearance') || lower.includes('spacewalk')) {
        responseText = `Initiating autonomous Pre-EVA Spacewalk Medical Review for ${activeCrew.name.split(',')[0]}...`;
        diagnosisCard = {
          condition: 'Pre-EVA Spacewalk Flight Readiness Assessment',
          confidence: '100%',
          hazard: 'Mission Performance & Life Support Integration',
          severity: 'CLEARED WITH RESTRICTION',
          steps: [
            'Cardiovascular: Resting HR 72 bpm, BP 118/76 mmHg (PASSED)',
            'Cognitive: PVT mean reaction 218 ms, 0 lapses (PASSED)',
            'Neuro-Ocular: SANS Frisén Grade 1.5 present. Caution: Ensure helmet near-vision magnifying cheater lenses are mounted inside the EMU helmet.',
            'Final Verdict: CONDITIONALLY CLEARED for 6.5-hour scheduled EVA.'
          ]
        };
      } else {
        responseText = `I have logged your report into the spacecraft bio-telemetry register. Your current vitals (HR: 72 bpm, SpO2: 98.5%, Temp: 37.4°C) remain stable within mission tolerances. Continue monitoring and notify me if discomfort escalates.`;
      }

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        diagnosis: diagnosisCard
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      speakText(responseText);
    }, 1200);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col h-[650px] shadow-sm relative overflow-hidden">
      
      {/* Background Holographic Grid */}
      <div className="absolute inset-0 space-grid-bg opacity-40 pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-700/50 flex items-center justify-center text-zinc-900 dark:text-white shadow-sm">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-hud font-bold text-base text-zinc-900 dark:text-white tracking-wide">
                J.A.R.V.I.S. SPACE SURGEON AI
              </h3>
              <span className="text-[10px] font-mono-space px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-200 border border-zinc-700/30">
                OFFLINE CDSS
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono-space">
              Joint Autonomous Response & Vitals Intelligence Surgeon • NASA-STD-3001
            </p>
          </div>
        </div>

        {/* Voice Controls: Speech Synthesizer & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceSpeechEnabled(!voiceSpeechEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono-space transition-all ${
              voiceSpeechEnabled
                ? 'bg-zinc-800 border-zinc-700 text-zinc-200 shadow-md'
                : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white'
            }`}
            title="Toggle synthesized voice readback"
          >
            {voiceSpeechEnabled ? <Volume2 className="w-3.5 h-3.5 text-white" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{voiceSpeechEnabled ? 'Voice Output: ON' : 'Voice Output: MUTED'}</span>
          </button>

          <button
            onClick={() => setMessages([messages[0]])}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="relative z-10 flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono-space text-zinc-400 mb-1 px-1">
              <span>{msg.sender === 'user' ? activeCrew.name.split(',')[0] : 'J.A.R.V.I.S. AI'}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs font-sans leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-black rounded-tr-none shadow-md'
                  : 'bg-zinc-100 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/80 rounded-tl-none shadow-sm'
              }`}
            >
              <p>{msg.text}</p>

              {/* Differential Diagnosis Card if generated */}
              {msg.diagnosis && (
                <div className="mt-3.5 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-700/40 text-xs font-mono-space space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <span className="font-bold text-zinc-200">{msg.diagnosis.condition}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200">
                      Confidence: {msg.diagnosis.confidence}
                    </span>
                  </div>

                  <div className="text-[11px] text-zinc-400">
                    Hazard: <span className="text-zinc-200">{msg.diagnosis.hazard}</span> | Severity: <span className="text-amber-400">{msg.diagnosis.severity}</span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="font-hud text-zinc-300 text-[11px] uppercase block font-bold">
                      Mandated Autonomous Countermeasures:
                    </span>
                    {msg.diagnosis.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-zinc-300 text-[11px] font-sans">
                        <CheckCircle className="w-3.5 h-3.5 text-white mt-0.5 shrink-0" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-white font-mono-space w-fit">
            <Bot className="w-4 h-4 animate-spin" />
            <span>J.A.R.V.I.S. is analyzing telemetry against NASA clinical protocols...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Suggestion Chips */}
      <div className="relative z-10 pt-2 pb-3 flex items-center gap-2 overflow-x-auto text-[11px] font-mono-space border-t border-zinc-200 dark:border-zinc-800">
        <span className="text-zinc-500 text-[10px] shrink-0">QUICK QUERY:</span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-all shrink-0 truncate max-w-[280px]"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box with Hands-Free Microphone */}
      <div className="relative z-10 flex items-center gap-2">
        <button
          onClick={toggleListening}
          className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
            isListening
              ? 'bg-red-600 border-red-400 text-white animate-pulse shadow-[0_0_15px_#ef4444]'
              : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
          title={isListening ? "Listening... Speak your symptoms" : "Click to speak hands-free (EVA Voice Mode)"}
        >
          {isListening ? <Mic className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={isListening ? "Listening... Speak now..." : `Describe symptoms, ask medical protocol, or click Mic for hands-free voice...`}
          className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-sans shadow-inner"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isTyping}
          className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-bold transition-all shadow-md flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4 text-white dark:text-black" />
        </button>
      </div>

    </div>
  );
}
