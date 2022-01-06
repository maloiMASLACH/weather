import PageRender from '../templates/pageRender';

class AppRouter {
  async routChange() {
    const hash = window.location.hash.slice(1);
    await new PageRender().renderNewPAge(hash);
  }

  async renderFirstTime() {
    if (window.location.hash.length) {
      const hash = window.location.hash.slice(1);
      await new PageRender().renderNewPAge(hash);
    } else await new PageRender().renderNewPAge('Home');
  }
}
export default AppRouter;
