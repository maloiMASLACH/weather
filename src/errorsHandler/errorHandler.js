import './errorHandler.css';
import LocalStorage, { storageConstants } from '../data/localStorage';
import PageRender from '../templates/pageRender';

export default class ErrorHandler {
  async pageError(town) {
    await new LocalStorage().store(storageConstants.town, await new LocalStorage().get(storageConstants.townInput));
    const list = await new LocalStorage().get(storageConstants.favorites);
    const favorites = list.split(',');
    favorites.splice(favorites.indexOf(town), 1);
    favorites.join(',');
    await new LocalStorage().store(storageConstants.favorites, favorites);
    await new PageRender().renderNewPAge('Home');
    this.contentError('Bad request');
  }

  contentError(span) {
    const alertBlock = document.createElement('div');
    alertBlock.className = 'alertBlockImg';
    const text = document.createElement('p');
    text.textContent = span;
    alertBlock.append(text);
    document.body.append(alertBlock);
    setTimeout(() => { alertBlock.remove(); }, 3000);
  }
}
