import type { Metadata } from 'next';
import LoginForm from './LoginForm';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Sign In - Verdant Labs',
  description: 'Sign in to your Verdant Labs account.',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />
      <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#B78A2A]">
              Welcome Back
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1F1F1B]">
              Sign in to your account
            </h1>
            <p className="mt-2 text-sm text-[#5C584F]">
              Access your plants, sensors, and insights.
            </p>
          </div>
          <LoginForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
