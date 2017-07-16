import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-app-settings-dialog',
  templateUrl: './app-settings-dialog.component.html',
  styleUrls: ['./app-settings-dialog.component.scss']
})
export class AppSettingsDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<AppSettingsDialogComponent>) { }

  secondsBetweenMoves: number;
  actions = AppSettingsDialogActions;

  ngOnInit() {
  }

}

export enum AppSettingsDialogActions {
  Save,
  Cancel
}
