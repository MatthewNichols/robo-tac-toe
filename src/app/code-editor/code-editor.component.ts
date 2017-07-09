import { AceEditorComponent } from 'ng2-ace-editor';
import {} from 'ace-builds';
import {AfterViewInit, Component, Input, ViewChild, ChangeDetectorRef} from '@angular/core';
import {CodeManagementService} from "../services/code-management.service";
import {playerModel} from "../models/playerModel";


@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit {

  constructor(private codeManementService: CodeManagementService, private cdr: ChangeDetectorRef) {  }

  @ViewChild('editor') editor;
  scriptText: string = "";
  @Input() enabled: boolean = true;
  @Input() player: playerModel;
  //workingScript: savedScript;

  textChanged() {
    console.log("Text changed", this.scriptText);
    if (this.player.workingScript !== undefined) {
      this.player.workingScript.scriptText = this.scriptText;
      this.codeManementService.saveWorkingScript(this.player.playerId, this.player.workingScript);
    }
  }

  ngAfterViewInit() {
    this.editor.setTheme("eclipse");

    const editor = this.editor.getEditor();

    editor.setOptions({
      enableBasicAutocompletion: true
    });

    editor.commands.addCommand({
      name: "showOtherCompletions",
      bindKey: "Ctrl-.",
      exec: function (editor) {

      }
    });

    this.player.workingScript = this.codeManementService.getWorkingScript(this.player.playerId);
    console.log("workingScriptLoaded", this.player.workingScript.scriptText);
    this.scriptText = this.player.workingScript.scriptText;
    //Handles runtime error. May not be needed long term.
    //See: https://github.com/angular/angular/issues/17572 for details
    this.cdr.detectChanges();
  }
}
