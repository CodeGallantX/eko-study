import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-deepGreen dark:text-green">Terms and Conditions</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">Effective Date: June 24, 2025</p>

      <section className="space-y-6 text-base leading-7">
        <p>
          Welcome to <strong>EkoStudy</strong>. These Terms and Conditions (“Terms”) govern your access to and use of the EkoStudy platform, including all associated services, features, and content provided through our website or mobile application (collectively, the “Service”).
        </p>
        <p>
          By creating an account or using EkoStudy, you agree to these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-10">1. Eligibility</h2>
        <p>You must be at least 16 years old or meet the minimum age required in your region.</p>

        <h2 className="text-2xl font-semibold mt-10">2. Account Registration</h2>
        <p>
          You may register via:
          <ul className="list-disc list-inside mt-2">
            <li>Email and Password (with OTP verification).</li>
            <li>Google Sign-In via OAuth 2.0.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold mt-10">3. Email Verification</h2>
        <p>Users signing up via email must verify their email through an OTP before accessing key features.</p>

        <h2 className="text-2xl font-semibold mt-10">4. Google Sign-In</h2>
        <p>
          When using Google Sign-In, we collect your name, email, and avatar. We do not store your password or access other personal data.
        </p>

        <h2 className="text-2xl font-semibold mt-10">5. User Responsibilities</h2>
        <ul className="list-disc list-inside">
          <li>Use your real identity.</li>
          <li>Don’t impersonate or misrepresent yourself.</li>
          <li>Don’t share harmful, abusive, or unlawful content.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10">6. Intellectual Property</h2>
        <p>
          All content and design elements on EkoStudy are the intellectual property of EkoStudy. Unauthorized use or redistribution is prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-10">7. Termination</h2>
        <p>
          We reserve the right to suspend or terminate accounts that violate these Terms or misuse the platform.
        </p>

        <h2 className="text-2xl font-semibold mt-10">8. Disclaimer</h2>
        <p>
          EkoStudy is provided “as is.” We do not guarantee platform uptime, content accuracy, or academic performance results.
        </p>

        <h2 className="text-2xl font-semibold mt-10">9. Limitation of Liability</h2>
        <p>
          We are not liable for any direct or indirect damages arising from your use of the platform.
        </p>

        <h2 className="text-2xl font-semibold mt-10">10. Changes to These Terms</h2>
        <p>
          We may update these Terms. You will be notified of major changes, and continued use of the platform signifies acceptance.
        </p>

        <h2 className="text-2xl font-semibold mt-10">11. Contact</h2>
        <p>
          For questions, reach out to us:
          <br />📧 <Link href="mailto:ekostudy.uni@gmail.com" className="text-green hover:underline">support@ekostudy.com</Link>
          <br />🌐 <Link href="/privacy" className="text-green hover:underline">Privacy Policy</Link>
        </p>
      </section>
    </div>
  );
}
