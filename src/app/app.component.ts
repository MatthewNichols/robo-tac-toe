import {Component, OnInit} from '@angular/core';
import {MdDialog} from "@angular/material";

import {gameController} from "./models/gameController";
import {PLAYER_1, PLAYER_2} from "./models/constants";
import {playerModes} from './player-area/player-area.component';
import {SettingsService} from "./services/settings.service";
import {SplashDialogComponent} from "./splash-dialog/splash-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private settingsService: SettingsService, public dialog: MdDialog) { }

  ngOnInit(): void {
    const gameSettings = this.settingsService.getGameSettings();

    if (gameSettings.showSplash) {
      this.showSplashScreen();
    } else {
      this.startGame();
    }
  }

  //Expose the playerModes enum for the template
  playerModes = playerModes;
  title = 'Robo-Tac-Toe';
  controller = new gameController(this.settingsService);

  get player1Active() { return this.controller.activePlayerId === PLAYER_1};
  get player2Active() { return this.controller.activePlayerId === PLAYER_2};

  startGame() {
    if (this.settingsService.getGameSettings().autostartPlay) {
      this.controller.gameStart();
    }
  }

  showSplashScreen() {
    var splashScreenDialog = this.dialog.open(SplashDialogComponent);

    var splashDialogModel = splashScreenDialog.componentInstance;
    splashScreenDialog.afterClosed().subscribe(() => {
      if (splashDialogModel.doNotShowSplash) {
        this.settingsService.saveGameSettings({showSplash: false})
      }

      this.startGame();
    });

  }
}
