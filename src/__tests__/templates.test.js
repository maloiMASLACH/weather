import MenuTemplate from '../templates/menuTemplate';
import PageTemplate from '../templates/pageTemplate';

describe('Templates', () => {
  it('Menu template has no own properties', () => {
    const expected = new MenuTemplate().render().getAttribute('class');
    expect(expected).toBe('undefined');
  });
  it('Page template has no own properties', () => {
    const expected = new PageTemplate().render().getAttribute('id');
    expect(expected).toBe('undefined');
  });
  it('Page template has children', () => {
    const expected = new PageTemplate().createPage().getAttribute('class');
    expect(expected).toBe('content');
  });
});
