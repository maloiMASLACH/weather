import PageRender from '../templates/pageRender';

class AppRouter {
  async routChange() {
    window.addEventListener('hashchange', async () => {
      const hash = window.location.hash.slice(1);
      await new PageRender().renderNewPAge(hash);
    });
  }
}
export default AppRouter;
