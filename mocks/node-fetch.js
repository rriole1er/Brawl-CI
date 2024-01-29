const { Response } = jest.requireActual('node-fetch');

const mockFetch = jest.fn();

module.exports = mockFetch;

mockFetch.mockResolvedValue({
  json: async () => require('../testdata/brawlStarsResponse'),
});

