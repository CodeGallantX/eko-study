import Link from 'next/link';

const PrivacyPage = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-deepGreen dark:text-green">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: June 24, 2025</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to EkoStudy. Your privacy is important to us. This Privacy Policy explains how we collect,
          use, and protect your personal data when you use our platform, including when you sign in with
          Google.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
        <p className="mb-2 font-medium">a. Information You Provide</p>
        <ul className="list-disc pl-5 mb-4">
          <li>Full name</li>
          <li>Email address</li>
          <li>Password (if using email sign-in)</li>
          <li>College and Department</li>
        </ul>
        <p className="mb-2 font-medium">b. Information from Google Sign-In</p>
        <ul className="list-disc pl-5">
          <li>Google name</li>
          <li>Google email</li>
          <li>Profile picture (avatar)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
        <ul className="list-disc pl-5">
          <li>To create and manage your EkoStudy account</li>
          <li>To personalize your dashboard and study content</li>
          <li>To authenticate your identity and ensure account security</li>
          <li>To improve our platform functionality and support</li>
        </ul>
        <p className="mt-2">We do <strong>not</strong> sell or rent your data to any third party.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Data Sharing and Disclosure</h2>
        <p>
          We only share data with trusted third-party services (like Supabase and email providers) to help us run
          EkoStudy. These partners follow strict confidentiality standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Cookies and Analytics</h2>
        <p>
          We may use cookies and analytics tools to understand how users interact with our platform and to
          enhance performance. These tools do not collect personally identifiable information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">6. Data Security</h2>
        <p>
          We use secure, encrypted channels for all data transfer and store sensitive information using industry
          best practices. Authentication and user data are managed securely via Supabase and Google.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">7. Your Rights</h2>
        <ul className="list-disc pl-5">
          <li>You can access, update, or delete your profile anytime</li>
          <li>You can opt-out of our emails or delete your account permanently</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">8. Third-Party Links</h2>
        <p>
          Our site may link to external websites. We are not responsible for their privacy practices. Please review
          their policies separately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. If we make major changes, we’ll notify you via email
          or on the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
        <p>
          For any questions about this Privacy Policy, you can email us at:{' '}
          <Link href="mailto:ekostudy.uni@gmail.com" className="text-green hover:underline">
            support@ekostudy.com
          </Link>
        </p>
      </section>
    </main>
  );
};

export default PrivacyPage;
