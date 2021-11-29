import icons from '../../../data/icons';

export default class Slider {
  slide(slider){
    slider.addEventListener(
      "mousewheel",
      (event) => {
        event = window.event || event;
        var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
        slider.scrollLeft -= delta * 10;
        setTimeout(()=>{slider.scrollLeft -= delta * 10},10)
        setTimeout(()=>{slider.scrollLeft -= delta * 10},20)
        setTimeout(()=>{slider.scrollLeft -= delta * 10},30)
        setTimeout(()=>{slider.scrollLeft -= delta * 10},40)

        event.preventDefault();
      },
      false
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
      block.textContent = `${info.forecast.forecastday[0].hour[i].temp_c}°C`;
      const img = document.createElement('img');
      img.src = `./light/${
        icons[info.forecast.forecastday[0].hour[i].condition.text]
      }.png`;
      img.style.width = '70%';
      const time = document.createElement('p');
      time.textContent = `${info.forecast.forecastday[0].hour[i].time.split(' ')[1]}`;
      block.append(img, time);
      blocks.append(block);
    }
    for (let i = 1; i < info.forecast.forecastday.length; i++) {
      for (let j = 0; j < 24; j++) {
        const block = document.createElement('div');
        block.className = 'clockForecast';
        block.textContent = `${info.forecast.forecastday[i].hour[j].temp_c}°C`;
        const img = document.createElement('img');
        img.src = `./light/${
          icons[info.forecast.forecastday[i].hour[j].condition.text]
        }.png`;
        img.style.width = '70%';
        const time = document.createElement('p');
        time.textContent = `${info.forecast.forecastday[i].hour[j].time.split(' ')[1]}`;
        block.append(img, time);
        blocks.append(block);
      }
    }
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
