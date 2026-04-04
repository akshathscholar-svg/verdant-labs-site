import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'Live Prototype Dashboard - Verdant Labs',
  description:
    'Real-time monitoring of the Canopy AI prototype — live sensor data from soil moisture, light, temperature, and humidity.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
