import './errorHandler.css';

export default class ErrorHandler {
  contentError(span) {
    const alertBlock = document.createElement('div');
    alertBlock.className = 'alertBlockImg';
    const text = document.createElement('p');
    text.textContent = span;
    alertBlock.append(text);
    document.body.append(alertBlock);
    setTimeout(() => { alertBlock.remove(); }, 3000);
    return alertBlock;
  }
}
