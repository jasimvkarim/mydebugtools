'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ClipboardIcon, 
  ArrowDownTrayIcon, 
  FolderOpenIcon, 
  LinkIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ArrowsPointingInIcon,
  XMarkIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';

type JsonValue = any;

// Simple Minimal JSON Tree Component
interface JSONTreeNodeProps {
  data: any;
  name?: string;
  path?: string;
  level?: number;
  searchTerm?: string;
  onSelect?: (path: string, node: any) => void;
  expandAll?: boolean;
}

const JSONTreeNode: React.FC<JSONTreeNodeProps> = ({ 
  data, 
  name, 
  path = '', 
  level = 0, 
  searchTerm = '',
  onSelect,
  expandAll = false
}) => {
  const [isExpanded, setIsExpanded] = useState(expandAll || level === 0);
  const isExpandable = data !== null && typeof data === 'object';
  const isArray = Array.isArray(data);
  
  // Update expansion when expandAll prop changes
  useEffect(() => {
    if (expandAll !== undefined) {
      setIsExpanded(expandAll);
    }
  }, [expandAll]);
  
  const getValueColor = (value: any): string => {
    if (value === null) return '#999';
    if (typeof value === 'string') return '#059669';
    if (typeof value === 'number') return '#2563eb';
    if (typeof value === 'boolean') return '#7c3aed';
    return '#333';
  };

  const getValueDisplay = (value: any): string => {
    if (value === null) return 'null';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    return String(value);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleClick = () => {
    if (onSelect && path) {
      onSelect(path, data);
    }
  };

  // Check if this node matches search
  const matchesSearch = (obj: any, term: string): boolean => {
    if (!term) return true;
    const termLower = term.toLowerCase();
    
    const checkValue = (val: any): boolean => {
      if (val === null && 'null'.includes(termLower)) return true;
      if (typeof val === 'string' && val.toLowerCase().includes(termLower)) return true;
      if (typeof val === 'number' && val.toString().includes(termLower)) return true;
      if (typeof val === 'boolean' && val.toString().includes(termLower)) return true;
      
      if (typeof val === 'object' && val !== null) {
        if (Array.isArray(val)) {
          return val.some(checkValue);
        }
        return Object.entries(val).some(([k, v]) => 
          k.toLowerCase().includes(termLower) || checkValue(v)
        );
      }
      return false;
    };
    
    return checkValue(obj);
  };

  // Expand automatically if searching
  useEffect(() => {
    if (searchTerm && isExpandable) {
      setIsExpanded(true);
    }
  }, [searchTerm, isExpandable]);

  const shouldShow = !searchTerm || matchesSearch(data, searchTerm) || (name && name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!shouldShow) {
    return null;
  }

  // Highlight search matches
  const highlightMatch = (text: string, term: string) => {
    if (!term) return text;
    const index = text.toLowerCase().indexOf(term.toLowerCase());
    if (index === -1) return text;
    
    return (
      <>
        {text.substring(0, index)}
        <mark className="bg-yellow-200 text-gray-900 px-0.5 rounded">{text.substring(index, index + term.length)}</mark>
        {text.substring(index + term.length)}
      </>
    );
  };

  // Leaf node (primitive value)
  if (!isExpandable) {
    const nameMatches = searchTerm && name && name.toLowerCase().includes(searchTerm.toLowerCase());
    const valueStr = getValueDisplay(data);
    const valueMatches = searchTerm && valueStr.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      <div 
        className="flex items-center font-mono text-sm py-0.5 hover:bg-gray-50 cursor-pointer"
        onClick={handleClick}
      >
        <span className="w-4"></span>
        {name && (
          <>
            <span className="text-blue-600 font-medium mr-1">
              {nameMatches ? highlightMatch(name, searchTerm) : name}
            </span>
            <span className="text-gray-400 mr-1">:</span>
          </>
        )}
        <span style={{ color: getValueColor(data) }}>
          {valueMatches ? highlightMatch(valueStr, searchTerm) : valueStr}
        </span>
      </div>
    );
  }

  const entries = isArray 
    ? (data as any[]).map((item, index) => [index, item])
    : Object.entries(data);

  const nameMatches = searchTerm && name && name.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <div className="font-mono text-sm">
      <div 
        className="flex items-center py-0.5 hover:bg-gray-50 cursor-pointer"
        onClick={handleToggle}
      >
        {/* Simple Plus/Minus Button */}
        <button
          onClick={handleToggle}
          className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-700 mr-1.5 text-xs font-bold"
          title={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? '−' : '+'}
        </button>

        {/* Key Name */}
        {name && (
          <>
            <span className="text-blue-600 font-medium mr-1">
              {nameMatches ? highlightMatch(name, searchTerm) : name}
            </span>
            <span className="text-gray-400 mr-1">:</span>
          </>
        )}

        {/* Opening Bracket */}
        <span className="text-gray-600">{isArray ? '[' : '{'}</span>
        
        {/* Item count when collapsed */}
        {!isExpanded && entries.length > 0 && (
          <span className="text-gray-400 text-xs ml-1">
            {entries.length}
          </span>
        )}
        
        {/* Closing bracket when collapsed */}
        {!isExpanded && (
          <span className="text-gray-600 ml-1">{isArray ? ']' : '}'}</span>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <>
          <div className="ml-5 border-l border-gray-300 pl-2">
            {entries.length === 0 ? (
              <div className="text-gray-400 text-xs py-1">empty</div>
            ) : (
              entries.map(([key, value], index) => {
                const childPath = path ? `${path}.${key}` : String(key);
                return (
                  <JSONTreeNode
                    key={index}
                    data={value}
                    name={String(key)}
                    path={childPath}
                    level={level + 1}
                    searchTerm={searchTerm}
                    onSelect={onSelect}
                    expandAll={expandAll}
                  />
                );
              })
            )}
          </div>
          <div className="text-gray-600">{isArray ? ']' : '}'}</div>
        </>
      )}
    </div>
  );
};

export default function JSONTools() {
  const [jsonInput, setJsonInput] = useState<string>(`{
  "name": "debugtools",
  "version": "1.0.0",
  "description": "JSON Viewer Tool",
  "features": {
    "formatting": true,
    "validation": true,
    "search": true
  },
  "users": [
    {
      "id": 1,
      "name": "John Developer",
      "role": "Frontend Developer",
      "active": true
    },
    {
      "id": 2,
      "name": "Sarah Designer",
      "role": "UI/UX Designer",
      "active": true
    }
  ],
  "metadata": {
    "created": "2024-01-01",
    "environment": "production"
  }
}`);
  const [parsedJson, setParsedJson] = useState<JsonValue>({});
  const [treeCollapsed, setTreeCollapsed] = useState<number | boolean>(2);
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'tree' | 'text'>('text');
  const [isPretty, setIsPretty] = useState(true);
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [jsonStats, setJsonStats] = useState({ lines: 0, chars: 0, size: '0 B' });
  const [isValid, setIsValid] = useState(true);
  const [showStatsModal, setShowStatsModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const treeContainerRef = useRef<HTMLDivElement>(null);

  // Parse JSON input text to object
  const parseJsonInput = useCallback((input = jsonInput) => {
    try {
      const parsed = JSON.parse(input);
      setParsedJson(parsed);
      setError('');
      setIsValid(true);
      setTreeCollapsed(2);
      
      // Update stats
      const lines = input.split('\n').length;
      const chars = input.length;
      const size = new Blob([input]).size;
      const sizeStr = size < 1024 ? `${size} B` : 
                     size < 1024 * 1024 ? `${(size / 1024).toFixed(2)} KB` :
                     `${(size / (1024 * 1024)).toFixed(2)} MB`;
      setJsonStats({ lines, chars, size: sizeStr });
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
      setIsValid(false);
    }
  }, [jsonInput]);

  // Update jsonInput text when parsedJson changes (for tree edits)
  const updateJsonInputFromParsed = useCallback(
    (json: JsonValue) => {
      try {
        const text = isPretty ? JSON.stringify(json, null, 2) : JSON.stringify(json);
        setJsonInput(text);
        setParsedJson(json);
        setError('');
      } catch (e) {
        setError('Error updating JSON text: ' + (e as Error).message);
      }
    },
    [isPretty]
  );

  // On initial load parse the default JSON input
  useEffect(() => {
    parseJsonInput();
  }, [parseJsonInput]);

  // Auto-parse when switching to tree tab
  useEffect(() => {
    if (activeTab === 'tree') {
      parseJsonInput();
    }
  }, [activeTab, parseJsonInput]);

  // Copy text to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Download JSON file
  const handleDownload = () => {
    try {
      const blob = new Blob([jsonInput], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'json-data.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  };

  // Load file from input
  const handleFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setJsonInput(text);
      setActiveTab('text');
      parseJsonInput(text);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Load JSON from URL
  const handleLoadUrl = async () => {
    const url = urlInputRef.current?.value.trim();
    if (!url) return;
    setLoadingUrl(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const text = await res.text();
      setJsonInput(text);
      setActiveTab('text');
      parseJsonInput(text);
      urlInputRef.current!.value = '';
      setError('');
    } catch (e) {
      setError('Failed to load URL: ' + (e as Error).message);
    } finally {
      setLoadingUrl(false);
    }
  };

  // Expand or collapse all in tree view
  const toggleExpandCollapse = () => {
    setExpandAll(!expandAll);
    // Force re-render by toggling the state
    if (expandAll) {
      setTreeCollapsed(1); // Collapse to level 1
    } else {
      setTreeCollapsed(false); // Expand all levels
    }
  };

  // Handle edits in tree view
  const handleTreeEdit = (edit: any) => {
    if (!edit.updated_src) return;
    updateJsonInputFromParsed(edit.updated_src);
    // Update the right panel by updating parsed JSON
    setParsedJson(edit.updated_src);
  };

  // Pretty or minify toggle
  const togglePretty = () => {
    try {
      const obj = JSON.parse(jsonInput);
      if (isPretty) {
        // Minify
        setJsonInput(JSON.stringify(obj));
        setIsPretty(false);
      } else {
        // Pretty
        setJsonInput(JSON.stringify(obj, null, 2));
        setIsPretty(true);
      }
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
    }
  };

  // Format JSON (always prettify)
  const handleFormat = () => {
    try {
      const obj = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(obj, null, 2));
      setIsPretty(true);
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
    }
  };

  // Remove white space (minify)
  const handleRemoveWhiteSpace = () => {
    try {
      const obj = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(obj));
      setIsPretty(false);
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
    }
  };

  // Paste from clipboard
  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJsonInput(text);
      setActiveTab('text');
      parseJsonInput(text);
      try {
        const obj = JSON.parse(text);
        const formatted = JSON.stringify(obj, null, 2);
        setJsonInput(formatted);
        setIsPretty(true);
        parseJsonInput(formatted);
      } catch {
        // If invalid, just show the pasted text
      }
    } catch (e) {
      setError('Failed to paste from clipboard. Please paste manually.');
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + F for format
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        handleFormat();
      }
      // Ctrl/Cmd + M for minify
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        handleRemoveWhiteSpace();
      }
      // Ctrl/Cmd + V when not in textarea
      if ((e.ctrlKey || e.metaKey) && e.key === 'v' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handlePasteFromClipboard();
      }
      // Ctrl/Cmd + C for copy
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handleCopy(jsonInput);
      }
      // Ctrl/Cmd + E for expand/collapse all (in tree view)
      if ((e.ctrlKey || e.metaKey) && e.key === 'e' && activeTab === 'tree') {
        e.preventDefault();
        toggleExpandCollapse();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jsonInput, activeTab]);

  // Filter JSON for search term (keys and all values: strings, numbers, booleans, null)
  const filteredJson = (obj: any, term: string): any => {
    if (!term) return obj;
    const termLower = term.toLowerCase();

    const filterRecursive = (value: any): any => {
      // Check if the value itself matches
      if (value === null && 'null'.includes(termLower)) return value;
      if (typeof value === 'string' && value.toLowerCase().includes(termLower)) return value;
      if (typeof value === 'number' && value.toString().includes(termLower)) return value;
      if (typeof value === 'boolean' && value.toString().includes(termLower)) return value;
      
      // If not an object, return null (no match)
      if (typeof value !== 'object' || value === null) return null;

      if (Array.isArray(value)) {
        const filteredArr = value.map(filterRecursive).filter(v => v !== null);
        return filteredArr.length > 0 ? filteredArr : null;
      }

      const filteredObj: any = {};
      for (const key in value) {
        const keyMatch = key.toLowerCase().includes(termLower);
        const filteredValue = filterRecursive(value[key]);
        if (keyMatch) {
          // If key matches, include entire value
          filteredObj[key] = value[key];
        } else if (filteredValue !== null) {
          // If value matches, include it
          filteredObj[key] = filteredValue;
        }
      }
      return Object.keys(filteredObj).length > 0 ? filteredObj : null;
    };

    return filterRecursive(obj);
  };

  // Count search results
  const countSearchResults = (obj: any, term: string): number => {
    if (!term || !obj) return 0;
    const termLower = term.toLowerCase();
    let count = 0;

    const countRecursive = (value: any): void => {
      if (value === null && 'null'.includes(termLower)) {
        count++;
        return;
      }
      if (typeof value === 'string' && value.toLowerCase().includes(termLower)) {
        count++;
        return;
      }
      if (typeof value === 'number' && value.toString().includes(termLower)) {
        count++;
        return;
      }
      if (typeof value === 'boolean' && value.toString().includes(termLower)) {
        count++;
        return;
      }
      
      if (typeof value !== 'object' || value === null) return;

      if (Array.isArray(value)) {
        value.forEach(countRecursive);
      } else {
        for (const key in value) {
          if (key.toLowerCase().includes(termLower)) {
            count++;
          }
          countRecursive(value[key]);
        }
      }
    };

    countRecursive(obj);
    return count;
  };

  // Count expandable nodes (objects and arrays)
  const countExpandableNodes = (obj: any): number => {
    if (!obj || typeof obj !== 'object') return 0;
    let count = 0;

    const countRecursive = (value: any): void => {
      if (typeof value !== 'object' || value === null) return;
      
      count++; // This node itself is expandable
      
      if (Array.isArray(value)) {
        value.forEach(countRecursive);
      } else {
        Object.values(value).forEach(countRecursive);
      }
    };

    countRecursive(obj);
    return count;
  };

  // Highlight matching keys and values in react-json-view by overriding style
  // react-json-view does not support custom highlight natively, so we rely on filteredJson to reduce displayed nodes.

  // Sample JSON for demo
  const handleSample = () => {
    const sample = {
      name: "debugtools JSON Example",
      version: "2.0.0",
      features: { formatting: true, validation: true, minification: true },
      users: [
        { id: 1, name: "John Developer", role: "Frontend Developer", active: true, skills: ["React", "TypeScript", "JSON"] },
        { id: 2, name: "Sarah Designer", role: "UI/UX Designer", active: true, skills: ["Figma", "CSS", "Design Systems"] }
      ],
      metadata: { created: "2024-01-01T00:00:00Z", lastModified: new Date().toISOString(), environment: "production" }
    };
    const text = JSON.stringify(sample, null, 2);
    setJsonInput(text);
    setActiveTab('text');
    parseJsonInput(text);
  };

  // Reset all
  const handleReset = () => {
    setJsonInput('{}');
    setParsedJson({});
    setError('');
    setSearchTerm('');
    setActiveTab('tree');
    setTreeCollapsed(2);
  };

  // Handle paste in tree view area
  const handlePasteInTree = async (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    if (text) {
      setJsonInput(text);
      parseJsonInput(text);
    }
  };

  // Extract immediate keys and values for right panel
  const extractImmediateProperties = (obj: any): Array<[string, any]> => {
    if (obj === null || obj === undefined) return [];
    if (typeof obj !== 'object') return [];
    
    if (Array.isArray(obj)) {
      return obj.map((item, index) => [String(index), item]);
    }
    
    return Object.entries(obj);
  };

  // Extract keys and values for side panel
  const extractKeysAndValues = (obj: any, prefix = '', showOnlyImmediate = false): Array<{ path: string; value: any; type: string }> => {
    const result: Array<{ path: string; value: any; type: string }> = [];
    
    if (obj === null || obj === undefined) {
      result.push({ path: prefix || '(null)', value: obj, type: 'null' });
      return result;
    }

    const type = Array.isArray(obj) ? 'array' : typeof obj;

    // If we only want immediate children and this is an object/array
    if (showOnlyImmediate && (type === 'object' || type === 'array')) {
      if (type === 'array') {
        obj.forEach((item: any, index: number) => {
          if (item === null || item === undefined) {
            result.push({ 
              path: `[${index}]`, 
              value: item, 
              type: 'null' 
            });
          } else {
            const itemType = Array.isArray(item) ? 'array' : typeof item;
            const displayValue = itemType === 'object' && item !== null ? `Object(${Object.keys(item).length})` :
                                itemType === 'array' ? `Array(${item.length})` : item;
            result.push({ 
              path: `[${index}]`, 
              value: displayValue, 
              type: itemType 
            });
          }
        });
      } else {
        Object.keys(obj).forEach(key => {
          const value = obj[key];
          if (value === null || value === undefined) {
            result.push({ 
              path: key, 
              value: value, 
              type: 'null' 
            });
          } else {
            const itemType = Array.isArray(value) ? 'array' : typeof value;
            const displayValue = itemType === 'object' && value !== null ? `Object(${Object.keys(value).length})` :
                                itemType === 'array' ? `Array(${value.length})` : value;
            result.push({ 
              path: key, 
              value: displayValue, 
              type: itemType 
            });
          }
        });
      }
      return result;
    }

    // Original recursive behavior for full tree
    const traverse = (current: any, currentPath: string) => {
      if (current === null || current === undefined) {
        result.push({ path: currentPath, value: current, type: 'null' });
        return;
      }

      const type = Array.isArray(current) ? 'array' : typeof current;

      if (type === 'object' || type === 'array') {
        if (type === 'array') {
          result.push({ path: currentPath, value: `Array(${current.length})`, type: 'array' });
          current.forEach((item: any, index: number) => {
            traverse(item, `${currentPath}[${index}]`);
          });
        } else {
          const keys = Object.keys(current);
          result.push({ path: currentPath, value: `Object(${keys.length})`, type: 'object' });
          keys.forEach(key => {
            traverse(current[key], currentPath ? `${currentPath}.${key}` : key);
          });
        }
      } else {
        result.push({ path: currentPath, value: current, type });
      }
    };

    traverse(obj, prefix);
    return result;
  };

  // Handle clicking on a key-value item to navigate and show in right panel
  const handleSelectPath = (path: string) => {
    if (!path || path === '(root)') {
      setSelectedNode(null);
      setSelectedPath('');
      setSearchTerm('');
      return;
    }

    // Navigate to the node using the path
    let node = parsedJson;
    const pathParts = path.split(/\.|\[|\]/).filter(p => p !== '');
    
    for (const part of pathParts) {
      if (node && typeof node === 'object') {
        node = node[part];
      } else {
        break;
      }
    }
    
    // Ensure path ends with a dot
    const finalPath = path.endsWith('.') ? path : `${path}.`;
    
    setSelectedNode(node);
    setSelectedPath(finalPath);
    setSearchTerm('');
    
    if (activeTab !== 'tree') {
      setActiveTab('tree');
    }
  };

  // Handle selecting a node in the tree view
  const handleTreeSelect = (select: any) => {
    if (!select) {
      // No selection, show root
      setSelectedNode(null);
      setSelectedPath('');
      return;
    }

    // Build the full path and navigate to the node
    let fullPath = '';
    let node = parsedJson;
    
    // First navigate through namespace (parent path)
    if (select.namespace && select.namespace.length > 0) {
      for (let i = 0; i < select.namespace.length; i++) {
        const key = select.namespace[i];
        if (node && typeof node === 'object') {
          node = node[key];
          // Build path
          if (!isNaN(Number(key))) {
            fullPath += `[${key}]`;
          } else {
            // Add dot before property name if needed
            if (fullPath && !fullPath.endsWith('.')) {
              fullPath += '.';
            }
            fullPath += key;
          }
        }
      }
    }
    
    // Then add the selected name itself
    if (select.name !== null && select.name !== undefined) {
      // Build final path
      if (!isNaN(Number(select.name))) {
        fullPath += `[${select.name}]`;
      } else {
        // Add dot before property name if needed
        if (fullPath && !fullPath.endsWith('.')) {
          fullPath += '.';
        }
        fullPath += select.name;
      }
      
      // Navigate to the actual node
      if (node && typeof node === 'object') {
        node = node[select.name];
      }
    }

    // Set the selected node and path
    setSelectedNode(node);
    setSelectedPath(fullPath || 'root');
  };

  // Note: Custom click handler removed - using react-json-view's onSelect instead

  return (
    <div className="mx-auto max-w-[1600px] text-[#24292f]">
      <section className="rounded-md border border-[#d0d7de] bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-[#d0d7de] px-5 py-4 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#6e7781]">
              tools/json
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-[#24292f]">JSON Tools</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button title="Load sample JSON" onClick={handleSample} className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa]">
              Sample
            </button>
            <button onClick={() => setShowStatsModal(true)} className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-sm font-semibold text-[#24292f] hover:bg-[#f6f8fa]">
              Stats
            </button>
            <button onClick={handleDownload} className="inline-flex items-center gap-2 rounded-md bg-[#24292f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#32383f]">
              <ArrowDownTrayIcon className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>

        <div className="grid gap-3 border-b border-[#d0d7de] bg-[#f6f8fa] px-4 py-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex overflow-hidden rounded-md border border-[#d0d7de] bg-white">
              {(['text', 'tree'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-sm font-semibold capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-[#24292f] text-white'
                      : 'text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]'
                  }`}
                  role="tab"
                >
                  {tab}
                </button>
              ))}
            </div>
            <button onClick={handlePasteFromClipboard} className="inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-sm font-semibold text-[#57606a] hover:bg-white hover:text-[#24292f]">
              <ClipboardDocumentListIcon className="h-4 w-4" />
              Paste
            </button>
            <button onClick={() => handleCopy(jsonInput)} className="inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-sm font-semibold text-[#57606a] hover:bg-white hover:text-[#24292f]">
              <ClipboardIcon className="h-4 w-4" />
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button onClick={handleFormat} className="inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-sm font-semibold text-[#57606a] hover:bg-white hover:text-[#24292f]">
              <DocumentTextIcon className="h-4 w-4" />
              Format
            </button>
            <button onClick={handleRemoveWhiteSpace} className="inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-sm font-semibold text-[#57606a] hover:bg-white hover:text-[#24292f]">
              <ArrowsPointingInIcon className="h-4 w-4" />
              Minify
            </button>
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-sm font-semibold text-[#57606a] hover:bg-white hover:text-[#24292f]">
              <ArrowUpTrayIcon className="h-4 w-4" />
              Load
              <input type="file" ref={fileInputRef} className="hidden" accept=".json,.txt" onChange={handleFileLoad} />
            </label>
            <button title="Clear input" onClick={handleReset} className="inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-sm font-semibold text-[#57606a] hover:bg-white hover:text-[#24292f]">
              <XMarkIcon className="h-4 w-4" />
              Clear
            </button>
          </div>

          <div className="flex gap-2">
            <input
              ref={urlInputRef}
              type="url"
              placeholder="Load from URL"
              className="h-9 min-w-0 flex-1 rounded-md border border-[#d0d7de] bg-white px-3 text-sm text-[#24292f] outline-none focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da]/15 lg:w-72"
            />
            <button onClick={handleLoadUrl} disabled={loadingUrl} className="inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-sm font-semibold text-[#57606a] hover:bg-white hover:text-[#24292f] disabled:opacity-60">
              <LinkIcon className="h-4 w-4" />
              {loadingUrl ? 'Loading' : 'Load'}
            </button>
          </div>
        </div>

        {activeTab === 'text' && (
          <textarea
            data-testid="monaco-editor"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="h-[640px] w-full resize-y border-0 bg-white p-4 font-mono text-sm leading-6 text-[#24292f] outline-none focus:ring-2 focus:ring-[#0969da]/15"
            placeholder="Paste JSON..."
            spellCheck={false}
            style={{ tabSize: 2 }}
          />
        )}

        {activeTab === 'tree' && parsedJson && (
          <div>
            <div className="grid gap-2 border-b border-[#d0d7de] bg-white px-4 py-3 lg:grid-cols-[1fr_auto]">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search keys and values"
                  className="h-9 w-full rounded-md border border-[#d0d7de] bg-white pl-9 pr-9 text-sm outline-none focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da]/15"
                />
                <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7781]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded text-[#6e7781] hover:bg-[#f6f8fa]" title="Clear search">
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {searchTerm && (
                  <span className="font-mono text-xs text-[#6e7781]">
                    {countSearchResults(parsedJson, searchTerm)} matches
                  </span>
                )}
                <button onClick={toggleExpandCollapse} className="inline-flex items-center gap-1.5 rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-sm font-semibold text-[#57606a] hover:bg-[#f6f8fa] hover:text-[#24292f]">
                  {expandAll ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                  {expandAll ? 'Collapse' : 'Expand'}
                </button>
              </div>
            </div>

            <div className="grid min-h-[640px] bg-white lg:grid-cols-[minmax(0,1fr)_320px]">
              <div
                ref={treeContainerRef}
                className="overflow-auto border-b border-[#d0d7de] p-4 lg:border-b-0 lg:border-r json-tree-container"
                onPaste={handlePasteInTree}
                tabIndex={0}
              >
              {error ? (
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <p className="font-semibold text-sm text-red-700 mb-1">Error</p>
                  <p className="text-xs text-red-600 font-mono">{error}</p>
                </div>
              ) : (
                <JSONTreeNode 
                  data={filteredJson(parsedJson, searchTerm) || {}}
                  searchTerm={searchTerm}
                  expandAll={expandAll}
                  onSelect={(path, node) => {
                    setSelectedPath(path);
                    setSelectedNode(node);
                  }}
                />
              )}
            </div>

            {/* Right Panel - Minimalistic Details (Always Visible) */}
            <div className="bg-[#f6f8fa] overflow-auto">
              {/* Simple Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-3 z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700">Details</h3>
                  {selectedNode !== null && (
                    <button
                      onClick={() => {
                        setSelectedNode(null);
                        setSelectedPath('');
                      }}
                      className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"
                      title="Clear"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-3 space-y-3">
                {selectedNode !== null ? (
                  <>
                    {/* Path */}
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Path</label>
                      <div className="p-2 bg-white border border-gray-200 rounded font-mono text-xs text-gray-700 break-all">
                        {selectedPath || 'root'}
                      </div>
                    </div>

                    {/* Type */}
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Type</label>
                      <div className="flex gap-2 items-center">
                        <span className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700">
                          {Array.isArray(selectedNode) 
                            ? 'Array' 
                            : typeof selectedNode === 'object' && selectedNode !== null
                            ? 'Object'
                            : typeof selectedNode === 'string'
                            ? 'String'
                            : typeof selectedNode === 'number'
                            ? 'Number'
                            : typeof selectedNode === 'boolean'
                            ? 'Boolean'
                            : 'Null'}
                        </span>
                        
                        {(typeof selectedNode === 'object' && selectedNode !== null) && (
                          <span className="text-xs text-gray-500">
                            {Object.keys(selectedNode).length} {Array.isArray(selectedNode) ? 'items' : 'props'}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Properties */}
                    {(typeof selectedNode === 'object' && selectedNode !== null) && (
                      <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">
                          Properties
                        </label>
                        <div className="bg-white border border-gray-200 rounded overflow-hidden">
                          <div className="max-h-80 overflow-y-auto">
                            <table className="w-full text-xs">
                              <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                                <tr>
                                  <th className="text-left p-2 font-medium text-gray-600">Key</th>
                                  <th className="text-left p-2 font-medium text-gray-600">Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {extractImmediateProperties(selectedNode).length === 0 ? (
                                  <tr>
                                    <td colSpan={2} className="p-3 text-center text-gray-400 text-xs">
                                      Empty
                                    </td>
                                  </tr>
                                ) : (
                                  extractImmediateProperties(selectedNode).map(([key, value], index) => (
                                    <tr 
                                      key={index} 
                                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                                      onClick={() => {
                                        const basePath = selectedPath.endsWith('.') ? selectedPath.slice(0, -1) : selectedPath;
                                        const newPath = basePath ? `${basePath}.${key}` : key;
                                        handleSelectPath(newPath);
                                      }}
                                    >
                                      <td className="p-2 font-medium text-gray-700">{key}</td>
                                      <td className="p-2 text-gray-600 font-mono truncate max-w-[120px]" title={String(value)}>
                                        {typeof value === 'object' && value !== null 
                                          ? Array.isArray(value) 
                                            ? `[${value.length}]`
                                            : `{${Object.keys(value).length}}`
                                          : String(value)}
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Value for Primitives */}
                    {!(typeof selectedNode === 'object' && selectedNode !== null) && (
                      <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Value</label>
                        <div className="p-2 bg-white border border-gray-200 rounded font-mono text-xs text-gray-700 break-all">
                          {String(selectedNode)}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm text-gray-500">Select a node</p>
                    <p className="text-xs text-gray-400 mt-1">to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      </section>

      {error && (
        <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3">
          <p className="text-red-700 font-semibold text-sm">Error</p>
          <p className="text-red-600 text-xs mt-1">{error}</p>
        </div>
      )}

      {/* Statistics Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowStatsModal(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                JSON Statistics
              </h3>
              <button
                onClick={() => setShowStatsModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* General Stats */}
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                  <span className="text-sm font-medium text-gray-700">Lines</span>
                  <span className="text-lg font-bold text-blue-600">{jsonStats.lines}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded border-l-4 border-green-500">
                  <span className="text-sm font-medium text-gray-700">Characters</span>
                  <span className="text-lg font-bold text-green-600">{jsonStats.chars.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded border-l-4 border-purple-500">
                  <span className="text-sm font-medium text-gray-700">File Size</span>
                  <span className="text-lg font-bold text-purple-600">{jsonStats.size}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded border-l-4 border-orange-500">
                  <span className="text-sm font-medium text-gray-700">Status</span>
                  <span className={`text-sm font-bold ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {isValid ? '✓ Valid JSON' : '✗ Invalid JSON'}
                  </span>
                </div>
              </div>

              {/* Object Stats */}
              {isValid && parsedJson && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Structure Analysis</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded text-center">
                      <div className="text-2xl font-bold text-gray-700">
                        {Object.keys(parsedJson).length}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Root Keys</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded text-center">
                      <div className="text-2xl font-bold text-gray-700">
                        {JSON.stringify(parsedJson).split(':').length - 1}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Total Keys</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowStatsModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
