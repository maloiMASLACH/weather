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
