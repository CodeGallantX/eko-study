interface VideoThumbnailProps {
  video: string;
  isActive: boolean;
  onClick: () => void;
}

const getYouTubeVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|embed\/|v\/))([\w-]{11})/);
  return match ? match[1] : null;
};

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ video, isActive, onClick }) => {
  const videoId = getYouTubeVideoId(video);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : "";

  return (
    <div
      className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-transform transform ${
        isActive ? "border-green-500 scale-110" : "border-gray-300"
      }`}
      onClick={onClick}
    >
      {videoId ? (
        <img
          src={thumbnailUrl}
          alt="Video Thumbnail"
          className="w-full h-20 object-cover"
        />
      ) : (
        <p className="p-4 text-red-700 text-sm font-normal text-center">Video not available yet...</p>
      )}
    </div>
  );
};

export default VideoThumbnail;