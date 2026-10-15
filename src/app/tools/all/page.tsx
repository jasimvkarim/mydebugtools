'use client';
import {useState} from 'react';
import Link from 'next/link';
import {Search,ArrowRight,X} from 'lucide-react';
import {toolPillars} from '../lib/tool-registry';
import {uniqueTools,matchesTool,toolTask} from '../lib/tool-discovery';
export default function AllToolsPage(){
 const [query,setQuery]=useState('');
 const results=uniqueTools.filter(t=>matchesTool(t,query));
 return <div className="wb-welcome wb-discover"><p className="wb-eyebrow">TOOL DIRECTORY</p><h1>Find the right tool.</h1><p className="wb-intro">Search by what you want to do, or browse by category.</p><form className="wb-find" role="search" onSubmit={e=>e.preventDefault()}><Search size={20}/><input type="search" aria-label="Search all tools" placeholder="Try format JSON, SQL or compare..." value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button type="button" aria-label="Clear search" onClick={()=>setQuery('')}><X size={18}/></button>}</form><p className="wb-result-count" role="status">{results.length} tools</p>
 {toolPillars.map(p=>{const tools=results.filter(t=>t.pillar===p.name);return tools.length>0&&<section className="wb-directory-group" key={p.name}><h2>{p.name}</h2><div className="wb-start">{tools.map(t=>{const Icon=t.icon;return <Link key={t.path} href={t.path}><Icon className="wb-tool-icon"/><div><strong>{t.name}</strong><p>{toolTask(t)[1]}</p></div><ArrowRight size={16}/></Link>})}</div></section>})}
 {!results.length&&<div className="wb-search-empty"><h2>No matching tools</h2><p>Try JSON, text, compare or encode.</p><button onClick={()=>setQuery('')}>Show all tools</button></div>}</div>;
}
