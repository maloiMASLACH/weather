import icons from '../../../data/icons';

export default class LeftPartFirstBlock {
  currentLocation(info) {
    const conteiner = document.createElement('div');
    const sity = document.createElement('p');
    sity.classList = 'currentSity';
    sity.textContent = info.location.name;
    const country = document.createElement('p');
    country.classList = 'currentCountry';
    country.textContent = info.location.country;
    conteiner.append(sity, country);
    return conteiner;
  }

  currenWetherIcon(info) {
    const icon = document.createElement('img');
    icon.className = 'icon';
    icon.src = `./light/${icons[info.current.condition.text]}.png`;
    return icon;
  }

  currentTemp(info) {
    const currentTemp = document.createElement('div');
    currentTemp.classList = 'currentTemp';
    const tempNumber = document.createElement('p');
    tempNumber.classList = 'tempNumber';
    tempNumber.textContent = `${info.current.temp_c}`;
    const degrees = document.createElement('p');
    degrees.classList = 'currentDegrees';
    degrees.textContent = '°C';
    currentTemp.append(tempNumber, degrees);
    return currentTemp;
  }

  currentCondition(info) {
    const condition = document.createElement('p');
    condition.textContent = info.current.condition.text;
    condition.classList = 'condition';
    return condition;
  }

  currentDate() {
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
    date.textContent = `${new Date().getDay()}th ${
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
    }   |   ${new Date().getHours()} : ${(
      `0${new Date().getMinutes().toString()}`
    ).slice(-2)}
    `;
    time.classList = 'currentDay';

    currentTimer.append(date, time);

    setInterval(() => {
      if (
        time.textContent.split(':')[1].slice(1, 3) !== new Date().getUTCMinutes()
      ) {
        time.textContent = `${
          days[new Date().getDay()]
        }   |   ${new Date().getHours()} : ${(
          `0${new Date().getMinutes().toString()}`
        ).slice(-2)}
        `;
      }
    }, 1000);

    return currentTimer;
  }

  switcher() {
    const swithcBlock = document.createElement('div');
    swithcBlock.className = 'switcher';
    const switcher = document.createElement('input');
    switcher.type = 'checkbox';
    switcher.id = 'switch';
    const label = document.createElement('label');
    label.setAttribute('for', switcher.id);
    label.textContent = 'C F';
    swithcBlock.append(switcher, label);
    return swithcBlock;
  }

  firstBlock(info) {
    const conteiner = document.createElement('div');
    const icon = this.currenWetherIcon(info);
    const sity = this.currentLocation(info);
    const currentTemp = this.currentTemp(info);
    //  const condition = this.currentCondition(info);
    const time = this.currentDate(info);
    console.log(time);
    conteiner.append(icon, sity, currentTemp, time);
    return conteiner;
  }

  shortInfoLine(info) {
    const line = document.createElement('div');
    line.className = 'shortInfoLine';
    const lineInfo = [
      `Wind ${info.current.wind_kph} km/h`,
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

  leftBlock(leftBlock, info) {
    const leftBlockFirstLay = document.createElement('div');
    leftBlockFirstLay.className = 'leftBlockFirstLay';
    const commonInfoLeft = this.firstBlock(info);
    const switcher = this.switcher();
    leftBlockFirstLay.append(commonInfoLeft, switcher);

    const leftBlockSecondLay = document.createElement('div');
    leftBlockSecondLay.className = 'leftBlockSecondLay';
    const shortLine = this.shortInfoLine(info);
    leftBlockSecondLay.append(shortLine);
    leftBlock.append(leftBlockFirstLay, leftBlockSecondLay);
  }
}
