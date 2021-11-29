import icons from "../../../data/icons";
export default class RightBlock {
  inputBlock(info) {
    const conteiner = document.createElement("div");
    conteiner.className = "inputdiv";
    const input = document.createElement("input");
    input.className = "searchPanel";
    const icon = document.createElement("img");
    icon.src = "./light/search.png";
    conteiner.append(input, icon);
    return conteiner;
  }
  clocks(info) {
      
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const centerX = canvas.width / 2*0.4;
    const centerY = canvas.height / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate(((info.split(":")[0] * 30 - 90) * Math.PI) / 180);
    ctx.fillStyle = "#E0E0E0";
    ctx.fillRect(0, 0, 40, 6);
    ctx.rotate(-((info.split(":")[0] * 30 - 90) * Math.PI) / 180);
    ctx.rotate(
      (((info.split(":")[1].split(" ")[0] / 60) * 360 -90) * Math.PI) / 180
    );
    ctx.fillStyle = "#828282";
    ctx.fillRect(-2, -2, 60, 6);

    console.log(canvas);
    return canvas;
  }
  clocksBlock(info) {
    const events = ["Sunrise", "Last Update", "Sunset"];
    const eventTime = [
      info.forecast.forecastday[0].astro.sunrise.split(' ')[0],
      info.current.last_updated.split(' ')[1],
      info.forecast.forecastday[0].astro.sunset.split(' ')[0],
    ];
    const conteiner = document.createElement("div");
    conteiner.className = "allClocks";
    
    for (let i = 0; i < 3; i++) {
      let smallBlock = document.createElement("div");
      smallBlock.className = "clockBlock";
      let text = document.createElement("p");
      text.className = "dayEvent";
      text.textContent = events[i];
      
      const clocks = this.clocks(eventTime[i]);
      const canvasConteiner=document.createElement('div')
    canvasConteiner.className='clock'
        const time=document.createElement('p')
        time.textContent=eventTime[i]
     canvasConteiner.append(clocks,time)
      smallBlock.append(text,canvasConteiner);

      conteiner.append( smallBlock);
    }
    return conteiner;
  }

  render(rightBlock, info) {
    const input = this.inputBlock(info);
    const clocks = this.clocksBlock(info);
    rightBlock.append(input, clocks);
    return rightBlock;
  }
}
