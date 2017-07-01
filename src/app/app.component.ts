import { Component } from '@angular/core';
import {gameController} from "./models/gameController";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    //this.player1Active = true;
  }

  title = 'app';

  controller = new gameController();

  get player1Active() { return this.controller.activePlayer === 1};
  get player2Active() { return this.controller.activePlayer === 2};

}
