import type { Metadata } from 'next';
import SignUpForm from './SignUpForm';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Sign Up - Verdant Labs',
  description: 'Create your Verdant Labs account to access Canopy AI.',
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />
      <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#B78A2A]">
              Get Started
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1F1F1B]">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-[#5C584F]">
              Join Verdant Labs and start caring for your plants with intelligence.
            </p>
          </div>
          <SignUpForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
