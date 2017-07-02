import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {boardSquareModel} from "../models/boardSquareData";

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
    return this.squareModel.claimsAllowed;
  }

  onClick() {
    this.squareModel.handleClaim();
  }

}
