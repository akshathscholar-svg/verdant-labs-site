import type { Metadata } from 'next';
import { createClient } from '@/app/lib/supabase-server';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import AccountClient from './AccountClient';

export const metadata: Metadata = {
  title: 'Account - Verdant Labs',
  description: 'Manage your Verdant Labs account.',
};

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />
      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#B78A2A]">
              Account
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1F1F1B]">
              Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}
            </h1>
          </div>

          <AccountClient
            email={user?.email ?? ''}
            fullName={user?.user_metadata?.full_name ?? ''}
            createdAt={user?.created_at ?? ''}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
