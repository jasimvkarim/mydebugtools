import React from 'react';
import { toolMetadata } from '@/lib/tool-seo';

export const metadata = toolMetadata('database');

export default function DatabaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
