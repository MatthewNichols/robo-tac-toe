import { Injectable } from '@angular/core';
import {playerModes} from "../player-area/player-area.component";
import {PLAYER_1, PLAYER_2} from "../models/constants";
import localStorageUtils from './localStorageUtils';

const Player1SettingsKey = "robo-Player1Settings";
const Player2SettingsKey = "robo-Player2Settings";
const GameSettingsKey = "robo-GameSettings";

@Injectable()
export class SettingsService {

  constructor() {  }

  getPlayer1Settings(): playerSettings {
    return localStorageUtils.getItem(Player1SettingsKey, {
      playerId: PLAYER_1,
      playerLetter: "X",
      playerMode: playerModes.manual
    });
  }

  getPlayer2Settings(): playerSettings {
    return localStorageUtils.getItem(Player2SettingsKey, {
      playerId: PLAYER_2,
      playerLetter: "O",
      playerMode: playerModes.random
    });
  }

  savePlayerSettings(settings: playerSettings): void {
    var settingKey = settings.playerId === PLAYER_1 ? Player1SettingsKey : Player2SettingsKey;
    localStorageUtils.saveItem(settingKey, settings )
  }

  getGameSettings(): gameSettings {
    return localStorageUtils.getItem(GameSettingsKey, {
      secondsBetweenMoves: 4,
      autostartPlay: true,
      showSplash: true
    });
  }

  saveGameSettings(settings: gameSettings): void {
    localStorageUtils.saveItem(GameSettingsKey, settings )
  }

}

export interface playerSettings {
  playerId: number;
  playerLetter: string;
  playerMode: playerModes;
  playerAutoRun: boolean;
}

export interface gameSettings {
  secondsBetweenMoves?: number;
  autostartPlay?: boolean;
  showSplash?: boolean;
}
