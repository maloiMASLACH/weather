import Menu from './menu/menu';
import PagesIds from './pages/pageIDs';
import AppRouter from './router/router';

const container = document.body;

class App {
  constructor() {
    this.initialPage = new PagesIds.Home('Home');
    this.menu = new Menu('header', 'menu');
  }

  async run() {
    container.append(await this.menu.render());
    await new AppRouter().renderFirstTime();
    window.addEventListener('hashchange', async () => {
      await new AppRouter().routChange();
    });
  }
}
export default App;
