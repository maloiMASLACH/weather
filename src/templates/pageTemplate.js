import themes from '../data/themes';

class PageTemplate {
  constructor(info) {
    this.container = document.createElement('div');
    this.container.info = info;
  }

  createPage() {
    const pageState = document.createElement('div');
    pageState.className = 'content';
    pageState.style.width = '100%';
    pageState.style.height = '100%';
    if (localStorage.getItem('theme')
    && localStorage.getItem('dayPart')) {
      document.body.style.background = themes[localStorage.getItem('theme')][localStorage.getItem('dayPart')];
    }
    this.container.style.height = '91vh';

    return pageState;
  }

  render() {
    return this.container;
  }
}

export default PageTemplate;
