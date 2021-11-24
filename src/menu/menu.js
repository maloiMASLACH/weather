import MenuTemplate from "../templates/menuTemplate";
import PagesIds from "../pages/pageIDs";
import './menu.css'
const ButtonsNames = [
  { id: PagesIds.MainPageid, img: "" },
  { id: PagesIds.SettingsPageid, img: "" },
  { id: PagesIds.FavoritesPageid, img: "" },
];

export class Menu extends MenuTemplate {
  constructor(tagName, className) {
    super(tagName, className);
  }
  renderButtons() {
    const buttons = document.createElement("div");
    ButtonsNames.forEach((btn)=>{
        const btnHTML=document.createElement('a')
        btnHTML.href=`#${btn.id}`
        btnHTML.text=`${btn.id}`
        buttons.append(btnHTML)
        console.log(btnHTML)
    })
    
    this.conteiner.append(buttons)
  }
  render() {
      this.renderButtons()
    return this.conteiner;
  }
}
