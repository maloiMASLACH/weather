import PageTemplate from "../../templates/pageTemplate";

class SettingsPage extends PageTemplate {
  static pageStateColors = {
    color: "rgba(0,222,0,.5)",
  };

  constructor(id) {
    super(id);
  }

  render() {
    const menu = this.createPage(SettingsPage.pageStateColors.color);
    this.conteiner.append(menu);
    return this.conteiner;
  }
}

export default SettingsPage;
