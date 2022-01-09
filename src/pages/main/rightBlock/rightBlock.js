import PageRender from '../../../templates/pageRender';
import GetInfo from '../../../data/getInfo';
import themes from '../../../data/themes';
import LocalStorage, { storageConstants } from '../../../data/localStorage';
import ErrorHandler from '../../../errorsHandler/errorHandler';

export default class RightBlock {
  async useChanges(value) {
    try {
      await new LocalStorage().store(
        storageConstants.townInput,
        await new LocalStorage().get(storageConstants.town) || 'Minsk',
      );
      await new LocalStorage().store(storageConstants.town, value);

      await new PageRender().renderNewPAge('Home');

      const favorites = await new LocalStorage().get(storageConstants.favorites);
      if (!favorites
      || favorites.split(',').indexOf(value) === -1) {
        await new LocalStorage().store(storageConstants.favorites, [
          await new LocalStorage().get(storageConstants.favorites), value]);
      }
    } catch (err) {
      await new LocalStorage().store(storageConstants.town, await new LocalStorage().get(storageConstants.townInput));
      await new PageRender().renderNewPAge('Home');
      await new ErrorHandler().contentError('Bad request');
    }
  }

  async renderHelpBlocks(text, container) {
    const info = await new GetInfo().townList(text);
    const help = document.createElement('div');
    help.style.background = themes[await new LocalStorage().get(storageConstants.theme)][
      await new LocalStorage().get(storageConstants.dayPart)];
    if (info.length) {
      for (let i = 0; i < info.length; i++) {
        if (i < 5) {
          const option = document.createElement('p');
          option.textContent = info[i].name;
          option.addEventListener('click', async () => {
            await new LocalStorage().store(storageConstants.inputValue, option.textContent);
            await this.useChanges(option.textContent);
          });
          help.append(option);
        }
        container.innerHTML = '';
        container.append(help);
      }
    } else {
      container.innerHTML = '';
    }
    document.addEventListener('click', () => {
      container.innerHTML = '';
    });
  }

  async renderInputBlock() {
    const container = document.createElement('div');
    container.className = 'inputDiv';
    const input = document.createElement('input');
    input.className = 'searchPanel';
    input.value = await new LocalStorage().get(storageConstants.inputValue) || '';
    const help = document.createElement('div');
    help.className = 'helpBlocs';
    input.addEventListener('keyup', async (e) => {
      if (e.code === 'Enter') {
        await this.useChanges(input.value);
      }
      await new LocalStorage().store(storageConstants.inputValue, input.value);
      this.renderHelpBlocks(input.value, help, input);
    });

    const icon = document.createElement('img');
    icon.src = './light/search.png';
    icon.addEventListener('click', async () => {
      await this.useChanges(input.value);
    });
    container.append(input, icon, help);
    return container;
  }

  clocksCanvas(info) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const centerX = canvas.width / (2 * 1.2);
    const centerY = canvas.height / 2;
    ctx.beginPath();
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = '8';
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(((info.split(':')[0] * 30 - 90) * Math.PI) / 180) * 50,
      centerY + Math.sin(((info.split(':')[0] * 30 - 90) * Math.PI) / 180) * 50,
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = '6';
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX
        + Math.cos(
          (((info.split(':')[1].split(' ')[0] / 60) * 360 - 90) * Math.PI) / 180,
        )
          * 60,
      centerY
        + Math.sin(
          (((info.split(':')[1].split(' ')[0] / 60) * 360 - 90) * Math.PI) / 180,
        )
          * 50,
    );
    ctx.stroke();

    return canvas;
  }

  renderClocksBlock(info) {
    const events = ['Sunrise', 'Last Update', 'Sunset'];
    const eventTime = [
      info.forecast.forecastday[0].astro.sunrise.split(' ')[0],
      info.current.last_updated.split(' ')[1],
      info.forecast.forecastday[0].astro.sunset.split(' ')[0],
    ];
    const container = document.createElement('div');
    container.className = 'allClocks';

    for (let i = 0; i < 3; i++) {
      const smallBlock = document.createElement('div');
      smallBlock.className = 'clockBlock';
      const text = document.createElement('p');
      text.className = 'dayEvent';
      text.textContent = events[i];

      const clocks = this.clocksCanvas(eventTime[i]);
      const canvasContainer = document.createElement('div');
      canvasContainer.className = 'clock';
      const time = document.createElement('p');
      time.textContent = eventTime[i];
      canvasContainer.append(clocks, time);
      smallBlock.append(text, canvasContainer);

      container.append(smallBlock);
    }
    return container;
  }

  renderIndexCanvas(info) {
    const colors = [
      'rgba(255, 255, 255, 0.24)',
      'rgba(172, 142, 255, 0.78)',
      'rgba(152, 116, 255, 0.83)',
      'rgba(134, 92, 253, 0.85)',
      ' #713FFD',
    ];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.width = '100%';
    colors.forEach((color) => {
      ctx.beginPath();
      ctx.lineWidth = 5;
      const startK = 1 + colors.indexOf(color) * 0.2;
      const endK = 1 + (colors.indexOf(color) + 1) * 0.2;
      ctx.arc(150, 155, 125, Math.PI * startK, Math.PI * endK, false);
      ctx.strokeStyle = color;
      ctx.stroke();
    });

    const point = 1 + info * 0.2;
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.arc(
      150,
      155,
      125,
      Math.PI * point - 0.05,
      Math.PI * point + 0.05,
      false,
    );
    ctx.strokeStyle = 'white';
    ctx.stroke();

    return canvas;
  }

  indexesBlock(info) {
    const container = document.createElement('div');
    container.className = 'indexes';
    const indexes = ['Air Quality', 'UV Index'];
    const values = [
      info.current.air_quality['us-epa-index'],
      Math.round(info.current.uv / 2),
    ];
    const condition = ['Low', 'Moderate', 'Medium', 'Height', 'Extreme'];
    indexes.forEach((indexName) => {
      const index = document.createElement('div');
      index.className = 'index';
      const indexText = document.createElement('p');
      indexText.textContent = indexName;
      const img = this.renderIndexCanvas(values[indexes.indexOf(indexName)]);
      const indexValue = document.createElement('p');
      indexValue.textContent = `${values[indexes.indexOf(indexName)]}/5 ${
        condition[values[indexes.indexOf(indexName)] - 1]
      }`;
      index.append(indexText, img, indexValue);

      container.append(index);
    });
    return container;
  }

  async render(info) {
    const rightBlock = document.createElement('div');
    rightBlock.className = 'rightBlock';
    const input = await this.renderInputBlock(info);
    const clocks = this.renderClocksBlock(info);
    const indexes = this.indexesBlock(info);
    rightBlock.append(input, clocks, indexes);
    rightBlock.style.background = themes[await new LocalStorage().get(storageConstants.theme)][
      await new LocalStorage().get(storageConstants.dayPart)];
    return rightBlock;
  }
}
