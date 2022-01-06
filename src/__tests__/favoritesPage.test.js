import FavoritesPage from '../pages/favorites/favoritesPage';

describe('Favorites Page', () => {
  it('Page rendered', async () => {
    const expected = await new FavoritesPage().render();
    expect(expected.tagName).toBe('DIV');
    expect(expected.getAttribute('style')).toBe('height: 91vh;');
  });
  it('Blocks container', async () => {
    const expected = await new FavoritesPage().renderFavoritesBlock();
    expect(expected).toBeDefined();
  });
  it('Blocks container', async () => {
    const info = { current: { wind_mph: '11', wind_kph: '12', humidity: '13' } };
    const expected = await new FavoritesPage().renderShortInfoLine(info);
    expect(expected.children[1].textContent).toBe('Wind 12 km/h');
    expect(expected.children[3].textContent).toBe('Hum 13 %');
  });
  it('Blocks container', async () => {
    const info = { location: { name: 'Minsk', country: 'Belarus' }, current: { temp_f: '13', temp_c: '14' } };
    const expected = await new FavoritesPage().renderCommonInfoBlock(info);
    expect(expected.children[0].children[0].textContent).toBe('14');
    expect(expected.children[0].children[1].textContent).toBe('°C');
    expect(expected.children[1].children[0].textContent).toBe('Minsk');
    expect(expected.children[1].children[1].textContent).toBe('Belarus');
  });
  it('Town block render', async () => {
    global.fetch = () => {
      return Promise.resolve({
        json: () => {
          return Promise.resolve({ location: {}, forecast: {}, current: { condition: { text: 'ok' } } });
        },
      });
    };
    const expected = await new FavoritesPage().singleBlock('Minsk');
    expect(expected.children).toHaveLength(2);
    expect(expected.children[0].getAttribute('class')).toBe('favoritesFirstBlock');
    expect(expected.children[0].children[0].getAttribute('class')).toBe('singleFavoriteInfo');
    expect(expected.children[0].children[0].children[0].getAttribute('class')).toBe('temp');
  });
});
