const originalApiKey = process.env.OPENAI_API_KEY;

(global as any).Response = class {
  status: number;
  private body: string;

  constructor(body: string, init?: { status?: number }) {
    this.body = body;
    this.status = init?.status || 200;
  }

  async json() {
    return JSON.parse(this.body);
  }
};

const { POST } = require('./route') as typeof import('./route');

describe('/api/ai-debug', () => {
  afterEach(() => {
    process.env.OPENAI_API_KEY = originalApiKey;
  });

  it('returns a clear disabled response when OPENAI_API_KEY is missing', async () => {
    delete process.env.OPENAI_API_KEY;

    const response = await POST({
      json: async () => ({
        mode: 'explain-error',
        input: 'TypeError: fetch failed',
      }),
    } as Request);

    const body = await response.json();

    expect(response.status).toBe(501);
    expect(body).toEqual({
      error: 'AI Debug Assistant is not configured',
      message: 'Set OPENAI_API_KEY on the server to enable AI analysis.',
      disabled: true,
    });
  });
});
