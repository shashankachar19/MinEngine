import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSimulation } from '../store/SimContext';

// ── Terrain heightmap generator — simulates Sandur open-cast benched terrain ──
function generateMineTerrainGeometry(): THREE.BufferGeometry {
  const size = 200;
  const segments = 100;
  const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const z = positions.getY(i);

    // Create open-cast pit shape — deepest at center-right (Sector 4 area)
    const pitCenterX = 15;
    const pitCenterZ = 10;
    const distFromPit = Math.sqrt((x - pitCenterX) ** 2 + (z - pitCenterZ) ** 2);

    let height = 0;

    // Surrounding terrain — gently rolling
    height += Math.sin(x * 0.04) * 3 + Math.cos(z * 0.05) * 2;
    height += Math.sin(x * 0.08 + z * 0.06) * 1.5;

    // Open-cast pit — terraced excavation
    if (distFromPit < 60) {
      const pitDepth = Math.max(0, 1 - distFromPit / 60);
      const rawDepth = pitDepth * 35;
      const benchHeight = 7;
      const benchedDepth = Math.floor(rawDepth / benchHeight) * benchHeight;
      const benchFraction = (rawDepth % benchHeight) / benchHeight;
      const finalDepth = benchedDepth + (benchFraction > 0.7 ? benchHeight * 0.7 + (benchFraction - 0.7) * benchHeight * 3 : benchFraction * benchHeight * 0.3);
      height -= finalDepth;

      if (distFromPit < 20) {
        height -= (20 - distFromPit) * 0.5;
      }
    }

    // Overburden dump area (Sector 3)
    const dumpDist = Math.sqrt((x + 50) ** 2 + (z - 20) ** 2);
    if (dumpDist < 30) {
      height += Math.max(0, (30 - dumpDist) * 0.4);
    }

    positions.setZ(i, height);
  }

  geometry.computeVertexNormals();
  return geometry;
}

// ── Terrain Mesh with vertex colors ──
function MineTerrain() {
  const { state } = useSimulation();
  const geometry = useMemo(() => generateMineTerrainGeometry(), []);

  const colors = useMemo(() => {
    const positions = geometry.attributes.position;
    const colorsArray = new Float32Array(positions.count * 3);

    for (let i = 0; i < positions.count; i++) {
      const height = positions.getZ(i);
      const x = positions.getX(i);
      const z = positions.getY(i);
      const pitCenterX = 15;
      const pitCenterZ = 10;
      const distFromPit = Math.sqrt((x - pitCenterX) ** 2 + (z - pitCenterZ) ** 2);

      let r: number, g: number, b: number;

      if (height < -15) {
        // Deep pit — dark red iron ore
        r = 0.35; g = 0.15; b = 0.08;
      } else if (height < -5) {
        // Mid bench — red-brown laterite
        r = 0.45; g = 0.22; b = 0.1;
      } else if (height < 2) {
        // Pit rim — grey-brown
        r = 0.4; g = 0.32; b = 0.25;
      } else {
        // Surrounding terrain — Karnataka scrubland
        r = 0.35; g = 0.33; b = 0.18;
      }

      // Overburden dump
      const dumpDist = Math.sqrt((x + 50) ** 2 + (z - 20) ** 2);
      if (dumpDist < 30 && height > 5) {
        r = 0.5; g = 0.45; b = 0.4;
      }

      // Sector 4 hazard tint
      if (state.hazardSector === 'S4' && distFromPit < 22 && height < -10) {
        r = Math.min(1, r + 0.15);
        g *= 0.8;
        b *= 0.7;
      }

      colorsArray[i * 3] = r;
      colorsArray[i * 3 + 1] = g;
      colorsArray[i * 3 + 2] = b;
    }

    return new THREE.BufferAttribute(colorsArray, 3);
  }, [geometry, state.hazardSector]);

  geometry.setAttribute('color', colors);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={0.85} metalness={0.1} />
    </mesh>
  );
}

// ── Sector Labels (using drei Text which loads its own font) ──
function SectorLabels() {
  const { state } = useSimulation();

  const labels = [
    { text: 'SECTOR 1', position: [-25, 8, -20] as [number, number, number], color: '#b8ccdf' },
    { text: 'SECTOR 2', position: [-40, 10, 15] as [number, number, number], color: '#b8ccdf' },
    { text: 'SECTOR 3', position: [-50, 16, 20] as [number, number, number], color: '#b8ccdf' },
    { text: 'SECTOR 4', position: [15, 2, 10] as [number, number, number], color: state.hazardSector === 'S4' ? '#ef4444' : '#b8ccdf' },
    { text: 'PIT HEAD', position: [0, 8, -40] as [number, number, number], color: '#22c55e' },
    { text: 'ALPHA-4', position: [5, 5, -15] as [number, number, number], color: state.blockedRoute === 'alpha-4' ? '#ef4444' : '#5a7394' },
    { text: 'BRAVO-2', position: [-10, 6, 25] as [number, number, number], color: state.activeRoute === 'bravo-2' ? '#22c55e' : '#5a7394' },
  ];

  return (
    <>
      {labels.map(label => (
        <Text
          key={label.text}
          position={label.position}
          fontSize={2.5}
          color={label.color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.1}
          outlineColor="#000000"
        >
          {label.text}
        </Text>
      ))}
    </>
  );
}

// ── Hazard Ring (pulsing on Sector 4) ──
function HazardRing() {
  const { state } = useSimulation();
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current && state.hazardSector) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.15;
      ringRef.current.scale.set(scale, scale, 1);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 3) * 0.15;
    }
  });

  if (!state.hazardSector) return null;

  return (
    <mesh ref={ringRef} position={[15, 1, 10]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[18, 22, 48]} />
      <meshBasicMaterial color="#dc2626" transparent opacity={0.35} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Camera Controller ──
function CameraController() {
  const { state } = useSimulation();
  const controlsRef = useRef<any>(null);

  useFrame(() => {
    if (!controlsRef.current) return;

    let targetX = -10, targetY = 50, targetZ = 80;
    let lookAtX = 0, lookAtZ = 0;

    switch (state.cameraTarget) {
      case 'sector4':
        targetX = 30; targetY = 25; targetZ = 40;
        lookAtX = 15; lookAtZ = 10;
        break;
      case 'route_alpha4':
        targetX = 20; targetY = 30; targetZ = 30;
        lookAtX = 5; lookAtZ = -5;
        break;
      case 'bravo2':
        targetX = -15; targetY = 25; targetZ = 45;
        lookAtX = -5; lookAtZ = 15;
        break;
    }

    const camera = controlsRef.current.object;
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.position.z += (targetZ - camera.position.z) * 0.02;

    controlsRef.current.target.x += (lookAtX - controlsRef.current.target.x) * 0.02;
    controlsRef.current.target.z += (lookAtZ - controlsRef.current.target.z) * 0.02;
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      enableRotate={true}
      autoRotate={state.cameraTarget === 'overview'}
      autoRotateSpeed={0.3}
      maxPolarAngle={Math.PI / 2.5}
      minPolarAngle={Math.PI / 6}
    />
  );
}

// ── Main 3D Background Component ──
export default function Mine3DBackground() {
  return (
    <div className="mine-3d-canvas">
      <Canvas
        camera={{ position: [-10, 50, 80], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#040811');
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
      >
        {/* Lighting — warm afternoon Karnataka sun */}
        <ambientLight intensity={0.5} color="#e8d4b8" />
        <directionalLight position={[50, 60, 30]} intensity={1.0} color="#fce4b5" />
        <directionalLight position={[-30, 40, -20]} intensity={0.3} color="#93c5fd" />

        {/* Fog for depth */}
        <fog attach="fog" args={['#0a1020', 80, 250]} />

        {/* Mine terrain */}
        <MineTerrain />

        {/* Sector labels */}
        <SectorLabels />

        {/* Hazard indicator */}
        <HazardRing />

        {/* Camera controller */}
        <CameraController />
      </Canvas>
    </div>
  );
}
