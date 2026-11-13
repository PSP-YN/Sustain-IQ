"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Block = { x: number; y: number; z: number; s?: number };

function makePixelTexture(base: string, detail: string, seed: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = base; ctx.fillRect(0, 0, 256, 256);
  let n = seed;
  for (let i = 0; i < 950; i++) {
    n = (n * 1664525 + 1013904223) >>> 0;
    const x = n % 256; n = (n * 1664525 + 1013904223) >>> 0;
    const y = n % 256; const size = 2 + (n % 9);
    ctx.globalAlpha = .12 + ((n >>> 8) % 35) / 100;
    ctx.fillStyle = detail; ctx.fillRect(x, y, size, size);
  }
  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter; texture.minFilter = THREE.NearestMipmapLinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 8;
  return texture;
}

function InstancedBlocks({ blocks, color, texture }: { blocks: Block[]; color: string; texture?: THREE.Texture }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useEffect(() => {
    if (!ref.current) return;
    blocks.forEach((b, i) => {
      dummy.position.set(b.x, b.y, b.z); dummy.scale.setScalar(b.s ?? 1); dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.computeBoundingSphere();
  }, [blocks, dummy]);
  return <instancedMesh ref={ref} args={[undefined, undefined, Math.max(1, blocks.length)]} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={color} map={texture} roughness={1} />
  </instancedMesh>;
}

function Tree({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  return <group position={[x, 2, z]} scale={scale}>
    <mesh position={[0, 2, 0]} castShadow><boxGeometry args={[.9, 4, .9]} /><meshStandardMaterial color="#80502b" /></mesh>
    <mesh position={[0, 4.8, 0]} castShadow><boxGeometry args={[3.8, 2.6, 3.8]} /><meshStandardMaterial color="#269a3c" roughness={1} /></mesh>
    <mesh position={[0, 6.3, 0]} castShadow><boxGeometry args={[2.7, 2.2, 2.7]} /><meshStandardMaterial color="#36b94b" roughness={1} /></mesh>
    <mesh position={[0, 7.4, 0]} castShadow><boxGeometry args={[1.5, 1.4, 1.5]} /><meshStandardMaterial color="#55ce55" roughness={1} /></mesh>
  </group>;
}

function Player({ progress }: { progress: React.MutableRefObject<number> }) {
  const root = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null); const rightArm = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null); const rightLeg = useRef<THREE.Group>(null);
  const { camera } = useThree(); const smooth = useRef(0); const clock = useRef(0);
  useFrame((state, delta) => {
    smooth.current = THREE.MathUtils.damp(smooth.current, progress.current, 3.2, delta);
    clock.current += delta;
    const z = 8 - smooth.current * 148;
    const walking = Math.min(1, Math.max(.12, Math.abs(progress.current - smooth.current) * 30 + .55));
    if (root.current) { root.current.position.set(Math.sin(smooth.current * 8) * .45, 2.25 + Math.abs(Math.sin(clock.current * 8)) * .08, z); root.current.rotation.y = Math.sin(smooth.current * 8) * .09; }
    const swing = Math.sin(clock.current * 8) * .58 * walking;
    if (leftArm.current) leftArm.current.rotation.x = swing;
    if (rightArm.current) rightArm.current.rotation.x = -swing;
    if (leftLeg.current) leftLeg.current.rotation.x = -swing;
    if (rightLeg.current) rightLeg.current.rotation.x = swing;
    const target = new THREE.Vector3(Math.sin(smooth.current * 8) * .45, 9.4, z + 17);
    camera.position.lerp(target, 1 - Math.exp(-delta * 3.5));
    camera.lookAt(Math.sin(smooth.current * 8) * .35, 3.6, z - 7);
  });
  return <group ref={root}>
    <mesh position={[0, 2.05, 0]} castShadow><boxGeometry args={[1.15, 1.55, .62]} /><meshStandardMaterial color="#16a6a1" roughness={.8} /></mesh>
    <mesh position={[0, 3.28, 0]} castShadow><boxGeometry args={[.95, .95, .95]} /><meshStandardMaterial color="#d99b68" roughness={1} /></mesh>
    <mesh position={[0, 3.47, .49]}><boxGeometry args={[.72, .22, .035]} /><meshStandardMaterial color="#352b25" /></mesh>
    <mesh position={[-.2, 3.52, .515]}><boxGeometry args={[.09, .09, .04]} /><meshStandardMaterial color="#fff" /></mesh>
    <mesh position={[.2, 3.52, .515]}><boxGeometry args={[.09, .09, .04]} /><meshStandardMaterial color="#fff" /></mesh>
    <group ref={leftArm} position={[-.78, 2.65, 0]}><mesh position={[0, -.48, 0]} castShadow><boxGeometry args={[.42, 1.15, .48]} /><meshStandardMaterial color="#d99b68" /></mesh></group>
    <group ref={rightArm} position={[.78, 2.65, 0]}><mesh position={[0, -.48, 0]} castShadow><boxGeometry args={[.42, 1.15, .48]} /><meshStandardMaterial color="#d99b68" /></mesh></group>
    <group ref={leftLeg} position={[-.3, 1.25, 0]}><mesh position={[0, -.5, 0]} castShadow><boxGeometry args={[.48, 1.1, .55]} /><meshStandardMaterial color="#3157ad" /></mesh><mesh position={[0, -1.02, .12]}><boxGeometry args={[.52, .25, .8]} /><meshStandardMaterial color="#493b2f" /></mesh></group>
    <group ref={rightLeg} position={[.3, 1.25, 0]}><mesh position={[0, -.5, 0]} castShadow><boxGeometry args={[.48, 1.1, .55]} /><meshStandardMaterial color="#3157ad" /></mesh><mesh position={[0, -1.02, .12]}><boxGeometry args={[.52, .25, .8]} /><meshStandardMaterial color="#493b2f" /></mesh></group>
  </group>;
}

function World() {
  const progress = useRef(0);
  const grass = useMemo(() => makePixelTexture("#5dbb3c", "#2d8d32", 13), []);
  const dirt = useMemo(() => makePixelTexture("#956039", "#d19a5b", 37), []);
  const stone = useMemo(() => makePixelTexture("#929b99", "#c5ceca", 71), []);
  const terrain = useMemo(() => {
    const top: Block[] = [], soil: Block[] = [], rocks: Block[] = [], path: Block[] = [], planks: Block[] = [], flowers: Block[] = [];
    for (let z = 18; z >= -158; z--) {
      for (let x = -25; x <= 25; x++) {
        const h = Math.max(1, Math.floor(2 + Math.sin(x * .23) * 1.2 + Math.cos(z * .12) * 1.1 + Math.sin((x + z) * .08) * .7));
        top.push({ x, y: h, z });
        for (let y = 0; y < h; y++) (y < h - 3 ? rocks : soil).push({ x, y, z });
        const pathX = Math.sin(z * .035) * 2.3;
        if (Math.abs(x - pathX) < 2.8 && !(z < -72 && z > -83)) path.push({ x, y: 1.85, z });
        if (z <= -72 && z >= -83 && Math.abs(x - pathX) < 3.2) planks.push({ x, y: 1.9, z });
        const hash = Math.abs(Math.sin(x * 127.1 + z * 311.7) * 43758.5453) % 1;
        if (Math.abs(x - pathX) > 4 && hash > .987 && h < 4) flowers.push({ x, y: h + .7, z, s: .32 });
      }
    }
    return { top, soil, rocks, path, planks, flowers };
  }, []);
  const trees = useMemo(() => {
    const list: {x:number;z:number;scale:number}[] = [];
    for (let z = 14; z > -154; z -= 7) for (const side of [-1, 1]) {
      const seed = Math.abs(Math.sin(z * 12.989 + side * 78.23) * 43758.5) % 1;
      if (seed > .22) list.push({ x: side * (7 + seed * 10), z: z + seed * 4, scale: .78 + seed * .65 });
    }
    return list;
  }, []);
  useEffect(() => {
    const update = () => { const max = document.documentElement.scrollHeight - window.innerHeight; progress.current = max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0; };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <>
    <color attach="background" args={["#8bd7ff"]} />
    <fog attach="fog" args={["#a8e3ff", 35, 100]} />
    <ambientLight intensity={1.35} /><hemisphereLight args={["#d9f4ff", "#547c36", 1.15]} />
    <directionalLight position={[-18, 35, 22]} intensity={2.8} castShadow shadow-mapSize={[2048, 2048]} />
    <mesh position={[0, 1.35, -78]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[13, 12]} /><meshStandardMaterial color="#27bce9" roughness={.22} metalness={.08} /></mesh>
    <InstancedBlocks blocks={terrain.rocks} color="#a5aaa5" texture={stone} />
    <InstancedBlocks blocks={terrain.soil} color="#a8794d" texture={dirt} />
    <InstancedBlocks blocks={terrain.top} color="#6cce45" texture={grass} />
    <InstancedBlocks blocks={terrain.path} color="#bd8a50" texture={dirt} />
    <InstancedBlocks blocks={terrain.planks} color="#a96d37" />
    <InstancedBlocks blocks={terrain.flowers} color="#ffe45a" />
    {trees.map((t, i) => <Tree key={i} {...t} />)}
    <Player progress={progress} />
    <mesh position={[0, 27, -75]}><sphereGeometry args={[115, 32, 24]} /><meshBasicMaterial color="#b9eaff" side={THREE.BackSide} /></mesh>
  </>;
}

export default function HeroWorld() {
  return <Canvas camera={{ position: [0, 9.4, 25], fov: 58, near: .1, far: 240 }} dpr={[1, 2]} shadows gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}>
    <World />
  </Canvas>;
}
