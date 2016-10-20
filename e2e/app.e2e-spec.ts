
describe('QuickStart E2E Tests', function () {

  beforeEach(function () {
    browser.get('');
  });

  it('should render the tree with sample data', function () {
    let headingElements = element.all(by.css('h4'));
    expect(headingElements.count()).toBe(8);
    expect(headingElements.first().getText()).toMatch(/awareness metrics/i);
    expect(headingElements.last().getText()).toMatch(/dimensions/i);
  });

});
