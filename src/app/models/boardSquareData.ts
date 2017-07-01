import {boardModel} from "./boardModel";
import {playerModel} from "./playerModel";
import {gameController} from "./gameController";

export class boardSquareModel {


  constructor(public row: number, public col: number, private parent: boardModel, private controller: gameController) {  }

  claimedBy: playerModel;

  get isClaimed(): boolean {
    return !!this.claimedBy;
  }

  get claimedText(): string {
    if (this.claimedBy) {
      return this.claimedBy.playerLetter;
    }

    return "";
  }

  handleClaim() {
    console.log("claim");
    this.claimedBy = this.controller.activePlayer;
    this.controller.toggleActivePlayer();
  }
}
