import FavoritesPage from '../pages/favorites/favoritesPage'

describe('Favorites Page', () => {
    it('Page rendered',()=>{
        const expected = new FavoritesPage().render().children[0].getAttribute('class')
      expect(expected).toBe('content')
    })
    it('Blocks conteiner',()=>{
        const expected = new FavoritesPage().favoritesBlock()
      expect(expected).toBeDefined()
    })
  /*  it('Sity block render',()=>{
        const expected = new FavoritesPage().singleBlock('Minsk')
      expect(expected).toBe(2)
    })*/
  });