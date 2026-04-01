import type { Metadata } from 'next';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: 'FAQ - Verdant Labs',
  description:
    'Frequently asked questions about Canopy AI, Verdant Labs sensors, pricing, shipping, and plant compatibility.',
};

export default function FaqPage() {
  return <FaqClient />;
}
