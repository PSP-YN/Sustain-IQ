"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Player() {
  const root = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  const scrollProgress = useRef(0);
  const smoothedProgress = useRef(0);
  const previous = useRef(0);
  const direction = useRef(-1);
  const facing = useRef(Math.PI);
  const clock = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress.current = THREE.MathUtils.clamp(window.scrollY / max, 0, 1);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  useFrame((state, delta) => {
    const next = scrollProgress.current;
    const velocity = next - previous.current;
    if (Math.abs(velocity) > 0.000015) direction.current = velocity > 0 ? -1 : 1;
    previous.current = next;
    const progress = THREE.MathUtils.damp(smoothedProgress.current, next, 5, delta);
    smoothedProgress.current = progress;
    clock.current += delta;

    const dir = direction.current;
    const z = THREE.MathUtils.lerp(20, -150, progress);
    const x = Math.sin(progress * Math.PI * 3.5) * 1.1;
    const targetFacing = dir < 0 ? Math.PI : 0;
    const angleDelta = THREE.MathUtils.euclideanModulo(targetFacing - facing.current + Math.PI, Math.PI * 2) - Math.PI;
    facing.current += angleDelta * (1 - Math.exp(-5.5 * delta));
    const walking = Math.min(1, .28 + Math.abs(velocity) * 120);
    const swing = Math.sin(clock.current * 8.5) * .62 * walking;

    if (root.current) {
      root.current.position.set(x, .06 + Math.abs(Math.sin(clock.current * 8.5)) * .035 * walking, z);
      root.current.rotation.y = facing.current;
    }
    if (leftArm.current) leftArm.current.rotation.x = swing;
    if (rightArm.current) rightArm.current.rotation.x = -swing;
    if (leftLeg.current) leftLeg.current.rotation.x = -swing;
    if (rightLeg.current) rightLeg.current.rotation.x = swing;

    const mobile = size.width < 700;
    const horizontalOffset = mobile ? 3.3 : 6.5;
    const cameraHeight = mobile ? 6.5 : 7.2;
    const cameraDistance = mobile ? 15 : 18;
    const lookHeight = mobile ? -3.5 : 2.65;
    const cameraTarget = new THREE.Vector3(x - horizontalOffset, cameraHeight, z - dir * cameraDistance);
    camera.position.lerp(cameraTarget, 1 - Math.exp(-delta * 3.1));
    const lookTarget = new THREE.Vector3(x - horizontalOffset, lookHeight, z + dir * 5.5);
    camera.lookAt(lookTarget);
  });

  return <group ref={root}>
    <mesh position={[0, .025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><circleGeometry args={[1.15, 32]} /><meshBasicMaterial color="#102b16" transparent opacity={.2} depthWrite={false} /></mesh>
    <mesh position={[0, 2.25, 0]} castShadow><boxGeometry args={[1.08, 1.5, .62]} /><meshStandardMaterial color="#13a7a1" roughness={.8} /></mesh>
    <mesh position={[0, 3.48, 0]} castShadow><boxGeometry args={[.94, .94, .94]} /><meshStandardMaterial color="#dba06e" roughness={.95} /></mesh>
    <mesh position={[0, 3.91, 0]} castShadow><boxGeometry args={[.98, .16, .98]} /><meshStandardMaterial color="#4a3020" roughness={1} /></mesh>
    <mesh position={[-.2, 3.57, .48]}><boxGeometry args={[.11, .12, .035]} /><meshStandardMaterial color="#25211d" /></mesh>
    <mesh position={[.2, 3.57, .48]}><boxGeometry args={[.11, .12, .035]} /><meshStandardMaterial color="#25211d" /></mesh>
    <group ref={leftArm} position={[-.75, 2.8, 0]}><mesh position={[0, -.52, 0]} castShadow><boxGeometry args={[.42, 1.18, .48]} /><meshStandardMaterial color="#dba06e" /></mesh></group>
    <group ref={rightArm} position={[.75, 2.8, 0]}><mesh position={[0, -.52, 0]} castShadow><boxGeometry args={[.42, 1.18, .48]} /><meshStandardMaterial color="#dba06e" /></mesh></group>
    <group ref={leftLeg} position={[-.29, 1.45, 0]}><mesh position={[0, -.57, 0]} castShadow><boxGeometry args={[.48, 1.18, .55]} /><meshStandardMaterial color="#3157ad" /></mesh><mesh position={[0, -1.16, .1]} castShadow><boxGeometry args={[.52, .25, .8]} /><meshStandardMaterial color="#483b31" /></mesh></group>
    <group ref={rightLeg} position={[.29, 1.45, 0]}><mesh position={[0, -.57, 0]} castShadow><boxGeometry args={[.48, 1.18, .55]} /><meshStandardMaterial color="#3157ad" /></mesh><mesh position={[0, -1.16, .1]} castShadow><boxGeometry args={[.52, .25, .8]} /><meshStandardMaterial color="#483b31" /></mesh></group>
  </group>;
}

export default function HeroWorld() {
  return <Canvas camera={{ position: [-3.3, 6.5, 35], fov: 52, near: .1, far: 240 }} dpr={[1, 1.75]} shadows gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
    <ambientLight intensity={1.5} />
    <hemisphereLight args={["#e8f8ff", "#456c35", 1.2]} />
    <directionalLight position={[-10, 18, 16]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
    <Player />
  </Canvas>;
}
