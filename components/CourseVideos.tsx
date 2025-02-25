"use client";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import VideoThumbnail from "@/components/VideoThumbnail"

const VideoPlayer = ({ video, onEnd }) => {
  return (
    <div className="relative w-full max-w-4xl">
      <iframe
        className="w-full h-64 md:h-96 rounded-lg shadow-lg"
        src={`${video}?autoplay=1`}
        title="Active Video"
        allowFullScreen
        onEnded={onEnd}
      ></iframe>
    </div>
  );
};


const VideoCarousel = ({ videos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [countdown, setCountdown] = useState(null);

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
          className="px-4 py-3 bg-gray-300 rounded-lg hover:bg-deepGreen hover:text-white transition-all duration-300 ease-in-out"
          onClick={() => setActiveIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1))}
          >
          <FaChevronLeft />
        </button>
        <button
          className="px-4 py-3 bg-gray-300 rounded-lg hover:bg-deepGreen hover:text-white transition-all duration-300 ease-in-out"
          onClick={() => setActiveIndex((prev) => (prev + 1) % videos.length)}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
