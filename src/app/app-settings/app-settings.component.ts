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
    settingsDialog.componentInstance.secondsBetweenMoves = gameSettings.secondsBetweenMoves

    settingsDialog.afterClosed().subscribe(result => {
      if (result === AppSettingsDialogActions.Save) {
        gameSettings.secondsBetweenMoves = settingsDialog.componentInstance.secondsBetweenMoves;
        this.settingsService.saveGameSettings(gameSettings);
      }
    });
  }

}
