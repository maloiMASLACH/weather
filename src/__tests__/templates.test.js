import MenuTemplate from '../templates/menuTemplate';
import PageTemplate from '../templates/pageTemplate';

describe('Templates', () => {
  it('Menu template has no own properties', () => {
    const expected = new MenuTemplate().render();
    expect(expected.getAttribute('class')).toBe('undefined');
    expect(expected.tagName).toBe('UNDEFINED');
  });
  it('Page render', async () => {
    const expected = await new PageTemplate().createPage();
    expect(expected.className).toBe('content');
    expect(expected.getAttribute('style')).toBe('width: 100%; height: 91vh;');
  });
});
