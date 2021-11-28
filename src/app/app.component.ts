import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'algo-visualizer';
  displayModal = false;
  currentIndex = 0;
  width = { width : "50vw"};

  constructor(){
  }

  ngOnInit(){

    this.displayModal = true;
    if(window.innerWidth < 700){
      this.width.width = "90vw"
    } 
  }
}
