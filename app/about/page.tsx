import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About - Verdant Labs',
  description:
    'Learn about Verdant Labs — our mission to make botanical intelligence accessible, our team, and our vision for the future of plant care.',
};

export default function AboutPage() {
  return <AboutClient />;
}
