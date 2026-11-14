import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Radio, 
  Bot, 
  Activity, 
  AlertOctagon, 
  X,
  Play,
  RotateCcw
} from 'lucide-react';

const TOUR_STEPS = [
  {
    step: 1,
    title: "1. The 22-Minute Mars Comms Delay",
    subtitle: "Why Traditional Telemedicine Fails in Deep Space",
    tag: "NASA PROBLEM STATEMENT",
    description: "During missions to Mars or Deep Space Gateway, one-way communication latency to Earth is 14 to 22 minutes. In a medical emergency, Earth-based flight surgeons cannot provide real-time guidance.",
    highlight: "MARK XI operates 100% autonomously client-side with zero cloud dependency.",
    targetTab: "overview",
    actionLabel: "View Telemetry & Digital Twin"
  },
  {
    step: 2,
    title: "2. Autonomous Bio-Avatar & SANS Detection",
    subtitle: "R.I.D.G.E. Hazards Clinical Decision Support",
    tag: "DIAGNOSTIC ENGINE",
    description: "In zero-g, 2 liters of fluid shift toward the astronaut's head, causing Spaceflight-Associated Neuro-ocular Syndrome (SANS) and intracranial hypertension. The Bio-Avatar provides an interactive digital twin with layer peeling.",
    highlight: "Clicking any organ reveals plain-English clinical pathophysiology and NASA-STD-3001 countermeasures.",
    targetTab: "overview",
    actionLabel: "Inspect Bio-Avatar"
  },
  {
    step: 3,
    title: "3. J.A.R.V.I.S. Offline AI Flight Surgeon",
    subtitle: "Hands-Free Voice AI Copilot for Gloved Astronauts",
    tag: "VOICE AI INNOVATION",
    description: "Astronauts working in pressurized EVA suits cannot easily type on keyboards. J.A.R.V.I.S. provides hands-free speech-to-text input, autonomous differential diagnosis, and voice synthesis readback.",
    highlight: "Try clicking the microphone or asking 'Astronaut reports sudden blurry vision and head fullness'.",
    targetTab: "ai_surgeon",
    actionLabel: "Open J.A.R.V.I.S. Voice AI"
  },
  {
    step: 4,
    title: "4. Autonomous Lab, Pharmacy & CODE RED",
    subtitle: "Closed-Loop Intervention & Critical Emergency Protocols",
    tag: "FULL INTERVENTION",
    description: "Real health monitoring requires real countermeasures. MARK XI includes the ASTRO-LAB™ microfluidic bio-dock, cosmic radiation drug degradation tracking, and a 110-BPM zero-g CPR metronome.",
    highlight: "Click 'CODE RED' in the top bar anytime to trigger the audible space klaxon and CPR guidance.",
    targetTab: "astrolab",
    actionLabel: "Inspect ASTRO-LAB IoT"
  }
];

export default function JudgeGuidedTour({ isOpen, onClose, onNavigateTab, onOpenEmergency }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  if (!isOpen) return null;

  const current = TOUR_STEPS[currentStepIdx];
  const isLast = currentStepIdx === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      onClose();
    } else {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      if (onNavigateTab) {
        onNavigateTab(TOUR_STEPS[nextIdx].targetTab);
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      if (onNavigateTab) {
        onNavigateTab(TOUR_STEPS[prevIdx].targetTab);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-zinc-900 border border-zinc-700/40 p-6 shadow-2xl shadow-zinc-950/80 text-zinc-100 flex flex-col gap-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-zinc-800 text-white border border-zinc-700/40">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-hud font-bold text-base text-white uppercase tracking-wider">
                  NASA Space Apps Judge Walkthrough
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono-space font-semibold bg-zinc-800 text-zinc-200 border border-zinc-700/40">
                  STEP {current.step} OF {TOUR_STEPS.length}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono-space">
                60-Second Guided Tour: How MARK XI Solves Deep Space Latency
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-4 gap-2">
          {TOUR_STEPS.map((st, i) => (
            <div
              key={st.step}
              onClick={() => {
                setCurrentStepIdx(i);
                if (onNavigateTab) onNavigateTab(st.targetTab);
              }}
              className={`h-1.5 rounded-full cursor-pointer transition-all ${
                i === currentStepIdx
                  ? 'bg-white text-black shadow-md shadow-white/20'
                  : i < currentStepIdx
                  ? 'bg-emerald-500'
                  : 'bg-zinc-800'
              }`}
            />
          ))}
        </div>

        {/* Content Box */}
        <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-700/20 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono-space uppercase tracking-widest text-white font-bold px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-700/30">
              {current.tag}
            </span>
            <span className="text-xs text-zinc-400 font-mono-space">
              {current.subtitle}
            </span>
          </div>

          <h4 className="text-lg font-hud font-bold text-white tracking-wide">
            {current.title}
          </h4>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {current.description}
          </p>

          <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-700/30 text-xs text-zinc-200 font-mono-space flex items-center gap-2.5">
            <Radio className="w-4 h-4 text-white shrink-0 animate-pulse" />
            <span><strong>JUDGE TIP:</strong> {current.highlight}</span>
          </div>
        </div>

        {/* Controls Footer */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className={`px-3.5 py-2 rounded-xl font-hud text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentStepIdx === 0
                ? 'opacity-40 cursor-not-allowed text-zinc-500'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Previous Step
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onNavigateTab) onNavigateTab(current.targetTab);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/30 font-hud text-xs font-bold transition-all"
            >
              Jump Directly to Tool
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-hud text-xs font-bold transition-all shadow-lg shadow-white/10 flex items-center gap-1.5"
            >
              {isLast ? (
                <>Finish Tour <CheckCircle className="w-4 h-4" /></>
              ) : (
                <>Next Step <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

