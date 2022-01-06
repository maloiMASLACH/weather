import themes from '../data/themes';
import LocalStorage, { storageConstants } from '../data/localStorage';

class PageTemplate {
  constructor(info) {
    this.container = document.createElement('div');
    this.container.info = info;
  }

  async createPage() {
    const pageState = document.createElement('div');
    pageState.className = 'content';
    pageState.style.width = '100%';
    pageState.style.height = '91vh';
    if (await new LocalStorage().get(storageConstants.theme)
    && await new LocalStorage().get(storageConstants.dayPart)) {
      document.body.style.background = themes[await new LocalStorage().get(storageConstants.theme)][
        await new LocalStorage().get(storageConstants.dayPart)];
    }
    this.container.style.height = '91vh';

    return pageState;
  }

  render() {
    return this.createPage();
  }
}

export default PageTemplate;
