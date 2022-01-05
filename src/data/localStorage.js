export const storageConstants = {
  dayPart: 'dayPart',
  theme: 'theme',
  sity: 'sity',
  degrees: 'degrees',
  wind: 'wind',
  favorites: 'favorites',
  sityInput: 'sityInput',
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
