import icons from '../../../data/icons';

export default class Slider {
  slide(slider) {
    slider.addEventListener(
      'mousewheel',
      (e) => {
        const ev = window.event || e;
        const delta = Math.max(-1, Math.min(1, ev.wheelDelta || -ev.detail));
        slider.scrollLeft -= delta * 10;
        setTimeout(() => {
          slider.scrollLeft -= delta * 10;
        }, 10);
        setTimeout(() => {
          slider.scrollLeft -= delta * 10;
        }, 20);
        setTimeout(() => {
          slider.scrollLeft -= delta * 10;
        }, 30);
        setTimeout(() => {
          slider.scrollLeft -= delta * 10;
        }, 40);
        ev.preventDefault();
      },
      false,
    );
  }

  clockBlocks(info) {
    const blocks = document.createElement('div');
    blocks.className = 'forecast';
    for (
      let i = info.location.localtime.split(' ')[1].split(':')[0];
      i < 24;
      i++
    ) {
      const block = document.createElement('div');
      block.className = 'clockForecast';
      block.style.transform = 'translateX(0px)';
      if (localStorage.getItem('degrees') === 'F') {
        block.textContent = `${info.forecast.forecastday[0].hour[i].temp_f}°F`;
      } else {
        block.textContent = `${info.forecast.forecastday[0].hour[i].temp_c}°C`;
      }
      const time = document.createElement('p');
      time.textContent = `${
        info.forecast.forecastday[0].hour[i].time.split(' ')[1]
      }`;

      let dayPart;
      if (
        time.textContent.split(':')[0]
          > info.forecast.forecastday[0].astro.sunrise.split(':')[0]
        || time.textContent.split(':')[0]
          >= +info.forecast.forecastday[0].astro.sunset.split(':')[0] + 12
      ) {
        dayPart = 'night';
      } else {
        dayPart = 'day';
      }
      const img = document.createElement('img');
      img.src = `./light/${dayPart}/${
        icons[info.forecast.forecastday[0].hour[i].condition.text]
      }.png`;
      img.style.width = '70%';
      block.append(img, time);
      blocks.append(block);
    }
    for (let i = 1; i < info.forecast.forecastday.length; i++) {
      for (let j = 0; j < 24; j++) {
        const block = document.createElement('div');
        block.className = 'clockForecast';
        if (localStorage.getItem('degrees') === 'F') {
          block.textContent = `${info.forecast.forecastday[i].hour[j].temp_f}°F`;
        } else {
          block.textContent = `${info.forecast.forecastday[i].hour[j].temp_c}°C`;
        }
        const time = document.createElement('p');
        time.textContent = `${
          info.forecast.forecastday[i].hour[j].time.split(' ')[1]
        }`;
        let dayPart;
        if (
          time.textContent.split(':')[0]
            < info.forecast.forecastday[i].astro.sunrise.split(':')[0]
          || time.textContent.split(':')[0]
            >= +info.forecast.forecastday[i].astro.sunset.split(':')[0] + 12
        ) {
          dayPart = 'night';
        } else {
          dayPart = 'day';
        }
        const img = document.createElement('img');
        img.src = `./light/${dayPart}/${
          icons[info.forecast.forecastday[i].hour[j].condition.text]
        }.png`;
        img.style.width = '70%';

        block.append(img, time);
        blocks.append(block);
      }
    }
    // new SlideAction(blocks).slide();
    this.slide(blocks);
    return blocks;
  }

  slider(info) {
    const slider = document.createElement('div');
    slider.className = 'slider';

    const leftArrow = document.createElement('img');
    leftArrow.src = './light/arrow.png';
    leftArrow.style.transform = 'scaleX(-1)';
    leftArrow.className = 'arrow';

    const rightArrow = document.createElement('img');
    rightArrow.src = './light/arrow.png';
    rightArrow.className = 'arrow';

    const blocks = this.clockBlocks(info, leftArrow, rightArrow);
    slider.append(leftArrow, blocks, rightArrow);
    return slider;
  }

  render(leftBlock, info) {
    const blocks = this.slider(info);
    leftBlock.append(blocks);
  }
}
