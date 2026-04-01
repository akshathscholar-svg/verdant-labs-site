import type { Metadata } from 'next';
import PlantsClient from './PlantsClient';

export const metadata: Metadata = {
  title: 'Plant Care Library - Verdant Labs',
  description:
    'Browse care profiles for popular houseplants. Learn about light, water, humidity, and temperature needs for your collection.',
};

export default function PlantsPage() {
  return <PlantsClient />;
}
