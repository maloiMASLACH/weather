class PageTemplate {
  constructor(id) {
    this.conteiner = document.createElement('div');
    this.conteiner.id = id;
  }

  createPage(state) {
    const menuState = document.createElement('div');

    menuState.style.width = '100%';
    menuState.style.height = '100%';
    menuState.style.background = state.background;
    menuState.innerText = state;
    this.conteiner.style.height = '90vh';
    return menuState;
  }

  render() {
    return this.conteiner;
  }
}

export default PageTemplate;
