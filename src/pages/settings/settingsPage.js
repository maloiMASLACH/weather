import PageTemplate from '../../templates/pageTemplate';
import './settingsPage.css';
import themes from '../../data/themes';

const pageState = {
  color: 'rgba(0,222,0,.5)',
  background:
    ' linear-gradient(248.66deg, #91BEF3 0%,rgb(98 113 169) 50%, #91BEF3 100%)',
};
class SettingsPage extends PageTemplate {
  constructor(id, info) {
    super(id, info);
  }

  time() {
    const conteiner = document.createElement('div');
    conteiner.className = 'dayPartSett';
    const pic = document.createElement('img');
    pic.src = `./light/${localStorage.getItem('dayPart')}/sunny.png`;
    const dayPart = document.createElement('p');
    dayPart.className = 'dayPart';
    dayPart.textContent = localStorage.getItem('dayPart');
    conteiner.append(pic, dayPart);
    return conteiner;
  }

  location() {
    const content = document.createElement('div');
    content.classList = 'settingsLocation';
    const title = document.createElement('p');
    const location = document.createElement('p');
    title.className = 'title';
    location.className = 'currentSitySett';
    title.textContent = 'Your current location';
    location.textContent = 'Minsk, Belarus';
    // navigator.geolocation.getCurrentPosition((res)=>{console.log(res)})
    content.append(title, location);
    return content;
  }

  degrees() {
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

  wind() {
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

  color() {
    const colorCon = document.createElement('div');
    colorCon.className = 'tempDegSett';
    const text = document.createElement('p');
    text.textContent = 'Choose theme';
    const demo = document.createElement('div');
    demo.className = 'demo';
    demo.style.background = themes[localStorage.getItem('theme')][localStorage.getItem('dayPart')];
    const conteiner = document.createElement('div');
    conteiner.className = 'colorConteiner';
    Object.keys(themes).forEach((theme) => {
      const colorTempl = document.createElement('div');
      colorTempl.className = 'colorTempl';
      colorTempl.style.background = themes[theme][localStorage.getItem('dayPart')];
      conteiner.append(colorTempl);
    });
    demo.onclick = () => {
      conteiner.style.display = 'flex';
      demo.style.display = 'none';
      for (let i = 0; i < conteiner.children.length; i++) {
        conteiner.children[i].onclick = () => {
          localStorage.setItem('theme', Object.keys(themes)[i]);
          document.body.style.background = themes[Object.keys(themes)[i]][localStorage.getItem('dayPart')];
          demo.style.background = themes[Object.keys(themes)[i]][localStorage.getItem('dayPart')];
          conteiner.style.display = 'none';
          demo.style.display = 'block';
        };
      }
    };
    colorCon.append(text, demo, conteiner);
    return colorCon;
  }

  options() {
    const conteiner = document.createElement('div');
    conteiner.className = 'commonOptions';
    const tempDeg = this.degrees();
    const wind = this.wind();
    const color = this.color();
    conteiner.append(tempDeg, wind, color);
    return conteiner;
  }

  render() {
    const page = this.createPage(pageState);
    const content = document.createElement('div');
    content.className = 'settingsContent';
    const location = this.location();
    const icon = this.time();
    const settings = document.createElement('div');
    settings.className = 'settingsoptions';
    const options = this.options();
    content.append(location, icon);
    settings.append(options);
    page.append(content, settings);
    this.conteiner.append(page);
    return this.conteiner;
  }
}

export default SettingsPage;
