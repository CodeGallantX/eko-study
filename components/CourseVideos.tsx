import { useState, useEffect } from "react"
import VideoPlayer  from "@/components/VideoPlayer"
import VideoThumbnail  from "@/components/VideoThumbnail"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"

interface VideoCarouselProps {
  videos: string[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setActiveIndex((prev) => (prev + 1) % videos.length);
        setCountdown(null);
      }
    }
  }, [countdown]);

  const handleVideoEnd = () => {
    setCountdown(4);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <VideoPlayer video={videos[activeIndex]} onEnd={handleVideoEnd} />
      {countdown !== null && (
        <p className="text-gray-600 mt-2">Next video in {countdown}s...</p>
      )}
      <div className="flex mt-4 space-x-2 overflow-x-auto">
        {videos.map((video, index) => (
          <VideoThumbnail
            key={index}
            video={video}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          className="px-4 py-3 text-white rounded-lg bg-deepGreen hover:bg-yellow hover:text-deepGreen transition-all duration-300 ease-in-out"
          onClick={() => setActiveIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1))}
        >
          <FaChevronLeft />
        </button>
        <button
          className="px-4 py-3 text-white rounded-lg bg-deepGreen hover:bg-yellow hover:text-deepGreen transition-all duration-300 ease-in-out"
          onClick={() => setActiveIndex((prev) => (prev + 1) % videos.length)}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel