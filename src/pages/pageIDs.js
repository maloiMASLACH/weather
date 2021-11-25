import MainPage from "./main/mainPage";
import SettingsPage from "./settings/settingsPage";
import FavoritesPage from "./favorites/favoritesPage";
import ErrorPage from "./erorr/erorrPage";
/*const PagesIds={
    MainPageid:"main-page",
    SettingsPageid:"settings-page",
    FavoritesPageid:"favorites-page",
}*/
const PagesIds = {
  "main-page": MainPage,
  "settings-page": SettingsPage,
  "favorites-page": FavoritesPage,
  "error":ErrorPage
};
export default PagesIds;
