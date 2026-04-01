import type { Metadata } from 'next';
import HowItWorksClient from './HowItWorksClient';

export const metadata: Metadata = {
  title: 'How It Works - Verdant Labs',
  description:
    'See how Canopy AI turns real-time sensor data into actionable plant care recommendations in four simple steps.',
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
