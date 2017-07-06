import {Component, OnInit} from '@angular/core';
import { gameController } from "./models/gameController";
import { scriptingAPI } from './models/scriptingAPI';
import {PLAYER_1, PLAYER_2} from "./models/constants";
import {playerModes} from './player-area/player-area.component';
import {SettingsService} from "./services/settings.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.controller.gameStart();
  }

  //Expose the playerModes enum for the template
  playerModes = playerModes;

  constructor(private settingsService: SettingsService) { }

  title = 'Robo-Tac-Toe';

  controller = new gameController(this.settingsService);

  get player1Active() { return this.controller.activePlayerId === PLAYER_1};
  get player2Active() { return this.controller.activePlayerId === PLAYER_2};
}
