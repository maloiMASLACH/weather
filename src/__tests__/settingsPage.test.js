import SettingsPage from '../pages/settings/settingsPage';

describe('Setting page', () => {
  it('Page rendered', async () => {
    const expected = await new SettingsPage().render();
    expect(expected.tagName).toBe('DIV');
    expect(expected.getAttribute('style')).toBe('height: 91vh;');
    expect(expected.children[0].className).toBe('settingsContent');
    expect(expected.children[1].className).toBe('settingsOptions');
  });
  it('Page has wind block', async () => {
    const expected = await new SettingsPage().windSetting();
    expect(expected.getAttribute('class')).toBe('tempDegSett');
    expect(expected.children[0].tagName).toBe('P');
    expect(expected.children[1].tagName).toBe('SELECT');
    expect(expected.children[1].children.length).toBe(2);
    expect(expected.children[1].children[0].textContent).toBe('km/h');
    expect(expected.children[1].children[1].textContent).toBe('mp/h');
  });
  it('Page has degrees block', async () => {
    const expected = await new SettingsPage().degreesSetting();
    expect(expected.getAttribute('class')).toBe('tempDegSett');
    expect(expected.children[0].tagName).toBe('P');
    expect(expected.children[1].tagName).toBe('SELECT');
    expect(expected.children[1].children.length).toBe(2);
    expect(expected.children[1].children[0].textContent).toBe('°C');
    expect(expected.children[1].children[1].textContent).toBe('°F');
  });
  it('Page has location block', async () => {
    const expected = await new SettingsPage().renderCurrentLocation();
    expect(expected.getAttribute('class')).toBe('settingsLocation');
    expect(expected.children[0].getAttribute('class')).toBe('title');
    expect(expected.children[1].getAttribute('class')).toBe('currentTownSett');
    expect(expected.children[0].textContent).toBe('Your current location');
  });
  it('Page has time block', async () => {
    const expected = await new SettingsPage().renderDayPart();
    expect(expected.getAttribute('class')).toBe('dayPartSett');
    expect(expected.children[1].getAttribute('class')).toBe('dayPart');
  });
});
