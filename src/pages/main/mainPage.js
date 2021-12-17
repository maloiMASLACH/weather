import LeftPartFirstBlock from './leftPartFirstBlock/leftpartFirstBlock';
import PageTemplate from '../../templates/pageTemplate';
import './mainPage.css';
import Slider from './slider/slider';
import RightBlock from './rightBlock/rightBlock';

const pageState = {
  color: 'rgba(0,222,0,.5)',
  background: 'linear-gradient(248.66deg, #FF9696 0%, #8C6BAE 100%)',
};
class MainPage extends PageTemplate {
  constructor(id, info) {
    super(id, info);
  }

  TwoMainBlocks() {
    const leftBlock = new LeftPartFirstBlock().leftBlock(this.conteiner.info);
    const slider = new Slider().render(this.conteiner.info);
    leftBlock.append(slider);
    const rightBlock = new RightBlock().render(this.conteiner.info);
    this.conteiner.firstChild.append(leftBlock, rightBlock);
  }

  render() {
    const page = this.createPage(pageState);
    this.conteiner.append(page);
    this.TwoMainBlocks();
    return this.conteiner;
  }
}

export default MainPage;
