"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
function Tree({position,scale=1}:{position:[number,number,number];scale?:number}) {
 return <group position={position} scale={scale}><mesh position={[0,.28,0]} castShadow><cylinderGeometry args={[.045,.07,.58,5]}/><meshStandardMaterial color="#684b2f" roughness={1}/></mesh><mesh position={[0,.72,0]} castShadow><coneGeometry args={[.32,.72,6]}/><meshStandardMaterial color="#2d6b49" roughness={.9}/></mesh><mesh position={[0,1.02,0]} castShadow><coneGeometry args={[.23,.58,6]}/><meshStandardMaterial color="#47865a" roughness={.9}/></mesh></group>;
}
function Island() {
 const group=useRef<THREE.Group>(null);
 useFrame((state,delta)=>{if(group.current){group.current.rotation.y+=delta*.055;group.current.position.y=Math.sin(state.clock.elapsedTime*.45)*.10;}});
 const trees:[number,number,number][]=[[-1.35,.38,.4],[-.7,.38,-.65],[.25,.38,.35],[1.05,.38,-.35],[.65,.38,.85],[-.25,.38,1.05]];
 return <group ref={group} rotation={[.04,-.45,0]}><mesh receiveShadow castShadow><cylinderGeometry args={[2.25,1.48,.7,7,1]}/><meshStandardMaterial color="#806344" roughness={1}/></mesh><mesh position={[0,.37,0]} receiveShadow><cylinderGeometry args={[2.24,2.24,.12,7]}/><meshStandardMaterial color="#8ab66a" roughness={1}/></mesh><mesh position={[0,.46,0]}><cylinderGeometry args={[1.1,1.1,.035,32]}/><meshStandardMaterial color="#a9c982" roughness={.8}/></mesh>{trees.map((p,i)=><Tree key={i} position={p} scale={i%2===0?1:.82}/>)}</group>;
}
function World() {
 const sun=useRef<THREE.Mesh>(null);
 useFrame(s=>{if(sun.current)sun.current.position.y=2.5+Math.sin(s.clock.elapsedTime*.25)*.08;});
 return <><ambientLight intensity={1.5}/><directionalLight position={[4,7,5]} intensity={2.2} castShadow shadow-mapSize={[1024,1024]}/><pointLight position={[-4,2,-3]} intensity={18} color="#e7b56b"/><mesh ref={sun} position={[2.7,2.5,-3]}><sphereGeometry args={[.55,32,32]}/><meshBasicMaterial color="#f4c879"/></mesh><mesh position={[0,-1.65,0]} rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[200,200]}/><meshStandardMaterial color="#203e36" roughness={1}/></mesh><Island/><Float speed={1.2} rotationIntensity={.15} floatIntensity={.3}><mesh position={[-2.3,1.35,.2]}><dodecahedronGeometry args={[.16,0]}/><meshStandardMaterial color="#d4b978"/></mesh></Float><Float speed={.9} rotationIntensity={.2} floatIntensity={.4}><mesh position={[2.15,.55,.2]}><octahedronGeometry args={[.13,0]}/><meshStandardMaterial color="#8bbd8c"/></mesh></Float><Sparkles count={65} scale={7} size={2} speed={.25} color="#d7e8b5" opacity={.5}/></>;
}
export default function HeroWorld(){return <Canvas camera={{position:[0,2.3,6.9],fov:39}} dpr={[1,1.6]} shadows gl={{alpha:true,antialias:true}}><World/></Canvas>;}
