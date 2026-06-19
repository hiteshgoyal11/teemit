import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
        <p>By accessing or using teemit, you agree to be bound by these Terms of Service.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. User Accounts</h2>
        <p>You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Prohibited Conduct</h2>
        <p>You agree not to use the service for any unlawful purposes or to conduct any activity that violates the rights of others.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Limitation of Liability</h2>
        <p>teemit is provided "as is". We are not liable for any damages arising from your use of the platform.</p>
      </section>

      <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
    </div>
  );
}