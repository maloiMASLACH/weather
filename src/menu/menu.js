import MenuTemplate from '../templates/menuTemplate';
import PagesIds from '../pages/pageIDs';
import './menu.css';
import themes from '../data/themes';

export class Menu extends MenuTemplate {
  constructor(tagName, className) {
    super(tagName, className);
  }

  checkWidth(btns, array) {
    if (document.documentElement.clientWidth <= 425) {
      if (localStorage.getItem('theme')) {
        this.conteiner.style.background = themes[localStorage.getItem('theme')][localStorage.getItem('dayPart')];
      } else {
        this.conteiner.style.background = 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) -41.94%, rgba(255, 255, 255, 0.22) 57.51%)';
      }
    }
    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth <= 425) {
        this.conteiner.style.background = themes[localStorage.getItem('theme')][
          localStorage.getItem('dayPart')
        ];
        for (let i = 0; i < btns.children.length; i++) {
          btns.children[i].innerHTML = `<img src='./light/${array[i]}.png'>`;
        }
      } else {
        for (let i = 0; i < btns.children.length; i++) {
          btns.children[i].text = `${array[i]}`;
        }
        this.conteiner.style.background = '';
      }
    });
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
    this.checkWidth(buttons, buttonsArray);
    this.conteiner.append(buttons);
  }

  render() {
    this.renderButtons();
    return this.conteiner;
  }
}
