import LeftPartFirstBlock from './leftPartFirstBlock/leftpartFirstBlock';
import PageTemplate from '../../templates/pageTemplate';
import './mainPage.css';
import Slider from './slider/slider';
import RightBlock from './rightBlock/rightBlock';

class MainPage extends PageTemplate {
  constructor(id, info) {
    super(id, info);
  }

  renderTwoMainBlocks() {
    const leftBlock = new LeftPartFirstBlock().renderLeftBlock(this.container.info);
    const slider = new Slider().render(this.container.info);
    leftBlock.append(slider);
    const rightBlock = new RightBlock().render(this.container.info);
    this.container.firstChild.append(leftBlock, rightBlock);
  }

  render() {
    const page = this.createPage();
    this.container.append(page);
    this.renderTwoMainBlocks();
    return this.container;
  }
}

export default MainPage;
