import ErrorHandler from '../errorsHandler/errorHandeler';

class GetInfo {
  getWhatINeed(sity) {
    return fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=01960bba4b6a444a831133935212311&q=${sity}&days=3&aqi=yes&alerts=yes`,
    )
      .then((res) => {
        if (res.status === 400) {
          new ErrorHandler().pageError(sity);
        } else return res.json();
        return 0;
      })
      .catch((err) => { return alert(err); });
  }

  sityAPI(text) {
    return fetch(
      `https://autocomplete.travelpayouts.com/places2?term=${text}&locale=en&types[]=city`,
    ).then((res) => {
      if (res.status === 400) {
        new ErrorHandler().searchError();
      } else return res.json();
      return 0;
    });
  }

  async showAll(sity) {
    const list = await this.getWhatINeed(sity);
    console.log(list);
    return list;
  }

  async sityes(text) {
    const list = await this.sityAPI(text);
    return list;
  }
}
export default GetInfo;
