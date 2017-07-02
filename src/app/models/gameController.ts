import {playerModel} from "./playerModel";
import {PLAYER_1, PLAYER_2} from "./constants";
import {boardModel} from "./boardModel";
import {boardSquareModel} from "./boardSquareData";

export class gameController {

  constructor() {
    this.player1 = new playerModel(PLAYER_1, "X");
    this.player2 = new playerModel(PLAYER_2, "O");

    this.activePlayer = this.player1;

    this.boardModel = new boardModel(this);
  }

  player1: playerModel;
  player2: playerModel;
  activePlayerId: number;
  boardModel: boardModel;

  get activePlayer(): playerModel {
    if(this.activePlayerId == PLAYER_1) {
      return this.player1;
    }

    if(this.activePlayerId == PLAYER_2) {
      return this.player2;
    }

    return null;
  }

  set activePlayer(newActivePlayer: playerModel) {
    if (newActivePlayer != null) {
      this.setActivePlayer(newActivePlayer);
    }
  }

  setActivePlayer(newActivePlayer: playerModel | number) {
    var newActivePlayerId: number;
    if (typeof newActivePlayer === "number") {
      newActivePlayerId = newActivePlayer;
    } else {
      newActivePlayerId = newActivePlayer.playerId;
    }

    if (newActivePlayerId === PLAYER_1 || newActivePlayerId === PLAYER_2) {
      this.activePlayerId = newActivePlayerId;
    }
  }

  toggleActivePlayer() {
      this.activePlayer = this.activePlayerId == PLAYER_1 ? this.player2 : this.player1;
  }

  handleSquareClaim(square: boardSquareModel) {
    square.claimedBy = this.activePlayer;
    this.toggleActivePlayer();

    if (this.boardModel.gameWon) {
      this.boardModel.winningPath.markSquaresWinning();
    }
  }
}
