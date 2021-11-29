class GetInfo {
  getWhatINeed() {
    return fetch(
      'http://api.weatherapi.com/v1/forecast.json?key=01960bba4b6a444a831133935212311&q=Minsk&days=10&aqi=no&alerts=no',
    ).then((res) => {
      this.allInfo = res;
      return res.json();
    });
  }

  async showAll() {
    const list = await this.getWhatINeed();

    return list;
  }
}

export default GetInfo;
