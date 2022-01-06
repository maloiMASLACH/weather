import GetInfo from '../data/getInfo';

beforeAll(() => {

});

describe('Storage', () => {
  test('Correct info list', async () => {
    global.fetch = () => {
      return Promise.resolve({
        json: () => {
          return Promise.resolve({ location: {}, forecast: {}, current: {} });
        },
      });
    };
    const expected = await new GetInfo().townInfo('Minsk');
    const expectedList = await new GetInfo().showAllTownInfo('Minsk');
    expect(expected).toEqual({ location: {}, forecast: {}, current: {} });
    expect(expectedList).toEqual({ location: {}, forecast: {}, current: {} });
  });

  test('Correct towns list', async () => {
    global.fetch = () => {
      return Promise.resolve({
        json: () => {
          return Promise.resolve([{}]);
        },
      });
    };
    const expected = await new GetInfo().townsAPI('Minsk');
    const expectedList = await new GetInfo().townList('Minsk');
    expect(expected).toEqual([{}]);
    expect(expectedList).toEqual([{}]);
  });
});
