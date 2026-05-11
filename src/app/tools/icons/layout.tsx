import { toolMetadata } from '@/lib/tool-seo';

export const metadata = toolMetadata('icons');

export default function IconFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
