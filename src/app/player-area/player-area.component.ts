import {Component, HostBinding, Input } from '@angular/core';
import {playerModel} from "../models/playerModel";
import {MdDialog} from "@angular/material";
import {CodeManagerDialogComponent} from "../code-manager-dialog/code-manager-dialog.component";
import {gameController} from "../models/gameController";

@Component({
  selector: 'app-player-area',
  templateUrl: './player-area.component.html',
  styleUrls: ['./player-area.component.scss']
})
export class PlayerAreaComponent {

  //Expose the playerModes enum for the template
  playerModes = playerModes;

  constructor(public dialog: MdDialog) { }

  @Input() active: boolean;
  @Input() playerModel: playerModel;
  @Input() gameController: gameController;

  get playButtonDisabled(): boolean { return this.playerModel.autoRun; }

  get activeClass(): string {
    return this.active ? 'mat-elevation-z24' : 'mat-elevation-z0';
  }

  get editorEnabled(): boolean {
    return this.playerModel.playerMode === playerModes.runMyCode;
  }

  autoPlayChanged = (source, value) => {
    this.playerModel.autoRun = ! this.playerModel.autoRun;
  }

  openCodeManager() {
    console.log("openCodeManager", this);
    let codeManagementDialog = this.dialog.open(CodeManagerDialogComponent);
  }

  playButtonClick() {
    if (this.active && !this.playButtonDisabled) {
      this.gameController.executeActivePlayerTurn(true);
    }
  }

}

export enum playerModes {
  manual,
  random,
  runMyCode
}
