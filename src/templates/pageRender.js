import GetInfo from '../data/getInfo';
import LocalStorage, { storageConstants } from '../data/localStorage';
import ThemeManager from '../data/themeManager';
import PagesIds from '../pages/pageIDs';

const defaultPageId = 'current-page';
const container = document.body;

class PageRender {
  async renderNewPAge(pageId) {
    const currentPage = document.querySelector(`#${defaultPageId}`);
    if (currentPage) {
      currentPage.remove();
    }
    let page = null;
    let info = null;
    if (pageId === 'Home') {
      info = await new GetInfo().showAllTownInfo(
        await new LocalStorage().get(storageConstants.town) || 'Minsk',
      );
      await new ThemeManager().checkTheme(info);
    }

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
}

export default PageRender;
