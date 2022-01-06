import LocalStorage, { storageConstants } from '../data/localStorage';

describe('Local Storage', () => {
  it('Constants count', () => {
    const expected = Object.keys(storageConstants);
    expect(expected).toHaveLength(8);
  });
  it('Storage Request', async () => {
    await new LocalStorage().store(storageConstants.town, 'Minsk');
    const expected = await new LocalStorage().get(storageConstants.town);
    expect(expected).toBe('Minsk');
  });
});
