import type { Metadata } from 'next';
import SensorDemoClient from './SensorDemoClient';

export const metadata: Metadata = {
  title: 'Interactive Sensor Demo - Verdant Labs',
  description:
    'Try the Canopy AI sensor simulator. Adjust light, moisture, temperature, and humidity to see real-time plant care recommendations.',
};

export default function SensorDemoPage() {
  return <SensorDemoClient />;
}
