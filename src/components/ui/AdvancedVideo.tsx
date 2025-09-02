import { SanityVideo } from "@/types";
import { getSanityFileUrl } from "@/lib/sanityUtils";

type AdvancedVideoProps = {
  video: SanityVideo;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  className?: string;
  preload?: "none" | "metadata" | "auto";
  onPlay?: () => void;
  onEnded?: () => void;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
};

export default function AdvancedVideo({
  video,
  autoPlay = false,
  controls = true,
  muted = false,
  preload = "metadata",
  onPlay,
  onEnded,
  onLoadStart,
  onCanPlay,
  className,
}: AdvancedVideoProps) {
  if (video.asset?._ref) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";
    const videoUrl = getSanityFileUrl(video.asset._ref, projectId, dataset);

    return (
      <video
        className={className}
        controls={controls}
        autoPlay={autoPlay}
        muted={autoPlay ? true : muted}
        playsInline
        loop
        preload={preload}
        onPlay={onPlay}
        onEnded={onEnded}
        onLoadStart={onLoadStart}
        onCanPlay={onCanPlay}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    );
  }

  return (
    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
      Video not available
    </div>
  );
}