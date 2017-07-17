import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {boardSquareModel} from "../models/boardSquareData";
import {playerModes} from "../player-area/player-area.component";

@Component({
  selector: 'app-board-square',
  templateUrl: './board-square.component.html',
  styleUrls: ['./board-square.component.scss']
})
export class BoardSquareComponent implements OnInit{

  constructor() { }

  @Input() squareModel: boardSquareModel;

  @HostBinding('class.center-column') centerColumn: boolean;
  @HostBinding('class.center-row') centerRow: boolean;
  @HostBinding('class.winning-path') get winningPath(): boolean { return this.squareModel.partOfWinningPath; }

  ngOnInit(): void {
    this.centerColumn = this.squareModel.col == 2;
    this.centerRow = this.squareModel.row == 2;
  }

  get clickEnabled() {
    const activePlayer = this.squareModel.controller.activePlayer;
    return this.squareModel.claimsAllowed && activePlayer.playerMode === playerModes.manual;
  }

  onClick() {
    this.squareModel.handleClaim();
  }

}
