import type { Metadata } from 'next';
import AppPreviewClient from './AppPreviewClient';

export const metadata: Metadata = {
  title: 'App Preview - Canopy AI | Verdant Labs',
  description:
    'Preview the upcoming Canopy AI dashboard — smarter indoor plant care through real-time monitoring.',
};

export default function AppPreviewPage() {
  return <AppPreviewClient />;
}
