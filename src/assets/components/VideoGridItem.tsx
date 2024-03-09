import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../../utils/formatDuration";
import { formatTimeAgo } from "../../utils/formatTimeAgo";

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    name: string;
    id: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
    notation: "compact",
  });

export default function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current === null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }else{
        videoRef.current.pause();
    }
  }, [isVideoPlaying]);
  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          className={`block w-full h-full transition-[border-radius] object-cover ${isVideoPlaying ? "rounded-none" : "rounded-xl"}`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video className={`block h-full object-contain absolute inset-0 transition-opacity duration-200 ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"}`} src={videoUrl} ref={videoRef} muted playsInline></video>
      </a>

      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img src={channel.profileUrl} className="h-12 w-12 rounded-full" />
        </a>
        <div className="flex flex-col">
          <a href={`watch?v=${id}`} className="font-semibold">
            {title}
          </a>

          <a href={`/@${channel.id}`} className="text-sm text-secondary-text">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {`${VIEW_FORMATTER.format(views)} views • ${formatTimeAgo(
              postedAt
            )}`}
          </div>
        </div>
      </div>
    </div>
  );
}
