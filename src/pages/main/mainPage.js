import LeftPartFirstBlock from './leftPartFirstBlock/leftpartFirstBlock';
import PageTemplate from '../../templates/pageTemplate';
import './mainPage.css';
import Slider from './slider/slider';
import RightBlock from './rightBlock/rightBlock';

class MainPage extends PageTemplate {
  constructor(id, info) {
    super(id, info);
    this.info = this.container.info;
  }

  async renderTwoMainBlocks() {
    const leftBlock = await new LeftPartFirstBlock().renderLeftBlock(this.info);
    const slider = await new Slider().render(this.info);
    leftBlock.append(slider);
    const rightBlock = await new RightBlock().render(this.info);
    this.container.append(leftBlock, rightBlock);
  }

  async render() {
    super.render();
    await this.renderTwoMainBlocks();
    return this.container;
  }
}

export default MainPage;
