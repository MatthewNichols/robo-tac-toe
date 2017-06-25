import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PlayerAreaComponent } from './player-area/player-area.component';
import { BoardSquareComponent } from './board-square/board-square.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PlayerAreaComponent,
    BoardSquareComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
