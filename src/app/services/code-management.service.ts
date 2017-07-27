import { Injectable } from '@angular/core';
import {savedScript} from "../models/savedScript";
import {scriptDescriptor} from "../models/scriptDescriptor";
import localStorageUtils from './localStorageUtils';

const WORKING_SCRIPT_STORAGE_KEY = "WORKING_SCRIPT_STORAGE_KEY";
const SCRIPT_LIST_STORAGE_KEY = "SCRIPT_LIST_STORAGE_KEY";

export interface ICodeManagementService {
  getSavedScriptsList(): Promise<scriptDescriptor[]>;
  getSavedScript(scriptId: string): Promise<savedScript>;

  /**
   * Deletes the specified savedScript object and
   * removes its entry from the SavedScriptsList
   * @param scriptId
   */
  deleteSavedScript(scriptId: string): void;

  /**
   * Saves the passed in script object and makes sure it is
   * in the SavedScripts list.
   * @param script
   */
  saveScript(script: savedScript): void;

  /**
   * Get the current working script
   */
  getWorkingScript(playerId: number): Promise<savedScript>;

  /**
   * Saves the current script being worked on as is
   * @param script
   */
  saveWorkingScript(playerId: number, script: savedScript);
}

@Injectable()
export class CodeManagementService implements ICodeManagementService {
  getWorkingScript(playerId: number): Promise<savedScript> {
    return new Promise<savedScript>((resolve, reject) => {
      const defaultValue = new savedScript({});
      const key = WORKING_SCRIPT_STORAGE_KEY + playerId;
      let script = localStorageUtils.getItemAs(savedScript, key, defaultValue);
      resolve(script);
    });
    //return localStorageUtils.getItemAs(savedScript, WORKING_SCRIPT_STORAGE_KEY + playerId, new savedScript({}));
  }

  saveWorkingScript(playerId: number, script: savedScript) {
    localStorageUtils.saveItem(WORKING_SCRIPT_STORAGE_KEY + playerId, script);
  }

  getSavedScriptsList(): Promise<scriptDescriptor[]> {
    throw new Error("Method not implemented.");
  }

  getSavedScript(scriptId: string): Promise<savedScript> {
    throw new Error("Method not implemented.");
  }

  deleteSavedScript(scriptId: string): void {
    throw new Error("Method not implemented.");
  }

  saveScript(script: savedScript): void {
    throw new Error("Method not implemented.");
  }


}
