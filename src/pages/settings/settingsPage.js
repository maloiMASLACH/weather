import PageTemplate from '../../templates/pageTemplate';
import './settingsPage.css';
import themes from '../../data/themes';
import LocalStorage, { storageConstants } from '../../data/localStorage';

class SettingsPage extends PageTemplate {
  constructor(id, info) {
    super(id, info);
  }

  async renderDayPart() {
    const container = document.createElement('div');
    container.className = 'dayPartSett';
    const pic = document.createElement('img');
    pic.src = `./light/${await new LocalStorage().get(storageConstants.dayPart)}/sunny.png`;
    const dayPart = document.createElement('p');
    dayPart.className = 'dayPart';
    dayPart.textContent = await new LocalStorage().get(storageConstants.dayPart);
    container.append(pic, dayPart);
    return container;
  }

  async renderCurrentLocation() {
    const content = document.createElement('div');
    content.classList = 'settingsLocation';
    const title = document.createElement('p');
    const location = document.createElement('p');
    title.className = 'title';
    location.className = 'currentTownSett';
    title.textContent = 'Your current location';
    location.textContent = await new LocalStorage().get(storageConstants.town) || 'Minsk';
    content.append(title, location);
    return content;
  }

  async degreesSetting() {
    const tempDeg = document.createElement('div');
    tempDeg.className = 'tempDegSett';
    const text = document.createElement('p');
    text.textContent = 'Choose degrees measure';
    const tempSel = document.createElement('select');
    const degrees = ['°C', '°F'];
    degrees.forEach((deg) => {
      const opt = document.createElement('option');
      opt.textContent = deg;
      opt.addEventListener('click', () => {
      });
      tempSel.append(opt);
    });
    if (await new LocalStorage().get(storageConstants.degrees) === 'F') {
      tempSel.children[1].setAttribute('selected', 'selected');
    } else {
      tempSel.children[0].setAttribute('selected', 'selected');
    }
    tempSel.onchange = async () => {
      await new LocalStorage().store(storageConstants.degrees, tempSel.value[1]);
    };
    tempDeg.append(text, tempSel);
    return tempDeg;
  }

  async windSetting() {
    const windCon = document.createElement('div');
    windCon.className = 'tempDegSett';
    const text = document.createElement('p');
    text.textContent = 'Choose wind speed measure';
    const windSel = document.createElement('select');
    const speed = ['km/h', 'mp/h'];
    speed.forEach((sp) => {
      const opt = document.createElement('option');
      opt.textContent = sp;
      opt.addEventListener('click', () => {
      });
      windSel.append(opt);
    });
    if (await new LocalStorage().get(storageConstants.wind) === 'mp/h') {
      windSel.children[1].setAttribute('selected', 'selected');
    } else {
      windSel.children[0].setAttribute('selected', 'selected');
    }
    windSel.onchange = async () => {
      await new LocalStorage().get(storageConstants.wind, windSel.value);
    };
    windCon.append(text, windSel);
    return windCon;
  }

  async colorSetting() {
    const colorCon = document.createElement('div');
    colorCon.className = 'tempDegSett';
    const text = document.createElement('p');
    text.textContent = 'Choose theme';
    const demo = document.createElement('div');
    demo.className = 'demo';
    if (await new LocalStorage().get(storageConstants.theme)
    && await new LocalStorage().get(storageConstants.dayPart)) {
      demo.style.background = themes[await new LocalStorage().get(storageConstants.theme)][
        await new LocalStorage().get(storageConstants.dayPart)];
    }
    const container = document.createElement('div');
    container.className = 'colorContainer';
    Object.keys(themes).forEach(async (theme) => {
      const colorTemp = document.createElement('div');
      colorTemp.className = 'colorTemp';
      colorTemp.style.background = themes[theme][await new LocalStorage().get(storageConstants.dayPart)];
      container.append(colorTemp);
    });
    demo.onclick = () => {
      container.style.display = 'flex';
      demo.style.display = 'none';
      for (let i = 0; i < container.children.length; i++) {
        container.children[i].onclick = async () => {
          await new LocalStorage().store(storageConstants.theme, Object.keys(themes)[i]);
          document.body.children[0].style.background = themes[Object.keys(themes)[i]][
            await new LocalStorage().get(storageConstants.dayPart)];
          document.body.style.background = themes[Object.keys(themes)[i]][
            await new LocalStorage().get(storageConstants.dayPart)];
          demo.style.background = themes[Object.keys(themes)[i]][
            await new LocalStorage().get(storageConstants.dayPart)];
          container.style.display = 'none';
          demo.style.display = 'block';
        };
      }
    };
    colorCon.append(text, demo, container);
    return colorCon;
  }

  async renderOptionsBlock() {
    const container = document.createElement('div');
    container.className = 'commonOptions';
    const tempDeg = await this.degreesSetting();
    const wind = await this.windSetting();
    const color = await this.colorSetting();
    container.append(tempDeg, wind, color);
    return container;
  }

  async render() {
    super.render();
    const content = document.createElement('div');
    content.className = 'settingsContent';
    const location = await this.renderCurrentLocation();
    const icon = await this.renderDayPart();
    const settings = document.createElement('div');
    settings.className = 'settingsOptions';
    const options = await this.renderOptionsBlock();
    content.append(location, icon);
    settings.append(options);
    this.container.append(content, settings);
    return this.container;
  }
}

export default SettingsPage;
