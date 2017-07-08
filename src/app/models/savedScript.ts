import shortid from 'shortid';

export class savedScript {

  constructor(script: { scriptId?:string, name?: string, scriptText?: string, onScriptChange?: (savedScript: savedScript) => void }) {
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
      if (this.onScriptChange) {
        this.onScriptChange(this);
      }

      this._scriptText = newValue;
      this.isDirty = true;
    }
  }

  onScriptChange: (savedScript: savedScript) => void;

  get storeageKey() {
    return `robo-script-${this.scriptId}`;
  }

  private generateNewId(): string {
    return shortid.generate();
  }

  toJSON() {
    return {
      scriptId: this.scriptId,
      isDirty: this.isDirty,
      name: this.name,
      scriptText: this.scriptText
    };
  }
}
