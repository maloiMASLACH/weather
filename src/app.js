import { Menu } from './menu/menu';
import PagesIds from './pages/pageIDs';
import GetInfo from './data/storage';

const conteiner = document.body;
const defaultPageId = 'current-page';
class App {
  constructor() {
    this.initialPage = new PagesIds.Home('Home');
    this.menu = new Menu('header', 'menu');
  }

  async renderNewPAge(pageId) {
    const currentPage = document.querySelector(`#${defaultPageId}`);
    if (currentPage) {
      currentPage.remove();
    }
    let page = null;
    const info = await new GetInfo().showAll(localStorage.getItem('sity') || 'Minsk');

    console.log(info);
    if (info.location.localtime.split(' ')[1].split(':')[0] < info.forecast.forecastday[0].astro.sunrise.split(':')[0] || info.location.localtime.split(' ')[1].split(':')[0] >= +info.forecast.forecastday[0].astro.sunset.split(':')[0] + 12) {
      localStorage.setItem('dayPart', 'night');
    } else {
      localStorage.setItem('dayPart', 'day');
    }
    try {
      page = new PagesIds[pageId](pageId, info);
    } catch (err) {
      page = new PagesIds.Error(pageId, '404');
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = defaultPageId;
      conteiner.append(pageHTML);
    }
  }

  routChage() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPAge(hash);
    });
  }

  async run() {
    conteiner.append(this.menu.render());

    if (window.location.hash.length) {
      const hash = window.location.hash.slice(1);
      this.renderNewPAge(hash);
    } else this.renderNewPAge('Home');

    this.routChage();
  }
}
export default App;
