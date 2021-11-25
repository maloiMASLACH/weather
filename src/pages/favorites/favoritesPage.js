import PageTemplate from "../../templates/pageTemplate";

class FavoritesPage extends PageTemplate {
  static pageStateColors = {
    color: "rgba(0,33,0,.5)",
  };

  constructor(id) {
    super(id);
  }

  render() {
    const menu = this.createPage(FavoritesPage.pageStateColors.color);
    this.conteiner.append(menu);
    return this.conteiner;
  }
}

export default FavoritesPage;
