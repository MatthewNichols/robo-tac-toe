import {boardSquareModel} from "./boardSquareData";
import {gameController} from "./gameController";

export class boardModel {

  constructor(private controller: gameController) {
    this.squares = [];
    for (var r = 1; r <= 3; r++) {
      for (var c = 1; c <= 3 ; c++) {
        this.squares.push(new boardSquareModel(r, c, this, controller));
      }
    }
  }

  squares: boardSquareModel[];

  get rows() {
    return [
      this.squares.filter(s => s.row === 1),
      this.squares.filter(s => s.row === 2),
      this.squares.filter(s => s.row === 3)
    ];
  }
}
