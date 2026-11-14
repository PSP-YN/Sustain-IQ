"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const HeroWorld = dynamic(() => import("./HeroWorld"), {
  ssr: false,
  loading: () => <div className="world-loading" />,
});

const biomes = [
  "/minecraft/4k/jungle-uhd.webp",
  "/minecraft/4k/mountains-uhd.webp",
  "/minecraft/4k/taiga-uhd.webp",
];

export default function WorldScene() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preloaded: HTMLImageElement[] = biomes.map((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
      return image;
    });

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        // Adjacent layers overlap continuously; their opacity weights sum to one.
        const blendPosition = progress * (biomes.length - 1);
        const photos = stackRef.current?.querySelectorAll<HTMLElement>(".minecraft-photo");
        photos?.forEach((photo, index) => {
          const weight = Math.max(0, 1 - Math.abs(blendPosition - index));
          photo.style.opacity = weight.toFixed(3);
          photo.style.transform = `scale(${1.055 + progress * 0.045}) translate3d(0, ${progress * -1.5}%, 0)`;
        });
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      preloaded.forEach((image) => { image.src = ""; });
    };
  }, []);

  return (
    <div className="world-canvas" aria-hidden="true">
      <div className="minecraft-photo-stack" ref={stackRef}>
        {biomes.map((src) => (
          <div key={src} className="minecraft-photo" style={{ backgroundImage: `url(${src})` }} />
        ))}
      </div>
      <div className="minecraft-photo-shade" />
      <HeroWorld />
    </div>
  );
}
