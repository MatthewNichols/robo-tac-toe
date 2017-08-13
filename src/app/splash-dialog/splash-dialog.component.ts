import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-splash-dialog',
  templateUrl: './splash-dialog.component.html',
  styleUrls: ['./splash-dialog.component.scss']
})
export class SplashDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<SplashDialogComponent>) { }

  doNotShowSplash: boolean = false;

  ngOnInit() {
  }

}
