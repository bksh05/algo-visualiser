import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShortestDistanceComponent } from './shortest-distance/shortest-distance.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [AppComponent, ShortestDistanceComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenubarModule,
    SharedModule,
    DialogModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
