class GetInfo {
  getWhatINeed() {
    return fetch(
      'https://api.weatherapi.com/v1/forecast.json?key=01960bba4b6a444a831133935212311&q=Minsk&days=3&aqi=yes&alerts=yes',
    ).then((res) => {
      return res.json();
    });
  }

  sityAPI() {
    return fetch(
      'https://autocomplete.travelpayouts.com/places2?term=Mins&locale=en&types[]=city',
    ).then((res) => {
      return res.json();
    });
  }

  async showAll() {
    const list = await this.getWhatINeed();
    return list;
  }

  async sityes() {
    const list = await this.sityAPI();
    console.log(list);
    return list;
  }
}
export default GetInfo;
