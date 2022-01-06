import PageRender from '../templates/pageRender';

describe('Page Render', () => {
  it('Menu template has no own properties', async () => {
    global.fetch = () => {
      return Promise.resolve({
        json: () => {
          return Promise.resolve({ location: { localtime: '2022-01-07 0:56' }, forecast: { forecastday: [{ astro: { sunrise: '07:15 AM', sunset: '05:41 PM' } }] }, current: {} });
        },
      });
    };
    const expected = await new PageRender().renderNewPAge();
    expect(expected).toBeUndefined();
  });
});
