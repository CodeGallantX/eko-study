import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import Image from 'next/image';

export default function AboutMission() {
  return (
    <section className="mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Parallax speed={-5}>
          <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="LASUSTECH students using EkoStudy"
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
        </Parallax>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission: Revolutionizing LASUSTECH Education</h2>
          <div className="space-y-4 text-gray-700">
            <p>At EkoStudy, we&apos;re committed to transforming how LASUSTECH students learn, study, and succeed. Our mission is threefold:</p>
            <ul className="space-y-3 list-disc pl-5">
              <li><strong>Centralize academic resources</strong> - Bringing all essential study materials into one easily accessible platform</li>
              <li><strong>Enhance learning efficiency</strong> - Through AI-powered tools that personalize the study experience</li>
              <li><strong>Foster academic community</strong> - Creating spaces for collaboration and knowledge sharing across departments</li>
            </ul>
            <p>We believe every LASUSTECH student deserves equal access to quality learning resources, regardless of their department or level.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}