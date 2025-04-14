interface VideoPlayerProps {
    video: string;
    onEnd: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onEnd }) => {
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

export default VideoPlayer