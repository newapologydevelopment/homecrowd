"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useRef } from "react";

type AdvancedVideoProps = {
  muxPlaybackId: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  preload?: "none" | "metadata" | "auto";
  objectFit?: "cover" | "contain";
  className?: string;
  onPlay?: () => void;
  onEnded?: () => void;
};

export default function AdvancedVideo({
  muxPlaybackId,
  autoPlay = false,
  controls = true,
  muted = false,
  preload = "none",
  objectFit = "cover",
  className,
  onPlay,
  onEnded,
}: AdvancedVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const player = ref.current;
    if (!player) return;
    if (autoPlay) {
      player.play().catch(() => {});
    } else {
      player.pause();
    }
  }, [autoPlay]);

  if (!muxPlaybackId) {
    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
        Video not available
      </div>
    );
  }

  return (
    <MuxPlayer
      ref={ref as never}
      playbackId={muxPlaybackId}
      autoPlay={autoPlay ? (muted ? "muted" : "any") : false}
      muted={muted}
      preload={preload}
      loop
      playsInline
      className={className}
      onPlay={onPlay}
      onEnded={onEnded}
      style={{
        aspectRatio: "unset",
        width: "100%",
        height: "100%",
        "--media-object-fit": objectFit,
        "--media-object-position": "center",
        ...(controls ? {} : { "--controls": "none" }),
      } as never}
    />
  );
}
