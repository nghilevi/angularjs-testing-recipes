/**
 * Created by nghi on 17.7.2015.
 */
describe('favourite rapper', function () {
  it('should bind to input', function () {
    browser.get('');
    var emceeInput = element(by.model('emcee'));
    var emceeOutput = element(by.binding('emcee'));
    expect(emceeOutput.getText()).toBe('Kool G Rap');
    emceeInput.clear();
    emceeInput.sendKeys('Aesop Rock');
    expect(emceeOutput.getText()).toBe('Aesop Rock');
  });
});