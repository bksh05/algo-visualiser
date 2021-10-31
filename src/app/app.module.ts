import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShortestDistanceComponent } from './shortest-distance/shortest-distance.component';
import { CellComponent } from './shortest-distance/cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    ShortestDistanceComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
