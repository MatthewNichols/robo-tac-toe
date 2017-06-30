import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-board-square',
  templateUrl: './board-square.component.html',
  styleUrls: ['./board-square.component.scss']
})
export class BoardSquareComponent implements OnInit{

  constructor() { }

  @Input() row: number;
  @Input() col: number;

  @HostBinding('class.center-column') centerColumn: boolean;
  @HostBinding('class.center-row') centerRow: boolean;

  ngOnInit(): void {
    console.log(this.col);
    this.centerColumn = this.col == 2;
    this.centerRow = this.row == 2;
  }


}
