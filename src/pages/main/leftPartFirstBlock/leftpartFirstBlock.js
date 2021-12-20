import icons from '../../../data/icons';
import Slider from '../slider/slider';

export default class LeftPartFirstBlock {
  renderCurrentLocation(info) {
    const container = document.createElement('div');
    const town = document.createElement('p');
    town.classList = 'currentSity';
    town.textContent = info.location.name;
    const country = document.createElement('p');
    country.classList = 'currentCountry';
    country.textContent = info.location.country;
    container.append(town, country);
    return container;
  }

  renderCurrentWetherIcon(info) {
    const icon = document.createElement('img');
    icon.className = 'icon';

    icon.src = `./light/${localStorage.getItem('dayPart')}/${icons[info.current.condition.text]}.png`;

    return icon;
  }

  renderCurrentTemp(info) {
    const currentTemp = document.createElement('div');
    currentTemp.classList = 'currentTemp';
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
    currentTemp.append(tempNumber, degrees);
    return currentTemp;
  }

  renderCurrentDate(info) {
    const currentTimer = document.createElement('div');
    currentTimer.classList = 'currentTimer';
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const date = document.createElement('p');
    date.textContent = `${new Date().getDate()}th ${
      month[new Date().getMonth()]
    } '${new Date().getUTCFullYear().toString().slice(-2)}`;
    date.classList = 'currentDay';

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const time = document.createElement('p');
    time.textContent = `${
      days[new Date().getDay()]
    }   |   ${info.location.localtime.split(' ')[1].split(':')[0]} : ${(
      `0${new Date().getMinutes().toString()}`
    ).slice(-2)}
    `;
    time.classList = 'currentDay';

    currentTimer.append(date, time);

    setInterval(() => {
      if (
        time.textContent.split(':')[1].slice(1, 3) !== new Date().getUTCMinutes()
      ) {
        date.textContent = `${new Date().getDate()}th ${
          month[new Date().getMonth()]
        } '${new Date().getUTCFullYear().toString().slice(-2)}`;
        time.textContent = `${
          days[new Date().getDay()]
        }   |   ${info.location.localtime.split(' ')[1].split(':')[0]} : ${(
          `0${new Date().getMinutes().toString()}`
        ).slice(-2)}
        `;
      }
    }, 1000);

    return currentTimer;
  }

  renderSwitcher() {
    const switchBlock = document.createElement('div');
    switchBlock.className = 'switcher';
    const switcher = document.createElement('input');
    switcher.type = 'checkbox';
    switcher.id = 'switch';
    if (localStorage.getItem('degrees') === 'F') {
      switcher.checked = true;
    }
    switcher.onclick = () => {
      if (switcher.checked) {
        localStorage.setItem('degrees', 'F');
      }
      if (!switcher.checked) {
        localStorage.setItem('degrees', 'C');
      }
    };

    const label = document.createElement('label');
    label.setAttribute('for', switcher.id);
    label.textContent = 'C F';
    switchBlock.append(switcher, label);
    return switchBlock;
  }

  renderFirstBlock(info) {
    const container = document.createElement('div');
    const icon = this.renderCurrentWetherIcon(info);
    const town = this.renderCurrentLocation(info);
    const currentTemp = this.renderCurrentTemp(info);
    const time = this.renderCurrentDate(info);
    container.append(icon, town, currentTemp, time);
    return container;
  }

  renderShortInfoLine(info) {
    const line = document.createElement('div');
    line.className = 'shortInfoLine';
    let wind;
    if (localStorage.getItem('wind') === 'mp/h') {
      wind = info.current.wind_mph;
    } else {
      wind = info.current.wind_kph;
    }
    const lineInfo = [
      `Wind ${wind} ${localStorage.getItem('wind') || 'km/h'}`,
      `Hum ${info.current.humidity} %`,
      `Rain ${info.forecast.forecastday[0].day.daily_chance_of_rain} %`,
    ];
    for (let i = 0; i < 3; i++) {
      const img = document.createElement('img');
      img.src = `./light/icon_${i}.png`;

      const text = document.createElement('p');
      text.textContent = lineInfo[i];
      line.append(img, text);
    }
    return line;
  }

  reRenderBlock(leftBlock, info) {
    leftBlock.children[0].children[0].innerHTML = '';
    leftBlock.children[2].remove();
    const commonInfoLeft = this.renderFirstBlock(info);
    const slider = new Slider().renderSlider(info);
    leftBlock.append(slider);
    leftBlock.children[0].children[0].append(commonInfoLeft);
  }

  renderLeftBlock(info) {
    const leftBlock = document.createElement('div');
    leftBlock.className = 'leftBlock';
    const leftBlockFirstLay = document.createElement('div');
    leftBlockFirstLay.className = 'leftBlockFirstLay';
    const commonInfoLeft = this.renderFirstBlock(info);
    const switcher = this.renderSwitcher();
    leftBlockFirstLay.append(commonInfoLeft, switcher);

    const leftBlockSecondLay = document.createElement('div');
    leftBlockSecondLay.className = 'leftBlockSecondLay';
    const shortLine = this.renderShortInfoLine(info);
    leftBlockSecondLay.append(shortLine);

    leftBlock.append(leftBlockFirstLay, leftBlockSecondLay);

    switcher.onchange = () => {
      this.reRenderBlock(leftBlock, info);
    };
    return (leftBlock);
  }
}
