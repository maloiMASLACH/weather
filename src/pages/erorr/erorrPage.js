import PageTemplate from "../../templates/pageTemplate";

class ErrorPage extends PageTemplate {
  static TextObject = {
    404: "Error. Bad URl",
  };

  constructor(id, errType) {
    super(id);
    this.errType = errType;
  }

  render() {
    const title = this.createPage(ErrorPage.TextObject[this.errType]);
    this.conteiner.append(title);
    return this.conteiner;
  }
}

export default ErrorPage;
