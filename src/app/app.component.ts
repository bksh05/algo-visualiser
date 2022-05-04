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
    console.log(this.isMobileOrTablet);
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
