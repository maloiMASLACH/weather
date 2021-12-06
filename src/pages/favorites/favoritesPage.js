import GetInfo from '../../data/storage';
import PageTemplate from '../../templates/pageTemplate';
import './favoritesPage.css';
import icons from '../../data/icons';

const pageState = {
  color: 'rgba(0,222,0,.5)',
  background: 'linear-gradient(90.66deg, #AAC0FF 0%, #8C6BAE 100%)',
};
class FavoritesPage extends PageTemplate {
  constructor(id) {
    super(id);
  }

  currentTemp(info) {
    const conteiner = document.createElement('div');
    conteiner.className = 'temp';
    const tempNumber = document.createElement('p');
    tempNumber.classList = 'tempNumber';
    const degrees = document.createElement('p');
    degrees.classList = 'currentDegrees';
    if (localStorage.getItem('degrees') === 'F') {
      tempNumber.textContent = `${info.current.temp_f}`;
      degrees.textContent = '°F';
    } else {
      tempNumber.textContent = `${info.current.temp_c}`;
      degrees.textContent = '°C';
    }
    conteiner.append(tempNumber, degrees);
    return conteiner;
  }

  location(info) {
    const conteiner = document.createElement('div');
    conteiner.className = 'favoriteLocation';
    const sity = document.createElement('p');
    const country = document.createElement('p');
    sity.className = 'locationSity';
    country.className = 'locationCountry';
    sity.textContent = info.location.name;
    country.textContent = info.location.country;
    conteiner.append(sity, country);
    return conteiner;
  }

  commonBlock(info) {
    const conteiner = document.createElement('div');
    conteiner.className = 'singleFavoriteInfo';
    const temp = this.currentTemp(info);
    const sity = this.location(info);
    conteiner.append(temp, sity);
    return conteiner;
  }

  shortInfoLine(info) {
    const line = document.createElement('div');
    line.className = 'blockLine';
    const lineInfo = [
      `Wind ${info.current.wind_kph} km/h`,
      `Hum ${info.current.humidity} %`,
    ];
    for (let i = 0; i < 2; i++) {
      const img = document.createElement('img');
      img.src = `./light/icon_${i}.png`;

      const text = document.createElement('p');
      text.textContent = lineInfo[i];
      line.append(img, text);
    }
    return line;
  }

  async singleBlock(sity) {
    const block = document.createElement('div');
    const firstBlock = document.createElement('div');
    block.className = 'singleFavorite';
    firstBlock.className = 'firstblock';
    const info = await new GetInfo().showAll(sity);
    const commonBlock = this.commonBlock(info);
    const infoLine = this.shortInfoLine(info);
    const pic = document.createElement('img');
    pic.src = `./light/${localStorage.getItem('dayPart')}/${icons[info.current.condition.text]}.png`;
    firstBlock.append(commonBlock, pic);
    block.append(firstBlock, infoLine);
    console.log(block);
    block.addEventListener('click', () => {
      localStorage.setItem('sity', block.children[0].children[0].children[1].children[0].textContent);
      window.location.hash = '#Home';
    });
    return block;
  }

  favoritesBlock() {
    const conteiner = document.createElement('div');
    conteiner.className = 'favoritesBlocks';
    const sityes = localStorage.getItem('favorites').split(',');
    sityes.shift();
    sityes.forEach(async (sity) => {
      const favorite = await this.singleBlock(sity);
      conteiner.append(favorite);
    });

    return conteiner;
  }

  render() {
    const page = this.createPage(pageState);
    const content = this.favoritesBlock();
    page.append(content);
    this.conteiner.append(page);
    return this.conteiner;
  }
}

export default FavoritesPage;
