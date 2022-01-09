import LocalStorage, { storageConstants } from './localStorage';

export const themeParameters = {
  theme: 'classic',
  dayPart: 'day',
};

export class ThemeManager {
  async checkTheme(info) {
    if (
      +info.location.localtime.split(' ')[1].split(':')[0]
            < +info.forecast.forecastday[0].astro.sunrise.split(':')[0]
          || +info.location.localtime.split(' ')[1].split(':')[0]
            >= +info.forecast.forecastday[0].astro.sunset.split(':')[0] + 12
    ) {
      await new LocalStorage().store(storageConstants.dayPart, 'night');
    } else {
      await new LocalStorage().store(storageConstants.dayPart, 'day');
    }
    if (!await new LocalStorage().get(storageConstants.theme)) {
      await new LocalStorage().store(storageConstants.theme, 'classic');
    }
  }
}

export default ThemeManager;
