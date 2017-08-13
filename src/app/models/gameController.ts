import {playerModel} from "./playerModel";
import {FIELD_AUTORUN, FIELD_PLAYER_MODE, PLAYER_1, PLAYER_2} from "./constants";
import {boardModel} from "./boardModel";
import {boardSquareModel} from "./boardSquareData";
import {scriptingAPI} from "./scriptingAPI";
import {SettingsService} from "../services/settings.service";
import {playerModes} from "../player-area/player-area.component";
import {userScriptExecutor} from "./userScriptExecutor";

export class gameController {

  constructor(private settingsService: SettingsService) {

    var player1Settings = settingsService.getPlayer1Settings();
    var player2Settings = settingsService.getPlayer2Settings();
    this.player1 = new playerModel(PLAYER_1, "X", player1Settings.playerMode, player1Settings.playerAutoRun, this.playerUpdated);
    this.player2 = new playerModel(PLAYER_2, "O", player2Settings.playerMode, player1Settings.playerAutoRun, this.playerUpdated);

    this.activePlayer = this.player1;

    this.boardModel = new boardModel(this);
    this.scriptingAPI = scriptingAPI(this);
    //Expose the scripting API to the console
    window["scriptingAPI"] = this.scriptingAPI;
  }

  player1: playerModel;
  player2: playerModel;
  activePlayerId: number;
  boardModel: boardModel;
  gameState: gameState = gameState.ReadyToStart;
  scriptingAPI: any;

  /**
   * Handler for updates reported by the playerModel.
   * @param playerModel
   */
  playerUpdated = (playerModel, fieldsUpdated?: string[]) => {
    console.log("***playerUpdated", playerModel, fieldsUpdated);
    this.settingsService.savePlayerSettings(playerModel);

    var fieldUpdatedIs = (name: string): boolean => fieldsUpdated.indexOf(name) > -1;

    //If the previous state was blocking play and the new state is not then trigger play to resume
    if (this.gameState === gameState.InPlay && playerModel.playerId === this.activePlayerId
          && (fieldUpdatedIs(FIELD_PLAYER_MODE) || fieldUpdatedIs(FIELD_AUTORUN))) {
      if (playerModel.playerMode === playerModes.random || playerModel.playerMode === playerModes.runMyCode ) {
        this.executeActivePlayerTurnDelayed();
      }
    }
  }

  /**
   * Kicks off the game. Without this step the first move would have to
   * be made manually by the user irrespective of Mode.
   */
  gameStart() {
    this.gameState = gameState.InPlay;
    this.executeActivePlayerTurnDelayed();
  }

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

    if (this.boardModel.gameOver) {
      this.gameState = gameState.GameOver;
    }

    if (this.boardModel.gameWon) {
      this.boardModel.winningPath.markSquaresWinning();
      console.log(`${playerLetter} won the game!!`);
    } else {
      this.toggleActivePlayer();

      if (this.gameState === gameState.InPlay) {
        this.executeActivePlayerTurnDelayed();
      }
    }
  }

  resetGame() {
    this.setActivePlayer(PLAYER_1);
    this.boardModel.squares.forEach(s => s.resetSquare());
    this.gameState = gameState.ReadyToStart;

    if (this.settingsService.getGameSettings().autostartPlay) {
      this.gameStart();
    }
  }

  /**
   * Carries out the active users turn with the configured delay.
   * Called whenever the Active player switches.
   */
  executeActivePlayerTurnDelayed() {
    const secondsBetweenMoves = this.settingsService.getGameSettings().secondsBetweenMoves;
    setTimeout(() => this.executeActivePlayerTurn(), secondsBetweenMoves * 1000);
  }

  /**
   * Carries out the active users turn. Does not handle Manual Mode
   * @param {boolean} overrideAutoRun Signifies single step mode and ignores the Players AutoPlay setting
   */
  executeActivePlayerTurn(overrideAutoRun = false) {
    switch (this.activePlayer.playerMode) {
      case playerModes.random:
        const unclaimedSquares = this.scriptingAPI.getUnclaimedSquares();
        let squareToClaim = unclaimedSquares[Math.floor(unclaimedSquares.length * Math.random())];
        this.scriptingAPI.claimSquare(squareToClaim.row, squareToClaim.col);
        break;
      case playerModes.runMyCode:
        try {
          if (this.activePlayer.autoRun || overrideAutoRun) {
            console.log("Run My Code", this.activePlayer.workingScript.scriptText);
            const scriptExecutor = new userScriptExecutor(this.activePlayer.workingScript.scriptText, `player${this.activePlayer.playerLetter}Script.js`);
            scriptExecutor.execute(scriptingAPI);
          }
        } catch (exp) {
          console.log("Scripting Error", exp);
        }

      default:
    }
  }

}

export enum gameState {
  InPlay,
  GameOver,
  ReadyToStart
}
