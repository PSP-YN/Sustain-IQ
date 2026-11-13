"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HeroWorld = dynamic(() => import("./HeroWorld"), { ssr: false, loading: () => <div className="world-loading" /> });
const biomes = ["/minecraft/jungle.webp", "/minecraft/mountains.webp", "/minecraft/taiga.webp"];

export default function WorldScene() {
  const [activeBiome, setActiveBiome] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / max));
        const biome = Math.min(2, Math.floor(progress * 3));
        stackRef.current?.querySelectorAll<HTMLElement>(".minecraft-photo").forEach((photo) => {
          photo.style.transform = `scale(${1.04 + progress * .09}) translateY(${progress * -2.5}%)`;
        });
        if (biome !== activeRef.current) {
          activeRef.current = biome;
          setActiveBiome(biome);
        }
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return <div className="world-canvas" aria-hidden="true">
    <div className="minecraft-photo-stack" ref={stackRef}>
      {biomes.map((src, index) => <div key={src} className={`minecraft-photo ${activeBiome === index ? "is-active" : ""}`} style={{ backgroundImage: `url(${src})` }} />)}
    </div>
    <div className="minecraft-photo-shade" />
    <HeroWorld />
  </div>;
}
