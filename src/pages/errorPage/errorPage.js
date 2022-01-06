import PageTemplate from '../../templates/pageTemplate';

const TextObject = {
  404: 'Error. Bad URl',
};

class ErrorPage extends PageTemplate {
  constructor(id, errType) {
    super(id);
    this.errType = errType;
  }

  async render() {
    this.container.append(TextObject[404]);
    return this.container;
  }
}

export default ErrorPage;
