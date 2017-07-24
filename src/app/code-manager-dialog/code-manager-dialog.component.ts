import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-code-manager-dialog',
  templateUrl: './code-manager-dialog.component.html',
  styleUrls: ['./code-manager-dialog.component.scss']
})
export class CodeManagerDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<CodeManagerDialogComponent>) { }

  ngOnInit() {
  }

}
