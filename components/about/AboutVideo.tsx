// import { motion } from 'framer-motion';

export default function AboutVideo() {
  return (
    <section className="mb-20">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">See EkoStudy in Action</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          Watch our 2-minute overview to see how EkoStudy is transforming learning for LASUSTECH students.
        </p>

        <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <video
            src="/data/video/lasustech_video.mp4"
            controls
            className="w-full h-full object-cover"
            poster="/upcoming-bg.jpg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}