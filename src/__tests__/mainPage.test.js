import LeftPartFirstBlock from '../pages/main/leftPartFirstBlock/leftpartFirstBlock';
import Slider from '../pages/main/slider/slider';
import RightBlock from '../pages/main/rightBlock/rightBlock';

describe('Main page', () => {
  const info = {
    current: { condition: { text: 'condition' }, last_updated: '2021-12-17 23:45', air_quality: { 'us-epa-index': 4 } },
    location: { name: 'Minsk', country: 'Belarus', localtime: '2021-12-17 23:09' },
    forecast: {
      forecastday: [
        { astro: { sunrise: '06:04 AM', sunset: '05:35 PM' }, day: { daily_chance_of_rain: '100' }, hour: [{ temp_c: '0', time: '2021-12-17 00:00', condition: { text: 'ok' } }, { temp_c: '1', time: '2021-12-17 01:00', condition: { text: 'ok' } }, { temp_c: '2', time: '2021-12-17 02:00', condition: { text: 'ok' } }, { temp_c: '3', time: '2021-12-17 03:00', condition: { text: 'ok' } }, { temp_c: '4', time: '2021-12-17 04:00', condition: { text: 'ok' } }, { temp_c: '5', time: '2021-12-17 05:00', condition: { text: 'ok' } }, { temp_c: '6', time: '2021-12-17 06:00', condition: { text: 'ok' } }, { temp_c: '7', time: '2021-12-17 07:00', condition: { text: 'ok' } }, { temp_c: '8', time: '2021-12-17 08:00', condition: { text: 'ok' } }, { temp_c: '9', time: '2021-12-17 09:00', condition: { text: 'ok' } }, { temp_c: '10', time: '2021-12-17 10:00', condition: { text: 'ok' } }, { temp_c: '11', time: '2021-12-17 11:00', condition: { text: 'ok' } }, { temp_c: '12', time: '2021-12-17 12:00', condition: { text: 'ok' } }, { temp_c: '13', time: '2021-12-17 13:00', condition: { text: 'ok' } }, { temp_c: '14', time: '2021-12-17 14:00', condition: { text: 'ok' } }, { temp_c: '15', time: '2021-12-17 15:00', condition: { text: 'ok' } }, { temp_c: '16', time: '2021-12-17 16:00', condition: { text: 'ok' } }, { temp_c: '17', time: '2021-12-17 17:00', condition: { text: 'ok' } }, { temp_c: '18', time: '2021-12-17 18:00', condition: { text: 'ok' } }, { temp_c: '19', time: '2021-12-17 19:00', condition: { text: 'ok' } }, { temp_c: '20', time: '2021-12-17 29:00', condition: { text: 'ok' } }, { temp_c: '21', time: '2021-12-17 21:00', condition: { text: 'ok' } }, { temp_c: '22', time: '2021-12-17 22:00', condition: { text: 'ok' } }, { temp_c: '23', time: '2021-12-17 23:00', condition: { text: 'ok' } }] },
        { astro: { sunrise: '06:04 AM', sunset: '05:35 PM' }, day: { daily_chance_of_rain: '100' }, hour: [{ temp_c: '0', time: '2021-12-17 00:00', condition: { text: 'ok' } }, { temp_c: '1', time: '2021-12-17 01:00', condition: { text: 'ok' } }, { temp_c: '2', time: '2021-12-17 02:00', condition: { text: 'ok' } }, { temp_c: '3', time: '2021-12-17 03:00', condition: { text: 'ok' } }, { temp_c: '4', time: '2021-12-17 04:00', condition: { text: 'ok' } }, { temp_c: '5', time: '2021-12-17 05:00', condition: { text: 'ok' } }, { temp_c: '6', time: '2021-12-17 06:00', condition: { text: 'ok' } }, { temp_c: '7', time: '2021-12-17 07:00', condition: { text: 'ok' } }, { temp_c: '8', time: '2021-12-17 08:00', condition: { text: 'ok' } }, { temp_c: '9', time: '2021-12-17 09:00', condition: { text: 'ok' } }, { temp_c: '10', time: '2021-12-17 10:00', condition: { text: 'ok' } }, { temp_c: '11', time: '2021-12-17 11:00', condition: { text: 'ok' } }, { temp_c: '12', time: '2021-12-17 12:00', condition: { text: 'ok' } }, { temp_c: '13', time: '2021-12-17 13:00', condition: { text: 'ok' } }, { temp_c: '14', time: '2021-12-17 14:00', condition: { text: 'ok' } }, { temp_c: '15', time: '2021-12-17 15:00', condition: { text: 'ok' } }, { temp_c: '16', time: '2021-12-17 16:00', condition: { text: 'ok' } }, { temp_c: '17', time: '2021-12-17 17:00', condition: { text: 'ok' } }, { temp_c: '18', time: '2021-12-17 18:00', condition: { text: 'ok' } }, { temp_c: '19', time: '2021-12-17 19:00', condition: { text: 'ok' } }, { temp_c: '20', time: '2021-12-17 29:00', condition: { text: 'ok' } }, { temp_c: '21', time: '2021-12-17 21:00', condition: { text: 'ok' } }, { temp_c: '22', time: '2021-12-17 22:00', condition: { text: 'ok' } }, { temp_c: '23', time: '2021-12-17 23:00', condition: { text: 'ok' } }] },
        { astro: { sunrise: '06:04 AM', sunset: '05:35 PM' }, day: { daily_chance_of_rain: '100' }, hour: [{ temp_c: '0', time: '2021-12-17 00:00', condition: { text: 'ok' } }, { temp_c: '1', time: '2021-12-17 01:00', condition: { text: 'ok' } }, { temp_c: '2', time: '2021-12-17 02:00', condition: { text: 'ok' } }, { temp_c: '3', time: '2021-12-17 03:00', condition: { text: 'ok' } }, { temp_c: '4', time: '2021-12-17 04:00', condition: { text: 'ok' } }, { temp_c: '5', time: '2021-12-17 05:00', condition: { text: 'ok' } }, { temp_c: '6', time: '2021-12-17 06:00', condition: { text: 'ok' } }, { temp_c: '7', time: '2021-12-17 07:00', condition: { text: 'ok' } }, { temp_c: '8', time: '2021-12-17 08:00', condition: { text: 'ok' } }, { temp_c: '9', time: '2021-12-17 09:00', condition: { text: 'ok' } }, { temp_c: '10', time: '2021-12-17 10:00', condition: { text: 'ok' } }, { temp_c: '11', time: '2021-12-17 11:00', condition: { text: 'ok' } }, { temp_c: '12', time: '2021-12-17 12:00', condition: { text: 'ok' } }, { temp_c: '13', time: '2021-12-17 13:00', condition: { text: 'ok' } }, { temp_c: '14', time: '2021-12-17 14:00', condition: { text: 'ok' } }, { temp_c: '15', time: '2021-12-17 15:00', condition: { text: 'ok' } }, { temp_c: '16', time: '2021-12-17 16:00', condition: { text: 'ok' } }, { temp_c: '17', time: '2021-12-17 17:00', condition: { text: 'ok' } }, { temp_c: '18', time: '2021-12-17 18:00', condition: { text: 'ok' } }, { temp_c: '19', time: '2021-12-17 19:00', condition: { text: 'ok' } }, { temp_c: '20', time: '2021-12-17 29:00', condition: { text: 'ok' } }, { temp_c: '21', time: '2021-12-17 21:00', condition: { text: 'ok' } }, { temp_c: '22', time: '2021-12-17 22:00', condition: { text: 'ok' } }, { temp_c: '23', time: '2021-12-17 23:00', condition: { text: 'ok' } }] },
      ],
    },
  };
  it('Render left first block', () => {
    const expected = new LeftPartFirstBlock().leftBlock(info);
    expect(expected.getAttribute('class')).toBe('leftBlock');
    expect(expected.children[0].getAttribute('class')).toBe('leftBlockFirstLay');
    expect(expected.children[0].children[0].children[1].children[0].textContent).toBe('Minsk');
    expect(expected.children[0].children[0].children[1].children[1].textContent).toBe('Belarus');
    expect(expected.children[0].children[1].className).toBe('switcher');
    expect(expected.children[1].children[0].children[5].textContent).toBe('Rain 100 %');
    expect(expected.children[0].children[0].children[3].children[1].textContent.split('|')).toHaveLength(2);
  });

  it('Render slider block', () => {
    const expected = new Slider().render(info);
    expect(expected.getAttribute('class')).toBe('slider');
    expect(expected.children[0].getAttribute('class')).toBe('arrow');
    expect(expected.children[1].getAttribute('class')).toBe('forecast');
    expect(expected.children[2].getAttribute('class')).toBe('arrow');
    expect(expected.children[1].children.length).toBeGreaterThan(48);
    expect(expected.children[1].children[0].getAttribute('class')).toBe('clockForecast');
    expect(expected.children[1].children[0].children[0].className).toBe('');
  });
  it('Render input panel', () => {
    const expected = new RightBlock().inputBlock();
    expect(expected.className).toBe('inputdiv');
    expect(expected.children[0].className).toBe('searchPanel');
  });
});
