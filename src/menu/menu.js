import MenuTemplate from "../templates/menuTemplate";
import PagesIds from "../pages/pageIDs";
import "./menu.css";

export class Menu extends MenuTemplate {
  constructor(tagName, className) {
    super(tagName, className);
  }
  renderButtons() {
    const buttons = document.createElement("div");
    const buttonsArray= Object.keys(PagesIds).slice(0,Object.keys(PagesIds).length-1)
    buttonsArray.forEach((btn) => {
      const btnHTML = document.createElement("a");
      btnHTML.href = `#${btn}`;
      btnHTML.text = `${btn}`;
      buttons.append(btnHTML);
      console.log(btnHTML);
    });
    this.conteiner.append(buttons);
  }
  render() {
    this.renderButtons();
    return this.conteiner;
  }
}
