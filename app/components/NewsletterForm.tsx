'use client';

import { useState, type FormEvent } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-green-50 p-4 text-center">
        <p className="text-sm font-medium text-green-800">
          ✓ You&apos;re subscribed! Watch your inbox for the next issue of the Verdant Journal.
        </p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 rounded-xl border border-[#E5DBCC] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#AAA598] focus:border-[#B78A2A]"
          required
        />
        <button
          type="submit"
          className="btn-ripple rounded-xl bg-[#B78A2A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#9D7620]"
        >
          Subscribe
        </button>
      </form>
      <p className="mt-3 text-xs text-[#AAA598]">
        Unsubscribe anytime. We respect your inbox.
      </p>
    </>
  );
}
