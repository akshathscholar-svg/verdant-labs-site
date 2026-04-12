import type { Metadata } from 'next';
import IdentifyClient from './IdentifyClient';

export const metadata: Metadata = {
  title: 'Camera Studio - Canopy AI | Verdant Labs',
  description:
    'Use your webcam or upload a photo — Canopy AI identifies the species, care requirements, grower details, and estimated cost.',
};

export default function IdentifyPage() {
  return <IdentifyClient />;
}
