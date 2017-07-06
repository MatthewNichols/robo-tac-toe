import {playerModes} from "../player-area/player-area.component";
import {scriptingAPI} from "./scriptingAPI";
import {EventEmitter, Output} from "@angular/core";

const timeToWait = 1000;

export class playerModel {

  /**
   * @param {Function} playerUpdated Handler function.
   */
  constructor(public playerId: number, public playerLetter: string,
              playerMode: playerModes = playerModes.manual, playerUpdated?: Function) {

    this.playerMode = playerMode;
    this.playerUpdated = playerUpdated || function () {};
  }

  //Create a getter/setter so that changes can be detected
  _playerMode: playerModes;
  get playerMode(): playerModes { return this._playerMode; }
  set playerMode(newValue) {
    this._playerMode = newValue;

    //If a playerUpdated function is initialized then call it with the current instance.
    if (this.playerUpdated) {
      this.playerUpdated(this);
    }
  }

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
      default:
    }
  }

}
