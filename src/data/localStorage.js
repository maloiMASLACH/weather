export const storageConstants = {
  dayPart: 'dayPart',
  theme: 'theme',
  town: 'town',
  degrees: 'degrees',
  wind: 'wind',
  favorites: 'favorites',
  townInput: 'townInput',
  inputValue: 'inputValue',
};
class LocalStorage {
  async store(key, value) {
    localStorage.setItem(key, value);
  }

  async get(key) {
    return localStorage.getItem(key);
  }
}
export default LocalStorage;
