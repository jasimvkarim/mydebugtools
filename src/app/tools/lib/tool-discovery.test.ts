import {uniqueTools,matchesTool,toolTask} from './tool-discovery';
describe('tool discovery',()=>{
 it('lists each route once',()=>expect(new Set(uniqueTools.map(t=>t.path)).size).toBe(uniqueTools.length));
 it('finds a task without knowing the tool name',()=>expect(uniqueTools.filter(t=>matchesTool(t,'compare code')).map(t=>t.path)).toContain('/tools/code-diff'));
 it('does not confuse format JSON with the Formats category',()=>expect(uniqueTools.filter(t=>matchesTool(t,'format JSON')).map(t=>t.path)).toEqual(['/tools/json']));
 it('ignores case and surrounding space',()=>expect(uniqueTools.filter(t=>matchesTool(t,'  DECODE  ')).length).toBeGreaterThan(0));
 it('supports categories',()=>expect(uniqueTools.filter(t=>matchesTool(t,'Frontend')).length).toBeGreaterThan(0));
 it('has a plain task and description for every route',()=>uniqueTools.forEach(t=>{expect(toolTask(t)[0]).toBeTruthy();expect(toolTask(t)[1]).toBeTruthy()}));
});
