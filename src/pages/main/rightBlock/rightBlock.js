import App from '../../../app';
import GetInfo from '../../../data/storage';
import themes from '../../../data/themes';

export default class RightBlock {
  async renderHelpBlocks(text, conteiner, input) {
    const info = await new GetInfo().sityes(text);
    console.log(info);
    const help = document.createElement('div');
    help.style.background = themes[localStorage.getItem('dayPart')];
    if (info.length) {
      for (let i = 0; i < info.length; i++) {
        if (i < 5) {
          const option = document.createElement('p');
          option.textContent = info[i].name;
          option.addEventListener('click', () => {
            input.value = option.textContent;
          });
          help.append(option);
        }
        conteiner.innerHTML = '';
        conteiner.append(help);
      }
    } else {
      conteiner.innerHTML = '';
    }
    document.addEventListener('click', () => {
      conteiner.innerHTML = '';
    });
  }

  inputBlock() {
    const conteiner = document.createElement('div');
    conteiner.className = 'inputdiv';
    const input = document.createElement('input');
    input.className = 'searchPanel';
    const help = document.createElement('div');
    help.className = 'helpBloks';
    input.addEventListener('keyup', (e) => {
      if (e.code === 'Enter') {
        localStorage.setItem('sity', input.value);
        const app = new App();
        app.renderNewPAge('Home');
      }
      this.renderHelpBlocks(input.value, help, input);
    });

    const icon = document.createElement('img');
    icon.src = './light/search.png';
    icon.addEventListener('click', () => {
      localStorage.setItem('sity', input.value);
      localStorage.setItem('favorites', [localStorage.getItem('favorites'), input.value]);
      const app = new App();
      app.renderNewPAge('Home');
    });
    conteiner.append(input, icon, help);
    return conteiner;
  }

  clocks(info) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const centerX = canvas.width / (2 * 1.2);
    const centerY = canvas.height / 2;
    /* ctx.translate(centerX, centerY);
    ctx.rotate(((info.split(":")[0] * 30 - 90) * Math.PI) / 180);
    ctx.fillStyle = "#E0E0E0";
    ctx.fillRect(-2, -2, 40, 6);
    ctx.rotate(-((info.split(":")[0] * 30 - 90) * Math.PI) / 180);
    ctx.rotate(
      (((info.split(":")[1].split(" ")[0] / 60) * 360 - 90) * Math.PI) / 180
    );
    ctx.fillStyle = "#828282";
    ctx.fillRect(-2, -2, 60, 4);

    console.log(canvas); */
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

  clocksBlock(info) {
    const events = ['Sunrise', 'Last Update', 'Sunset'];
    const eventTime = [
      info.forecast.forecastday[0].astro.sunrise.split(' ')[0],
      info.current.last_updated.split(' ')[1],
      info.forecast.forecastday[0].astro.sunset.split(' ')[0],
    ];
    const conteiner = document.createElement('div');
    conteiner.className = 'allClocks';

    for (let i = 0; i < 3; i++) {
      const smallBlock = document.createElement('div');
      smallBlock.className = 'clockBlock';
      const text = document.createElement('p');
      text.className = 'dayEvent';
      text.textContent = events[i];

      const clocks = this.clocks(eventTime[i]);
      const canvasConteiner = document.createElement('div');
      canvasConteiner.className = 'clock';
      const time = document.createElement('p');
      time.textContent = eventTime[i];
      canvasConteiner.append(clocks, time);
      smallBlock.append(text, canvasConteiner);

      conteiner.append(smallBlock);
    }
    return conteiner;
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
    const conteiner = document.createElement('div');
    conteiner.className = 'indexes';
    const indexes = ['Air Quality', 'UV Index'];
    const values = [
      info.current.air_quality['us-epa-index'],
      Math.round(info.current.uv / 2),
    ];
    const condition = ['Low', 'Moderate', 'Medium', 'Height', 'Extream'];
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

      conteiner.append(index);
    });
    return conteiner;
  }

  render(rightBlock, info) {
    const input = this.inputBlock(info);
    const clocks = this.clocksBlock(info);
    const indexes = this.indexesBlock(info);
    rightBlock.append(input, clocks, indexes);
    return rightBlock;
  }
}
