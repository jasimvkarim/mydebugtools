import React from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Add custom render function if needed for providers
const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { ...options });

export * from '@testing-library/react';
export { customRender as render };

// Placeholder test to satisfy Jest requirement
describe('test-utils', () => {
  it('exports render function', () => {
    expect(customRender).toBeDefined();
  });
});
