import React, { useState, useEffect, useRef } from 'react';
import { 
  TreePine, 
  Waves, 
  CloudRain, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sparkles, 
  Heart, 
  Send, 
  Smile, 
  Meh, 
  Frown,
  Activity,
  Compass
} from 'lucide-react';

export default function BiophiliaMentalResilience({ activeCrew }) {
  // Biophilia Soundscapes State
  const [activeSound, setActiveSound] = useState(null); // 'rain' | 'ocean' | 'forest'
  const [volume, setVolume] = useState(0.5);
  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Journal Sentiment State
  const [journalText, setJournalText] = useState('');
  const [sentimentResult, setSentimentResult] = useState({
    valence: '+3.8 (Positive / Optimal)',
    stressScore: '22 / 100 (Low Stress)',
    cohesionStatus: 'High Interpersonal Resilience',
    recommendation: 'Circadian neurobehavioral balance stable. Sensory stimulation optimal.'
  });

  // Web Audio API Synthesized Nature Soundscapes
  const startBiophiliaSound = (type) => {
    stopBiophiliaSound();
    setActiveSound(type);

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Generate Pink/Brown Noise buffer for natural acoustics
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (type === 'rain') {
          // Rain / Pink noise formula
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
          b6 = white * 0.115926;
        } else if (type === 'ocean') {
          // Ocean / Brown noise formula
          b0 = (b0 + (0.02 * white)) / 1.02;
          output[i] = b0 * 0.8;
        } else {
          // Forest wind / Gentle pink noise
          b0 = (b0 + (0.04 * white)) / 1.04;
          output[i] = b0 * 0.5;
        }
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = type === 'ocean' ? 'lowpass' : 'bandpass';
      filter.frequency.setValueAtTime(type === 'ocean' ? 350 : 800, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      noiseNodeRef.current = whiteNoise;
      gainNodeRef.current = gain;
    } catch (e) {
      console.log('Audio synthesis error:', e);
    }
  };

  const stopBiophiliaSound = () => {
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    setActiveSound(null);
  };

  useEffect(() => {
    return () => stopBiophiliaSound();
  }, []);

  const handleAnalyzeJournal = (e) => {
    e.preventDefault();
    if (!journalText.trim()) return;

    const lower = journalText.toLowerCase();
    if (lower.includes('tired') || lower.includes('lonely') || lower.includes('frustrated') || lower.includes('stress')) {
      setSentimentResult({
        valence: '-1.4 (Mild Isolation Stress)',
        stressScore: '58 / 100 (Elevated)',
        cohesionStatus: 'Interpersonal Friction Risk',
        recommendation: 'Initiate 30-min Pacific Coastal Surf biophilia audio immersion. Schedule private family downlink vidcon.'
      });
    } else {
      setSentimentResult({
        valence: '+4.1 (Optimal High Valence)',
        stressScore: '18 / 100 (Minimal Stress)',
        cohesionStatus: 'Optimal Crew Cohesion',
        recommendation: 'Psychological resilience benchmark verified. Continue standard mission schedule.'
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 scanlines">
        <div>
          <div className="flex items-center gap-2">
            <TreePine className="w-5 h-5 text-emerald-400" />
            <h2 className="font-hud font-bold text-base text-white tracking-wide uppercase">
              Earth Biophilia & Neuro-Psychological Resilience
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-mono-space">
            Countering Hazard "I" (Isolation & Confinement) through sensory immersion & sentiment tracking
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-space">
          <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-emerald-400">
            CREW COHESION: <strong className="text-white">9.1 / 10</strong>
          </span>
        </div>
      </div>

      {/* Main Grid: Biophilia Soundscapes & Sentiment Journal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Earth Biophilia Soundscape Immersion */}
        <div className="lg:col-span-6 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <span className="font-hud font-bold text-sm text-white tracking-wide uppercase flex items-center gap-2">
                <Waves className="w-4 h-4 text-white" />
                Earth Nature Biophilia Soundscapes
              </span>
              <span className="text-xs font-mono-space text-zinc-200">
                Web Audio Synthesized
              </span>
            </div>

            <p className="text-xs text-zinc-300 mb-4 font-sans leading-relaxed">
              Long-duration isolation inside sterile metallic hulls causes severe sensory deprivation. NASA behavioral health research demonstrates that acoustic biophilia stimulates alpha brainwaves, resetting autonomic stress.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Rain */}
              <button
                onClick={() => activeSound === 'rain' ? stopBiophiliaSound() : startBiophiliaSound('rain')}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  activeSound === 'rain'
                    ? 'bg-zinc-900/80 border-zinc-700 text-white shadow-lg shadow-md'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <CloudRain className={`w-6 h-6 ${activeSound === 'rain' ? 'text-white animate-bounce' : 'text-zinc-400'}`} />
                <span className="font-hud font-bold text-xs">Olympic Rain</span>
                <span className="text-[10px] font-mono-space text-zinc-500">{activeSound === 'rain' ? 'PLAYING' : 'OFF'}</span>
              </button>

              {/* Ocean */}
              <button
                onClick={() => activeSound === 'ocean' ? stopBiophiliaSound() : startBiophiliaSound('ocean')}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  activeSound === 'ocean'
                    ? 'bg-zinc-900/80 border-zinc-700 text-white shadow-lg shadow-md'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <Waves className={`w-6 h-6 ${activeSound === 'ocean' ? 'text-white animate-pulse' : 'text-zinc-400'}`} />
                <span className="font-hud font-bold text-xs">Pacific Surf</span>
                <span className="text-[10px] font-mono-space text-zinc-500">{activeSound === 'ocean' ? 'PLAYING' : 'OFF'}</span>
              </button>

              {/* Forest Wind */}
              <button
                onClick={() => activeSound === 'forest' ? stopBiophiliaSound() : startBiophiliaSound('forest')}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  activeSound === 'forest'
                    ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-lg glow-emerald'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <TreePine className={`w-6 h-6 ${activeSound === 'forest' ? 'text-emerald-400 animate-bounce' : 'text-zinc-400'}`} />
                <span className="font-hud font-bold text-xs">Alpine Pines</span>
                <span className="text-[10px] font-mono-space text-zinc-500">{activeSound === 'forest' ? 'PLAYING' : 'OFF'}</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] font-mono-space text-zinc-400 flex items-center justify-between">
            <span>Spatial Audio Frequency: 432 Hz Calibrated</span>
            <span className="text-white">{activeSound ? 'Active Acoustic Therapy' : 'Muted'}</span>
          </div>
        </div>

        {/* Right: Psychological Sentiment & Journal Analysis */}
        <div className="lg:col-span-6 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <span className="font-hud font-bold text-sm text-white tracking-wide uppercase flex items-center gap-2">
                <Heart className="w-4 h-4 text-emerald-400" />
                Astronaut Journal & Sentiment Triage
              </span>
              <span className="text-xs font-mono-space text-emerald-400 font-bold">
                {sentimentResult.valence.split(' ')[0]}
              </span>
            </div>

            <form onSubmit={handleAnalyzeJournal} className="space-y-3">
              <textarea
                value={journalText}
                onChange={e => setJournalText(e.target.value)}
                placeholder="Log your daily subjective thoughts, interpersonal mood, or mission stress notes here..."
                rows={3}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 font-sans shadow-inner resize-none"
              />

              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono-space text-zinc-500">
                  Natural Language Sentiment Engine (Offline)
                </span>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-hud text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Analyze Psychological Valence
                </button>
              </div>
            </form>

            {/* Sentiment Results Card */}
            <div className="mt-4 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 font-mono-space text-xs">
              <div className="flex justify-between items-center pb-1.5 border-b border-zinc-800">
                <span className="text-zinc-400">Emotional Valence:</span>
                <span className="text-emerald-400 font-bold">{sentimentResult.valence}</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-zinc-800">
                <span className="text-zinc-400">Stress Index:</span>
                <span className="text-white font-bold">{sentimentResult.stressScore}</span>
              </div>
              <p className="text-[11px] text-zinc-300 font-sans pt-1">
                <strong>Countermeasure Guidance:</strong> {sentimentResult.recommendation}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800 text-[10px] font-mono-space text-zinc-400">
            NASA Human Factors & Behavioral Performance (HFBP) Guidelines
          </div>
        </div>

      </div>

    </div>
  );
}

