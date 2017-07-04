import { Injectable } from '@angular/core';
import shortid from 'shortid';

export interface ICodeManagementService {
  getSavedScriptsList(): scriptDescriptor[];
  getSavedScript(scriptId: string): savedScript;

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
  saveScript(script: savedScript);

  /**
   * Get the current working script
   */
  getWorkingScript(): savedScript;

  /**
   * Saves the current script being worked on as is
   * @param script
   */
  saveWorkingScript(script: savedScript);
}

@Injectable()
export class CodeManagementService implements ICodeManagementService {
  getWorkingScript(): savedScript {
    return undefined;
  }

  saveWorkingScript(script: savedScript) {
  }

  getSavedScriptsList(): scriptDescriptor[] {
    throw new Error("Method not implemented.");
  }

  getSavedScript(scriptId: string): savedScript {
    throw new Error("Method not implemented.");
  }

  deleteSavedScript(scriptId: string): void {
    throw new Error("Method not implemented.");
  }

  saveScript(script: savedScript) {
    throw new Error("Method not implemented.");
  }

}

export class savedScript {

  constructor(script: { scriptId?:string, name?: string, scriptText?: string }) {
    this.scriptId = script.scriptId || this.generateNewId();
    this.name = script.name || "unnamed";
    this.scriptText = script.scriptText || "";
  }

  scriptId: string;
  isDirty: boolean;
  name: string;

  _scriptText: string;
  get scriptText(): string {
    return this._scriptText;
  }
  set scriptText(newValue: string) {
    if (this._scriptText !== newValue) {
      this.isDirty = true;
      this._scriptText = newValue;
    }
  }

  get storeageKey() {
    return `robo-script-${this.scriptId}`;
  }

  private generateNewId(): string {
    return shortid.generate();
  }
}

/**
 * List entry for a saved script. All scriptDescriptors are intended to be saved in a
 * single collection "roboScriptList" together as pointers to the different saved script
 * objects.
 */
export class scriptDescriptor {
  storeageKey: string;
  scriptName: string;
}
