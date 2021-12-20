import GetInfo from '../../data/storage';
import PageTemplate from '../../templates/pageTemplate';
import './favoritesPage.css';
import icons from '../../data/icons';
import ErrorHandler from '../../errorsHandler/errorHandeler';

class FavoritesPage extends PageTemplate {
  constructor(id) {
    super(id);
  }

  currentTownTemp(info) {
    const container = document.createElement('div');
    container.className = 'temp';
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
    container.append(tempNumber, degrees);
    return container;
  }

  townLocation(info) {
    const container = document.createElement('div');
    container.className = 'favoriteLocation';
    const town = document.createElement('p');
    const country = document.createElement('p');
    town.className = 'locationSity';
    country.className = 'locationCountry';
    town.textContent = info.location.name;
    country.textContent = info.location.country;
    container.append(town, country);
    return container;
  }

  renderCommonInfoBlock(info) {
    const container = document.createElement('div');
    container.className = 'singleFavoriteInfo';
    const temp = this.currentTownTemp(info);
    const town = this.townLocation(info);
    container.append(temp, town);
    return container;
  }

  renderShortInfoLine(info) {
    const line = document.createElement('div');
    line.className = 'blockLine';
    let wind;
    if (localStorage.getItem('wind') === 'mp/h') {
      wind = info.current.wind_mph;
    } else {
      wind = info.current.wind_kph;
    }
    const lineInfo = [
      `Wind ${wind} ${localStorage.getItem('wind') || 'km/h'}`,
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

  async singleBlock(town) {
    const block = document.createElement('div');
    const firstBlock = document.createElement('div');
    block.className = 'singleFavorite';
    firstBlock.className = 'firstblock';
    const info = await new GetInfo().showAll(town);
    const commonBlock = this.renderCommonInfoBlock(info);
    const infoLine = this.renderShortInfoLine(info);
    const pic = document.createElement('img');
    if (icons[info.current.condition.text] === undefined) {
      new ErrorHandler().imgError();
    }
    pic.src = `./light/${localStorage.getItem('dayPart')}/${icons[info.current.condition.text]}.png`;
    const close = document.createElement('img');
    close.className = 'close';
    close.src = './light/close.png';

    firstBlock.append(commonBlock, pic, close);
    block.append(firstBlock, infoLine);
    block.addEventListener('click', (e) => {
      if (e.target === close) {
        block.remove();
        localStorage.setItem('favorites', localStorage.getItem('favorites').replace(`,${sity}`, ''));
      } else {
        localStorage.setItem('sity', block.children[0].children[0].children[1].children[0].textContent);
        window.location.hash = '#Home';
      }
    });
    return block;
  }

  renderFavoritesBlock() {
    if (localStorage.getItem('favorites')) {
      const container = document.createElement('div');
      container.className = 'favoritesBlocks';
      const towns = localStorage.getItem('favorites').split(',');
      towns.shift();
      towns.forEach(async (town) => {
        const favorite = await this.singleBlock(town);
        container.append(favorite);
      });
      return container;
    } return '';
  }

  render() {
    const page = this.createPage();
    const content = this.renderFavoritesBlock();
    page.append(content);
    this.container.append(page);
    return this.container;
  }
}

export default FavoritesPage;
