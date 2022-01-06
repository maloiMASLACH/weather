import ErrorHandler from '../errorsHandler/errorHandler';

describe('ErrorHandler', () => {
  it('Render error block by invalid name', async () => {
    const expected = await new ErrorHandler().renderAlertBlock();
    expect(expected).toBe(true);
  });
  it('Render error block by img error', () => {
    const expected = new ErrorHandler().imgError();
    expect(expected).toBe(true);
  });
  it('Render error block by search error', () => {
    const expected = new ErrorHandler().searchPanelError();
    expect(expected).toBe(true);
  });
});
