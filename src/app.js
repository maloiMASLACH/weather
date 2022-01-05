import Menu from './menu/menu';
import PagesIds from './pages/pageIDs';
import GetInfo from './data/getInfo';
import LocalStorage, { storageConstants } from './data/localStorage';

const container = document.body;
const defaultPageId = 'current-page';
class App {
  constructor() {
    this.initialPage = new PagesIds.Home('Home');
    this.menu = new Menu('header', 'menu');
  }

  async checkTheme(info) {
    if (
      info.location.localtime.split(' ')[1].split(':')[0]
        < info.forecast.forecastday[0].astro.sunrise.split(':')[0]
      || info.location.localtime.split(' ')[1].split(':')[0]
        >= +info.forecast.forecastday[0].astro.sunset.split(':')[0] + 12
    ) {
      await new LocalStorage().store(storageConstants.dayPart, 'night');
    } else {
      await new LocalStorage().store(storageConstants.dayPart, 'day');
    }
    if (!await new LocalStorage().get(storageConstants.theme)) {
      await new LocalStorage().store(storageConstants.theme, 'classic');
    }
  }

  async renderNewPAge(pageId) {
    const currentPage = document.querySelector(`#${defaultPageId}`);
    if (currentPage) {
      currentPage.remove();
    }
    let page = null;
    const info = await new GetInfo().showAll(
      await new LocalStorage().get(storageConstants.sity) || 'Minsk',
    );
    await this.checkTheme(info);

    try {
      page = new PagesIds[pageId](info);
    } catch (err) {
      page = new PagesIds.Error('404');
    }

    if (page) {
      const pageHTML = await page.render();
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
    container.append(await this.menu.render());
    if (window.location.hash.length) {
      const hash = window.location.hash.slice(1);
      this.renderNewPAge(hash);
    } else this.renderNewPAge('Home');

    this.routChage();
  }
}
export default App;
