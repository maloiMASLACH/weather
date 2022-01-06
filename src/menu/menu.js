import MenuTemplate from '../templates/menuTemplate';
import PagesIds from '../pages/pageIDs';
import './menu.css';
import themes from '../data/themes';
import LocalStorage, { storageConstants } from '../data/localStorage';

export default class Menu extends MenuTemplate {
  constructor(tagName, className) {
    super(tagName, className);
  }

  async renderButtons(buttonsArray) {
    const buttons = document.createElement('div');
    buttonsArray.forEach((btn) => {
      const btnHTML = document.createElement('a');
      btnHTML.href = `#${btn}`;
      btnHTML.innerHTML = `<img src='./light/${btn}.png'>`;
      buttons.append(btnHTML);
    });
    return buttons;
  }

  async renderTextButtons(buttonsArray) {
    const list = document.createElement('div');
    buttonsArray.forEach((btn) => {
      const btnHTML = document.createElement('a');
      btnHTML.href = `#${btn}`;
      btnHTML.text = `${btn}`;
      list.append(btnHTML);
    });
    return list;
  }

  async renderMenuBlock() {
    const buttonsArray = Object.keys(PagesIds).slice(
      0,
      Object.keys(PagesIds).length - 1,
    );
    const block = document.createElement('div');
    const images = await this.renderButtons(buttonsArray);
    const list = await this.renderTextButtons(buttonsArray);
    block.append(images, list);
    return block;
  }

  async setStyle() {
    if (await new LocalStorage().get(storageConstants.theme)) {
      this.container.style.background = themes[await new LocalStorage().get(storageConstants.theme)][
        await new LocalStorage().get(storageConstants.dayPart)];
    } else {
      this.container.style.background = themes.classic.day;
    }
  }

  async render() {
    const buttons = await this.renderMenuBlock();
    this.container.append(buttons);
    await this.setStyle();
    return this.container;
  }
}
