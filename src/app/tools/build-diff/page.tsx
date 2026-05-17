'use client';

import React, { useState } from 'react';
import { 
  ArrowDownTrayIcon,
  ClipboardIcon,
  CheckIcon,
  ArrowsRightLeftIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import PageWrapper from '@/components/PageWrapper';
import StructuredData from '@/components/StructuredData';
import { buildDiffFromText, type DiffData } from '@/app/tools/lib/tool-utils';

function BuildDiffViewer() {
  const [oldBuild, setOldBuild] = useState('');
  const [newBuild, setNewBuild] = useState('');
  const [diffData, setDiffData] = useState<DiffData | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateDiff = (oldBuildInput = oldBuild, newBuildInput = newBuild) => {
    if (!oldBuildInput || !newBuildInput) {
      setDiffData(null);
      return;
    }

    setDiffData(buildDiffFromText(oldBuildInput, newBuildInput));
  };

  const handleCopy = () => {
    if (!diffData) return;
    const summary = `Build Diff Summary:
Added: ${(diffData.totalAdded / 1024).toFixed(2)} KB
Removed: ${(diffData.totalRemoved / 1024).toFixed(2)} KB
Modified: ${(diffData.totalModified / 1024).toFixed(2)} KB

Changes:
${diffData.changes.map(c => {
  if (c.type === 'added') return `+ ${c.path} (${(c.newSize! / 1024).toFixed(2)} KB)`;
  if (c.type === 'removed') return `- ${c.path} (${(c.oldSize! / 1024).toFixed(2)} KB)`;
  return `~ ${c.path} (${(c.diff! / 1024).toFixed(2)} KB)`;
}).join('\n')}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!diffData) return;
    const summary = `Build Diff Summary:
Added: ${(diffData.totalAdded / 1024).toFixed(2)} KB
Removed: ${(diffData.totalRemoved / 1024).toFixed(2)} KB
Modified: ${(diffData.totalModified / 1024).toFixed(2)} KB

Detailed Changes:
${diffData.changes.map(c => {
  if (c.type === 'added') return `+ ${c.path} (${(c.newSize! / 1024).toFixed(2)} KB)`;
  if (c.type === 'removed') return `- ${c.path} (${(c.oldSize! / 1024).toFixed(2)} KB)`;
  return `~ ${c.path} (${(c.diff! / 1024).toFixed(2)} KB)`;
}).join('\n')}`;

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'build-diff.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    const oldSample = `app.js 140 KB
vendor.js 420 KB
styles.css 24 KB`;
    const newSample = `app.js 156 KB
vendor.js 390 KB
styles.css 24 KB
analytics.js 18 KB`;
    setOldBuild(oldSample);
    setNewBuild(newSample);
    calculateDiff(oldSample, newSample);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <StructuredData
        title="Build Diff Viewer | debugtools"
        description="Compare and analyze build differences"
        toolType="WebApplication"
      />

      <div className="mb-4 flex flex-col justify-between gap-3 rounded-md border border-[#d0d7de] bg-white px-5 py-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#6e7781]">tools/build-diff</p>
          <h1 className="mt-2 text-[#24292f]">Build Diff Viewer</h1>
        </div>
        <button
          type="button"
          onClick={loadSample}
          className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa]"
        >
          Sample
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900">Old Build</h2>
              <p className="text-sm text-gray-600 mt-1">
                Paste your old build analysis here
              </p>
            </div>
            <textarea
              value={oldBuild}
              onChange={(e) => {
                const nextOldBuild = e.target.value;
                setOldBuild(nextOldBuild);
                calculateDiff(nextOldBuild, newBuild);
              }}
              placeholder="src/index.js 123.45 KB
src/components/App.js 45.67 KB
..."
              className="w-full h-[200px] font-mono text-sm p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900">New Build</h2>
              <p className="text-sm text-gray-600 mt-1">
                Paste your new build analysis here
              </p>
            </div>
            <textarea
              value={newBuild}
              onChange={(e) => {
                const nextNewBuild = e.target.value;
                setNewBuild(nextNewBuild);
                calculateDiff(oldBuild, nextNewBuild);
              }}
              placeholder="src/index.js 132.11 KB
src/components/App.js 41.20 KB
..."
              className="w-full h-[200px] font-mono text-sm p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Output Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Diff Results</h2>
            <div className="flex space-x-2">
              <button
                onClick={handleCopy}
                disabled={!diffData}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4 mr-1.5 text-green-500" />
                ) : (
                  <ClipboardIcon className="h-4 w-4 mr-1.5" />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                disabled={!diffData}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-1.5" />
                Download
              </button>
            </div>
          </div>

          {diffData ? (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">Added</div>
                  <div className="text-2xl font-bold text-green-900">
                    {(diffData.totalAdded / 1024).toFixed(2)} KB
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-sm text-red-600 font-medium">Removed</div>
                  <div className="text-2xl font-bold text-red-900">
                    {(diffData.totalRemoved / 1024).toFixed(2)} KB
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-sm text-yellow-600 font-medium">Modified</div>
                  <div className="text-2xl font-bold text-yellow-900">
                    {(diffData.totalModified / 1024).toFixed(2)} KB
                  </div>
                </div>
              </div>

              {/* Changes List */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Changes</h3>
                <div className="space-y-2">
                  {diffData.changes.map((change, index) => (
                    <div key={index} className="relative">
                      <div className="flex justify-between text-sm">
                        <span className={`font-medium ${
                          change.type === 'added' ? 'text-green-600' :
                          change.type === 'removed' ? 'text-red-600' :
                          'text-yellow-600'
                        }`}>
                          {change.type === 'added' ? '+' :
                           change.type === 'removed' ? '-' : '~'} {change.path}
                        </span>
                        <span className="text-gray-500">
                          {change.type === 'added' ? 
                            `+${(change.newSize! / 1024).toFixed(2)} KB` :
                           change.type === 'removed' ? 
                            `-${(change.oldSize! / 1024).toFixed(2)} KB` :
                            `${(change.diff! / 1024).toFixed(2)} KB`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[400px] flex items-center justify-center text-gray-500">
              <div className="text-center">
                <ArrowsRightLeftIcon className="h-12 w-12 mx-auto mb-4" />
                <p>Paste build analysis data to see differences</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-md border border-[#d0d7de] bg-white px-4 py-3 text-sm text-[#57606a]">
        Accepts one file per line, for example <code>app.js 156 KB</code>.
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <PageWrapper>
      <BuildDiffViewer />
    </PageWrapper>
  );
}
