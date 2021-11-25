import { Menu } from "./menu/menu";
import pageIDs from "./pages/pageIDs";
import ErrorPage from "./pages/erorr/erorrPage";
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
    /*if (pageId === pageIDs.MainPageid) {
      page = new MainPage(pageId);
    } else if (pageId === pageIDs.SettingsPageid) {
      page = new SettingsPage(pageId);
    } else if (pageId === pageIDs.FavoritesPageid) {
      page = new FavoritesPage(pageId);
    } else {console.log('re') ;page = new ErrorPage(pageId, "404");}
*/
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
