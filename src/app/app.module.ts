import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdButtonModule, MdCheckboxModule, MdDialog, MdDialogModule, MdFab, MdIconModule,
  MdInputModule, MdToolbarModule
} from '@angular/material';

import { AceEditorComponent } from 'ng2-ace-editor';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PlayerAreaComponent } from './player-area/player-area.component';
import { BoardSquareComponent } from './board-square/board-square.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CodeManagementService } from './services/code-management.service';
import { SettingsService } from './services/settings.service';
import { AppSettingsDialogComponent } from './app-settings-dialog/app-settings-dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { FooterControlsComponent } from './footer-controls/footer-controls.component';
import { CodeManagerDialogComponent } from './code-manager-dialog/code-manager-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PlayerAreaComponent,
    BoardSquareComponent,
    CodeEditorComponent,
    AceEditorComponent,
    AppSettingsDialogComponent,
    AppSettingsComponent,
    FooterControlsComponent,
    CodeManagerDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MdButtonModule,
    MdIconModule,
    MdDialogModule,
    MdInputModule,
    MdCheckboxModule,
    MdToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [
    CodeManagementService,
    SettingsService
  ],
  entryComponents: [
    AppSettingsDialogComponent,
    CodeManagerDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
