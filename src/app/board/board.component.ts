import { Component, OnInit } from '@angular/core';
import {boardModel} from "../models/boardModel";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  boardModel = new boardModel();

  rows = this.boardModel.rows;

  ngOnInit() {
  }

}
