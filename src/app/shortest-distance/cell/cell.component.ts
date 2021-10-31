import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() visited: boolean = false;

  @Input() wall: boolean = false;
  @Output() wallChange = new EventEmitter<boolean>();
  
  @Input() shouldAddWall = false;
  @Output() shouldAddWallChange = new EventEmitter<boolean>();

  constructor(){}

  ngOnInit(): void {
  }

  createWall(){
    if(this.shouldAddWall){
      this.wallChange.emit(true);
    }
  }

  startWallCreation(){
    if(this.shouldAddWall) return;
    this.shouldAddWallChange.emit(true);
    this.wallChange.emit(true);
  }

  stopWallCreation(){
    if(!this.shouldAddWall) return;
    this.shouldAddWallChange.emit(false);
    this.wallChange.emit(true);
  }

}
