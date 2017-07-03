import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {playerModel} from "../models/playerModel";

@Component({
  selector: 'app-player-area',
  templateUrl: './player-area.component.html',
  styleUrls: ['./player-area.component.scss']
})
export class PlayerAreaComponent implements OnInit {

  //Expose the playerModes enum for the template
  playerModes = playerModes;

  constructor() { }

  @Input() @HostBinding('class.active') active: boolean;
  @Input() playerModel: playerModel;

  get editorEnabled(): boolean {
    return this.playerModel.playerMode === playerModes.runMyCode;
  }

  ngOnInit() {
  }

}

export enum playerModes {
  manual,
  random,
  runMyCode
}
