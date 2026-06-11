import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'Live Dashboard - Verdant Labs',
  description: 'Real-time Canopy AI sensor monitoring dashboard over Web Serial USB.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
