import type { Metadata } from 'next';
import DocsClient from './DocsClient';

export const metadata: Metadata = {
  title: 'Documentation - Verdant Labs',
  description:
    'Technical documentation for Canopy AI, sensor setup guides, API reference, and integration resources.',
};

export default function DocsPage() {
  return <DocsClient />;
}
