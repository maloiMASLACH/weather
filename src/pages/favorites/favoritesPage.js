import PageTemplate from '../../templates/pageTemplate';

const pageState = {
  color: 'rgba(0,222,0,.5)',
  background: 'linear-gradient(90.66deg, #AAC0FF 0%, #8C6BAE 100%)',
};
class FavoritesPage extends PageTemplate {
  constructor(id) {
    super(id);
  }

  render() {
    const page = this.createPage(pageState);
    this.conteiner.append(page);
    return this.conteiner;
  }
}

export default FavoritesPage;
