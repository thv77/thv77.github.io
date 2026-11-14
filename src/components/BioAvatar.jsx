import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  Crosshair,
  Eye,
  Heart,
  Flame,
  ShieldCheck,
  Bone,
  RotateCw,
  RotateCcw,
  Sparkles,
  Move,
  Upload,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Compass
} from 'lucide-react';

export default function BioAvatar({ organSystems, selectedOrgan, onSelectOrgan, theme }) {
  const mountRef = useRef(null);
  const [activeFocus, setActiveFocus] = useState('stomach');
  const [isRotating, setIsRotating] = useState(true);

  // Blender 3D Model State
  const [modelMode, setModelMode] = useState('blender'); // 'blender' | 'procedural'
  const [isBlenderLoaded, setIsBlenderLoaded] = useState(false);
  const [blenderStats, setBlenderStats] = useState({ meshes: 327, materials: 21 });
  const [uploadStatus, setUploadStatus] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [autoRotateActive, setAutoRotateActive] = useState(true);

  const fileInputRef = useRef(null);
  const blenderGroupRef = useRef(null);
  const proceduralGroupRef = useRef(null);
  const cameraControlRef = useRef({
    zoomIn: null,
    zoomOut: null,
    resetView: null,
    focusRegion: null,
    toggleAutoRotate: null
  });

  const sceneRef = useRef(null);
  const materialsRef = useRef({});
  const lightsRef = useRef({});
  const rendererRef = useRef(null);
  const animFrameRef = useRef(null);

  const getSystem = (id) => organSystems.find(s => s.id === id) || organSystems[0];

  const handleSelect = (key, organId) => {
    setActiveFocus(key);
    onSelectOrgan(getSystem(organId));
    if (cameraControlRef.current.focusRegion) {
      if (key === 'brain') cameraControlRef.current.focusRegion('head');
      else if (key === 'heart') cameraControlRef.current.focusRegion('chest');
      else if (key === 'stomach') cameraControlRef.current.focusRegion('stomach');
    }
  };

  const toggleModelMode = (mode) => {
    setModelMode(mode);
    if (blenderGroupRef.current && proceduralGroupRef.current) {
      if (mode === 'blender' && isBlenderLoaded) {
        blenderGroupRef.current.visible = true;
        proceduralGroupRef.current.visible = false;
      } else {
        blenderGroupRef.current.visible = false;
        proceduralGroupRef.current.visible = true;
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus(`Loading ${file.name}...`);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const loader = new GLTFLoader();
        loader.parse(
          event.target.result,
          '',
          (gltf) => {
            if (blenderGroupRef.current) {
              const blenderGroup = blenderGroupRef.current;
              while (blenderGroup.children.length > 0) {
                blenderGroup.remove(blenderGroup.children[0]);
              }
              const model = gltf.scene;
              const box = new THREE.Box3().setFromObject(model);
              const size = box.getSize(new THREE.Vector3());
              const center = box.getCenter(new THREE.Vector3());
              const scaleFactor = 2.1 / (size.y || 1);
              model.scale.set(scaleFactor, scaleFactor, scaleFactor);
              model.position.x = -center.x * scaleFactor;
              model.position.y = -center.y * scaleFactor;
              model.position.z = -center.z * scaleFactor;

              let count = 0;
              model.traverse((child) => {
                if (child.isMesh) {
                  count++;
                  child.castShadow = true;
                  child.receiveShadow = true;
                  const n = (child.name || '').toLowerCase();
                  const mn = (child.material?.name || '').toLowerCase();
                  if (n.includes('skin') || mn.includes('skin')) {
                    child.material = new THREE.MeshPhysicalMaterial({
                      color: theme === 'light' ? 0xa1a1aa : 0x27272a,
                      roughness: 0.2,
                      metalness: 0.05,
                      transmission: 0.85,
                      transparent: true,
                      opacity: theme === 'light' ? 0.16 : 0.24,
                      side: THREE.DoubleSide,
                      depthWrite: false
                    });
                  }
                }
              });

              blenderGroup.add(model);
              blenderGroup.visible = true;
              if (proceduralGroupRef.current) proceduralGroupRef.current.visible = false;
              setIsBlenderLoaded(true);
              setModelMode('blender');
              setBlenderStats({ meshes: count, materials: gltf.materials?.length || 20 });
              setUploadStatus(`Loaded ${file.name} successfully!`);
              setTimeout(() => setUploadStatus(''), 4000);
            }
          },
          (err) => {
            setUploadStatus(`Error: ${err.message}`);
          }
        );
      } catch (err) {
        setUploadStatus(`Error: ${err.message}`);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Theme-reactive synchronization: Pure Black & White / Monochrome
  useEffect(() => {
    const isLight = theme === 'light';
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(isLight ? 0xf4f4f5 : 0x000000);
    }
    if (materialsRef.current.body) {
      materialsRef.current.body.color.setHex(isLight ? 0x94a3b8 : 0x27272a);
      materialsRef.current.body.emissive.setHex(isLight ? 0xe2e8f0 : 0x09090b);
      materialsRef.current.body.opacity = isLight ? 0.16 : 0.24;
    }
    if (materialsRef.current.bone) {
      materialsRef.current.bone.color.setHex(isLight ? 0x18181b : 0xf4f4f5);
      materialsRef.current.bone.emissive.setHex(isLight ? 0x3f3f46 : 0xd4d4d8);
      materialsRef.current.bone.emissiveIntensity = isLight ? 0.25 : 1.3;
    }
    if (materialsRef.current.skull) {
      materialsRef.current.skull.color.setHex(isLight ? 0x27272a : 0xe4e4e7);
      materialsRef.current.skull.opacity = isLight ? 0.35 : 0.40;
    }
    if (materialsRef.current.disc) {
      materialsRef.current.disc.color.setHex(isLight ? 0x52525b : 0xa1a1aa);
    }
    if (materialsRef.current.vein) {
      materialsRef.current.vein.color.setHex(isLight ? 0x475569 : 0x94a3b8);
      materialsRef.current.vein.emissive.setHex(isLight ? 0x1e293b : 0x52525b);
    }
    if (rendererRef.current) {
      rendererRef.current.toneMappingExposure = isLight ? 1.05 : 1.25;
    }
  }, [theme]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const isLight = theme === 'light';
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isLight ? 0xf4f4f5 : 0x000000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0.0, 3.25);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isLight ? 1.05 : 1.25;
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // === PURE MONOCHROME LIGHTING ===
    const ambient = new THREE.AmbientLight(0xffffff, isLight ? 1.6 : 0.9);
    scene.add(ambient);
    lightsRef.current.ambient = ambient;

    const keyLight = new THREE.DirectionalLight(0xffffff, isLight ? 2.0 : 2.6);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, isLight ? 1.2 : 2.0);
    rimLight.position.set(-3, 2, -3);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topLight.position.set(0, 5, 2);
    scene.add(topLight);

    // Dynamic organ pointlights
    const stomachPointLight = new THREE.PointLight(0xff6600, 3.8, 2.5);
    stomachPointLight.position.set(0.08, 0.30, 0.15);
    scene.add(stomachPointLight);

    const heartPointLight = new THREE.PointLight(0xef4444, 3.2, 2.2);
    heartPointLight.position.set(0.03, 0.45, 0.16);
    scene.add(heartPointLight);

    // === MATERIALS (PRECISE ANATOMY TRANSLATION) ===
    const boneMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x18181b : 0xf4f4f5,
      emissive: isLight ? 0x3f3f46 : 0xd4d4d8,
      emissiveIntensity: isLight ? 0.25 : 1.3,
      roughness: 0.25,
      metalness: 0.3,
    });
    materialsRef.current.bone = boneMat;

    const skullMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x27272a : 0xe4e4e7,
      roughness: 0.3,
      transparent: true,
      opacity: isLight ? 0.35 : 0.40,
    });
    materialsRef.current.skull = skullMat;

    const discMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x52525b : 0xa1a1aa,
      roughness: 0.4,
    });
    materialsRef.current.disc = discMat;

    const socketMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.8,
    });

    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0xef4444,
      emissiveIntensity: 2.2,
      roughness: 0.25,
      metalness: 0.05,
    });

    const heartDarkMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      emissive: 0x7f1d1d,
      emissiveIntensity: 1.0,
      roughness: 0.35,
    });

    const arteryMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xb91c1c,
      emissiveIntensity: 1.5,
      roughness: 0.2,
    });

    const veinMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x475569 : 0x94a3b8,
      emissive: isLight ? 0x1e293b : 0x52525b,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });
    materialsRef.current.vein = veinMat;

    const lungMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0xd4d4d8 : 0x52525b,
      roughness: 0.4,
      transparent: true,
      opacity: 0.35,
    });

    const tracheaMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0xe4e4e7 : 0xd4d4d8,
      roughness: 0.3,
      transparent: true,
      opacity: 0.85,
    });

    const liverMat = new THREE.MeshStandardMaterial({
      color: 0x7f1d1d,
      emissive: 0x450a0a,
      emissiveIntensity: 0.4,
      roughness: 0.4,
    });

    const gallbladderMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.3,
    });

    const stomachMat = new THREE.MeshStandardMaterial({
      color: 0xff3b00,
      emissive: 0xff6600,
      emissiveIntensity: 2.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.95,
    });

    const pancreasMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.4,
    });

    const spleenMat = new THREE.MeshStandardMaterial({
      color: 0x581c87,
      roughness: 0.4,
    });

    const kidneyMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      emissive: 0x92400e,
      emissiveIntensity: 1.2,
      roughness: 0.3,
    });

    const smallIntMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x71717a : 0x52525b,
      roughness: 0.45,
      transparent: true,
      opacity: 0.85,
    });

    const largeIntMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x52525b : 0x3f3f46,
      roughness: 0.5,
      transparent: true,
      opacity: 0.85,
    });

    const bladderMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.3,
      transparent: true,
      opacity: 0.7,
    });

    const brainMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 1.6,
      roughness: 0.3,
    });

    const bodyShellMat = new THREE.MeshPhysicalMaterial({
      color: isLight ? 0x94a3b8 : 0x27272a,
      emissive: isLight ? 0xe2e8f0 : 0x09090b,
      emissiveIntensity: 0.2,
      roughness: 0.15,
      metalness: 0.05,
      transmission: 0.85,
      transparent: true,
      opacity: isLight ? 0.16 : 0.24,
      ior: 1.35,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    materialsRef.current.body = bodyShellMat;

    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);

    const proceduralGroup = new THREE.Group();
    avatarGroup.add(proceduralGroup);
    proceduralGroupRef.current = proceduralGroup;

    const blenderGroup = new THREE.Group();
    avatarGroup.add(blenderGroup);
    blenderGroupRef.current = blenderGroup;

    // Load authentic Blender GLTF/GLB model
    const applyGlbScene = (gltf) => {
      while (blenderGroup.children.length > 0) {
        blenderGroup.remove(blenderGroup.children[0]);
      }

      const blenderModel = gltf.scene;

      const box = new THREE.Box3().setFromObject(blenderModel);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      const targetHeight = 2.1;
      const scaleFactor = targetHeight / (size.y || 1);
      blenderModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

      blenderModel.position.x = -center.x * scaleFactor;
      blenderModel.position.y = -center.y * scaleFactor;
      blenderModel.position.z = -center.z * scaleFactor;

      let count = 0;
      blenderModel.traverse((child) => {
        if (child.isMesh) {
          count++;
          child.castShadow = true;
          child.receiveShadow = true;

          const n = (child.name || '').toLowerCase();
          const mn = (child.material?.name || '').toLowerCase();

          // Make skin translucent so anatomical skeleton & organs are visible
          if (n.includes('skin') || mn.includes('skin')) {
            child.material = new THREE.MeshPhysicalMaterial({
              color: isLight ? 0x94a3b8 : 0x27272a,
              emissive: isLight ? 0xe2e8f0 : 0x09090b,
              emissiveIntensity: 0.15,
              roughness: 0.2,
              metalness: 0.05,
              transmission: 0.85,
              transparent: true,
              opacity: isLight ? 0.16 : 0.24,
              side: THREE.DoubleSide,
              depthWrite: false
            });
          }
        }
      });

      blenderGroup.add(blenderModel);
      blenderGroup.visible = true;
      proceduralGroup.visible = false;
      setIsBlenderLoaded(true);
      setModelMode('blender');
      setBlenderStats({ meshes: count || 327, materials: gltf.materials?.length || 21 });
    };

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/models/model.glb',
      (gltf) => {
        applyGlbScene(gltf);
      },
      undefined,
      () => {
        gltfLoader.load(
          '/model.glb',
          (gltf) => {
            applyGlbScene(gltf);
          },
          undefined,
          (err) => {
            console.log('Procedural rig active:', err);
            proceduralGroup.visible = true;
            blenderGroup.visible = false;
          }
        );
      }
    );

    // ==========================================
    // COORDINATE CONVERSION & PROCEDURAL HELPERS
    // Blender (X: right/left, Y: back/front, Z: up/down)
    // Three.js (X: lateral, Y: vertical, Z: sagittal towards camera)
    // ==========================================
    const toThreeVec = (bx, by, bz) => new THREE.Vector3(bx, bz - 0.95, -by);

    const makeEllipsoid = (loc, scale, mat, rot = [0, 0, 0], segs = 18, rings = 12) => {
      const geo = new THREE.SphereGeometry(1, segs, rings);
      geo.scale(scale[0], scale[2], scale[1]);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(toThreeVec(loc[0], loc[1], loc[2]));
      if (rot[0] || rot[1] || rot[2]) {
        mesh.rotation.set(rot[0], rot[2], -rot[1]);
      }
      proceduralGroup.add(mesh);
      return mesh;
    };

    const makeLimb = (p1, p2, r1, r2, mat, flat = [1, 1], verts = 10) => {
      const v1 = toThreeVec(p1[0], p1[1], p1[2]);
      const v2 = toThreeVec(p2[0], p2[1], p2[2]);
      const dir = new THREE.Vector3().subVectors(v2, v1);
      const len = dir.length();
      if (len < 0.0001) return null;
      const geo = new THREE.CylinderGeometry(r2, r1, len, verts);
      geo.scale(flat[0], 1, flat[1]);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(v1).addScaledVector(dir, 0.5);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
      proceduralGroup.add(mesh);
      return mesh;
    };

    const makeTube = (pts, radii, mat, segs = 20, radSegs = 6) => {
      if (!pts || pts.length < 2) return null;
      const threePts = pts.map(p => toThreeVec(p[0], p[1], p[2]));
      const curve = new THREE.CatmullRomCurve3(threePts);
      const avgR = Array.isArray(radii) ? radii.reduce((a, b) => a + b, 0) / radii.length : radii;
      const geo = new THREE.TubeGeometry(curve, Math.max(12, pts.length * 3), avgR, radSegs, false);
      const mesh = new THREE.Mesh(geo, mat);
      proceduralGroup.add(mesh);
      return mesh;
    };

    const SIDES = [["R", -1], ["L", 1]];
    const SPINE_PTS = [
      [0.95, 0.070], [1.10, 0.045], [1.25, 0.070], [1.40, 0.088],
      [1.52, 0.075], [1.60, 0.050], [1.68, 0.045]
    ];
    const spineY = (z) => {
      if (z <= SPINE_PTS[0][0]) return SPINE_PTS[0][1];
      for (let i = 0; i < SPINE_PTS.length - 1; i++) {
        const [z0, y0] = SPINE_PTS[i];
        const [z1, y1] = SPINE_PTS[i + 1];
        if (z <= z1) return y0 + (y1 - y0) * (z - z0) / (z1 - z0);
      }
      return SPINE_PTS[SPINE_PTS.length - 1][1];
    };
    const ay = (z) => spineY(z) - 0.042;

    // ==========================================
    // 1. SKELETON (BLENDER PROCEDURAL CODE TRANSLATION)
    // ==========================================
    // Spine
    const verts = [];
    for (let i = 0; i < 5; i++) verts.push([1.000 + i * 0.045, 0.024, 0.030]); // L5 -> L1
    for (let k = 0; k < 12; k++) verts.push([1.225 + k * 0.0268, 0.019 - k * 0.0004, 0.022]); // T12 -> T1
    for (let k = 0; k < 7; k++) verts.push([1.550 + k * 0.018, 0.012, 0.014]); // C7 -> C1

    let prev = null;
    verts.forEach(([z, r, h]) => {
      const y = spineY(z);
      makeLimb([0, y, z - h / 2], [0, y, z + h / 2], r, r, boneMat);
      makeLimb([0, y + r * 0.8, z], [0, y + r + 0.045, z - 0.014], 0.006, 0.0025, boneMat, [1, 1], 6);
      SIDES.forEach(([side, s]) => {
        makeLimb([s * r * 0.8, y + r * 0.4, z], [s * (r + 0.03), y + r * 0.8, z], 0.005, 0.003, boneMat, [1, 1], 6);
      });
      if (prev) {
        const [pz, py, pr] = prev;
        const zm = (z + pz) / 2;
        makeLimb([0, (y + py) / 2, zm - 0.004], [0, (y + py) / 2, zm + 0.004], Math.max(r, pr) * 1.03, Math.max(r, pr) * 1.03, discMat);
      }
      prev = [z, y, r];
    });

    makeEllipsoid([0, 0.068, 0.935], [0.045, 0.022, 0.060], boneMat); // Sacrum
    makeLimb([0, 0.066, 0.885], [0, 0.054, 0.830], 0.012, 0.004, boneMat); // Coccyx

    // Skull
    makeEllipsoid([0, 0.0, 1.745], [0.085, 0.100, 0.095], skullMat);
    makeEllipsoid([0, -0.060, 1.690], [0.065, 0.050, 0.070], skullMat);
    makeTube([[-0.060, -0.020, 1.670], [-0.050, -0.070, 1.630], [0, -0.095, 1.620], [0.050, -0.070, 1.630], [0.060, -0.020, 1.670]], 0.008, boneMat); // Mandible
    SIDES.forEach(([side, s]) => {
      makeEllipsoid([s * 0.032, -0.098, 1.722], [0.016, 0.010, 0.016], socketMat);
    });
    makeLimb([0, -0.100, 1.700], [0, -0.112, 1.668], 0.006, 0.010, boneMat);

    // Ribcage (12 pairs)
    const A = [0.08, 0.11, 0.13, 0.145, 0.155, 0.16, 0.16, 0.155, 0.145, 0.13, 0.11, 0.09];
    const B = [0.07, 0.09, 0.11, 0.12, 0.13, 0.135, 0.135, 0.13, 0.12, 0.11, 0.09, 0.07];
    const END = [0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.92, 0.90, 0.86, 0.60, 0.50];
    const n = 12;
    for (let i = 0; i < 12; i++) {
      const zb = 1.52 - i * 0.0268;
      const yb = spineY(zb);
      const yc = yb - B[i];
      const drop = 0.04 + 0.006 * i;
      SIDES.forEach(([side, s]) => {
        const pts = [];
        for (let k = 0; k < n; k++) {
          const phi = END[i] * Math.PI * k / (n - 1);
          const x = s * (0.015 + A[i] * Math.sin(phi));
          const y = yc + B[i] * Math.cos(phi);
          const z = zb - drop * (phi / Math.PI);
          pts.push([x, y, z]);
        }
        makeTube(pts, 0.0055, boneMat, 10, 5);
      });
    }

    makeLimb([0, -0.190, 1.290], [0, -0.105, 1.505], 0.012, 0.018, boneMat, [1.6, 0.45]); // Sternum
    makeLimb([0, -0.196, 1.255], [0, -0.190, 1.292], 0.003, 0.010, boneMat, [1.2, 0.5]); // Xiphoid

    // Shoulders, Clavicles, Arms & Hands
    SIDES.forEach(([side, s]) => {
      makeTube([[s * 0.015, -0.108, 1.500], [s * 0.075, -0.085, 1.515], [s * 0.140, -0.040, 1.512], [s * 0.185, -0.015, 1.515]], 0.0075, boneMat);
      makeEllipsoid([s * 0.125, 0.108, 1.420], [0.055, 0.010, 0.078], boneMat, [0, 0, s * 0.25]);
      makeEllipsoid([s * 0.190, 0.010, 1.485], [0.022, 0.022, 0.022], boneMat);
      makeLimb([s * 0.190, 0.010, 1.480], [s * 0.240, 0.010, 1.215], 0.014, 0.012, boneMat); // Humerus
      makeEllipsoid([s * 0.241, 0.010, 1.205], [0.020, 0.018, 0.016], boneMat);
      makeLimb([s * 0.248, -0.006, 1.200], [s * 0.288, -0.030, 0.965], 0.009, 0.0075, boneMat); // Radius
      makeLimb([s * 0.236, 0.014, 1.200], [s * 0.276, -0.010, 0.965], 0.009, 0.0065, boneMat); // Ulna

      // Hand
      const wx = s * 0.282, wy = -0.020, wz = 0.960;
      makeEllipsoid([wx, wy, wz - 0.012], [0.022, 0.012, 0.016], boneMat);
      const fingers = [[-s * 0.024, 0.85], [-s * 0.0085, 0.95], [s * 0.006, 1.00], [s * 0.020, 0.95]];
      fingers.forEach(([ox, sc]) => {
        makeLimb([wx + ox, wy - 0.005, wz - 0.022], [wx + ox, wy - 0.008, wz - 0.095 * sc], 0.0045, 0.003, boneMat);
      });
      makeLimb([wx + s * 0.022, wy - 0.010, wz - 0.020], [wx + s * 0.050, wy - 0.022, wz - 0.092], 0.005, 0.0035, boneMat); // Thumb
    });

    // Pelvis, Legs & Feet
    SIDES.forEach(([side, s]) => {
      makeEllipsoid([s * 0.110, 0.005, 1.005], [0.045, 0.090, 0.075], boneMat, [0, s * 0.35, 0]); // Ilium
      makeTube([[s * 0.045, 0.050, 1.030], [s * 0.130, 0.020, 1.050], [s * 0.150, -0.040, 1.020], [s * 0.115, -0.080, 0.960], [s * 0.040, -0.085, 0.890]], 0.009, boneMat);
      makeEllipsoid([s * 0.088, 0.000, 0.905], [0.025, 0.025, 0.025], boneMat); // Femur head
      makeLimb([s * 0.088, 0.000, 0.905], [s * 0.118, 0.005, 0.860], 0.012, 0.015, boneMat); // Femur neck
      makeLimb([s * 0.118, 0.005, 0.860], [s * 0.100, -0.010, 0.520], 0.017, 0.019, boneMat); // Femur shaft
      makeEllipsoid([s * 0.100, -0.045, 0.505], [0.020, 0.008, 0.024], boneMat); // Patella
      makeLimb([s * 0.100, -0.005, 0.485], [s * 0.100, 0.000, 0.090], 0.017, 0.013, boneMat); // Tibia
      makeLimb([s * 0.125, 0.000, 0.470], [s * 0.118, 0.010, 0.085], 0.007, 0.0065, boneMat); // Fibula
      makeEllipsoid([s * 0.100, -0.005, 0.070], [0.025, 0.035, 0.025], boneMat); // Talus
      makeEllipsoid([s * 0.100, 0.040, 0.040], [0.022, 0.035, 0.028], boneMat); // Calcaneus
      for (let i = 0; i < 5; i++) {
        const x = s * (0.072 + i * 0.014);
        makeLimb([x, -0.075, 0.045], [x, -0.165, 0.022], 0.006, 0.004, boneMat);
      }
    });

    // ==========================================
    // 2. ORGANS (EXACT BLENDER SPECIFICATION)
    // ==========================================
    // Brain
    SIDES.forEach(([side, s]) => {
      makeEllipsoid([s * 0.034, 0.000, 1.765], [0.040, 0.075, 0.062], brainMat);
    });
    makeEllipsoid([0, 0.055, 1.702], [0.040, 0.028, 0.024], brainMat); // Cerebellum
    makeLimb([0, 0.040, 1.705], [0, 0.045, 1.640], 0.012, 0.008, brainMat); // Brainstem

    // Heart
    makeEllipsoid([0.022, -0.085, 1.355], [0.043, 0.040, 0.058], heartMat, [0, -0.5, 0]); // Ventricles
    makeEllipsoid([-0.022, -0.082, 1.388], [0.022, 0.022, 0.028], heartDarkMat); // Right Atrium
    makeEllipsoid([0.034, -0.045, 1.405], [0.022, 0.020, 0.020], heartDarkMat); // Left Atrium
    makeEllipsoid([0.045, -0.092, 1.318], [0.020, 0.022, 0.024], heartMat); // Apex

    // Lungs & Trachea
    makeEllipsoid([-0.100, -0.020, 1.395], [0.062, 0.085, 0.135], lungMat); // Right lung
    makeEllipsoid([0.100, -0.020, 1.395], [0.057, 0.085, 0.130], lungMat); // Left lung (cardiac notch)
    makeTube([[0, -0.003, 1.625], [0, -0.010, 1.540], [0, -0.018, 1.470]], 0.011, tracheaMat); // Trachea
    SIDES.forEach(([side, s]) => {
      makeTube([[0, -0.018, 1.470], [s * 0.030, -0.025, 1.440], [s * 0.070, -0.025, 1.405]], 0.007, tracheaMat);
    });
    makeTube([[0, 0.030, 1.600], [0, 0.025, 1.450], [0.010, 0.000, 1.385], [0.030, -0.060, 1.340]], 0.008, stomachMat); // Esophagus

    // Digestive System
    makeTube([
      [0.030, -0.065, 1.340], [0.070, -0.085, 1.300], [0.100, -0.090, 1.250],
      [0.080, -0.092, 1.200], [0.030, -0.090, 1.180], [-0.020, -0.085, 1.195]
    ], 0.035, stomachMat, 22, 10); // Curved C-shaped Stomach

    makeEllipsoid([-0.065, -0.070, 1.285], [0.105, 0.065, 0.062], liverMat, [0, 0, 0.10]); // Liver right lobe
    makeEllipsoid([0.030, -0.095, 1.280], [0.055, 0.045, 0.038], liverMat); // Liver left lobe
    makeEllipsoid([-0.090, -0.115, 1.225], [0.014, 0.020, 0.014], gallbladderMat);
    makeTube([[-0.030, -0.030, 1.170], [0.020, -0.022, 1.190], [0.075, -0.010, 1.215]], 0.012, pancreasMat);
    makeEllipsoid([0.125, 0.010, 1.265], [0.028, 0.024, 0.050], spleenMat);

    // Small intestine serpentine coil
    const smallIntPts = [];
    for (let r = 0; r < 5; r++) {
      for (let j = 0; j < 8; j++) {
        const t = j / 7;
        const x = (r % 2 === 0) ? (-0.08 + 0.16 * t) : (0.08 - 0.16 * t);
        const z = 1.130 - r * 0.026 + 0.008 * Math.sin(j * 2.1 + r);
        const y = -0.060 + 0.012 * Math.cos(j * 1.7 + r);
        smallIntPts.push([x, y, z]);
      }
    }
    makeTube(smallIntPts, 0.012, smallIntMat, 30, 6);

    // Large intestine perimeter
    makeTube([
      [-0.100, -0.070, 0.990], [-0.115, -0.070, 1.080], [-0.120, -0.070, 1.190],
      [-0.060, -0.090, 1.175], [0.000, -0.095, 1.160], [0.070, -0.090, 1.185],
      [0.120, -0.060, 1.215], [0.118, -0.050, 1.120], [0.112, -0.050, 1.020],
      [0.090, -0.045, 0.955], [0.040, -0.045, 0.935], [0.005, -0.020, 0.925]
    ], 0.018, largeIntMat, 24, 7);

    makeEllipsoid([0, -0.070, 0.930], [0.032, 0.030, 0.030], bladderMat);
    SIDES.forEach(([side, s]) => {
      makeEllipsoid([s * 0.068, 0.025, 1.170], [0.025, 0.020, 0.045], kidneyMat, [0, 0, -s * 0.20]);
    });

    // ==========================================
    // 3. BLOOD VESSELS (AORTA, VENA CAVA, ARTERIES, VEINS)
    // ==========================================
    const aortaPts = [
      [0.020, -0.070, 1.400], [0.018, -0.068, 1.465], [0.035, -0.040, 1.500],
      [0.048, 0.005, 1.470], [0.038, 0.050, 1.400],
      [0.022, ay(1.30), 1.30], [0.016, ay(1.20), 1.20], [0.010, ay(1.10), 1.10], [0.004, ay(1.00), 1.00]
    ];
    makeTube(aortaPts, 0.011, arteryMat, 24, 7);

    const ivcPts = [
      [-0.025, -0.075, 1.335],
      [-0.028, ay(1.28) - 0.006, 1.28], [-0.028, ay(1.18) - 0.006, 1.18], [-0.028, ay(1.08) - 0.006, 1.08]
    ];
    makeTube(ivcPts, 0.011, veinMat, 18, 6);
    makeTube([[-0.022, -0.078, 1.385], [-0.022, -0.060, 1.470], [-0.012, -0.040, 1.550]], 0.010, veinMat, 12, 6); // SVC

    SIDES.forEach(([side, s]) => {
      // Carotid & Jugular
      makeTube([[s * 0.025, -0.050, 1.495], [s * 0.028, -0.032, 1.600], [s * 0.035, -0.016, 1.680], [s * 0.040, -0.006, 1.760]], 0.0055, arteryMat, 14, 5);
      makeTube([[s * 0.034, -0.032, 1.525], [s * 0.044, -0.010, 1.600], [s * 0.048, 0.002, 1.680], [s * 0.048, 0.012, 1.745]], 0.0065, veinMat, 14, 5);

      // Arm Vessels
      const armA = [
        [0.020, -0.062, 1.480], [s * 0.070, -0.050, 1.490], [s * 0.115, -0.045, 1.505],
        [s * 0.170, -0.030, 1.450], [s * 0.215, -0.022, 1.350], [s * 0.232, -0.022, 1.215],
        [s * 0.258, -0.038, 1.080], [s * 0.280, -0.048, 0.975]
      ];
      makeTube(armA, 0.0045, arteryMat, 18, 5);
      const armV = armA.map(p => [p[0] - s * 0.010, p[1] + 0.018, p[2]]);
      makeTube(armV, 0.0045, veinMat, 18, 5);

      // Leg Vessels
      const legA = [
        [0.010, ay(1.0), 1.000], [s * 0.040, 0.000, 0.940], [s * 0.075, -0.040, 0.870],
        [s * 0.088, -0.045, 0.720], [s * 0.098, -0.035, 0.520], [s * 0.100, -0.022, 0.300],
        [s * 0.100, -0.026, 0.110]
      ];
      makeTube(legA, 0.0055, arteryMat, 18, 5);
      const legV = legA.map(p => [p[0] - s * 0.008, p[1] + 0.015, p[2]]);
      makeTube(legV, 0.0055, veinMat, 18, 5);

      // Renal vessels
      makeTube([[0.014, ay(1.17), 1.170], [s * 0.040, 0.010, 1.172], [s * 0.052, 0.022, 1.172]], 0.004, arteryMat, 8, 5);
      makeTube([[-0.028, ay(1.17) - 0.006, 1.150], [s * 0.030, 0.005, 1.150], [s * 0.052, 0.020, 1.155]], 0.004, veinMat, 8, 5);
    });

    // ==========================================
    // 4. TRANSLUCENT BODY SHELL (OPTIONAL BLENDER SHELL)
    // ==========================================
    makeEllipsoid([0, -0.005, 1.745], [0.098, 0.115, 0.125], bodyShellMat); // Head
    makeLimb([0, 0.000, 1.560], [0, 0.000, 1.660], 0.052, 0.050, bodyShellMat); // Neck
    makeEllipsoid([0, 0.000, 1.380], [0.195, 0.135, 0.200], bodyShellMat); // Chest
    makeEllipsoid([0, 0.000, 1.140], [0.165, 0.115, 0.170], bodyShellMat); // Abdomen
    makeEllipsoid([0, 0.000, 0.940], [0.180, 0.115, 0.125], bodyShellMat); // Pelvis

    SIDES.forEach(([side, s]) => {
      makeEllipsoid([s * 0.190, 0.010, 1.480], [0.050, 0.050, 0.050], bodyShellMat); // Shoulder
      makeLimb([s * 0.190, 0.010, 1.480], [s * 0.240, 0.010, 1.215], 0.042, 0.033, bodyShellMat); // Upper arm
      makeLimb([s * 0.242, 0.005, 1.205], [s * 0.282, -0.025, 0.965], 0.033, 0.022, bodyShellMat); // Forearm
      makeEllipsoid([s * 0.292, -0.030, 0.890], [0.030, 0.016, 0.075], bodyShellMat); // Hand
      makeLimb([s * 0.092, 0.000, 0.920], [s * 0.100, -0.010, 0.520], 0.082, 0.052, bodyShellMat); // Thigh
      makeLimb([s * 0.100, -0.005, 0.490], [s * 0.100, 0.000, 0.090], 0.050, 0.032, bodyShellMat); // Shin
      makeEllipsoid([s * 0.100, -0.045, 0.035], [0.042, 0.115, 0.030], bodyShellMat); // Foot
    });

    // ==========================================
    // 5. INTERACTION, ZOOMING & ROTATION CONTROLS
    // ==========================================
    let isDragging = false;
    let isPanning = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = 0;
    let rotX = 0;
    let autoRotate = true;

    let currentZoom = 3.25;
    let targetZoom = 3.25;
    let currentY = 0.0;
    let targetY = 0.0;
    let currentX = 0.0;
    let targetX = 0.0;
    let initialPinch = null;

    // Camera control methods for React UI buttons
    cameraControlRef.current.zoomIn = () => {
      targetZoom = Math.max(0.65, targetZoom - 0.45);
      autoRotate = false;
      setAutoRotateActive(false);
    };

    cameraControlRef.current.zoomOut = () => {
      targetZoom = Math.min(5.5, targetZoom + 0.45);
      autoRotate = false;
      setAutoRotateActive(false);
    };

    cameraControlRef.current.resetView = () => {
      targetZoom = 3.25;
      targetY = 0.0;
      targetX = 0.0;
      rotX = 0;
      rotY = 0;
      autoRotate = true;
      setAutoRotateActive(true);
    };

    cameraControlRef.current.focusRegion = (region) => {
      autoRotate = false;
      setAutoRotateActive(false);
      if (region === 'head') {
        targetZoom = 1.30;
        targetY = 0.82;
        targetX = 0.0;
      } else if (region === 'chest') {
        targetZoom = 1.45;
        targetY = 0.42;
        targetX = 0.0;
      } else if (region === 'stomach') {
        targetZoom = 1.55;
        targetY = 0.12;
        targetX = 0.0;
      } else if (region === 'legs') {
        targetZoom = 1.85;
        targetY = -0.65;
        targetX = 0.0;
      } else {
        targetZoom = 3.25;
        targetY = 0.0;
        targetX = 0.0;
      }
    };

    cameraControlRef.current.toggleAutoRotate = () => {
      autoRotate = !autoRotate;
      setAutoRotateActive(autoRotate);
    };

    const onWheel = (e) => {
      e.preventDefault();
      autoRotate = false;
      setAutoRotateActive(false);
      const delta = e.deltaY * 0.0022;
      targetZoom = Math.max(0.6, Math.min(5.5, targetZoom + delta));
    };

    const onMouseDown = (e) => {
      isDragging = true;
      isPanning = (e.button === 2 || e.shiftKey);
      prevX = e.clientX;
      prevY = e.clientY;
      autoRotate = false;
      setAutoRotateActive(false);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;

      if (isPanning) {
        // Pan up/down/left/right proportionally to zoom distance
        const panSpeed = (targetZoom / 3.0) * 0.0035;
        targetX -= dx * panSpeed;
        targetY += dy * panSpeed;
        targetY = Math.max(-1.3, Math.min(1.3, targetY));
        targetX = Math.max(-1.1, Math.min(1.1, targetX));
      } else {
        // Rotate around model
        rotY += dx * 0.012;
        rotX += dy * 0.008;
        rotX = Math.max(-0.7, Math.min(0.7, rotX));
      }
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      isPanning = false;
    };

    const onContextMenu = (e) => {
      e.preventDefault(); // Enable right-click panning without opening browser context menu
    };

    const onTouchStart = (e) => {
      isDragging = true;
      autoRotate = false;
      setAutoRotateActive(false);
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinch = Math.hypot(dx, dy);
      } else {
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      if (e.touches.length === 2 && initialPinch) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const pinchDelta = (initialPinch - dist) * 0.006;
        targetZoom = Math.max(0.6, Math.min(5.5, targetZoom + pinchDelta));
        initialPinch = dist;
      } else if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - prevX;
        const dy = e.touches[0].clientY - prevY;
        rotY += dx * 0.012;
        rotX += dy * 0.008;
        rotX = Math.max(-0.7, Math.min(0.7, rotX));
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      initialPinch = null;
    };

    mount.addEventListener('wheel', onWheel, { passive: false });
    mount.addEventListener('mousedown', onMouseDown);
    mount.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    mount.addEventListener('touchstart', onTouchStart, { passive: false });
    mount.addEventListener('touchmove', onTouchMove, { passive: false });
    mount.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let t = 0;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      t += 0.016;

      if (autoRotate) rotY += 0.003;

      avatarGroup.rotation.y = rotY;
      avatarGroup.rotation.x = rotX;

      // Smooth camera glide for zoom & pan
      currentZoom += (targetZoom - currentZoom) * 0.085;
      currentY += (targetY - currentY) * 0.085;
      currentX += (targetX - currentX) * 0.085;

      camera.position.z = currentZoom;
      camera.position.y = currentY;
      camera.position.x = currentX;
      camera.lookAt(currentX, currentY, 0);

      // Pulse organ lighting
      heartPointLight.intensity = 2.4 + Math.sin(t * 4.0) * 1.4;
      stomachPointLight.intensity = 3.0 + Math.sin(t * 2.0) * 1.0;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
      mount.removeEventListener('wheel', onWheel);
      mount.removeEventListener('mousedown', onMouseDown);
      mount.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      mount.removeEventListener('touchstart', onTouchStart);
      mount.removeEventListener('touchmove', onTouchMove);
      mount.removeEventListener('touchend', onTouchEnd);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden p-4 md:p-5 shadow-sm transition-colors duration-200">

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xs font-hud font-bold tracking-widest uppercase text-zinc-900 dark:text-white flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-emerald-500" />
              Digital Twin Anatomical Telemetry
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 text-emerald-700 dark:text-emerald-400 font-mono-space font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              {isBlenderLoaded && modelMode === 'blender'
                ? `BLENDER 3D MODEL CONNECTED (${blenderStats.meshes} MESHES)`
                : 'PROCEDURAL RIG ACTIVE'}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono-space mt-1 flex items-center gap-1.5">
            <Move className="w-3 h-3" /> Authentic Blender Architecture • 360° Drag Rotation • Organs, Skeleton & Skin Translucency
          </p>
        </div>

        {/* Blender Controls & Focus Quick Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Model Switcher */}
          <div className="flex items-center rounded-lg bg-zinc-100 dark:bg-zinc-900 p-0.5 border border-zinc-200 dark:border-zinc-800 text-xs font-mono-space">
            <button
              onClick={() => toggleModelMode('blender')}
              className={`px-2.5 py-1 rounded-md transition-all font-hud font-bold text-[11px] flex items-center gap-1.5 cursor-pointer ${
                modelMode === 'blender'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Blender Model</span>
            </button>
            <button
              onClick={() => toggleModelMode('procedural')}
              className={`px-2 py-1 rounded-md transition-all font-hud font-bold text-[11px] cursor-pointer ${
                modelMode === 'procedural'
                  ? 'bg-zinc-800 text-white dark:bg-zinc-700 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Procedural Rig
            </button>
          </div>

          {/* Quick Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".glb,.gltf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Load another .glb model from Blender"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-hud font-bold transition-all cursor-pointer"
          >
            <Upload className="w-3 h-3 text-zinc-500" />
            <span>Update .GLB</span>
          </button>

          {/* Focus Quick Tabs */}
          {[
            { key: 'stomach', label: 'Stomach / GI', icon: Flame, organId: 'gastrointestinal' },
            { key: 'heart', label: 'Cardio / Heart', icon: Heart, organId: 'cardiovascular' },
            { key: 'brain', label: 'Neuro / SANS', icon: Eye, organId: 'sans_vision' },
          ].map(({ key, label, icon: Icon, organId }) => (
            <button
              key={key}
              onClick={() => handleSelect(key, organId)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-hud font-semibold transition-all border cursor-pointer ${
                activeFocus === key
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white shadow'
                  : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-zinc-500'
              }`}
            >
              <Icon className="w-3 h-3" /> {label}
            </button>
          ))}
        </div>
      </div>

      {uploadStatus && (
        <div className="mb-3 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-mono-space flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{uploadStatus}</span>
        </div>
      )}

      {/* Main 3-Column Diagnostic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 relative z-10">

        {/* Left Column — Visceral Diagnostics */}
        <div className="lg:col-span-3 flex flex-col gap-3 order-2 lg:order-1">
          <div className="text-[10px] font-mono-space uppercase tracking-widest text-zinc-500 pb-1 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <span>Visceral Diagnostics</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">ACTIVE</span>
          </div>

          {/* GI Card */}
          <div
            onClick={() => handleSelect('stomach', 'gastrointestinal')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeFocus === 'stomach'
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-sm'
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-hud font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> GASTROINTESTINAL & METABOLIC
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono-space bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 font-bold">
                ILLUMINATED
              </span>
            </div>
            <div className="text-xs font-hud font-bold text-zinc-900 dark:text-white">Gastric Visceral Motility</div>
            <div className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5 font-mono-space">Hydration: 2,150 mL • Stone risk: 0.12 (Low)</div>
          </div>

          {/* SANS Vision Card */}
          <div
            onClick={() => handleSelect('brain', 'sans_vision')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeFocus === 'brain'
                ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-900 dark:border-white shadow-sm'
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-hud font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> SANS & OPTIC SHEATH
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono-space bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 font-bold">
                GRADE 1.5
              </span>
            </div>
            <div className="text-xs font-mono-space text-zinc-700 dark:text-zinc-300">ONSD: 5.9mm (Cephalad +1.8L)</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Mild cotton wool spots • Visual acuity 20/25</div>
          </div>

          {/* Cardiovascular Card */}
          <div
            onClick={() => handleSelect('heart', 'cardiovascular')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeFocus === 'heart'
                ? 'bg-red-50 dark:bg-red-950/30 border-red-400 shadow-sm'
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-hud font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-red-500" /> CARDIOVASCULAR
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono-space bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-bold">
                NOMINAL
              </span>
            </div>
            <div className="text-xs font-mono-space text-zinc-700 dark:text-zinc-300">HR: 72 BPM • BP: 118/76 mmHg</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Stroke volume: 68 mL • HRV: 58.2 ms</div>
          </div>
        </div>

        {/* Center — Clean Unobstructed 3D Viewport with Zoom & Pan */}
        <div className="lg:col-span-5 order-1 lg:order-2 relative group select-none">
          <div
            ref={mountRef}
            className="w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 cursor-grab active:cursor-grabbing bg-zinc-100 dark:bg-black"
            style={{ height: '520px' }}
          />
          {/* Subtle Scan Line */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-zinc-400 dark:via-white to-transparent opacity-15 animate-scan pointer-events-none" style={{ top: '48%' }} />

          {/* Floating HUD Zoom & Camera Controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
            <button
              onClick={() => cameraControlRef.current.zoomIn?.()}
              title="Zoom In Closer (or scroll mouse wheel up)"
              className="w-8 h-8 rounded-lg bg-white/90 dark:bg-zinc-900/90 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white flex items-center justify-center shadow-lg backdrop-blur-md transition-all cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => cameraControlRef.current.zoomOut?.()}
              title="Zoom Out (or scroll mouse wheel down)"
              className="w-8 h-8 rounded-lg bg-white/90 dark:bg-zinc-900/90 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white flex items-center justify-center shadow-lg backdrop-blur-md transition-all cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => cameraControlRef.current.resetView?.()}
              title="Reset View & Recenter Full Body"
              className="w-8 h-8 rounded-lg bg-white/90 dark:bg-zinc-900/90 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white flex items-center justify-center shadow-lg backdrop-blur-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => cameraControlRef.current.toggleAutoRotate?.()}
              title={autoRotateActive ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center shadow-lg backdrop-blur-md transition-all cursor-pointer ${
                autoRotateActive
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-600 dark:text-emerald-400'
                  : 'bg-white/90 dark:bg-zinc-900/90 border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <RotateCw className={`w-4 h-4 ${autoRotateActive ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            </button>
          </div>

          {/* Floating Anatomical Region Quick Focus Presets */}
          <div className="absolute bottom-9 inset-x-3 flex items-center justify-center gap-1.5 z-20 flex-wrap pointer-events-none">
            <div className="p-1 rounded-xl bg-black/80 backdrop-blur-md border border-zinc-700/60 flex items-center gap-1 pointer-events-auto shadow-2xl">
              <span className="text-[9px] font-mono-space text-zinc-400 uppercase px-2 font-bold flex items-center gap-1">
                <Compass className="w-3 h-3 text-emerald-400" /> FOCUS:
              </span>
              {[
                { label: 'Cranium', id: 'head' },
                { label: 'Heart & Chest', id: 'chest' },
                { label: 'GI & Viscera', id: 'stomach' },
                { label: 'Extremities', id: 'legs' },
                { label: 'Full Body', id: 'full' }
              ].map(preset => (
                <button
                  key={preset.id}
                  onClick={() => cameraControlRef.current.focusRegion?.(preset.id)}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-mono-space font-bold bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700/50 transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Zoom & Gesture Hint */}
          <div className="absolute bottom-2.5 inset-x-0 text-center pointer-events-none z-10">
            <span className="text-[10px] font-mono-space text-zinc-500/90 dark:text-zinc-400/90 bg-white/70 dark:bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-zinc-300/40 dark:border-zinc-800/60">
              Scroll wheel to Zoom • Left-drag to Rotate • Right-drag/Shift+drag to Pan
            </span>
          </div>
        </div>

        {/* Right Column — Telemetry */}
        <div className="lg:col-span-3 flex flex-col gap-3 order-3">
          <div className="text-[10px] font-mono-space uppercase tracking-widest text-zinc-500 pb-1 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <span>Skeletal & Radiation</span>
            <span className="text-zinc-500">TELEMETRY</span>
          </div>

          {/* Radiation */}
          <div
            onClick={() => handleSelect('radiation', 'radiation_immune')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeFocus === 'radiation'
                ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-900 dark:border-white shadow-sm'
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-hud font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> RADIATION DOSIMETRY
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono-space bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 font-bold">
                SAFE
              </span>
            </div>
            <div className="text-xs font-mono-space text-zinc-900 dark:text-white font-bold">128.4 mSv • 1.4 mSv/day</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">GCR background safe • Career dose 21.4%</div>
          </div>

          {/* Bone Density */}
          <div
            onClick={() => handleSelect('skeletal', 'musculoskeletal')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeFocus === 'skeletal'
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-sm'
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-hud font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <Bone className="w-4 h-4" /> BONE DENSITY (BMD)
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono-space bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 font-bold">
                MONITOR
              </span>
            </div>
            <div className="text-xs font-mono-space text-amber-700 dark:text-amber-200 font-bold">Cancellous Loss: -1.1%/month</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">ARED resistive countermeasure active</div>
          </div>

          {/* Engine Card */}
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono-space text-zinc-700 dark:text-zinc-300 space-y-1">
            <div className="flex items-center justify-between text-zinc-900 dark:text-white font-bold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-zinc-500" /> Blender Procedural 3D Rig
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">60 FPS</span>
            </div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
              1.85m anatomical digital twin with 24 vertebrae, 12 rib pairs, visceral organs, and cardiovascular vascular tree.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-3 mt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono-space">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AUTONOMOUS 3D DIGITAL TWIN ACTIVE</span>
        </div>
        <div className="hidden sm:inline text-zinc-400">
          Unobstructed 3D viewport • Click & drag model to rotate 360°
        </div>
      </div>
    </div>
  );
}
