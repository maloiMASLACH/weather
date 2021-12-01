class GetInfo {
  getWhatINeed(sity) {
    return fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=01960bba4b6a444a831133935212311&q=${sity}&days=3&aqi=yes&alerts=yes`,
    ).then((res) => {
      return res.json();
    });
  }

  sityAPI(text) {
    return fetch(
      `https://autocomplete.travelpayouts.com/places2?term=${text}&locale=en&types[]=city`,
    ).then((res) => {
      return res.json();
    });
  }

  async showAll(sity) {
    const list = await this.getWhatINeed(sity);
    return list;
  }

  async sityes(text) {
    const list = await this.sityAPI(text);
    return list;
  }
}
export default GetInfo;
