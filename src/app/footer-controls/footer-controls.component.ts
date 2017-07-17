import {Component, Input, OnInit} from '@angular/core';
import {gameController, gameState} from "../models/gameController";
import {SettingsService} from "../services/settings.service";

@Component({
  selector: 'app-footer-controls',
  templateUrl: './footer-controls.component.html',
  styleUrls: ['./footer-controls.component.scss']
})
export class FooterControlsComponent {

  constructor(private settingsService: SettingsService) { }

  @Input()
  controller: gameController;

  get showStartPlay() {
    return this.controller.gameState === gameState.ReadyToStart &&
      ! this.settingsService.getGameSettings().autostartPlay;
  }
}
