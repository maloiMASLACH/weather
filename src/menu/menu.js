import MenuTemplate from "../templates/menuTemplate";
import PagesIds from "../pages/pageIDs";
import "./menu.css";
/*const ButtonsNames = [
  { id: Object.keys(PagesIds)[0], img: "" },
  { id: Object.keys(PagesIds)[1], img: "" },
  { id: Object.keys(PagesIds)[2], img: "" },
];
*/
export class Menu extends MenuTemplate {
  constructor(tagName, className) {
    super(tagName, className);
  }
  renderButtons() {
    const buttons = document.createElement("div");

    Object.keys(PagesIds).forEach((btn) => {
      const btnHTML = document.createElement("a");
      btnHTML.href = `#${btn}`;
      btnHTML.text = `${btn}`;
      buttons.append(btnHTML);
      console.log(btnHTML);
    });

    /*  ButtonsNames.forEach((btn)=>{
        const btnHTML=document.createElement('a')
        btnHTML.href=`#${btn.id}`
        btnHTML.text=`${btn.id}`
        buttons.append(btnHTML)
        console.log(btnHTML)
    })*/

    this.conteiner.append(buttons);
  }
  render() {
    this.renderButtons();
    return this.conteiner;
  }
}
