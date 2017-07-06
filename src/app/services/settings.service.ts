import { Injectable } from '@angular/core';
import {playerModes} from "../player-area/player-area.component";
import {PLAYER_1, PLAYER_2} from "../models/constants";
import set = Reflect.set;

const Player1SettingsKey = "robo-Player1Settings";
const Player2SettingsKey = "robo-Player2Settings";


@Injectable()
export class SettingsService {

  constructor() { }

  getPlayer1Settings(): playerSettings {
    return this.getSetting(Player1SettingsKey, {
      playerId: PLAYER_1,
      playerLetter: "X",
      playerMode: playerModes.manual
    });
  }

  getPlayer2Settings(): playerSettings {
    return this.getSetting(Player2SettingsKey, {
      playerId: PLAYER_2,
      playerLetter: "O",
      playerMode: playerModes.random
    });
  }

  savePlayerSettings(settings: playerSettings): void {
    var settingKey = settings.playerId === PLAYER_1 ? Player1SettingsKey : Player2SettingsKey;
    this.saveSetting(settingKey, { ...settings, playerMode: settings.playerMode } )
  }

  private saveSetting(key, setting) {
    if (typeof setting !== "string") {
      setting = JSON.stringify(setting);
    }

    localStorage.setItem(key, setting);
  }

  private getSetting(key, defaultValue = {}): any {
    let settingString = localStorage.getItem(key);

    if (settingString === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(settingString);
    } catch(err) {
      return settingString;
    }
  }
}

export interface playerSettings {
  playerId: number;
  playerLetter: string;
  playerMode: playerModes;
}
