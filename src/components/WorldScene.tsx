"use client";
import dynamic from "next/dynamic";
const HeroWorld = dynamic(() => import("./HeroWorld"), {ssr:false, loading:()=><div className="world-loading"><span className="loading-orb"/>Building your world…</div>});
export default function WorldScene(){return <HeroWorld/>;}
