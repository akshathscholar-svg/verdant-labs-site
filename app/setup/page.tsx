import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUserDevice } from '@/app/actions/devices';
import { createClient } from '@/app/lib/supabase-server';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import SetupWizard from './SetupWizard';

export const metadata: Metadata = {
  title: 'Plant Setup - Verdant Labs',
  description: 'Set up your Canopy AI sensor with your plant.',
};

export default async function SetupPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?redirect=/setup');

  const device = await getUserDevice();
  if (!device) redirect('/account');
  if (device.setup_complete) redirect('/prototype-dashboard');

  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />
      <section className="px-6 py-12 md:px-10">
        <div className="mx-auto max-w-2xl">
          <SetupWizard deviceId={device.id} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
