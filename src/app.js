import Menu from './menu/menu';
import PagesIds from './pages/pageIDs';
import GetInfo from './data/storage';

const container = document.body;
const defaultPageId = 'current-page';
class App {
  constructor() {
    this.initialPage = new PagesIds.Home('Home');
    this.menu = new Menu('header', 'menu');
  }

  checkTheme(info) {
    if (
      info.location.localtime.split(' ')[1].split(':')[0]
        < info.forecast.forecastday[0].astro.sunrise.split(':')[0]
      || info.location.localtime.split(' ')[1].split(':')[0]
        >= +info.forecast.forecastday[0].astro.sunset.split(':')[0] + 12
    ) {
      localStorage.setItem('dayPart', 'night');
    } else {
      localStorage.setItem('dayPart', 'day');
    }
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'classic');
    }
  }

  async renderNewPAge(pageId) {
    const currentPage = document.querySelector(`#${defaultPageId}`);
    if (currentPage) {
      currentPage.remove();
    }
    let page = null;
    const info = await new GetInfo().showAll(
      localStorage.getItem('sity') || 'Minsk',
    );
    this.checkTheme(info);

    try {
      page = new PagesIds[pageId](info);
    } catch (err) {
      page = new PagesIds.Error('404');
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = defaultPageId;
      container.append(pageHTML);
    }
  }

  routChage() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPAge(hash);
    });
  }

  async run() {
    container.append(this.menu.render());
    if (window.location.hash.length) {
      const hash = window.location.hash.slice(1);
      this.renderNewPAge(hash);
    } else this.renderNewPAge('Home');

    this.routChage();
  }
}
export default App;
