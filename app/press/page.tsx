import type { Metadata } from 'next';
import PressClient from './PressClient';

export const metadata: Metadata = {
  title: 'Press & Media Kit - Verdant Labs',
  description:
    'Verdant Labs brand assets, logos, color palette, boilerplate, and key facts for press and media.',
};

export default function PressPage() {
  return <PressClient />;
}
