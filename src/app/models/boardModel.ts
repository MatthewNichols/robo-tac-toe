import {boardSquareModel} from "./boardSquareData";
import {gameController} from "./gameController";
import {victoryPathModel} from "./victoryPathModel";

export class boardModel {

  constructor(private controller: gameController) {
    this.squares = [];
    for (var r = 1; r <= 3; r++) {
      for (var c = 1; c <= 3 ; c++) {
        this.squares.push(new boardSquareModel(r, c, this, controller));
      }
    }

    let rows = this.rows;

    var diagonal1 = [
      rows[0][0],
      rows[1][1],
      rows[2][2],
    ];

    var diagonal2 = [
      rows[0][2],
      rows[1][1],
      rows[2][0],
    ];

    this.victoryPaths = [
      new victoryPathModel(rows[0], "Row 1"),
      new victoryPathModel(rows[1], "Row 2"),
      new victoryPathModel(rows[2], "Row 3"),

      new victoryPathModel(this.cols[0], "Col 1"),
      new victoryPathModel(this.cols[1], "Col 2"),
      new victoryPathModel(this.cols[2], "Col 3"),

      new victoryPathModel(diagonal1, "Diag 1"),
      new victoryPathModel(diagonal2, "Diag 2"),
    ]
  }

  squares: boardSquareModel[];
  victoryPaths: victoryPathModel[];

  get gameWon() {
    return this.victoryPaths.some(vp => vp.isComplete);
  }

  get rows() {
    return [
      this.squares.filter(s => s.row === 1),
      this.squares.filter(s => s.row === 2),
      this.squares.filter(s => s.row === 3)
    ];
  }

  get cols() {
    return [
      this.squares.filter(s => s.col === 1),
      this.squares.filter(s => s.col === 2),
      this.squares.filter(s => s.col === 3)
    ];
  }
}
