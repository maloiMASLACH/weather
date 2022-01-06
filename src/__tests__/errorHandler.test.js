import ErrorHandler from '../errorsHandler/errorHandler';

describe('ErrorHandler', () => {
  it('Render error block by img error', () => {
    const testContent = 'hi';
    const expected = new ErrorHandler().contentError(testContent);
    expect(expected.tagName).toBe('DIV');
    expect(expected.className).toBe('alertBlockImg');
    expect(expected.children[0].tagName).toBe('P');
    expect(expected.children[0].textContent).toBe(testContent);
  });
});
