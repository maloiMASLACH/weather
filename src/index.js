import App from "./app";

const app = new App();
app.run();
/* import './style.css';

class GetInfo {
  getWhatINeed() {
    return fetch(
      'https://api.weatherapi.com/v1/forecast.json?key=01960bba4b6a444a831133935212311&q=Minsk&days=1&aqi=no&alerts=no',
    ).then((res) => { this.allInfo = res; return res.json(); });
  }
}

const showAll = async () => {
  const list = await new GetInfo().getWhatINeed();
  console.log(list);
};
showAll(); */
