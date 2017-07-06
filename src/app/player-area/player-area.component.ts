import {Component, HostBinding, Input } from '@angular/core';
import {playerModel} from "../models/playerModel";

@Component({
  selector: 'app-player-area',
  templateUrl: './player-area.component.html',
  styleUrls: ['./player-area.component.scss']
})
export class PlayerAreaComponent {

  //Expose the playerModes enum for the template
  playerModes = playerModes;

  constructor() { }

  @Input() @HostBinding('class.active') active: boolean;
  @Input() playerModel: playerModel;

  get editorEnabled(): boolean {
    return this.playerModel.playerMode === playerModes.runMyCode;
  }
}

export enum playerModes {
  manual,
  random,
  runMyCode
}
