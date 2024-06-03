import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { isMobileAndTabletCheck } from './utils/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'algo-visualizer';
  
  public isTutorialVisible = true;
  public isMobileOrTablet : boolean = false;
  
  constructor(){
  }

  
  ngAfterViewInit(): void {
    
  }

  ngOnInit(){
    this.isMobileOrTablet = isMobileAndTabletCheck();
    console.log("Is this mobile or tablet", this.isMobileOrTablet);
    console.log("Working on angular 16!!")
  }


  @HostListener('document:keyup', ['$event'])
  startTutorial(event : KeyboardEvent){
    if((event.key === 't' || event.key === 'T')){
      this.isTutorialVisible = true;
    }
  }

  stopTutorial(){
    this.isTutorialVisible = false;
  }



}
