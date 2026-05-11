import { toolMetadata } from '@/lib/tool-seo';

export const metadata = toolMetadata('http-status');

export default function HttpStatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
