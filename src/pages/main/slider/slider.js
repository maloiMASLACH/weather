import icons from '../../../data/icons';
import ErrorHandler from '../../../errorsHandler/errorHandeler';

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

  touchSlider(slider) {
    let start = 0;
    let scrollLeft = 0;
    slider.addEventListener('touchstart', (e) => {
      start = e.touches[0].clientX;
    });
    slider.addEventListener('touchmove', (e) => {
      slider.scrollLeft = -(+scrollLeft + e.touches[0].clientX - start);
    });
    slider.addEventListener('touchend', () => {
      scrollLeft = -slider.scrollLeft;
    });
  }

  arrows(slider, left, right) {
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

  clockBlocks(info, left, right) {
    const blocks = document.createElement('div');
    blocks.className = 'forecast';
    for (
      let i = info.location.localtime.split(' ')[1].split(':')[0];
      i < 24;
      i++
    ) {
      const block = document.createElement('div');
      block.className = 'clockForecast';
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
        new ErrorHandler().imgError();
      }
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
          new ErrorHandler().imgError();
        }
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
    this.touchSlider(blocks);
    this.arrows(blocks, left, right);
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
