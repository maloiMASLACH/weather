import SettingsPage from '../pages/settings/settingsPage';

describe('Setting page', () => {
  it('Page rendered', () => {
    const expected = new SettingsPage().render().children[0].children[0].getAttribute('class');
    expect(expected).toBe('settingsContent');
  });
  it('Page has wind block', () => {
    const expected = new SettingsPage().wind().getAttribute('class');
    expect(expected).toBe('tempDegSett');
  });
  it('Page has degrees block', () => {
    const expected = new SettingsPage().degrees().getAttribute('class');
    expect(expected).toBe('tempDegSett');
  });
  it('Page has location block', () => {
    const expected = new SettingsPage().location().getAttribute('class');
    expect(expected).toBe('settingsLocation');
  });
  it('Page has time block', () => {
    const expected = new SettingsPage().time().getAttribute('class');
    expect(expected).toBe('dayPartSett');
  });
});
