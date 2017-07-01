import {boardSquareData} from "./boardSquareData";

export class boardModel {

  constructor() {
    this.squares = [];
    for (var r = 1; r <= 3; r++) {
      for (var c = 1; c <= 3 ; c++) {
        this.squares.push(new boardSquareData(r, c));
      }
    }
  }

  squares: boardSquareData[];

  get rows() {
    return [
      this.squares.filter(s => s.row === 1),
      this.squares.filter(s => s.row === 2),
      this.squares.filter(s => s.row === 3)
    ];
  }
}
