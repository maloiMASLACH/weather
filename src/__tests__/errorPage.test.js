import ErrorPage from '../pages/errorPage/errorPage';

describe('Error page', () => {
  it('Render error page', async () => {
    const expected = await new ErrorPage().render();
    expect(expected.tagName).toBe('DIV');
    expect(expected.textContent).toBe('Error. Bad URl');
  });
});
