import Menu from '../menu/menu'
import PagesIds from '../pages/pageIDs'


describe('Menu', () => {
  it('PageIds',()=>{
    expect(PagesIds).toHaveProperty('Home','Favorite','Settings','Error')
  })

  it('Buttons',()=>{
    const menu = new Menu().renderButtons()
    const expected = menu.children
    expect(expected).toHaveLength(3) 
  })


  it('Background', () => {
    expect(new Menu().checkWidth()).toBeDefined();
  });
});
