import { Component } from '@angular/core';
import { gameController } from "./models/gameController";
import { scriptingAPI } from './models/scriptingAPI';
import {PLAYER_1, PLAYER_2} from "./models/constants";
import {playerModes} from './player-area/player-area.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //Expose the playerModes enum for the template
  playerModes = playerModes;

  constructor() { }

  title = 'Robo-Tac-Toe';

  controller = new gameController();

  get player1Active() { return this.controller.activePlayerId === PLAYER_1};
  get player2Active() { return this.controller.activePlayerId === PLAYER_2};

}
