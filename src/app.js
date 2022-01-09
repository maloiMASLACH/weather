import Menu from './menu/menu';
import AppRouter from './router/router';
import PageRender from './templates/pageRender';

const container = document.body;

class App {
  constructor() {
    this.initialPage = new PageRender().renderNewPAge(window.location.hash.slice(1) || 'Home');
    this.menu = new Menu('header', 'menu');
  }

  async run() {
    container.append(await this.menu.render());
    await this.initialPage;
    await new AppRouter().routChange();
  }
}
export default App;
