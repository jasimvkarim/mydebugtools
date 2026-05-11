import { toolMetadata } from '@/lib/tool-seo';

export const metadata = toolMetadata('color');

export default function ColorPickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
