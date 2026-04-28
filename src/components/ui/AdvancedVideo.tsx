"use client";

import MuxPlayer from "@mux/mux-player-react";

type AdvancedVideoProps = {
  muxPlaybackId: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  className?: string;
  onPlay?: () => void;
  onEnded?: () => void;
};

export default function AdvancedVideo({
  muxPlaybackId,
  autoPlay = false,
  controls = true,
  muted = false,
  className,
  onPlay,
  onEnded,
}: AdvancedVideoProps) {
  if (!muxPlaybackId) {
    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
        Video not available
      </div>
    );
  }

  return (
    <MuxPlayer
      playbackId={muxPlaybackId}
      autoPlay={autoPlay ? "muted" : false}
      muted={autoPlay || muted}
      loop
      playsInline
      className={className}
      onPlay={onPlay}
      onEnded={onEnded}
      style={{
        aspectRatio: "unset",
        width: "100%",
        height: "100%",
        ...(controls ? {} : { "--controls": "none" }),
      }}
    />
  );
}
