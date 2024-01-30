// tests/apicall.test.js
const jest = require('jest')
jest.mock('node-fetch');
const fetch = require('node-fetch');

test('should return Brawl Stars player data', async () => {
  const playerTag = '#VUGVJYUY';

  const mockResponse = require('../testdata/brawlStarsResponse');
  fetch.mockResolvedValue({
    json: async () => mockResponse,
  });

  expect(mockResponse).toBeDefined();
  expect(mockResponse).toHaveProperty('name');
  expect(mockResponse).toHaveProperty('tag',playerTag)
  // Add more assertions based on the structure of your expected response

});
