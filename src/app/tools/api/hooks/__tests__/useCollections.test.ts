import { addRequestToCollections, Collection, SavedRequest } from '../useCollections';

const baseCollection: Collection = {
  id: 'local-collection',
  name: 'Imported API',
  description: '',
  requests: [],
  createdAt: 1700000000000,
  updatedAt: 1700000000000,
};

const importedRequest: SavedRequest = {
  id: 'local-request',
  name: 'List users',
  method: 'GET',
  url: 'https://api.example.com/users',
  headers: [],
  body: '',
  contentType: 'application/json',
  authConfig: { type: 'none' },
  description: '',
  createdAt: 1700000000001,
  updatedAt: 1700000000001,
};

describe('addRequestToCollections', () => {
  it('adds imported requests to a collection from the latest state snapshot', () => {
    const result = addRequestToCollections([baseCollection], baseCollection.id, importedRequest);

    expect(result[0].requests).toHaveLength(1);
    expect(result[0].requests[0]).toMatchObject({
      name: 'List users',
      url: 'https://api.example.com/users',
    });
  });

  it('does not mutate the previous collection state', () => {
    const result = addRequestToCollections([baseCollection], baseCollection.id, importedRequest);

    expect(baseCollection.requests).toHaveLength(0);
    expect(result).not.toBe([baseCollection]);
  });
});

