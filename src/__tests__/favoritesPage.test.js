import FavoritesPage from '../pages/favorites/favoritesPage';

describe('Favorites Page', () => {
  it('Page rendered', () => {
    const expected = new FavoritesPage().render().children[0].getAttribute('class');
    expect(expected).toBe('content');
  });
  it('Blocks conteiner', () => {
    const expected = new FavoritesPage().favoritesBlock();
    expect(expected).toBeDefined();
  });
  it('Blocks conteiner', () => {
    const info = { current: { wind_mph: '11', wind_kph: '12', humidity: '13' } };
    const expected = new FavoritesPage().shortInfoLine(info);
    expect(expected.children[1].textContent).toBe('Wind 12 km/h');
    expect(expected.children[3].textContent).toBe('Hum 13 %');
  });
  it('Blocks conteiner', () => {
    const info = { location: { name: 'Minsk', country: 'Belarus' }, current: { temp_f: '13', temp_c: '14' } };
    const expected = new FavoritesPage().commonBlock(info);
    expect(expected.children[0].children[0].textContent).toBe('14');
    expect(expected.children[0].children[1].textContent).toBe('°C');
    expect(expected.children[1].children[0].textContent).toBe('Minsk');
    expect(expected.children[1].children[1].textContent).toBe('Belarus');
  });
  it('Sity block render', async () => {
    global.fetch = () => {
      return Promise.resolve({
        json: () => {
          return Promise.resolve({ location: {}, forecast: {}, current: { condition: { text: 'ok' } } });
        },
      });
    };
    const expected = await new FavoritesPage().singleBlock('Minsk');
    expect(expected.children).toHaveLength(2);
    expect(expected.children[0].getAttribute('class')).toBe('firstblock');
    expect(expected.children[0].children[0].getAttribute('class')).toBe('singleFavoriteInfo');
    expect(expected.children[0].children[0].children[0].getAttribute('class')).toBe('temp');
  });
});
