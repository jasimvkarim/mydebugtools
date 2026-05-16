import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | debugtools',
  description: 'Contact debugtools for support, feedback, or questions about our developer tools.',
  robots: 'index, follow',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}