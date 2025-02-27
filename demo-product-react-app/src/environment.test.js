describe('Test Environment', () => {
  it('should log the current test environment', () => {
    console.log('Test Environment:', typeof window === 'undefined' ? 'node' : 'jsdom');
    expect(true).toBe(true);
  });
});