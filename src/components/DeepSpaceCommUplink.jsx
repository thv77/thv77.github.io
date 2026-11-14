import React, { useState, useEffect } from 'react';
import {
  Radio,
  Globe,
  Wifi,
  WifiOff,
  Clock,
  Send,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function DeepSpaceCommUplink({
  activeCrew,
  currentEnv,
  onTriggerEmergency
}) {
  const [selectedDestination, setSelectedDestination] = useState('mars_conjunction'); // 'leo' | 'lunar' | 'mars_transit' | 'mars_conjunction'
  const [customLatency, setCustomLatency] = useState(22.4); // minutes one-way
  const [outgoingPackets, setOutgoingPackets] = useState([
    { id: 1, type: 'CRITICAL TELEMETRY', summary: 'CDR Chen - Grade 1.5 SANS (ONSD 5.9mm)', sentAt: '12:02:14 MET', etaEarth: '12:24:38 MET', status: 'In Transit via DSN' },
    { id: 2, type: 'ROUTINE VITALS', summary: 'Crew Quad Telemetry Mesh Pack #1402', sentAt: '12:00:00 MET', etaEarth: '12:22:24 MET', status: 'In Transit via DSN' }
  ]);
  const [testTransmissionActive, setTestTransmissionActive] = useState(false);
  const [simulatedCountdown, setSimulatedCountdown] = useState(1344); // 22.4 mins in seconds

  const PRESETS = [
    { id: 'leo', label: 'Low Earth Orbit (ISS)', distance: '408 km', oneWayLatency: 0.002, roundTrip: '0.24 seconds', desc: 'Direct broadband link via TDRSS satellites. Immediate real-time video consultation available.' },
    { id: 'lunar', label: 'Artemis Lunar Base', distance: '384,400 km', oneWayLatency: 1.28, roundTrip: '2.56 seconds', desc: 'Minor radio lag. Voice calls possible with short pauses. Ground surgical assistance feasible.' },
    { id: 'mars_transit', label: 'Mars Deep Space Transit', distance: '120 Million km', oneWayLatency: 6.67, roundTrip: '13.3 minutes', desc: 'Real-time telemetry impossible. Emergency trauma response must be 100% autonomous onboard.' },
    { id: 'mars_conjunction', label: 'Mars Maximum Conjunction', distance: '401 Million km', oneWayLatency: 22.4, roundTrip: '44.8 minutes', desc: 'Extreme latency. Solar blackout zones. Astronauts are completely on their own.' }
  ];

  const activePreset = PRESETS.find(p => p.id === selectedDestination) || PRESETS[3];

  useEffect(() => {
    let timer;
    if (testTransmissionActive && simulatedCountdown > 0) {
      timer = setInterval(() => {
        setSimulatedCountdown(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testTransmissionActive, simulatedCountdown]);

  const handleSendBurst = () => {
    const newPacket = {
      id: Date.now(),
      type: 'SOS EMERGENCY UPLINK',
      summary: `High Priority: ${activeCrew.name} Physiological Packet Sync`,
      sentAt: new Date().toLocaleTimeString(),
      etaEarth: `+${(activePreset.oneWayLatency).toFixed(1)} mins`,
      status: 'In Deep Space Transit'
    };
    setOutgoingPackets([newPacket, ...outgoingPackets.slice(0, 4)]);
    setTestTransmissionActive(true);
    setSimulatedCountdown(Math.round(activePreset.oneWayLatency * 60));
  };

  const formatSeconds = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-700/60 text-red-600 dark:text-red-400">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud font-bold text-base text-zinc-900 dark:text-white tracking-wide uppercase">
                  Deep Space Radio Latency & Ground Control Uplink
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono-space bg-red-500 text-white font-bold uppercase">
                  THE 44-MIN PROBLEM
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono-space mt-0.5">
                NASA Deep Space Network (DSN) Speed-of-Light Latency Buffer Simulator • Why Autonomy is Life-or-Death
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSendBurst}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-hud text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Transmit Telemetry Packet to Earth</span>
          </button>
        </div>
      </div>

      {/* Planetary Latency Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PRESETS.map((p) => {
          const isSelected = selectedDestination === p.id;
          return (
            <div
              key={p.id}
              onClick={() => {
                setSelectedDestination(p.id);
                setCustomLatency(p.oneWayLatency);
                setSimulatedCountdown(Math.round(p.oneWayLatency * 60));
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/80 shadow-lg text-zinc-900 dark:text-white'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-hud font-bold tracking-wider uppercase">
                    {p.label}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono-space font-bold ${
                    isSelected ? 'bg-emerald-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}>
                    {p.distance}
                  </span>
                </div>
                <div className="text-2xl font-hud font-extrabold text-zinc-900 dark:text-white mb-1">
                  {p.oneWayLatency < 1 ? '< 1 sec' : `${p.oneWayLatency.toFixed(1)} min`}
                </div>
                <div className="text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400 uppercase">
                  One-Way Light Delay (Round-trip: {p.roundTrip})
                </div>
              </div>

              <div className="text-[11px] font-sans text-zinc-600 dark:text-zinc-400 mt-3 pt-2 border-t border-zinc-200/50 dark:border-zinc-800/60 leading-relaxed">
                {p.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Transmission Simulation Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Deep Space Link Telemetry Buffer & Why Autonomy is Required */}
        <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <span className="font-hud font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              Live Earth Ground Link Telemetry Loop
            </span>
            <span className="text-[10px] font-mono-space px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold border border-zinc-300 dark:border-zinc-700">
              DSN GOLDSTONE / MADRID / CANBERRA
            </span>
          </div>

          {/* Visual Signal Beam Animation */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 text-xs font-mono-space text-zinc-500">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold">
                <Radio className="w-4 h-4 text-emerald-500" />
                <span>SPACECRAFT (HABITAT)</span>
              </div>
              <div className="text-[10px] px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">
                SPEED OF LIGHT: 299,792 km/s
              </div>
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>MISSION CONTROL (HOUSTON)</span>
              </div>
            </div>

            {/* Simulated Signal Path Graphic */}
            <div className="relative py-4">
              <div className="h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 animate-pulse"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="mt-2 text-xs font-mono-space font-bold text-amber-600 dark:text-amber-400">
                ACTIVE ONE-WAY DELAY: {activePreset.oneWayLatency < 1 ? 'REAL-TIME (< 1s)' : `+${activePreset.oneWayLatency.toFixed(1)} MINUTES`}
              </div>
            </div>

            {/* Why Autonomy Matters Callout */}
            <div className="p-3 mt-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-500/40 text-left text-xs text-red-900 dark:text-red-200 leading-relaxed font-mono-space">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-red-700 dark:text-red-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                CRITICAL CLINICAL REALITY (NASA-STD-3001):
              </div>
              If an astronaut suffers sudden ventricular fibrillation or acute hypoxia on Mars transit, brain death occurs within 4 to 6 minutes. 
              Waiting for Earth's reply ({activePreset.roundTrip} round-trip) is a fatal failure mode. 
              <strong> MARK XI, J.A.R.V.I.S., and S.T.E.A.L.T.H. operate with 100% autonomous local authority.</strong>
            </div>
          </div>

          {/* Outgoing Transmission Buffer Log */}
          <div>
            <div className="text-[10px] font-mono-space text-zinc-500 uppercase tracking-wider mb-2 font-bold">
              Outgoing Telemetry Packet Buffer:
            </div>
            <div className="space-y-2">
              {outgoingPackets.map((pkt) => (
                <div
                  key={pkt.id}
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-mono-space flex items-center justify-between"
                >
                  <div>
                    <div className="font-hud font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      {pkt.type}
                    </div>
                    <div className="text-zinc-500 mt-0.5">{pkt.summary}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold block">
                      {pkt.status}
                    </span>
                    <span className="text-[9px] text-zinc-500 mt-0.5 block">
                      ETA Houston: {pkt.etaEarth}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Autonomous Flight Surgeon Fallback Authority */}
        <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <span className="font-hud font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-500" />
                Autonomous Fallback Matrix
              </span>
              <span className="text-[10px] font-mono-space text-emerald-600 dark:text-emerald-400 font-bold">
                LOCAL ENCLAVE ACTIVE
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs font-mono-space">
              <div className="text-zinc-400 text-[10px] uppercase">Telemetry Relay State</div>
              <div className="font-hud font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-amber-500" />
                GROUND CONTROL ASYNCHRONOUS
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Local decision engine executing at 0.00ms latency. All biosensor algorithms, 3D digital twins, and drug titrations run on habitat edge servers.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono-space text-zinc-400 uppercase">Emergency Authority Protocol</div>
              {[
                { name: 'Cardiac Arrhythmia Override', status: 'Autonomous Automated Titration', badge: 'LEVEL 1' },
                { name: 'Hypoxia / Oxygen Loop Control', status: 'ECLSS Robotic Actuator', badge: 'LEVEL 1' },
                { name: 'SANS Vision Preservation', status: 'Chibis LBNP Chamber Lock', badge: 'LEVEL 2' },
                { name: 'SPE Solar Storm Evacuation', status: 'Immediate Habitat Klaxon', badge: 'AUTONOMOUS' }
              ].map((item, i) => (
                <div key={i} className="p-2.5 rounded-lg border bg-zinc-50/50 dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono-space">
                  <div>
                    <div className="font-bold text-zinc-900 dark:text-white">{item.name}</div>
                    <div className="text-[10px] text-zinc-500">{item.status}</div>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-mono-space flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Autonomous Closed-Loop CDSS fully certified under NASA-STD-3001 Level 4 autonomy.</span>
          </div>
        </div>

      </div>

    </div>
  );
}

