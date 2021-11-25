import PageTemplate from '../../templates/pageTemplate';

const pageState = {
  color: 'rgba(0,222,0,.5)',
  background:
    ' linear-gradient(248.66deg, #91BEF3 0%,rgb(98 113 169) 50%, #91BEF3 100%)',
};
class SettingsPage extends PageTemplate {
  constructor(id) {
    super(id);
  }

  render() {
    const page = this.createPage(pageState);
    this.conteiner.append(page);
    return this.conteiner;
  }
}

export default SettingsPage;
