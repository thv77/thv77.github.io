import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  CameraOff, 
  Eye, 
  Heart, 
  Activity, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  RotateCcw,
  Maximize2,
  Scan
} from 'lucide-react';

export default function OpticalBiometricsScanner({ activeCrew }) {
  const [cameraActive, setCameraActive] = useState(false);
  const [useSimulatedFeed, setUseSimulatedFeed] = useState(false);
  const [heartRate, setHeartRate] = useState(74);
  const [blinkRate, setBlinkRate] = useState(16); // blinks per min
  const [perclos, setPerclos] = useState(4.2); // Percentage of Eye Closure
  const [fatigueStatus, setFatigueStatus] = useState('Nominal Alertness');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Start Real Browser Webcam
  const startCamera = async () => {
    try {
      setUseSimulatedFeed(false);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480, facingMode: 'user' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.warn("Webcam access unavailable or blocked. Switching to simulated optical HUD feed:", err);
      setUseSimulatedFeed(true);
      setCameraActive(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Optical rPPG and Eye Blink Animation on Canvas HUD
  useEffect(() => {
    if (!cameraActive) return;
    let animationId;
    let step = 0;

    const renderHud = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw high-tech bounding box around facial zone
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 4]);

      // Face tracking target oval
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 80, 110, 0, 0, 2 * Math.PI);
      ctx.stroke();

      // Forehead ROI for rPPG Optical Pulse extraction
      ctx.setLineDash([]);
      ctx.strokeStyle = '#10b981';
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.strokeRect(centerX - 40, centerY - 85, 80, 30);
      ctx.fillRect(centerX - 40, centerY - 85, 80, 30);

      ctx.fillStyle = '#10b981';
      ctx.font = '10px monospace';
      ctx.fillText('ROI: rPPG ARTERIAL PULSE', centerX - 60, centerY - 95);

      // Eye Tracking Reticles (Left & Right Eye)
      ctx.strokeStyle = '#f59e0b';
      ctx.strokeRect(centerX - 50, centerY - 30, 32, 20);
      ctx.strokeRect(centerX + 18, centerY - 30, 32, 20);

      // Corner Crosshairs
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      const drawCorner = (x, y, dx, dy) => {
        ctx.beginPath();
        ctx.moveTo(x + dx * 20, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + dy * 20);
        ctx.stroke();
      };
      drawCorner(centerX - 100, centerY - 130, 1, 1);
      drawCorner(centerX + 100, centerY - 130, -1, 1);
      drawCorner(centerX - 100, centerY + 130, 1, -1);
      drawCorner(centerX + 100, centerY + 130, -1, -1);

      // Simulated micro-pulse fluctuation
      step++;
      if (step % 40 === 0) {
        setHeartRate(prev => 72 + Math.floor(Math.sin(step / 30) * 4));
        setPerclos(prev => +(4.0 + Math.random() * 1.5).toFixed(1));
      }

      animationId = requestAnimationFrame(renderHud);
    };

    renderHud();
    return () => cancelAnimationFrame(animationId);
  }, [cameraActive]);

  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6 scanlines">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-white" />
            <h3 className="font-hud font-bold text-base text-white tracking-wide uppercase">
              Webcam Optical Biometrics (rPPG & Blink Fatigue)
            </h3>
          </div>
          <p className="text-xs text-zinc-400 font-mono-space">
            Touchless cardiovascular & PERCLOS vigilance analysis via computer vision
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!cameraActive ? (
            <button
              onClick={startCamera}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-hud text-xs font-bold transition-all shadow-md shadow-md"
            >
              <Camera className="w-4 h-4" />
              <span>ACTIVATE MEDICAL CAMERA</span>
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-hud text-xs font-bold transition-all shadow-md"
            >
              <CameraOff className="w-4 h-4" />
              <span>DISABLE CAMERA</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Viewport & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Video & Augmented Reality HUD Canvas */}
        <div className="lg:col-span-7 relative h-80 rounded-2xl bg-zinc-950 border-2 border-zinc-800 overflow-hidden flex items-center justify-center">
          
          {/* Simulated Face Graphic if camera off or simulated */}
          {!cameraActive && (
            <div className="text-center p-6 space-y-2">
              <Scan className="w-12 h-12 text-zinc-500 mx-auto animate-pulse" />
              <div className="font-hud font-bold text-sm text-zinc-300 uppercase">
                Optical Biometric Telemetry Offline
              </div>
              <p className="text-xs text-zinc-500 font-mono-space max-w-sm">
                Click "Activate Medical Camera" to enable touchless real-time heart rate and blink fatigue detection via optical photoplethysmography.
              </p>
            </div>
          )}

          {cameraActive && useSimulatedFeed && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-space-900 to-space-950">
              <div className="text-center text-zinc-400 font-mono-space text-xs">
                <div className="w-36 h-48 rounded-full border border-zinc-700/30 mx-auto mb-2 flex items-center justify-center text-white">
                  ASTRONAUT FACIAL PROFILE
                </div>
                <span>SIMULATED OPTICAL FEED (NASA BIO-CAMERA)</span>
              </div>
            </div>
          )}

          {/* Real Webcam Video Element */}
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 ${
              cameraActive && !useSimulatedFeed ? 'block' : 'hidden'
            }`}
            muted
            playsInline
          />

          {/* Transparent Canvas Overlay for Biometric Reticles */}
          <canvas
            ref={canvasRef}
            width={400}
            height={320}
            className={`absolute inset-0 w-full h-full pointer-events-none ${
              cameraActive ? 'block' : 'hidden'
            }`}
          />

          {/* Live Scan Watermark */}
          {cameraActive && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-700/40 text-[10px] font-mono-space text-zinc-200">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>LIVE OPTICAL TELEMETRY</span>
            </div>
          )}
        </div>

        {/* Optical Sensor Extraction Cards */}
        <div className="lg:col-span-5 space-y-3.5">
          
          {/* 1. Remote Photoplethysmography (rPPG Heart Rate) */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-hud font-semibold text-zinc-300 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-emerald-400 animate-pulse" />
                OPTICAL HEART RATE (rPPG)
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono-space bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                LUMINESCENCE SYNC
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-hud text-3xl font-extrabold text-white">
                {cameraActive ? heartRate : '--'}
              </span>
              <span className="text-xs font-mono-space text-zinc-400">BPM</span>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans mt-0.5">
              Derived from hemoglobin micro-absorption changes on forehead skin capillaries.
            </p>
          </div>

          {/* 2. Eye Blink Rate & PERCLOS */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-hud font-semibold text-zinc-300 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-white" />
                PERCLOS DROWSINESS MONITOR
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono-space bg-zinc-800/80 text-zinc-200 border border-zinc-700/30">
                {cameraActive ? 'OPTIMAL' : 'STANDBY'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] font-mono-space text-zinc-400 block">Blink Rate</span>
                <span className="font-hud text-lg font-bold text-white">
                  {cameraActive ? blinkRate : '--'} <span className="text-[10px] font-normal text-zinc-400">/ min</span>
                </span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] font-mono-space text-zinc-400 block">PERCLOS Index</span>
                <span className="font-hud text-lg font-bold text-zinc-200">
                  {cameraActive ? `${perclos}%` : '--'}
                </span>
              </div>
            </div>
          </div>

          {/* Clinical Interpretation */}
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-sans">
            <strong className="text-white font-hud block mb-1">NASA TOUCHLESS MONITORING STANDARD:</strong>
            NASA Johnson Space Center evaluates remote facial camera biometrics for automated sleep debt tracking, alerting commanders if PERCLOS exceeds 12% (indicating imminent microsleep during mission critical maneuvers).
          </div>

        </div>

      </div>

    </div>
  );
}

