import App from '../app';
import './errorHandler.css';

export default class ErrorHandler {
  renderAlertBlock() {
    const alertBlock = document.createElement('div');
    alertBlock.className = 'alertBlock';
    const text = document.createElement('p');
    text.textContent = 'Bad request';
    alertBlock.append(text);
    document.body.append(alertBlock);
    setTimeout(() => { alertBlock.remove(); }, 3000);
    return true;
  }

  pageError(sity) {
    localStorage.setItem('sity', localStorage.getItem('sityInput'));
    const favorites = localStorage.getItem('favorites').split(',');
    favorites.splice(favorites.indexOf(sity), 1);
    favorites.join(',');
    localStorage.setItem('favorites', favorites);
    new App().renderNewPAge('Home');
    this.renderAlertBlock();
  }

  imgError() {
    const alertBlock = document.createElement('div');
    alertBlock.className = 'alertBlockImg';
    const text = document.createElement('p');
    text.textContent = 'Some images are lost';
    alertBlock.append(text);
    document.body.append(alertBlock);
    setTimeout(() => { alertBlock.remove(); }, 3000);
    return true;
  }

  searchError() {
    const alertBlock = document.createElement('div');
    alertBlock.className = 'alertBlocksSearch';
    const text = document.createElement('p');
    text.textContent = 'Incorrect search';
    alertBlock.append(text);
    document.body.append(alertBlock);
    setTimeout(() => { alertBlock.remove(); }, 1000);
    return true;
  }
}
