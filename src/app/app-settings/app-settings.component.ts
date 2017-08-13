import { Component } from '@angular/core';
import { AppSettingsDialogActions, AppSettingsDialogComponent } from "../app-settings-dialog/app-settings-dialog.component";
import {MdDialog} from "@angular/material";
import {SettingsService} from "../services/settings.service";

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent {

  constructor(private settingsService: SettingsService, public dialog: MdDialog) { }

  showSettings() {
    const gameSettings = this.settingsService.getGameSettings();
    let settingsDialog = this.dialog.open(AppSettingsDialogComponent);

    const dialogModel = settingsDialog.componentInstance;
    dialogModel.secondsBetweenMoves = gameSettings.secondsBetweenMoves;
    dialogModel.autostartPlay = gameSettings.autostartPlay;
    dialogModel.showSplash = gameSettings.showSplash;

    settingsDialog.afterClosed().subscribe(result => {
      if (result === AppSettingsDialogActions.Save) {
        gameSettings.secondsBetweenMoves = dialogModel.secondsBetweenMoves;
        gameSettings.autostartPlay = dialogModel.autostartPlay;
        gameSettings.showSplash = dialogModel.showSplash;

        this.settingsService.saveGameSettings(gameSettings);
      }
    });
  }

}
