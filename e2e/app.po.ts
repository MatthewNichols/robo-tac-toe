import { browser, by, element } from 'protractor';

export class RoboTacToePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
