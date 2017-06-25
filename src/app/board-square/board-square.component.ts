import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board-square',
  templateUrl: './board-square.component.html',
  styleUrls: ['./board-square.component.scss']
})
export class BoardSquareComponent {

  constructor() { }

  @Input() row: number;
  @Input() col: number;

}
