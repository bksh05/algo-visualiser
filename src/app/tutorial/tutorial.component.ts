import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {


  constructor() { }

  @Input() displayModal = false;
  @Output() hideTutorialEvent = new EventEmitter<void>();

  currentIndex = 0;
  width = { width : "50vw"};

  ngOnInit(): void {
    this.displayModal = true;
    if(window.innerWidth < 700){
      this.width.width = "90vw"
    } 
  }

  hideTutorial(){
    this.currentIndex = 0;
    this.hideTutorialEvent.emit();
  }
}
