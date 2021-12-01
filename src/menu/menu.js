import MenuTemplate from '../templates/menuTemplate';
import PagesIds from '../pages/pageIDs';
import './menu.css';
import themes from '../data/themes';

export class Menu extends MenuTemplate {
  constructor(tagName, className) {
    super(tagName, className);
  }

  renderButtons() {
    const buttons = document.createElement('div');
    const buttonsArray = Object.keys(PagesIds).slice(0, Object.keys(PagesIds).length - 1);
    buttonsArray.forEach((btn) => {
      const btnHTML = document.createElement('a');
      btnHTML.href = `#${btn}`;
      btnHTML.text = `${btn}`;
      buttons.append(btnHTML);
    });
    this.conteiner.append(buttons);

    // this.conteiner.style.background=themes[localStorage['dayPart']]
  }

  checkWidth() {
    if (document.documentElement.clientWidth <= 425) {
      this.conteiner.style.background = themes[localStorage.getItem('dayPart')];
    }
    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth <= 425) {
        this.conteiner.style.background = themes[localStorage.getItem('dayPart')];
      } else {
        this.conteiner.style.background = '';
      }
    });
  }

  render() {
    this.renderButtons();
    this.checkWidth();
    return this.conteiner;
  }
}
