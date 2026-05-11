import { parseImportedCollection } from '../collectionImport';

describe('parseImportedCollection', () => {
  it('imports native MyDebugTools collections with a stable name fallback', () => {
    const collection = parseImportedCollection({
      description: 'Exported without a name by mistake',
      requests: [
        {
          name: 'Health',
          method: 'GET',
          url: 'https://api.example.com/health',
          headers: [{ key: 'Accept', value: 'application/json', enabled: true }],
        },
      ],
    }, 'debug-tools.json');

    expect(collection.name).toBe('debug-tools');
    expect(collection.requests).toHaveLength(1);
    expect(collection.requests[0]).toMatchObject({
      name: 'Health',
      method: 'GET',
      url: 'https://api.example.com/health',
      contentType: 'application/json',
    });
  });

  it('imports nested Postman collection requests', () => {
    const collection = parseImportedCollection({
      info: {
        name: 'Shop API',
        description: { content: 'Checkout endpoints' },
      },
      item: [
        {
          name: 'Auth',
          item: [
            {
              name: 'Login',
              request: {
                method: 'POST',
                header: [{ key: 'Content-Type', value: 'application/json' }],
                url: { raw: 'https://api.example.com/login' },
                body: {
                  mode: 'raw',
                  raw: '{"email":"user@example.com"}',
                  options: { raw: { language: 'json' } },
                },
                auth: {
                  type: 'bearer',
                  bearer: [{ key: 'token', value: '{{token}}' }],
                },
              },
            },
          ],
        },
        {
          name: 'Products',
          request: {
            method: 'GET',
            url: {
              protocol: 'https',
              host: ['api', 'example', 'com'],
              path: ['products'],
              query: [{ key: 'limit', value: '10' }],
            },
          },
        },
      ],
    });

    expect(collection.name).toBe('Shop API');
    expect(collection.description).toBe('Checkout endpoints');
    expect(collection.requests).toHaveLength(2);
    expect(collection.requests[0]).toMatchObject({
      name: 'Login',
      method: 'POST',
      url: 'https://api.example.com/login',
      body: '{"email":"user@example.com"}',
      contentType: 'application/json',
      authConfig: { type: 'bearer', token: '{{token}}' },
    });
    expect(collection.requests[1]).toMatchObject({
      name: 'Products',
      method: 'GET',
      url: 'https://api.example.com/products?limit=10',
    });
  });

  it('rejects unsupported JSON instead of creating an undefined empty collection', () => {
    expect(() => parseImportedCollection({ openapi: '3.1.0', paths: {} }))
      .toThrow('Unsupported collection format');
  });
});
