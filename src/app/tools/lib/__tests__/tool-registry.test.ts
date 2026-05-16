import {
  getFeaturedTools,
  liveTools,
  proposedTools,
  toolPillars,
} from '../tool-registry';

describe('tool registry IA', () => {
  it('promotes a small flagship set before the full catalog', () => {
    expect(getFeaturedTools().map((tool) => tool.name)).toEqual([
      'API Tester',
      'JSON Tools',
      'Crash Beautifier',
      'AI Debug Assistant',
      'Code Diff',
    ]);
  });

  it('groups live tools into product workflow pillars', () => {
    const pillarNames = toolPillars.map((pillar) => pillar.name);

    expect(pillarNames).toEqual([
      'API & Network',
      'Inspect & Transform',
      'Debug Runtime Issues',
      'Frontend Workbench',
      'Utilities',
    ]);
    expect(liveTools.every((tool) => pillarNames.includes(tool.pillar))).toBe(true);
  });

  it('keeps proposed backlog modules separate from live tools', () => {
    const liveNames = new Set(liveTools.map((tool) => tool.name));

    expect(proposedTools.length).toBeGreaterThan(0);
    expect(proposedTools.some((tool) => liveNames.has(tool.name))).toBe(false);
  });
});
