import App from '../app';
import './errorHandler.css';
import LocalStorage, { storageConstants } from '../data/localStorage';

export default class ErrorHandler {
  async pageError(town) {
    await new LocalStorage().store(storageConstants.sity, await new LocalStorage().get(storageConstants.sityInput));
    const list = await new LocalStorage().get(storageConstants.favorites);
    const favorites = list.split(',');
    favorites.splice(favorites.indexOf(town), 1);
    favorites.join(',');
    await new LocalStorage().store(storageConstants.favorites, favorites);
    new App().renderNewPAge('Home');
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
    return true;
  }
}
