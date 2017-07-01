import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-player-area',
  templateUrl: './player-area.component.html',
  styleUrls: ['./player-area.component.scss']
})
export class PlayerAreaComponent implements OnInit {

  constructor() { }

  @Input() playerLetter: string;
  @Input() @HostBinding('class.active') active: boolean;

  ngOnInit() {
  }

}