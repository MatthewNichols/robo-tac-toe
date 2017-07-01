import {Component, Input, OnInit} from '@angular/core';
import {boardModel} from "../models/boardModel";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  @Input() boardModel: boardModel;

  rows;

  ngOnInit() {
    this.rows = this.boardModel.rows;
  }

}
