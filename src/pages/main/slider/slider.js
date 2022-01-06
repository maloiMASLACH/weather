import icons from '../../../data/icons';
import ErrorHandler from '../../../errorsHandler/errorHandler';
import LocalStorage, { storageConstants } from '../../../data/localStorage';

export default class Slider {
  slideByScroll(slider) {
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

  slideByTouch(slider) {
    let start = 0;
    let scrollLeft = 0;
    slider.addEventListener('touchstart', (e) => {
      scrollLeft = -slider.scrollLeft;
      start = e.touches[0].clientX;
    });
    slider.addEventListener('touchmove', (e) => {
      slider.scrollLeft = -(+scrollLeft + e.touches[0].clientX - start);
    });
    slider.addEventListener('touchend', () => {
      scrollLeft = -slider.scrollLeft;
    });
  }

  slideByArrows(slider, left, right) {
    left.addEventListener('click', () => {
      for (let i = 0; i < 50; i++) {
        setTimeout(() => { slider.scrollLeft -= slider.offsetWidth / 50; }, i * 5);
      }
    });
    right.addEventListener('click', () => {
      for (let i = 0; i < 50; i++) {
        setTimeout(() => { slider.scrollLeft += slider.offsetWidth / 50; }, i * 5);
      }
    });
  }

  async renderClockBlocks(info, left, right) {
    const blocks = document.createElement('div');
    const degrees = await new LocalStorage().get(storageConstants.degrees);
    blocks.className = 'forecast';
    for (
      let i = info.location.localtime.split(' ')[1].split(':')[0];
      i < 24;
      i++
    ) {
      const block = document.createElement('div');
      block.className = 'clockForecast';
      const temp = document.createElement('p');
      if (degrees === 'F') {
        temp.textContent = `${info.forecast.forecastday[0].hour[i].temp_f}°F`;
      } else {
        temp.textContent = `${info.forecast.forecastday[0].hour[i].temp_c}°C`;
      }
      const time = document.createElement('p');
      time.textContent = `${
        info.forecast.forecastday[0].hour[i].time.split(' ')[1]
      }`;

      let dayPart;
      if (
        time.textContent.split(':')[0]
          <= info.forecast.forecastday[0].astro.sunrise.split(':')[0]
        || time.textContent.split(':')[0]
          > +info.forecast.forecastday[0].astro.sunset.split(':')[0] + 12
      ) {
        dayPart = 'night';
      } else {
        dayPart = 'day';
      }
      const img = document.createElement('img');
      if (icons[info.forecast.forecastday[0].hour[i].condition.text] === undefined) {
        new ErrorHandler().contentError('Some images are lost');
      }
      img.src = `./light/${dayPart}/${
        icons[info.forecast.forecastday[0].hour[i].condition.text]
      }.png`;
      img.style.width = '70%';
      block.append(temp, img, time);
      blocks.append(block);
    }
    for (let i = 1; i < info.forecast.forecastday.length; i++) {
      for (let j = 0; j < 24; j++) {
        const block = document.createElement('div');
        block.className = 'clockForecast';
        const temp = document.createElement('p');
        if (degrees === 'F') {
          temp.textContent = `${info.forecast.forecastday[i].hour[j].temp_f}°F`;
        } else {
          temp.textContent = `${info.forecast.forecastday[i].hour[j].temp_c}°C`;
        }
        const time = document.createElement('p');
        time.textContent = `${
          info.forecast.forecastday[i].hour[j].time.split(' ')[1]
        }`;
        let dayPart;
        if (
          time.textContent.split(':')[0]
            <= info.forecast.forecastday[i].astro.sunrise.split(':')[0]
          || time.textContent.split(':')[0]
            > +info.forecast.forecastday[i].astro.sunset.split(':')[0] + 12
        ) {
          dayPart = 'night';
        } else {
          dayPart = 'day';
        }
        const img = document.createElement('img');
        if (icons[info.forecast.forecastday[i].hour[j].condition.text] === undefined) {
          new ErrorHandler().contentError('Some images are lost');
        }
        img.src = `./light/${dayPart}/${
          icons[info.forecast.forecastday[i].hour[j].condition.text]
        }.png`;
        img.style.width = '70%';

        block.append(temp, img, time);
        blocks.append(block);
      }
    }
    await this.slideByScroll(blocks);
    await this.slideByTouch(blocks);
    await this.slideByArrows(blocks, left, right);
    return blocks;
  }

  async changeDegrees(info, slider) {
    const degrees = await new LocalStorage().get(storageConstants.degrees);
    const arr = [];
    for (let i = info.location.localtime.split(' ')[1].split(':')[0]; i < 24; i++) {
      if (degrees === 'F') {
        arr.push(info.forecast.forecastday[0].hour[i].temp_f);
      } else {
        arr.push(info.forecast.forecastday[0].hour[i].temp_c);
      }
    }
    for (let i = 1; i < info.forecast.forecastday.length; i++) {
      for (let j = 0; j < 24; j++) {
        if (degrees === 'F') {
          arr.push(info.forecast.forecastday[i].hour[j].temp_f);
        } else {
          arr.push(info.forecast.forecastday[i].hour[j].temp_c);
        }
      }
    }
    for (let i = 0; i < slider.length; i++) {
      slider[i].children[0].textContent = `${arr[i]}°${degrees}`;
    }
  }

  async renderSlider(info) {
    const slider = document.createElement('div');
    slider.className = 'slider';

    const leftArrow = document.createElement('img');
    leftArrow.src = './light/arrow.png';
    leftArrow.style.transform = 'scaleX(-1)';
    leftArrow.className = 'arrow';

    const rightArrow = document.createElement('img');
    rightArrow.src = './light/arrow.png';
    rightArrow.className = 'arrow';

    const blocks = await this.renderClockBlocks(info, leftArrow, rightArrow);
    slider.append(leftArrow, blocks, rightArrow);
    return slider;
  }

  async render(info) {
    const blocks = await this.renderSlider(info);
    return blocks;
  }
}
