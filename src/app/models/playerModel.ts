import {playerModes} from "../player-area/player-area.component";
import {savedScript} from "./savedScript";
import {userScriptExecutor} from "./userScriptExecutor";

const timeToWait = 1000;

export class playerModel {

  /**
   * @param {Function} playerUpdated Handler function.
   */
  constructor(playerId: number, playerLetter: string, playerMode: playerModes = playerModes.manual, playerUpdated?: Function) {
    this.playerId = playerId;
    this.playerLetter = playerLetter;
    this.playerMode = playerMode;
    this.playerUpdated = playerUpdated || function () {};
    this.workingScript = new savedScript({});
  }

  playerId: number;
  playerLetter: string;

  //#region playerMode (Create a getter/setter so that changes can be detected. Persisted to localStorage)

  _playerMode: playerModes;
  get playerMode(): playerModes { return this._playerMode; }
  set playerMode(newValue) {
    this._playerMode = newValue;

    //If a playerUpdated function is initialized then call it with the current instance.
    if (this.playerUpdated) {
      this.playerUpdated(this);
    }
  }

  //#endregion

  workingScript: savedScript;

  /**
   * playerUpdated Handler function.
   */
  playerUpdated: Function;

  /**
   * Carries out the active users turn. Called whenever the Active player
   * switches.
   * @param scriptingAPI
   */
  executeTurn(scriptingAPI: any) {
    switch (this.playerMode) {
      case playerModes.random:
        const unclaimedSquares = scriptingAPI.getUnclaimedSquares();
        let squareToClaim = unclaimedSquares[Math.floor(unclaimedSquares.length * Math.random())];
        scriptingAPI.claimSquare(squareToClaim.row, squareToClaim.col);
        break;
      case playerModes.runMyCode:
        try {
          console.log("Run My Code", this.workingScript.scriptText);
          const scriptExecutor = new userScriptExecutor(this.workingScript.scriptText, `player${this.playerLetter}Script.js`);
          scriptExecutor.execute(scriptingAPI);
        } catch (exp) {
          console.log("Scripting Error", exp);
        }

      default:
    }
  }

  toJSON() {
    return { playerMode: this.playerMode }
  }

}
