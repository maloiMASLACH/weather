import MainPage from './main/mainPage';
import SettingsPage from './settings/settingsPage';
import FavoritesPage from './favorites/favoritesPage';
import ErrorPage from './errorPage/errorPage';

const PagesIds = {
  Home: MainPage,
  Favorite: FavoritesPage,
  Settings: SettingsPage,
  Error: ErrorPage,
};
export default PagesIds;
