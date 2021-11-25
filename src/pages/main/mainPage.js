import PageTemplate from '../../templates/pageTemplate';

const pageState = {
  color: 'rgba(0,222,0,.5)',
  background: 'linear-gradient(248.66deg, #A8C8ED 0%, #7673DC 100%)',
};
class MainPage extends PageTemplate {
  constructor(id) {
    super(id);
  }

  render() {
    const page = this.createPage(pageState);
    this.conteiner.append(page);
    return this.conteiner;
  }
}

export default MainPage;
