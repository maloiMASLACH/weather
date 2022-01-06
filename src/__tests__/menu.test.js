import Menu from '../menu/menu';
import PagesIds from '../pages/pageIDs';

describe('Menu', () => {
  it('PageIds', () => {
    expect(PagesIds).toHaveProperty('Home', 'Favorite', 'Settings', 'Error');
  });

  it('Text', async () => {
    const IDs = ['Home', 'Favorite', 'Settings'];
    const expected = await new Menu().renderTextButtons(IDs);
    expect(expected).toBeDefined();
    expect(expected.tagName).toBe('DIV');
    expect(expected.children).toHaveLength(3);
    expect(expected.children[0].tagName).toBe('A');
    expect(expected.children[0].textContent).toBe(IDs[0]);
    expect(expected.children[1].textContent).toBe(IDs[1]);
    expect(expected.children[2].textContent).toBe(IDs[2]);
  });
  it('Buttons', async () => {
    const IDs = ['Home', 'Favorite', 'Settings'];
    const expected = await new Menu().renderButtons(IDs);
    expect(expected).toBeDefined();
    expect(expected.tagName).toBe('DIV');
    expect(expected.children).toHaveLength(3);
    expect(expected.children[0].tagName).toBe('A');
    expect(expected.children[0].children[0].src).toBe(`http://localhost/light/${IDs[0]}.png`);
    expect(expected.children[1].children[0].src).toBe(`http://localhost/light/${IDs[1]}.png`);
    expect(expected.children[2].children[0].src).toBe(`http://localhost/light/${IDs[2]}.png`);
  });
});
