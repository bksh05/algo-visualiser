import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'algo-visualizer';
  displayModal = false;
  currentIndex =2;

  constructor(){
  }

  ngOnInit(){

    this.displayModal = true;
  }
}
