import { AceEditorComponent } from 'ng2-ace-editor';
import 'brace/theme/chrome';
import 'brace/mode/javascript';
import {AfterViewInit, Component, Input, ViewChild, ChangeDetectorRef} from '@angular/core';
import {CodeManagementService} from "../services/code-management.service";
import {playerModel} from "../models/playerModel";
import {savedScript} from "../models/savedScript";


@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit {

  constructor(private codeManementService: CodeManagementService, private cdr: ChangeDetectorRef) {  }

  @ViewChild('editor') editor;

  get scriptText(): string { return this.player.workingScript.scriptText || "" };
  set scriptText(newValue: string) { this.player.workingScript.scriptText = newValue }

  @Input() enabled: boolean = true;
  @Input() player: playerModel;

  textChanged() {
    if (this.player.workingScript !== undefined) {
      this.player.workingScript.scriptText = this.scriptText;
      this.codeManementService.saveWorkingScript(this.player.playerId, this.player.workingScript);
    }
  }

  ngAfterViewInit() {
    this.editor.setTheme("chrome");

    const editor = this.editor.getEditor();

    // editor.setOptions({
    //   enableBasicAutocompletion: true
    // });

    // editor.commands.addCommand({
    //   name: "showOtherCompletions",
    //   bindKey: "Ctrl-.",
    //   exec: function (editor) {
    //
    //   }
    // });

    this.codeManementService.getWorkingScript(this.player.playerId).then(savedScript => {
      this.player.workingScript = savedScript;
      //Handles runtime error. May not be needed long term.
      //See: https://github.com/angular/angular/issues/17572 for details
      this.cdr.detectChanges();
    });
  }
}
