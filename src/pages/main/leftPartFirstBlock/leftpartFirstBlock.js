import icons from '../../../data/icons';
import Slider from '../slider/slider';
import LocalStorage, { storageConstants } from '../../../data/localStorage';

export default class LeftPartFirstBlock {
  renderCurrentLocation(info) {
    const container = document.createElement('div');
    const town = document.createElement('p');
    town.classList = 'currentTown';
    town.textContent = info.location.name;
    const country = document.createElement('p');
    country.classList = 'currentCountry';
    country.textContent = info.location.country;
    container.append(town, country);
    return container;
  }

  async renderCurrentWetherIcon(info) {
    const icon = document.createElement('img');
    icon.className = 'icon';

    icon.src = `./light/${await new LocalStorage().get(
      storageConstants.dayPart,
    )}/${icons[info.current.condition.text]}.png`;

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

  async renderSwitcher() {
    const switchBlock = document.createElement('div');
    switchBlock.className = 'switcher';
    const switcher = document.createElement('input');
    switcher.type = 'checkbox';
    switcher.id = 'switch';
    if (await new LocalStorage().get(storageConstants.degrees) === 'F') {
      switcher.checked = true;
    }
    switcher.onclick = async () => {
      if (switcher.checked) {
        await new LocalStorage().store(storageConstants.degrees, 'F');
      }
      if (!switcher.checked) {
        await new LocalStorage().store(storageConstants.degrees, 'C');
      }
    };

    const label = document.createElement('label');
    label.setAttribute('for', switcher.id);
    label.textContent = 'C F';
    switchBlock.append(switcher, label);
    return switchBlock;
  }

  async renderFirstBlock(info) {
    const container = document.createElement('div');
    const icon = await this.renderCurrentWetherIcon(info);
    const town = this.renderCurrentLocation(info);
    const currentTemp = this.renderCurrentTemp(info);
    const time = this.renderCurrentDate(info);
    container.append(icon, town, currentTemp, time);
    return container;
  }

  async renderShortInfoLine(info) {
    const line = document.createElement('div');
    line.className = 'shortInfoLine';
    let wind;
    if (await new LocalStorage().get(storageConstants.wind) === 'mp/h') {
      wind = info.current.wind_mph;
    } else {
      wind = info.current.wind_kph;
    }
    const lineInfo = [
      `Wind ${wind} ${await new LocalStorage().get(storageConstants.wind) || 'km/h'}`,
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

  async reRenderBlock(leftBlock, info) {
    leftBlock.children[0].children[0].children[2].innerHTML = '';
    const commonInfoLeft = await this.renderCurrentTemp(info);
    leftBlock.children[0].children[0].children[2].append(commonInfoLeft);

    await new Slider().changeDegrees(info, leftBlock.children[2].children[1].children);
  }

  async renderLeftBlock(info) {
    const leftBlock = document.createElement('div');
    leftBlock.className = 'leftBlock';
    const leftBlockFirstLay = document.createElement('div');
    leftBlockFirstLay.className = 'leftBlockFirstLay';
    const commonInfoLeft = await this.renderFirstBlock(info);
    const switcher = await this.renderSwitcher();
    leftBlockFirstLay.append(commonInfoLeft, switcher);

    const leftBlockSecondLay = document.createElement('div');
    leftBlockSecondLay.className = 'leftBlockSecondLay';
    const shortLine = await this.renderShortInfoLine(info);
    leftBlockSecondLay.append(shortLine);

    leftBlock.append(leftBlockFirstLay, leftBlockSecondLay);

    switcher.onchange = async () => {
      await this.reRenderBlock(leftBlock, info);
    };
    return (leftBlock);
  }
}
