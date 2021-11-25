import { Menu } from "./menu/menu";
import PagesIds from "./pages/pageIDs";

class App {
  static conteiner = document.body;
  static defaultPageId = "current-page";
  constructor() {
    this.initialPage = new PagesIds["main-page"]("main-page");
    this.menu = new Menu("header", "menu");
  }
  static renderNewPAge(pageId) {
    const currentPage = document.querySelector(`#${this.defaultPageId}`);
    if (currentPage) {
      currentPage.remove();
    }
    let page = null;
    
    try {
      page = new PagesIds[pageId](pageId);
    } catch (err) {
      page = new PagesIds["error"](pageId, "404");
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = this.defaultPageId;
      document.body.append(pageHTML);
    }
  }

  static routChage() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPAge(hash);
    });
  }

  run() {
    App.conteiner.append(this.menu.render());

    if (window.location.hash.length) {
      const hash = window.location.hash.slice(1);
      App.renderNewPAge(hash);
    } else App.renderNewPAge("main-page");
    
    App.routChage();
  }
}
export default App;
