import PageTemplate from '../../templates/pageTemplate';
import './settingsPage.css';
import themes from '../../data/themes';

class SettingsPage extends PageTemplate {
  constructor(id, info) {
    super(id, info);
  }

  renderDayPart() {
    const container = document.createElement('div');
    container.className = 'dayPartSett';
    const pic = document.createElement('img');
    pic.src = `./light/${localStorage.getItem('dayPart')}/sunny.png`;
    const dayPart = document.createElement('p');
    dayPart.className = 'dayPart';
    dayPart.textContent = localStorage.getItem('dayPart');
    container.append(pic, dayPart);
    return container;
  }

  renderCurrentLocation() {
    const content = document.createElement('div');
    content.classList = 'settingsLocation';
    const title = document.createElement('p');
    const location = document.createElement('p');
    title.className = 'title';
    location.className = 'currentSitySett';
    title.textContent = 'Your current location';
    location.textContent = localStorage.getItem('sity') || 'Minsk';
    // navigator.geolocation.getCurrentPosition((res)=>{console.log(res)})
    content.append(title, location);
    return content;
  }

  degreesSetting() {
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
    if (localStorage.getItem('degrees') === 'F') {
      tempSel.children[1].setAttribute('selected', 'selected');
    } else {
      tempSel.children[0].setAttribute('selected', 'selected');
    }
    tempSel.onchange = () => {
      localStorage.setItem('degrees', tempSel.value[1]);
    };
    tempDeg.append(text, tempSel);
    return tempDeg;
  }

  windSetting() {
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
    if (localStorage.getItem('wind') === 'mp/h') {
      windSel.children[1].setAttribute('selected', 'selected');
    } else {
      windSel.children[0].setAttribute('selected', 'selected');
    }
    windSel.onchange = () => {
      localStorage.setItem('wind', windSel.value);
    };
    windCon.append(text, windSel);
    return windCon;
  }

  colorSetting() {
    const colorCon = document.createElement('div');
    colorCon.className = 'tempDegSett';
    const text = document.createElement('p');
    text.textContent = 'Choose theme';
    const demo = document.createElement('div');
    demo.className = 'demo';
    if (localStorage.getItem('theme') && localStorage.getItem('dayPart')) {
      demo.style.background = themes[localStorage.getItem('theme')][localStorage.getItem('dayPart')];
    }
    const container = document.createElement('div');
    container.className = 'colorConteiner';
    Object.keys(themes).forEach((theme) => {
      const colorTempl = document.createElement('div');
      colorTempl.className = 'colorTempl';
      colorTempl.style.background = themes[theme][localStorage.getItem('dayPart')];
      container.append(colorTempl);
    });
    demo.onclick = () => {
      container.style.display = 'flex';
      demo.style.display = 'none';
      for (let i = 0; i < container.children.length; i++) {
        container.children[i].onclick = () => {
          localStorage.setItem('theme', Object.keys(themes)[i]);
          if (document.documentElement.clientWidth <= 425) {
            document.body.children[0].style.background = themes[Object.keys(themes)[i]][localStorage.getItem('dayPart')];
          }
          document.body.style.background = themes[Object.keys(themes)[i]][localStorage.getItem('dayPart')];
          demo.style.background = themes[Object.keys(themes)[i]][localStorage.getItem('dayPart')];
          container.style.display = 'none';
          demo.style.display = 'block';
        };
      }
    };
    colorCon.append(text, demo, container);
    return colorCon;
  }

  renderOptionsBlock() {
    const container = document.createElement('div');
    container.className = 'commonOptions';
    const tempDeg = this.degreesSetting();
    const wind = this.windSetting();
    const color = this.colorSetting();
    container.append(tempDeg, wind, color);
    return container;
  }

  render() {
    const page = this.createPage();
    const content = document.createElement('div');
    content.className = 'settingsContent';
    const location = this.renderCurrentLocation();
    const icon = this.renderDayPart();
    const settings = document.createElement('div');
    settings.className = 'settingsoptions';
    const options = this.renderOptionsBlock();
    content.append(location, icon);
    settings.append(options);
    page.append(content, settings);
    this.container.append(page);
    return this.container;
  }
}

export default SettingsPage;
