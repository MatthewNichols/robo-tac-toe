import { Component } from '@angular/core';
import {gameController} from "./models/gameController";
import {PLAYER_1, PLAYER_2} from "./models/constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {

  }

  title = 'app';

  controller = new gameController();

  get player1Active() { return this.controller.activePlayerId === PLAYER_1};
  get player2Active() { return this.controller.activePlayerId === PLAYER_2};

}
