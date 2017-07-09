import {playerModes} from "../player-area/player-area.component";
import {scriptingAPI} from "./scriptingAPI";
import {EventEmitter, Output} from "@angular/core";
import {savedScript} from "./savedScript";

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
  executeTurn(scriptingAPI: scriptingAPI) {
    switch (this.playerMode) {
      case playerModes.random:
        setTimeout(() => {
          const unclaimedSquares = scriptingAPI.getUnclaimedSquares();
          var squareToClaim = unclaimedSquares[Math.floor(unclaimedSquares.length * Math.random())];
          scriptingAPI.claimSquare(squareToClaim.row, squareToClaim.col);
        }, timeToWait);
        break;
      case playerModes.runMyCode:
        try {
          console.log("Run My Code", this.workingScript.scriptText);
          eval(`${this.workingScript.scriptText}
          //# sourceURL=player${this.playerLetter}Script.js`);
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
