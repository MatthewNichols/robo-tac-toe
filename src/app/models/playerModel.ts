import {playerModes} from "../player-area/player-area.component";
import {scriptingAPI} from "./scriptingAPI";

const timeToWait = 1000;

export class playerModel {


  constructor(public playerId: number, public playerLetter: string, public playerMode: playerModes = playerModes.manual) {  }

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
