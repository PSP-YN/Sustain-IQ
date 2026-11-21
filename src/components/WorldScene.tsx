"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC = "/minecraft/videos/world-journey.mp4";

export default function WorldScene() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frame = 0;
    let disposed = false;
    let initialized = false;
    const mobileMotion = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mobile browsers handle a muted inline video more reliably as normal playback
    // than as a continuously-seeked scroll timeline. Keep the world moving smoothly
    // behind the page while the document itself retains native touch scrolling.
    if (mobileMotion && !reducedMotion) {
      video.loop = true;
      video.play().catch(() => {
        // The poster remains visible when autoplay is restricted by the browser.
      });
      return () => {
        video.pause();
      };
    }
    if (reducedMotion) {
      video.pause();
      return;
    }

    const syncToScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (disposed || !video || !Number.isFinite(video.duration) || video.duration <= 0) return;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        const targetTime = progress * Math.max(0, video.duration - 0.04);

        // Seek only when the target has moved by more than one 24fps frame.
        // This keeps the footage tied to page position in both scroll directions.
        if (!initialized) {
          video.currentTime = Math.min(targetTime + 0.02, Math.max(0, video.duration - 0.02));
          initialized = true;
        } else if (Math.abs(video.currentTime - targetTime) > 1 / 24) {
          video.currentTime = targetTime;
        }
      });
    };

    const onMetadata = () => syncToScroll();
    video.addEventListener("loadedmetadata", onMetadata);
    window.addEventListener("scroll", syncToScroll, { passive: true });
    window.addEventListener("resize", syncToScroll);
    syncToScroll();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", onMetadata);
      window.removeEventListener("scroll", syncToScroll);
      window.removeEventListener("resize", syncToScroll);
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
