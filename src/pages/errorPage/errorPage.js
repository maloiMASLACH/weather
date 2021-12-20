import PageTemplate from '../../templates/pageTemplate';

const TextObject = {
  404: 'Error. Bad URl',
};

class ErrorPage extends PageTemplate {
  constructor(id, errType) {
    super(id);
    this.errType = errType;
  }

  render() {
    const title = this.createPage(TextObject[this.errType]);
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;
