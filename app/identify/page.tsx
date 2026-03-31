import type { Metadata } from 'next';
import IdentifyClient from './IdentifyClient';

export const metadata: Metadata = {
  title: 'Plant Identifier - Canopy AI | Verdant Labs',
  description:
    'Upload or capture a photo and let Canopy AI identify the plant species, care needs, and estimated cost.',
};

export default function IdentifyPage() {
  return <IdentifyClient />;
}
