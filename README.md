# MARK XI: Autonomous Astronaut Health Monitoring & Clinical Decision Support System

[![NASA Space Apps Challenge 2026](https://img.shields.io/badge/NASA%20Space%20Apps-2026-blue.svg)](https://www.spaceappschallenge.org/)
[![Track](https://img.shields.io/badge/Track-Human%20Exploration%20%26%20Software-00e5ff.svg)]()
[![NASA HRP](https://img.shields.io/badge/Framework-NASA%20Human%20Research%20Program-red.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Submission for the 2026 NASA Space Apps Challenge**  
> **Challenge Prompt:** *Create Health Monitoring Software for Astronauts on Space Missions*  
> **Project:** MARK XI (PROJECT-XI)  
> **Target Missions:** Artemis Lunar Basecamp • Deep Space Gateway • Crewed Mars Exploration

---

## 🚀 Executive Summary

During long-duration exploration missions to Mars and the Moon, astronauts face extreme isolation, space radiation, altered gravity, and closed life-support environments. With a **one-way communication latency of 14 to 22 minutes between Mars and Earth (up to 44 minutes round-trip)**, real-time consultation with Johnson Space Center Ground Flight Surgeons is physically impossible during medical emergencies and critical anomalies.

**MARK XI** is a mission-grade, autonomous Clinical Decision Support System (CDSS) and visual health monitoring platform designed specifically for astronaut self-assessment. Built strictly upon the **NASA Human Research Program (HRP)** guidelines and the **R.I.D.G.E. Hazard Framework**, MARK XI equips astronauts to detect early physiological degradation, conduct guided self-examinations, and immediately deploy evidence-based countermeasures without waiting for ground control.

---

## 🧬 The NASA R.I.D.G.E. Hazard Architecture

MARK XI categorizes and monitors every biometric indicator according to the 5 Hazards of Human Spaceflight:

| Hazard | Physiological Risks Monitored | MARK XI Autonomous Countermeasure |
| :--- | :--- | :--- |
| **R - Radiation** | Galactic Cosmic Rays (GCR), Solar Particle Events (SPE), DNA double-strand breaks | Biodosimetry threshold monitoring (<600 mSv career limit), SPE solar storm refuge alerts, Space Pharmacy radiolysis tracking |
| **I - Isolation & Confinement** | Circadian desynchrony, sleep debt, cognitive micro-lapses, interpersonal friction | 3-minute Psychomotor Vigilance Task (PVT-B), 460nm blue-light therapy, Earth Biophilia soundscapes (432 Hz) |
| **D - Distance from Earth** | Communication blackout, unavailability of real-time flight surgeons | 100% offline edge diagnostics, automated triage scoring, step-by-step non-physician guidance, NASA Form 1047 Dossier export |
| **G - Gravity Fields** | Cephalad fluid shift (+1.8L), SANS optic disc edema, bone mineral loss (-1.1%/mo), muscle atrophy | Chibis Lower Body Negative Pressure (LBNP) suit protocols, ARED axial loading prescriptions, Zero-G CPR CMRS metronome |
| **E - Hostile Environments** | Cabin CO2 pocketing (hypercapnia >3.0 mmHg), elevated core temp ("Space Fever") | Amine-bed airflow verification, personal sleep cubicle ventilation nozzle monitoring, nephrolithiasis hydration shield |

---

## ✨ 12 Complete System Capabilities

### 1. 📷 Optical Biometrics & Facial Fatigue Scanner (Webcam rPPG)
- **Touchless Cardiovascular Extraction**: Uses remote Photoplethysmography (rPPG) via the browser webcam to analyze hemoglobin micro-absorption fluctuations in forehead skin capillaries.
- **PERCLOS Drowsiness Monitor**: Real-time eye blink duration and percentage of eye closure tracking to catch microsleep and cognitive fatigue.

### 2. 💊 Space Pharmacy & Radiation Drug Degradation Tracker
- **Cosmic Ray Radiolysis Tracking**: Monitors active pharmaceutical ingredient (API) half-life degradation under cumulative deep space radiation.
- **Dose Compensation Engine**: Automatically recalculates pharmacodynamic dosage offsets (e.g. +15% for Amoxicillin, +20% for Zolpidem).
- **On-Demand 3D Medicine Synthesizer**: Simulates molecular printing of replacement drug batches.

### 3. 🌲 Earth Biophilia & Neuro-Psychological Resilience
- **Acoustic Biophilia Immersion**: Web Audio API synthesized spatial nature soundscapes (*Olympic Rainforest Rain*, *Pacific Coastal Surf*, *Alpine Pine Forest Wind*) to alleviate isolation monotony.
- **Astronaut Journal Sentiment Engine**: Natural language sentiment analysis calculating emotional valence and flagging interpersonal friction risks.

### 4. 📄 NASA Form 1047 Medical Flight Dossier Export
- **One-Click Official Certification**: Formats all vitals, SANS grades, ASTRO-LAB microfluidics, and J.A.R.V.I.S. sign-offs into a printable / downloadable flight clearance document.
- **Deep Space Network (DSN) Telemetry JSON Dump**: Instant export of raw encrypted mission telemetry for ground control archives.

### 5. 🧪 Judge's Test Bench: Anomaly Injection Simulator
- **Live Stress-Testing Pill**: Floating controls allowing hackathon judges to inject acute hypoxia, solar particle storms, severe SANS edema, or hypercapnia spikes live during demonstrations.

### 6. 🤖 J.A.R.V.I.S. – Autonomous Flight Surgeon Copilot
- **Hands-Free Voice Recognition**: Web Speech Recognition API allowing astronauts wearing bulky spacesuit gloves to speak their symptoms.
- **Speech Synthesis Audio Readback**: Reads aloud diagnoses and clinical steps like an authentic spacecraft avionics assistant.
- **Differential Diagnostic Engine**: Generates condition confidence percentages, mapped spaceflight hazards, and immediate 3-step actionable countermeasure protocols.

### 7. 🚨 CODE RED: Spaceflight Emergency Action System
- **Interactive 110-BPM Zero-G CPR Metronome**: Audible rhythmic clicker with animated visual compression guide (`PUSH (5 cm) - RELEASE`) calibrated to the NASA Crew Medical Restraint System (CMRS) standard.
- **Synthesized Space Klaxon Siren**: Web Audio API synthesized emergency alert siren.
- **4 High-Stakes Spaceflight Scenarios**: Cardiac Arrest / Ventricular Fibrillation, Rapid Cabin Decompression & Acute Hypoxia, Toxic Ammonia Leak, and Catastrophic SPE Solar Flare.

### 8. 🩻 Digital Twin Bio-Avatar with Anatomical Layer Filters
- **Anatomical Layer Toggles**: Filter between **All Systems**, **🧠 Neuro-Ocular (SANS & Brain)**, **❤️ Circulatory & Fluids (Heart & Vessels)**, and **🦴 Musculoskeletal (Bones & Muscles)**.
- **Continuous Optical Laser Scanline**: A futuristic HUD scanline animates across the body, indicating live status across all 6 organ systems.

### 9. 🔬 ASTRO-LAB™ Robotic Bio-Analyzer & IoT Microfluidic Dock
- **Zero-G Lab-on-a-Chip**: Simulates microgravity acoustic separation and capillary action (solving the problem of floating zero-g liquids).
- **Interactive Consumable Cartridges**: Metabolic & Glycemic Micro-Strip, Renal & Bone Demineralization Chip, Radiation Biodosimetry Strip, and Neuro-Endocrine Salivary Swab.

### 10. 🥗 Space Galley Nutrition & Hydration Countermeasures
- **Daily Food & Fluid Intake Logging**: Tracks meals against NASA Flight Surgeon medical targets.
- **Macronutrient Tracking**: Calories (3,100 kcal target), Protein (140g target to mitigate muscle atrophy), Dietary Fiber (35g target for gut microbiome resilience), and Sodium Cap (<2,300 mg to prevent bone calcium excretion).
- **Hydration & Nephrolithiasis Shield**: Real-time kidney stone risk calculator with one-click fluid logging (+250 mL / +500 mL) to flush leached bone calcium.

### 11. 👥 Multi-Crew EVA Flight-Readiness Matrix & SPE Drill
- **Whole-Crew Telemetry Grid**: Side-by-side comparison of Commander, Pilot, and Medical Officer across Cardiovascular, SANS, Bone Density, PVT reaction speed, and cumulative radiation.
- **Pre-EVA Spacewalk Clearance Status**: Automated assessment determining if an astronaut is *Cleared*, *Cleared with Restriction (e.g. Cheater Lens)*, or *Restricted*.

### 12. 👁️ Astronaut Autonomous Self-Examination Suite
- **Digital SANS Near-Vision Chart**: Snellen visual acuity self-testing to detect spaceflight-induced hyperopic shift.
- **Amsler Grid Distortion Matrix**: Interactive clicker grid to pinpoint macular wavy lines and choroidal folds.
- **Guided Ultrasound Tele-Simulation**: Simulates tele-ultrasound probe placement on the closed superior eyelid to measure Optic Nerve Sheath Diameter (ONSD).
- **NASA 3-Minute PVT (Psychomotor Vigilance Task)**: Millisecond-precision reaction timer to assess cognitive fatigue and operational readiness before EVA maneuvers.

---

## 🛠️ Technology Stack

- **Framework**: React 18 + Vite 6
- **Styling**: Tailwind CSS + Custom NASA Glassmorphism HUD Theme (Seamless Light / Dark Aerospace Mode)
- **Data Visualization**: Recharts (Longitudinal BMD degradation curves, radiation area charts, circadian line plots)
- **Waveform Graphics**: HTML5 Canvas (Hardware-accelerated ECG cardiac trace & Augmented Reality Face Mesh)
- **Audio & Sound**: Web Audio API (Synthesized Klaxon Siren, 110-BPM CPR Metronome, Nature Biophilia Soundscapes)
- **Speech Technologies**: Web Speech Recognition API (Hands-Free Voice-to-Text) + Web Speech Synthesis API (J.A.R.V.I.S. Voice Output)
- **Vision Technologies**: WebRTC / MediaDevices (Webcam rPPG & PERCLOS Eye Tracking)
- **Icons**: Lucide React
- **Architecture**: 100% Client-Side / PWA-Ready (Ensuring full functionality during deep-space Earth communication blackouts)

---

## 📦 Getting Started & Running Locally

### Quickstart
```bash
# Clone the repository
git clone https://github.com/thv77/PROJECT-XI.git
cd PROJECT-XI

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:5173` to explore the telemetry dashboard!

---

## 📚 NASA Scientific References & Datasets

1. **NASA Human Research Program (HRP)**: *Human Research Roadmap (HRR)* — Evidence reports on SANS, Bone Demineralization, Nutrition & Spaceflight, and Radiation.
2. **NASA-STD-3001**: *Space Flight Human-System Standard: Volume 1 (Crew Health)*.
3. **NASA Flight Rule B13-102**: Spaceflight Resuscitation & Crew Medical Restraint System (CMRS) Protocols.
4. **NASA Food Technology Facility (FTF)**: Spaceflight Nutritional Requirements & Packaging Guidelines.
5. **NASA Ames rHEALTH Sensor & CSA BioAnalyzer**: In-flight microfluidic capillary diagnostics.
6. **NASA Translational Research Institute for Space Health (TRISH)**: Pharmaceutical Stability in Deep Space.
7. **Space Omics and Medical Atlas (SOMA)**: Multi-omic and physiological profiling of long-duration space travelers.

---

## 👨‍🚀 License
Developed for the **2026 NASA Space Apps Challenge**. Distributed under the MIT License.
