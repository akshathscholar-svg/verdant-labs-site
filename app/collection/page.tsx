import type { Metadata } from 'next';
import CollectionClient from './CollectionClient';

export const metadata: Metadata = {
  title: 'Collection Dashboard Preview - Canopy AI | Verdant Labs',
  description:
    'Preview the Canopy AI multi-plant collection dashboard — manage, monitor, and track every plant in your collection from one intelligent interface.',
};

export default function CollectionPage() {
  return <CollectionClient />;
}
