import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MdButtonModule, MdFab, MdIconModule} from '@angular/material';

import { AceEditorComponent } from 'ng2-ace-editor';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PlayerAreaComponent } from './player-area/player-area.component';
import { BoardSquareComponent } from './board-square/board-square.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CodeManagementService } from './services/code-management.service';
import { SettingsService } from './services/settings.service';
import { AppSettingsDialogComponent } from './app-settings-dialog/app-settings-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PlayerAreaComponent,
    BoardSquareComponent,
    CodeEditorComponent,
    AceEditorComponent,
    AppSettingsDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MdButtonModule,
    MdIconModule
  ],
  providers: [
    CodeManagementService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
