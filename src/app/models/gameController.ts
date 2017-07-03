import {playerModel} from "./playerModel";
import {PLAYER_1, PLAYER_2} from "./constants";
import {boardModel} from "./boardModel";
import {boardSquareModel} from "./boardSquareData";
import {playerModes} from "../player-area/player-area.component";
import {scriptingAPI} from "./scriptingAPI";

export class gameController {

  constructor() {
    this.player1 = new playerModel(PLAYER_1, "X");
    this.player2 = new playerModel(PLAYER_2, "O", playerModes.random);

    this.activePlayer = this.player1;

    this.boardModel = new boardModel(this);
    this.scriptingAPI = new scriptingAPI(this);
    //Expose the scripting API to the console
    window["scriptingAPI"] = this.scriptingAPI;
  }

  player1: playerModel;
  player2: playerModel;
  activePlayerId: number;
  boardModel: boardModel;
  scriptingAPI: scriptingAPI;

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
    const playerLetter = this.activePlayer.playerLetter;

    square.claimedBy = this.activePlayer;
    console.log(`${playerLetter} claimed square ${square.row}, ${square.col}`);

    if (this.boardModel.gameWon) {
      this.boardModel.winningPath.markSquaresWinning();

      console.log(`${playerLetter} won the game!!`);
    } else {
      this.toggleActivePlayer();
      this.activePlayer.executeTurn(this.scriptingAPI);
    }
  }
}
