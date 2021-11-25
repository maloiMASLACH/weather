class PageTemplate {
  static TextObg = {};

  constructor(id) {
    this.conteiner = document.createElement("div");
    this.conteiner.id = id;
  }
  createPage(state) {
    const menuState = document.createElement("div");
    menuState.style.width = "100%";
    menuState.style.height = "300px";
    menuState.style.backgroundColor = state;
    menuState.innerText = state;
    return menuState;
  }

  render() {
    return this.conteiner;
  }
}

export default PageTemplate;
