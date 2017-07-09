import {gameController} from "./gameController";

/**
 * The API that the user code is given to carry out its turns. Can also be accessed
 * from the DevTools console. Created as a plain object to prevent the exposure of the gameController.
 */
export function scriptingAPI(gameController: gameController) {
  return {

    /**
     * Returns all squares on board.
     * @returns {squareInfo[]}
     */
    getAllSquares: () => {
      return gameController.boardModel
        .squares
        .map(s => new squareInfo(s));
    },

    /**
     * Returns all claimed squares on board.
     * @returns {squareInfo[]}
     */
      getClaimedSquares() {
      return gameController.boardModel
        .claimedSquares.map(s => new squareInfo(s));
    },

    /**
     * Returns all unclaimed squares on board.
     * @returns {squareInfo[]}
     */
      getUnclaimedSquares() {
      return gameController.boardModel
        .unclaimedSquares.map(s => new squareInfo(s));
    },

    /**
     * Claims the specified square for the current player
     * @param {number} row
     * @param {number} col
     */
      claimSquare(row: number, col: number) {
      let square = gameController.boardModel.squares
        .find(s => s.row === row && s.col === col);

      if(square == null) {
        throw "No such square";
      }

      if(square.isClaimed) {
        throw "square already claimed";
      } else {
        gameController.handleSquareClaim(square);
      }
    },

    /**
     * Prints an ACSII display of the current board.
     * Not sure it is useful for scripting
     * but might be useful to the programmer...or not.
     */
      printBoardAsciiDisplay() {

      const NEWLINE = `
`;

      var boardDisplayStr = "";
      gameController.boardModel.rows.forEach(rowSquares => {
        rowSquares.forEach(s => {
          var squareSymbol = s.isClaimed ? `${s.claimedBy.playerLetter} ` : "_ ";
          boardDisplayStr = boardDisplayStr + squareSymbol;
        });

        boardDisplayStr = boardDisplayStr + NEWLINE;
      });

      console.log(NEWLINE + boardDisplayStr);
    }
  }
}

/**
 * Describes a given board square with position and claim status
 */
class squareInfo {
  constructor({row, col, claimedById, isClaimed}) {
    this.row = row;
    this.col = col;
    this.isClaimed = isClaimed;
    this.claimedById = claimedById;
  }
  row: number;
  col: number;
  isClaimed: boolean;
  claimedById: string;
}
