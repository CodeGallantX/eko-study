import { motion } from 'framer-motion';
import { features } from '../../data/about';

export default function AboutFeatures() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h6 className="text-lg font-semibold text-emerald-700 mb-2">Why Choose EkoStudy?</h6>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Features Designed for LASUSTECH Students</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow hover:border-emerald-700 group"
          >
            <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">{feature.title}</h3>
            <p className="text-gray-600 text-center">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}