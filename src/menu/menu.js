import MenuTemplate from '../templates/menuTemplate';
import PagesIds from '../pages/pageIDs';
import './menu.css';
import themes from '../data/themes';

export default class Menu extends MenuTemplate {
  constructor(tagName, className) {
    super(tagName, className);
  }

  checkStyleByWidth(btns, array) {
    if (document.documentElement.clientWidth <= 425) {
      if (localStorage.getItem('theme')) {
        this.container.style.background = themes[localStorage.getItem('theme')][localStorage.getItem('dayPart')];
      } else {
        this.container.style.background = themes.classic.day;
      }
    }
    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth <= 425) {
        this.container.style.background = themes[localStorage.getItem('theme')][
          localStorage.getItem('dayPart')
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

  renderButtons() {
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
    this.checkStyleByWidth(buttons, buttonsArray);
    return buttons;
  }

  render() {
    const buttons = this.renderButtons();
    this.container.append(buttons);
    return this.container;
  }
}
