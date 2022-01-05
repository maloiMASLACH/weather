import MenuTemplate from '../templates/menuTemplate';
import PagesIds from '../pages/pageIDs';
import './menu.css';
import themes from '../data/themes';
import LocalStorage, { storageConstants } from '../data/localStorage';

export default class Menu extends MenuTemplate {
  constructor(tagName, className) {
    super(tagName, className);
  }

  async checkStyleByWidth(btns, array) {
    if (document.documentElement.clientWidth <= 425) {
      if (await new LocalStorage().get(storageConstants.theme)) {
        this.container.style.background = themes[await new LocalStorage().get(storageConstants.theme)][
          await new LocalStorage().get(storageConstants.dayPart)];
      } else {
        this.container.style.background = themes.classic.day;
      }
    }
    window.addEventListener('resize', async () => {
      if (document.documentElement.clientWidth <= 425) {
        this.container.style.background = themes[await new LocalStorage().get(storageConstants.theme)][
          await new LocalStorage().get(storageConstants.dayPart)
        ];
        for (let i = 0; i < btns.children.length; i++) {
          btns.children[i].innerHTML = `<img src='./light/${array[i]}.png'>`;
        }
      } else {
        for (let i = 0; i < btns.children.length; i++) {
          btns.children[i].text = `${array[i]}`;
        }
        this.container.style.background = 'none';
      }
    });
    return this.container.style.background;
  }

  async renderButtons() {
    const buttons = document.createElement('div');
    const buttonsArray = Object.keys(PagesIds).slice(
      0,
      Object.keys(PagesIds).length - 1,
    );
    buttonsArray.forEach((btn) => {
      const btnHTML = document.createElement('a');
      btnHTML.href = `#${btn}`;
      if (document.documentElement.clientWidth <= 425) {
        btnHTML.innerHTML = `<img src='./light/${btn}.png'>`;
      } else {
        btnHTML.text = `${btn}`;
      }
      buttons.append(btnHTML);
    });
    await this.checkStyleByWidth(buttons, buttonsArray);
    return buttons;
  }

  async render() {
    const buttons = await this.renderButtons();
    this.container.append(buttons);
    return this.container;
  }
}
