import {Component, OnInit} from '@angular/core';
import {MdDialog} from "@angular/material";

import { gameController } from "./models/gameController";
import {PLAYER_1, PLAYER_2} from "./models/constants";
import {playerModes} from './player-area/player-area.component';
import {SettingsService} from "./services/settings.service";
import {AppSettingsDialogComponent} from "./app-settings-dialog/app-settings-dialog.component";

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

  constructor(private settingsService: SettingsService, public dialog: MdDialog) { }

  title = 'Robo-Tac-Toe';

  controller = new gameController(this.settingsService);

  get player1Active() { return this.controller.activePlayerId === PLAYER_1};
  get player2Active() { return this.controller.activePlayerId === PLAYER_2};

  showSettings() {
    const gameSettings = this.settingsService.getGameSettings();
    let settingsDialog = this.dialog.open(AppSettingsDialogComponent);
    settingsDialog.componentInstance.secondsBetweenMoves = gameSettings.secondsBetweenMoves

    settingsDialog.afterClosed().subscribe(result => {
      gameSettings.secondsBetweenMoves = settingsDialog.componentInstance.secondsBetweenMoves;
      this.settingsService.saveGameSettings(gameSettings);
    });
  }
}
