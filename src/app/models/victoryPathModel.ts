
import {boardSquareModel} from "./boardSquareData";
import {PLAYER_1} from "./constants";
import {playerModel} from "./playerModel";
export class victoryPathModel {

  constructor(public contigousSquares: boardSquareModel[], public pathName: string) {

  }

  get isComplete(): boolean {
    let claimed = this.contigousSquares.filter(cs => cs.isClaimed);
    if (claimed.length < 3) {
      return false;
    }

    let claimedByPlayer1 = claimed.filter(s => s.claimedById === PLAYER_1);
    if (claimedByPlayer1.length === 0 || claimedByPlayer1.length === 3) {
      this.wonByPlayer = claimed[0].claimedBy;
      return true;
    }

    return false;
  }

  wonByPlayer: playerModel;
}
