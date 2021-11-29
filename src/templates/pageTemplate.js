class PageTemplate {
  constructor(id, info) {
    this.conteiner = document.createElement('div');
    this.conteiner.id = id;
    this.conteiner.info = info;
  }

  createPage(state) {
    const pageState = document.createElement('div');
    pageState.style.width = '100%';
    pageState.style.height = '100%';
    // pageState.style.background = state.background;
    pageState.style.display = state.display;
    this.conteiner.style.height = '90vh';
    return pageState;
  }

  render() {
    return this.conteiner;
  }
}

export default PageTemplate;
