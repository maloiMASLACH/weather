import ErrorPage from '../pages/erorr/erorrPage';

describe('Error page', () => {
  it('Render error page', () => {
    const expected = new ErrorPage().render();
    expect(expected.getAttribute('style')).toBe('height: 91vh;');
  });
});
