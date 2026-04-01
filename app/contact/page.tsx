import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact - Verdant Labs',
  description:
    'Get in touch with the Verdant Labs team. Reach out for partnerships, press inquiries, support, or general questions.',
};

export default function ContactPage() {
  return <ContactClient />;
}
