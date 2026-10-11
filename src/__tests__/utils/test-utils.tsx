import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  session?: any;
}

const AllTheProviders: React.FC<{
  children: React.ReactNode;
  session?: any;
}> = ({ children, session = null }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: CustomRenderOptions
) => {
  const { session, ...renderOptions } = options || {};
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders session={session}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { customRender as render };

// Add a dummy test to satisfy Jest
describe('test-utils', () => {
  it('exports render function', () => {
    expect(customRender).toBeDefined();
  });
});
