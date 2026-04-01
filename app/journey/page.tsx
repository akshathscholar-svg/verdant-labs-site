import type { Metadata } from 'next';
import JourneyClient from './JourneyClient';

export const metadata: Metadata = {
  title: 'Our Journey - Verdant Labs',
  description:
    'From a single wilting plant to building Canopy AI — the story behind Verdant Labs and our mission to make botanical intelligence accessible.',
};

export default function JourneyPage() {
  return <JourneyClient />;
}
