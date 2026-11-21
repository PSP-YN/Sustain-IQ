"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC = "/minecraft/videos/world-journey.mp4";

export default function WorldScene() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      if (reducedMotion.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }
      // Never seek the video in response to scroll events. Seeking a compressed
      // video timeline on every scroll frame causes visible stutter and dropped
      // frames, especially on mobile GPUs. Continuous playback keeps scrolling
      // native and fluid while the fixed Minecraft scene animates independently.
      video.loop = true;
      void video.play().catch(() => {
        // Keep the poster as a graceful fallback when autoplay is restricted.
      });
    };

    syncMotionPreference();
    reducedMotion.addEventListener("change", syncMotionPreference);
    return () => {
      reducedMotion.removeEventListener("change", syncMotionPreference);
      video.pause();
    };
  }, []);

  return (
    <div className="world-canvas" aria-hidden="true">
      <video
        ref={videoRef}
        className="minecraft-world-video"
        src={VIDEO_SRC}
        poster="/minecraft/4k/jungle-uhd.webp"
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        tabIndex={-1}
      />
      <div className="minecraft-photo-shade" />
    </div>
  );
}
