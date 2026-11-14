import React, { useEffect, useRef, useState } from 'react';
import { 
  Heart, 
  Activity, 
  Droplets, 
  Thermometer, 
  Radio, 
  ShieldAlert, 
  Eye, 
  TrendingUp,
  Zap
} from 'lucide-react';

export default function TelemetryCards({ activeCrew, currentEnv, onSelectOrgan, organSystems, theme }) {
  const canvasRef = useRef(null);

  // Live ECG Waveform Animation Canvas (Monochrome High-Contrast Theme Adaptive)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let step = 0;
    const isLight = theme === 'light';

    const renderECG = () => {
      // Background
      ctx.fillStyle = isLight ? '#f4f4f5' : '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // ECG trace in High-Contrast Crisp Laser
      ctx.strokeStyle = isLight ? '#09090b' : '#ffffff';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = isLight ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = 6;
      ctx.beginPath();

      const centerY = canvas.height / 2;
      for (let x = 0; x < canvas.width; x++) {
        const offset = (x + step) % 180;
        let y = centerY;

        // P wave
        if (offset > 20 && offset < 40) {
          y -= Math.sin(((offset - 20) / 20) * Math.PI) * 7;
        }
        // QRS complex
        else if (offset >= 50 && offset < 55) {
          y += 5; // Q
        } else if (offset >= 55 && offset < 63) {
          y -= 38; // R peak
        } else if (offset >= 63 && offset < 70) {
          y += 12; // S dip
        }
        // T wave
        else if (offset > 85 && offset < 120) {
          y -= Math.sin(((offset - 85) / 35) * Math.PI) * 11;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      step = (step + 1.8);
      animationFrameId = requestAnimationFrame(renderECG);
    };

    renderECG();

    return () => cancelAnimationFrame(animationFrameId);
  }, [theme]);

  const getSystem = (id) => organSystems.find(s => s.id === id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-6">
      
      {/* 1. Live Cardiovascular & ECG Tile */}
      <div 
        onClick={() => onSelectOrgan(getSystem('cardiovascular'))}
        className="rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-400 dark:hover:border-zinc-500 cursor-pointer transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 group shadow-sm"
      >
        <div className="flex items-center justify-between gap-1.5 flex-wrap pb-2">
          <span className="text-xs font-hud font-semibold text-zinc-800 dark:text-zinc-300 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform animate-pulse" />
            CARDIOVASCULAR
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono-space bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 font-bold shrink-0">
            NOMINAL
          </span>
        </div>

        <div className="flex items-baseline justify-between mb-2">
          <div>
            <span className="font-hud text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">72</span>
            <span className="text-xs font-mono-space text-zinc-500 dark:text-zinc-400 ml-1">BPM</span>
          </div>
          <div className="text-right text-xs font-mono-space text-zinc-700 dark:text-zinc-300">
            <div>BP: <span className="text-zinc-900 dark:text-white font-semibold">118/76</span></div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">HRV: 48.2 ms</div>
          </div>
        </div>

        {/* Live Canvas Waveform */}
        <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 h-14 relative">
          <canvas ref={canvasRef} width={260} height={56} className="w-full h-full block" />
          <div className="absolute bottom-1 right-2 text-[9px] font-mono-space text-zinc-500 dark:text-zinc-400">
            LEAD-II TELEMETRY
          </div>
        </div>
      </div>

      {/* 2. SANS & Neuro-Ocular Alert Tile */}
      <div 
        onClick={() => onSelectOrgan(getSystem('neuro_ocular'))}
        className="rounded-xl bg-white dark:bg-zinc-950 border border-amber-500/50 p-4 hover:border-amber-400 cursor-pointer transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 group glow-amber shadow-sm"
      >
        <div className="flex items-center justify-between gap-1.5 flex-wrap pb-2">
          <span className="text-xs font-hud font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            SANS & NEURO-OCULAR
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono-space bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 animate-pulse font-bold shrink-0">
            CAUTION
          </span>
        </div>

        <div className="flex items-baseline justify-between mb-1">
          <div>
            <span className="font-hud text-2xl font-bold text-amber-800 dark:text-amber-200 tracking-tight">Grade 1.5</span>
            <span className="text-xs font-mono-space text-zinc-500 dark:text-zinc-400 ml-1">Frisén</span>
          </div>
          <div className="text-right text-xs font-mono-space">
            <div className="text-amber-700 dark:text-amber-300 font-semibold">ONSD: 5.9mm</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Normal &lt; 5.0mm</div>
          </div>
        </div>

        <div className="mt-2.5 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/30 text-[11px] text-amber-900 dark:text-amber-200/90 font-mono-space">
          <div className="flex items-center justify-between font-bold gap-1 flex-wrap">
            <span>CEPHALAD SHIFT: +1.8L</span>
            <span className="text-zinc-900 dark:text-white text-[10px] shrink-0">Action Req. →</span>
          </div>
          <p className="text-[10px] text-zinc-600 dark:text-zinc-300 mt-0.5 truncate">
            Chibis LBNP Suit session recommended.
          </p>
        </div>
      </div>

      {/* 3. Space Radiation Dosimetry Tile */}
      <div 
        onClick={() => onSelectOrgan(getSystem('radiation_immune'))}
        className="rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-400 dark:hover:border-zinc-500 cursor-pointer transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 group shadow-sm"
      >
        <div className="flex items-center justify-between gap-1.5 flex-wrap pb-2">
          <span className="text-xs font-hud font-semibold text-zinc-800 dark:text-zinc-300 flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-zinc-700 dark:text-white group-hover:scale-110 transition-transform" />
            RADIATION DOSIMETRY
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono-space bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-bold shrink-0">
            SAFE LIMIT
          </span>
        </div>

        <div className="flex items-baseline justify-between mb-1">
          <div>
            <span className="font-hud text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">128.4</span>
            <span className="text-xs font-mono-space text-zinc-500 dark:text-zinc-400 ml-1">mSv</span>
          </div>
          <div className="text-right text-xs font-mono-space text-zinc-700 dark:text-zinc-300">
            <div>RATE: <span className="text-zinc-900 dark:text-white font-semibold">1.4 mSv/d</span></div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">SPE: QUIET</div>
          </div>
        </div>

        {/* Progress bar towards Career NASA limit */}
        <div className="mt-3">
          <div className="flex justify-between text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400 mb-1">
            <span>Career Dose Limit</span>
            <span className="text-zinc-900 dark:text-white font-semibold">21.4% (600 mSv)</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-full h-2 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="bg-zinc-900 dark:bg-white h-full rounded-full" style={{ width: '21.4%' }}></div>
          </div>
        </div>
      </div>

      {/* 4. Metabolic & Environment Tile */}
      <div 
        onClick={() => onSelectOrgan(getSystem('metabolic_respiratory'))}
        className="rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-400 dark:hover:border-zinc-500 cursor-pointer transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 group shadow-sm"
      >
        <div className="flex items-center justify-between gap-1.5 flex-wrap pb-2">
          <span className="text-xs font-hud font-semibold text-zinc-800 dark:text-zinc-300 flex items-center gap-1.5">
            <Thermometer className="w-4 h-4 text-zinc-700 dark:text-white group-hover:scale-110 transition-transform" />
            CABIN & METABOLIC
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono-space bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-bold shrink-0">
            STABLE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400 block">Blood SpO2</span>
            <span className="font-hud text-lg font-bold text-zinc-900 dark:text-white">98.5%</span>
          </div>
          <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400 block">Core Temp</span>
            <span className="font-hud text-lg font-bold text-zinc-900 dark:text-white">37.4 °C</span>
          </div>
          <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400 block">Cabin pCO2</span>
            <span className="font-hud text-lg font-bold text-zinc-900 dark:text-white">2.8 <span className="text-[10px] font-normal">mmHg</span></span>
          </div>
          <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400 block">Glucose</span>
            <span className="font-hud text-lg font-bold text-zinc-900 dark:text-white">92 <span className="text-[10px] font-normal">mg/dL</span></span>
          </div>
        </div>
      </div>

    </div>
  );
}
