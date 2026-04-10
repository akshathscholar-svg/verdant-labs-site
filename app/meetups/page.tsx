import { Metadata } from 'next';
import MeetupsClient from './MeetupsClient';

export const metadata: Metadata = {
  title: 'Meetups – Verdant Labs',
  description:
    'Connect with fellow plant owners in your area. Schedule meetups, share care tips, and grow together with the Verdant Labs community.',
};

export default function MeetupsPage() {
  return <MeetupsClient />;
}
