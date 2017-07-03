import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-player-area',
  templateUrl: './player-area.component.html',
  styleUrls: ['./player-area.component.scss']
})
export class PlayerAreaComponent implements OnInit {

  //Expose the playerModes enum for the template
  playerModes = playerModes;

  constructor() {
    this.playerMode = playerModes.manual;
  }

  @Input() playerLetter: string;
  @Input() @HostBinding('class.active') active: boolean;
  playerMode: playerModes;

  get editorEnabled(): boolean {
    return this.playerMode === playerModes.runMyCode;
  }

  ngOnInit() {
  }

}

export enum playerModes {
  manual,
  random,
  runMyCode
}
