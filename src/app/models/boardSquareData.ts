import {boardModel} from "./boardModel";
import {playerModel} from "./playerModel";
import {gameController} from "./gameController";

export class boardSquareModel {

  constructor(public row: number, public col: number, private parent: boardModel, private controller: gameController) {  }

  claimedBy: playerModel;
  partOfWinningPath: boolean;

  get isClaimed(): boolean {
    return !!this.claimedBy;
  }

  get claimedText(): string {
    if (this.claimedBy) {
      return this.claimedBy.playerLetter;
    }

    return "";
  }

  get claimedById(): number {
    if (this.claimedBy) {
      return this.claimedBy.playerId;
    }

    return 0;
  }

  get claimsAllowed() {
    return !this.parent.gameWon && !this.isClaimed;
  }

  handleClaim() {
    this.controller.handleSquareClaim(this);
  }

  resetSquare() {
    this.partOfWinningPath = false;
    this.claimedBy = null;
  }
}
