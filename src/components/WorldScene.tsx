"use client";
import dynamic from "next/dynamic";
const HeroWorld=dynamic(()=>import("./HeroWorld"),{ssr:false,loading:()=><div className="world-loading"/>});
export default function WorldScene(){return <div className="world-canvas"><HeroWorld/></div>;}
