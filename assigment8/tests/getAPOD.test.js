const axios = require('axios');
const getAPOD = require('../services/apodService');

jest.mock('axios');

describe('getAPOD', () => {
  it('should return APOD data when API call is successful', async () => {
    const mockData = {
      data: {
        title: 'Mock Title',
        explanation: 'Mock Explanation',
        date: '2024-05-01',
        url: 'https://example.com/image.jpg'
      }
    };
    
    axios.get.mockResolvedValue(mockData);
    
    const result = await getAPOD();

    expect(result).toEqual({
      title: 'Mock Title',
      explanation: 'Mock Explanation',
      date: '2024-05-01',
      imageUrl: 'https://example.com/image.jpg'
    });
  });

  it('should throw an error when the API call fails', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    await expect(getAPOD()).rejects.toThrow('API Error');
  });
});
