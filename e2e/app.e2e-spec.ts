import { RoboTacToePage } from './app.po';

describe('robo-tac-toe App', () => {
  let page: RoboTacToePage;

  beforeEach(() => {
    page = new RoboTacToePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
