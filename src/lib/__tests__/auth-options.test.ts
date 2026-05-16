import { authOptions } from '../auth-options';

const redirect = authOptions.callbacks?.redirect;

describe('authOptions redirect callback', () => {
  it('keeps relative callback URLs on the active deployment origin', async () => {
    await expect(
      redirect?.({
        url: '/tools/api',
        baseUrl: 'https://mydebugtools-one.vercel.app',
      })
    ).resolves.toBe('https://mydebugtools-one.vercel.app/tools/api');
  });

  it('allows the active deployment host as a callback URL', async () => {
    await expect(
      redirect?.({
        url: 'https://mydebugtools-one.vercel.app/tools/api/',
        baseUrl: 'https://mydebugtools-one.vercel.app',
      })
    ).resolves.toBe('https://mydebugtools-one.vercel.app/tools/api/');
  });

  it('normalizes www production callbacks to the canonical domain', async () => {
    await expect(
      redirect?.({
        url: 'https://www.debugtools.org/tools/api/',
        baseUrl: 'https://debugtools.org',
      })
    ).resolves.toBe('https://debugtools.org/tools/api/');
  });

  it('rejects external callback URLs', async () => {
    await expect(
      redirect?.({
        url: 'https://example.com/phish',
        baseUrl: 'https://mydebugtools-one.vercel.app',
      })
    ).resolves.toBe('https://mydebugtools-one.vercel.app');
  });
});

