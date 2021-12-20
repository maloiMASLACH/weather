import ErrorHandler from '../errorsHandler/errorHandeler';

class GetInfo {
  getWhatINeed(town) {
    return fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=01960bba4b6a444a831133935212311&q=${town}&days=3&aqi=yes&alerts=yes`,
    )
      .then((res) => {
        if (res.status === 400) {
          new ErrorHandler().pageError(sity);
        } else return res.json();
        return 0;
      })
      .catch((err) => {
        throw err;
      });
  }

  townsAPI(text) {
    return fetch(
      `https://autocomplete.travelpayouts.com/places2?term=${text}&locale=en&types[]=city`,
    ).then((res) => {
      if (res.status === 400) {
        new ErrorHandler().searchPanelError();
      } else return res.json();
      return 0;
    });
  }

  async showAll(town) {
    const list = await this.getWhatINeed(town);
    return list;
  }

  async townList(text) {
    const list = await this.townsAPI(text);
    return list;
  }
}
export default GetInfo;
