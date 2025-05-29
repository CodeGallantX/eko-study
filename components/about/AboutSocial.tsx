import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa6';

export default function AboutSocial() {
  return (
    <section className="mb-20 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Community</h2>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
        Connect with us on social media for updates, tips, and student success stories.
      </p>
      <div className="flex justify-center space-x-6">
        <a href="#" className="text-2xl text-green">
          <FaXTwitter />
        </a>
        <a href="#" className="text-2xl text-green">
          <FaFacebookF />
        </a>
        <a href="#" className="text-2xl text-green">
          <FaInstagram />
        </a>
        <a href="#" className="text-2xl text-green">
          <FaLinkedin />
        </a>
      </div>
    </section>
  );
}