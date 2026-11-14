"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type ProgressRef = { current: number };

function useJourneyProgress(): ProgressRef {
  const progress = useRef(0);
  useEffect(() => {
    const update = () => {
      const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.current = THREE.MathUtils.clamp(window.scrollY / range, 0, 1);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return progress;
}

function Block({ position, size, color, emissive, castShadow = true }: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  emissive?: string;
  castShadow?: boolean;
}) {
  return <mesh position={position} castShadow={castShadow}>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} roughness={0.92} emissive={emissive ?? "#000000"} emissiveIntensity={emissive ? 0.8 : 0} />
  </mesh>;
}

function Player({ progress }: { progress: ProgressRef }) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  const eased = useRef(0);
  const last = useRef(0);
  const direction = useRef(-1);
  const facing = useRef(Math.PI);
  const gait = useRef(0);

  useFrame((state, delta) => {
    const raw = progress.current;
    const velocity = raw - last.current;
    if (Math.abs(velocity) > 0.00001) direction.current = velocity > 0 ? -1 : 1;
    last.current = raw;
    eased.current = THREE.MathUtils.damp(eased.current, raw, 4.2, delta);
    const p = eased.current;
    const dir = direction.current;
    const z = THREE.MathUtils.lerp(18, -158, p);
    const x = Math.sin(p * Math.PI * 3.25) * 1.05;
    const targetFacing = dir < 0 ? Math.PI : 0;
    const diff = THREE.MathUtils.euclideanModulo(targetFacing - facing.current + Math.PI, Math.PI * 2) - Math.PI;
    facing.current += diff * (1 - Math.exp(-5.5 * delta));
    const movement = Math.min(1, 0.18 + Math.abs(velocity) * 165);
    gait.current += delta * (4 + movement * 5.5);
    const swing = Math.sin(gait.current) * 0.62 * movement;
    if (root.current) {
      root.current.position.set(x, 0.08 + Math.abs(Math.sin(gait.current)) * 0.045 * movement, z);
      root.current.rotation.y = facing.current;
    }
    if (head.current) head.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.07;
    if (leftArm.current) leftArm.current.rotation.x = swing;
    if (rightArm.current) rightArm.current.rotation.x = -swing;
    if (leftLeg.current) leftLeg.current.rotation.x = -swing;
    if (rightLeg.current) rightLeg.current.rotation.x = swing;

    const mobile = size.width < 700;
    const offset = mobile ? 3.8 : 8.2;
    if (root.current) root.current.scale.setScalar(mobile ? 0.82 : 1);
    const camHeight = mobile ? 6.4 : 7.2;
    const camDistance = mobile ? 15 : 18;
    const camTarget = new THREE.Vector3(x - offset, camHeight, z - dir * camDistance);
    camera.position.lerp(camTarget, 1 - Math.exp(-delta * 3.2));
    camera.lookAt(x - offset, mobile ? 2.5 : 2.8, z + dir * 5.2);
  });

  return <group ref={root}>
    <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[1.1, 24]} /><meshBasicMaterial color="#102b16" transparent opacity={0.24} depthWrite={false} /></mesh>
    <Block position={[0, 2.25, 0]} size={[1.08, 1.5, 0.62]} color="#13a7a1" />
    <group ref={head} position={[0, 3.48, 0]}>
      <Block position={[0, 0, 0]} size={[0.94, 0.94, 0.94]} color="#dba06e" />
      <Block position={[0, 0.47, 0]} size={[0.98, 0.16, 0.98]} color="#493020" />
      <Block position={[-0.2, 0.08, 0.48]} size={[0.11, 0.12, 0.035]} color="#1e2620" castShadow={false} />
      <Block position={[0.2, 0.08, 0.48]} size={[0.11, 0.12, 0.035]} color="#1e2620" castShadow={false} />
    </group>
    <group ref={leftArm} position={[-0.75, 2.8, 0]}><Block position={[0, -0.52, 0]} size={[0.42, 1.18, 0.48]} color="#dba06e" /></group>
    <group ref={rightArm} position={[0.75, 2.8, 0]}><Block position={[0, -0.52, 0]} size={[0.42, 1.18, 0.48]} color="#dba06e" /></group>
    <group ref={leftLeg} position={[-0.29, 1.45, 0]}><Block position={[0, -0.57, 0]} size={[0.48, 1.18, 0.55]} color="#3157ad" /><Block position={[0, -1.16, 0.1]} size={[0.52, 0.25, 0.8]} color="#483b31" /></group>
    <group ref={rightLeg} position={[0.29, 1.45, 0]}><Block position={[0, -0.57, 0]} size={[0.48, 1.18, 0.55]} color="#3157ad" /><Block position={[0, -1.16, 0.1]} size={[0.52, 0.25, 0.8]} color="#483b31" /></group>
  </group>;
}

type ActorKind = "engineer" | "cow" | "sheep" | "fox" | "wolf" | "parrot";

function Companion({ kind, position, phase = 0 }: {
  kind: ActorKind;
  position: [number, number, number];
  phase?: number;
}) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const armA = useRef<THREE.Group>(null);
  const armB = useRef<THREE.Group>(null);
  const legA = useRef<THREE.Group>(null);
  const legB = useRef<THREE.Group>(null);
  const palette = {
    engineer: ["#0d9f91", "#d99b70", "#263c68"],
    cow: ["#e8e4d8", "#72503b", "#493a31"],
    sheep: ["#eee9dc", "#caa68a", "#57483e"],
    fox: ["#d8792b", "#e98c3d", "#463028"],
    wolf: ["#899794", "#aeb9b4", "#46504d"],
    parrot: ["#159b7e", "#e5b938", "#a3442f"],
  }[kind];
  const isSmall = kind === "parrot";
  const bodySize: [number, number, number] = kind === "cow" || kind === "sheep" ? [1.35, 0.92, 0.82] : isSmall ? [0.5, 0.78, 0.48] : [0.9, 0.9, 0.66];

  useFrame((state) => {
    const t = state.clock.elapsedTime * (isSmall ? 1.7 : 1.15) + phase;
    const swing = Math.sin(t * 3.8) * (kind === "engineer" ? 0.38 : 0.58);
    if (root.current) {
      root.current.position.y = position[1] + (isSmall ? Math.sin(t * 2.2) * 0.22 : Math.abs(Math.sin(t * 3.8)) * 0.025);
      root.current.rotation.y = Math.sin(t * 0.5) * 0.12;
    }
    if (head.current) head.current.rotation.y = Math.sin(t * 0.85) * 0.16;
    if (armA.current) armA.current.rotation.x = swing * 0.5;
    if (armB.current) armB.current.rotation.x = -swing * 0.5;
    if (legA.current) legA.current.rotation.x = swing;
    if (legB.current) legB.current.rotation.x = -swing;
  });

  return <group ref={root} position={position} scale={kind === "parrot" ? 0.96 : kind === "engineer" ? 1.18 : 1.2}>
    {kind === "sheep" && <mesh position={[0, 1.18, 0]} castShadow><dodecahedronGeometry args={[0.82, 0]} /><meshStandardMaterial color="#f5f0e5" roughness={1} /></mesh>}
    <Block position={[0, 1.12, 0]} size={bodySize} color={palette[0]} />
    {kind === "cow" && <>
      <Block position={[-0.35, 1.16, 0.42]} size={[0.32, 0.3, 0.025]} color="#3b302a" castShadow={false} />
      <Block position={[0.3, 1.4, 0.42]} size={[0.3, 0.24, 0.025]} color="#3b302a" castShadow={false} />
      <Block position={[0, 1.35, 0.62]} size={[0.24, 0.16, 0.14]} color="#c18c78" />
    </>}
    {kind === "engineer" && <>
      <Block position={[0, 1.12, -0.42]} size={[0.54, 0.68, 0.18]} color="#233c53" />
      <Block position={[0.49, 1.45, 0.2]} size={[0.3, 0.4, 0.05]} color="#173a3c" />
      <Block position={[0.49, 1.45, 0.24]} size={[0.23, 0.31, 0.018]} color="#4bffe0" emissive="#21d8b9" />
    </>}
    <group ref={head} position={[0, isSmall ? 1.65 : 1.76, 0.06]}>
      <Block position={[0, 0, 0]} size={isSmall ? [0.48, 0.46, 0.46] : [0.66, 0.66, 0.66]} color={palette[1]} />
      {kind !== "parrot" && <>
        <Block position={[-0.16, 0.04, 0.34]} size={[0.085, 0.09, 0.025]} color="#242622" castShadow={false} />
        <Block position={[0.16, 0.04, 0.34]} size={[0.085, 0.09, 0.025]} color="#242622" castShadow={false} />
      </>}
      {kind === "fox" && <>
        <Block position={[-0.2, 0.43, 0]} size={[0.22, 0.36, 0.22]} color="#d8792b" />
        <Block position={[0.2, 0.43, 0]} size={[0.22, 0.36, 0.22]} color="#d8792b" />
        <Block position={[0, -0.15, 0.34]} size={[0.3, 0.16, 0.12]} color="#fff0d2" />
      </>}
      {kind === "wolf" && <Block position={[0, -0.16, 0.35]} size={[0.38, 0.2, 0.16]} color="#dce8e0" />}
      {kind === "parrot" && <Block position={[0, -0.1, 0.27]} size={[0.15, 0.16, 0.2]} color="#e6a52c" />}
    </group>
    {([-1, 1] as const).map((side) => <group key={side} ref={side < 0 ? armA : armB} position={[side * 0.48, 1.28, 0]}>
      <Block position={[0, -0.23, 0]} size={[0.22, 0.64, 0.25]} color={palette[1]} />
    </group>)}
    {([-1, 1] as const).map((side) => <group key={side} ref={side < 0 ? legA : legB} position={[side * 0.24, 0.7, 0]}>
      <Block position={[0, -0.26, 0]} size={[0.2, 0.72, 0.25]} color={palette[2]} />
    </group>)}
    {kind === "engineer" && <Block position={[0, 2.15, 0]} size={[0.72, 0.1, 0.72]} color="#174b43" />}
    {kind === "wolf" && <Block position={[0, 0.88, -0.48]} size={[0.18, 0.18, 0.72]} color="#899794" />}
  </group>;
}

function Herobrine({ progress }: { progress: ProgressRef }) {
  const root = useRef<THREE.Group>(null);
  const glow = useRef<THREE.PointLight>(null);
  useFrame((state, delta) => {
    const p = progress.current;
    const appear = THREE.MathUtils.smoothstep(p, 0.69, 0.77) * (1 - THREE.MathUtils.smoothstep(p, 0.91, 0.97));
    if (root.current) {
      const scale = THREE.MathUtils.damp(root.current.scale.x, appear * 1.18, 4, delta);
      root.current.scale.setScalar(scale);
      root.current.position.y = 6.0 + Math.sin(state.clock.elapsedTime * 1.25) * 0.08;
      root.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.09;
    }
    if (glow.current) glow.current.intensity = appear * (1.4 + Math.sin(state.clock.elapsedTime * 3) * 0.35);
  });
  return <group ref={root} position={[1.3, 0, -123]} scale={0}>
    <Block position={[0, 2.15, 0]} size={[1.08, 1.5, 0.62]} color="#bfc6bb" />
    <Block position={[0, 3.45, 0]} size={[0.94, 0.94, 0.94]} color="#d3d8ce" />
    <Block position={[-0.2, 3.52, 0.48]} size={[0.12, 0.1, 0.04]} color="#f7ffff" emissive="#d9ffff" />
    <Block position={[0.2, 3.52, 0.48]} size={[0.12, 0.1, 0.04]} color="#f7ffff" emissive="#d9ffff" />
    <Block position={[-0.72, 2.7, 0]} size={[0.4, 1.2, 0.46]} color="#bfc6bb" />
    <Block position={[0.72, 2.7, 0]} size={[0.4, 1.2, 0.46]} color="#bfc6bb" />
    <mesh position={[0, 0.05, 0]}><torusGeometry args={[1.2, 0.035, 8, 48]} /><meshBasicMaterial color="#c9f7ff" transparent opacity={0.65} /></mesh>
    <pointLight ref={glow} position={[0, 3.1, 0.7]} color="#c7f4ff" intensity={0} distance={9} />
  </group>;
}

function Fireflies() {
  const points = useRef<THREE.Points>(null);
  const positions = new Float32Array(72 * 3);
  for (let i = 0; i < 72; i++) {
    positions[i * 3] = Math.sin(i * 12.9898) * 8.5;
    positions[i * 3 + 1] = 1.2 + (i % 11) * 0.58;
    positions[i * 3 + 2] = 16 - (i / 72) * 174;
  }
  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.035;
    const material = points.current.material as THREE.PointsMaterial;
    material.opacity = 0.28 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
  });
  return <points ref={points}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial color="#dfff9b" size={0.105} transparent opacity={0.3} sizeAttenuation depthWrite={false} />
  </points>;
}

function JourneyActors() {
  const progress = useJourneyProgress();
  return <>
    <Player progress={progress} />
    <Companion kind="cow" position={[-6, 0, 2]} phase={0.8} />
    <Companion kind="parrot" position={[-4.2, 3.2, -27]} phase={1.7} />
    <Companion kind="engineer" position={[-2.8, 0, -48]} phase={0.4} />
    <Companion kind="sheep" position={[-6.1, 0, -72]} phase={1.1} />
    <Companion kind="fox" position={[-3.2, 0, -93]} phase={2.1} />
    <Companion kind="wolf" position={[-6.2, 0, -114]} phase={2.8} />
    <Herobrine progress={progress} />
    <Fireflies />
  </>;
}

export default function HeroWorld() {
  return <Canvas camera={{ position: [-5.8, 7.2, 36], fov: 52, near: 0.1, far: 240 }} dpr={[1, 1.5]} shadows gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
    <ambientLight intensity={1.25} />
    <hemisphereLight args={["#e8f8ff", "#456c35", 1.05]} />
    <directionalLight position={[-10, 18, 16]} intensity={2.1} castShadow shadow-mapSize={[1024, 1024]} />
    <JourneyActors />
  </Canvas>;
}
