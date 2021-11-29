import LeftPartFirstBlock from './leftPartFirstBlock/leftpartFirstBlock';
import PageTemplate from '../../templates/pageTemplate';
import './mainPage.css';
import Slider from './slider/slider';
import RightBlock from './rightBlock/rightBlock';

const pageState = {
  color: 'rgba(0,222,0,.5)',
  background: 'linear-gradient(248.66deg, #FF9696 0%, #8C6BAE 100%)'
};
class MainPage extends PageTemplate {
  constructor(id, info) {
    super(id, info);
  }

  TwoMainBlocks() {
    const leftBlock = document.createElement('div');
    leftBlock.className = 'leftBlock';
    const rightBlock = document.createElement('div');
    rightBlock.className = 'rightBlock';
    new LeftPartFirstBlock().leftBlock(leftBlock, this.conteiner.info);
    new Slider().render(leftBlock, this.conteiner.info);
    new RightBlock().render(rightBlock, this.conteiner.info);
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
