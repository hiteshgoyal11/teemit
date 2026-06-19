import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
        <p>When you use teemit, we collect basic information from your Google account such as your name, email address, and profile picture to create your account.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. How We Use Information</h2>
        <p>We use your information to provide our services, personalize your experience, and communicate with you about your team-building progress.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
        <p>Your data is stored securely using Supabase. We do not sell your personal information to third parties.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at: support@teemit.vercel.app</p>
      </section>
      
      <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
    </div>
  );
}