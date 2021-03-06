import {playerModes} from "../player-area/player-area.component";
import {savedScript} from "./savedScript";
import {userScriptExecutor} from "./userScriptExecutor";

const timeToWait = 1000;

export class playerModel {

  /**
   * @param {Function} playerUpdated Handler function.
   */
  constructor(playerId: number, playerLetter: string, playerMode: playerModes = playerModes.manual, autoRun: boolean = true,
              playerUpdated?: {(model: playerModel, fieldsUpdated?: string[]): void}) {
    this.playerId = playerId;
    this.playerLetter = playerLetter;
    this.playerMode = playerMode;
    this.autoRun = autoRun;
    this.playerUpdated = playerUpdated || function () {};
    this.workingScript = new savedScript({});
  }

  playerId: number;
  playerLetter: string;

  //#region playerMode (Create a getter/setter so that changes can be detected. Persisted to localStorage)

  //It would be awesome to make this into a regular property and write a Decorator to catch the
  // value change
  _playerMode: playerModes;
  get playerMode(): playerModes { return this._playerMode; }
  set playerMode(newValue) {
    this._playerMode = newValue;

    //If a playerUpdated function is initialized then call it with the current instance.
    if (this.playerUpdated) {
      this.playerUpdated(this, ["playerMode"]);
    }
  }

  //#endregion
  //
  // #region autoRun (Create a getter/setter so that changes can be detected. Persisted to localStorage)

  //It would be awesome to make this into a regular property and write a Decorator to catch the
  // value change
  _autoRun: boolean = true;
  get autoRun(): boolean { return this._autoRun; }
  set autoRun(newValue) {
    this._autoRun = newValue;

    //If a playerUpdated function is initialized then call it with the current instance.
    if (this.playerUpdated) {
      this.playerUpdated(this, ["autoRun"]);
    }
  }

  //#endregion

  workingScript: savedScript;

  /**
   * playerUpdated Handler function.
   */
  playerUpdated: {(model: playerModel, fieldsUpdated?: string[]): void};

  toJSON() {
    return {
      playerMode: this.playerMode,
      playerAutoRun: this.autoRun
    }
  }

}
