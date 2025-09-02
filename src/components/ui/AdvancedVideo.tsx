import { SanityVideo } from "@/types";
import { getSanityFileUrl } from "@/lib/sanityUtils";

type AdvancedVideoProps = {
  video: SanityVideo;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  className?: string;
  onPlay?: () => void;
  onEnded?: () => void;
};

export default function AdvancedVideo({
  video,
  autoPlay = false,
  controls = true,
  muted = false,
  onPlay,
  onEnded,
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
        onPlay={onPlay}
        onEnded={onEnded}
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