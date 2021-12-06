import themes from '../data/themes';

class PageTemplate {
  constructor(id, info) {
    this.conteiner = document.createElement('div');
    this.conteiner.id = id;
    this.conteiner.info = info;
  }

  createPage() {
    const pageState = document.createElement('div');
    pageState.className = 'content';
    pageState.style.width = '100%';
    pageState.style.height = '100%';
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'classic');
    }
    document.body.style.background = themes[localStorage.getItem('theme')][localStorage.getItem('dayPart')];
    this.conteiner.style.height = '91vh';

    return pageState;
  }

  render() {
    return this.conteiner;
  }
}

export default PageTemplate;
