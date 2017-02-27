import { WebdsnPage } from './app.po';

describe('webdsn App', () => {
  let page: WebdsnPage;

  beforeEach(() => {
    page = new WebdsnPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
