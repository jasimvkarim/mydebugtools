import {liveTools, type ToolModule} from './tool-registry';
export const uniqueTools = liveTools.filter((t,i,a)=>a.findIndex(x=>x.path===t.path)===i);
const tasks: Record<string,[string,string]> = {
 json:['Format or inspect JSON','Paste JSON to format it, find errors or explore its data.'],
 api:['Test an API request','Enter a URL, choose a method and inspect the response.'],
 'code-diff':['Compare two pieces of code','Paste the original and changed code to see what is different.'],
 base64:['Encode or decode Base64','Convert text, images or PDFs in your browser.'],
 'stack-trace':['Understand an error','Paste a stack trace to see the error and the frames involved.'],
 'prompt-generator':['Build a better prompt','Describe your task and shape a prompt you can copy.'],
 jwt:['Read a JWT token','Inspect token claims. Decoding does not verify a signature.'],
 'http-profiler':['Find slow network requests','Open a HAR export to inspect requests, failures and timing.'],
 url:['Encode or decode a URL','Work with URLs and query strings.'],
 hash:['Generate a file or text hash','Calculate a SHA hash locally.'],
 timestamp:['Convert a timestamp','Convert Unix timestamps, ISO dates and local times.'],
 regex:['Test a regular expression','Enter a pattern and text to see matching results.'],
 ai:['Get help debugging','Share an error or code with the debugging assistant.'],
 'crash-beautifier':['Read a crash report','Paste a crash report to make its stack trace easier to read.'],
 'log-trace':['Follow a request through logs','Group related log lines by their trace or request ID.'],
 'error-tracker':['Group repeated errors','Find repeated errors in a pasted log.'],
 'build-diff':['Compare build outputs','Check changes between two build outputs.'],
 'bundle-analyzer':['Inspect bundle size','Explore the size and contents of a bundle.'],
 'startup-profiling':['Inspect app startup','View a React Native startup timeline.'],
 html:['Edit and preview HTML','Write HTML and preview the result.'],
 css:['Format or minify CSS','Make CSS readable or reduce its size.'],
 markdown:['Preview Markdown','Write Markdown and see the rendered result.'],
 color:['Pick or convert a color','Work with color values for your UI.'],
 icons:['Find an icon','Search icon libraries for your UI.'],
 database:['Run a SQL query','Query SQLite data in your browser.'],
 uuid:['Generate UUIDs','Create UUID v4 identifiers, one or many.'],
 'http-status':['Look up an HTTP status','Find what a response code means.'],
};
export function toolTask(tool:ToolModule){return tasks[tool.path.split('/').pop()||'']||[tool.name,tool.description];}
export function matchesTool(tool:ToolModule,query:string){
 const hay=[tool.name,tool.description,...toolTask(tool), tool.path].join(' ').toLowerCase();
 const normalized=query.trim().toLowerCase();
 return [tool.category,tool.pillar].some(v=>v.toLowerCase()===normalized) || normalized.split(/\s+/).every(word=>hay.includes(word));
}
