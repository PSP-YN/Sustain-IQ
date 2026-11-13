"use client";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

type Block = { x:number; y:number; z:number; s?:number };
function InstancedBlocks({ blocks, color, roughness=1 }: { blocks:Block[]; color:string; roughness?:number }) {
 const ref=useRef<THREE.InstancedMesh>(null);
 const dummy=useMemo(()=>new THREE.Object3D(),[]);
 useEffect(()=>{ if(!ref.current)return; blocks.forEach((b,i)=>{dummy.position.set(b.x,b.y,b.z);dummy.scale.setScalar(b.s??1);dummy.updateMatrix();ref.current!.setMatrixAt(i,dummy.matrix);});ref.current.instanceMatrix.needsUpdate=true; },[blocks,dummy]);
 return <instancedMesh ref={ref} args={[undefined,undefined,blocks.length]} castShadow receiveShadow><boxGeometry args={[1,1,1]}/><meshStandardMaterial color={color} roughness={roughness}/></instancedMesh>;
}
function VoxelTerrain(){
 const {grass,dirt,stone,wood,leaves,clouds}=useMemo(()=>{
  const grass:Block[]=[],dirt:Block[]=[],stone:Block[]=[],wood:Block[]=[],leaves:Block[]=[],clouds:Block[]=[];
  const height=(x:number,z:number)=>Math.floor(1.3+Math.sin(x*.19)*1.2+Math.cos(z*.17)*.9+Math.sin((x+z)*.11)*.8);
  for(let x=-20;x<=20;x++)for(let z=-20;z<=20;z++){
   const h=height(x,z);grass.push({x,y:h,z});
   for(let y=1;y<h;y++)dirt.push({x,y,z});
   if(h<1)stone.push({x,y:0,z});
   const hash=Math.sin(x*12.9898+z*78.233)*43758.5453;const forest=hash-Math.floor(hash);
   if(forest>.78 && Math.abs(x)>4 && Math.abs(z)>3){
    const trunkH=3+(Math.abs(Math.floor(forest*10))%2);
    for(let t=1;t<=trunkH;t++)wood.push({x,y:h+t,z});
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++)for(let dy=0;dy<=2;dy++)if(Math.abs(dx)+Math.abs(dz)+dy<4 && !(dx===0&&dz===0&&dy===0))leaves.push({x:x+dx,y:h+trunkH+dy,z:z+dz});
   }
  }
  for(let m=-2;m<=2;m++){const mx=m*9,mz=-25-(Math.abs(m)%2)*5,mh=7+(Math.abs(m)%3)*2;for(let y=0;y<mh;y++)for(let dx=-Math.max(1,mh-y);dx<=Math.max(1,mh-y);dx++)for(let dz=-Math.max(1,mh-y);dz<=Math.max(1,mh-y);dz++)stone.push({x:mx+dx,y:y-1,z:mz+dz});}
  for(let i=0;i<12;i++){const x=(i*17)%36-18,z=(i*23)%34-17,y=13+(i%4)*2;for(let dx=0;dx<5+(i%3);dx++)clouds.push({x:x+dx,y,z,s:1.3});}
  return {grass,dirt,stone,wood,leaves,clouds};
 },[]);
 const world=useRef<THREE.Group>(null);
 useFrame((state)=>{if(world.current)world.current.rotation.y=Math.sin(state.clock.elapsedTime*.025)*.018;});
 return <group ref={world}>
  <InstancedBlocks blocks={grass} color="#4f9b38"/><InstancedBlocks blocks={dirt} color="#80502d"/><InstancedBlocks blocks={stone} color="#73766e"/><InstancedBlocks blocks={wood} color="#9a6335"/><InstancedBlocks blocks={leaves} color="#3d9b36"/><InstancedBlocks blocks={clouds} color="#d9ead1"/>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.8,0]} receiveShadow><planeGeometry args={[200,200]}/><meshStandardMaterial color="#1b471b"/></mesh>
 </group>;
}
function World(){
 const sun=useRef<THREE.Mesh>(null);
 useFrame(s=>{if(sun.current)sun.current.position.x=18+Math.sin(s.clock.elapsedTime*.08)*1.5;});
 return <>
  <fog attach="fog" args={["#8fc7df",35,95]}/>
  <ambientLight intensity={1.15}/><directionalLight position={[18,28,12]} intensity={2.1} castShadow shadow-mapSize={[1024,1024]}/>
  <mesh ref={sun} position={[18,24,-30]}><boxGeometry args={[5,5,5]}/><meshBasicMaterial color="#fff0a6"/></mesh>
  <VoxelTerrain/>
  <Float speed={.35} rotationIntensity={0} floatIntensity={.15}><mesh position={[-14,11,-9]}><boxGeometry args={[2,2,2]}/><meshStandardMaterial color="#d8e9d4"/></mesh></Float>
  <Float speed={.25} rotationIntensity={0} floatIntensity={.12}><mesh position={[13,13,-18]}><boxGeometry args={[3,1.5,2]}/><meshStandardMaterial color="#d8e9d4"/></mesh></Float>
 </>;
}
export default function HeroWorld(){return <Canvas camera={{position:[0,19,42],fov:55}} dpr={[1,1.35]} shadows gl={{alpha:true,antialias:true}}><World/></Canvas>;}
