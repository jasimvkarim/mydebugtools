'use client';
import {useState} from 'react';
import Link from 'next/link';
import {Search,ArrowRight,X} from 'lucide-react';
import {uniqueTools,matchesTool,toolTask} from './tools/lib/tool-discovery';
const starters=['/tools/json','/tools/api','/tools/code-diff','/tools/base64','/tools/stack-trace','/tools/prompt-generator'];
export default function Home(){
 const [query,setQuery]=useState('');
 const results=uniqueTools.filter(t=>query.trim()?matchesTool(t,query):starters.includes(t.path));
 return <div className="wb-welcome wb-discover"><p className="wb-eyebrow">DEBUGTOOLS</p><h1>What are you working on?</h1><p className="wb-intro">Small tools for code, data and debugging. Pick a task to get started.</p>
 <form className="wb-find" role="search" onSubmit={e=>e.preventDefault()}><Search size={20}/><input type="search" aria-label="Find a tool by name or task" placeholder="Try JSON, compare code or decode..." value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button type="button" aria-label="Clear search" onClick={()=>setQuery('')}><X size={18}/></button>}</form>
 <div className="wb-section-head"><h2>{query.trim()?'Matching tools':'Start with a task'}</h2><Link href="/tools/all">Browse all {uniqueTools.length} tools <ArrowRight size={14}/></Link></div>
 {query.trim()&&<p className="wb-result-count" role="status">{results.length} {results.length===1?'tool':'tools'} found</p>}
 <div className="wb-start">{results.map(t=>{const Icon=t.icon;const [title,description]=toolTask(t);return <Link href={t.path} key={t.path}><Icon className="wb-tool-icon"/><div><strong>{title}</strong><p>{description}</p><span className="wb-task-name">{t.name}</span></div><ArrowRight size={16}/></Link>})}</div>
 {!results.length&&<div className="wb-search-empty"><h2>No matching tools</h2><p>Try a shorter word such as JSON, compare, text or encode.</p><button onClick={()=>setQuery('')}>Show starting points</button><Link href="/tools/all">Browse all tools</Link></div>}
 <div className="wb-notes"><div><h2>No setup needed</h2><p>Open a tool and paste your input. Use the Tools button to switch tasks, or Ctrl / ⌘ K on a keyboard.</p></div><div><h2>Check before pasting secrets</h2><p>Local tools work in your browser. Network and AI tools may send input to a service. Check each tool before using private data.</p></div></div></div>;
}
