import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BFS } from '../algorithms/bfs';

@Component({
  selector: 'app-shortest-distance',
  templateUrl: './shortest-distance.component.html',
  styleUrls: ['./shortest-distance.component.scss'],
})
export class ShortestDistanceComponent implements OnInit, AfterViewInit {
  @ViewChild('graphContainer') graphContainer?: ElementRef;

  public graph = new Array<Array<any>>();

  public rowCount = 0;
  public colCount = 0;

  public startPoint = [0, 0];

  public endPoint = [0, 0];

  public shouldAddWall = false;

  public changeStartPointMode = false;
  public changeEndPointMode = false;

  public isAnimationInProgress = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.graphContainer) {
      this.rowCount =
        Math.floor(this.graphContainer.nativeElement.offsetHeight / 32) - 1;
      this.colCount =
        Math.floor(this.graphContainer.nativeElement.offsetWidth / 32) - 1;
      this.initializeGraph();
    }
  }

  initializeGraph() {
    if(this.isAnimationInProgress){
      return;
    }
    for (let i = 0; i < this.rowCount; i++) {
      const cells = [];
      for (let j = 0; j < this.colCount; j++) {
        cells.push({
          visited: false,
          wall: false,
        });
      }
      this.graph.push(cells);
    }

    this.startPoint = [
      Math.round((1 / 2) * this.rowCount),
      Math.round((1 / 4) * this.colCount),
    ];

    this.endPoint = [
      Math.round((1 / 2) * this.rowCount),
      Math.round((3 / 4) * this.colCount),
    ];
  }

  visualize() {
    if(this.isAnimationInProgress){
      return;
    }
    this.resetGraph();
    const animationOrder = BFS(this.startPoint, this.endPoint, this.graph);
    this.animate(animationOrder);
  }

  resetGraph() {
    if(this.isAnimationInProgress){
      return;
    }
    for (let i = 0; i < this.rowCount; i++) {
      for (let j = 0; j < this.colCount; j++) {
        this.graph[i][j].visited = false;
        const ele = document.getElementById(`${i}-${j}`);

        if (ele) {
          ele.classList.remove('visited');
          ele.classList.remove('current');
          ele.classList.add('unvisited');
        }
      }
    }
  }

  animate(animationOrder: Array<Array<number>>) {
    if(this.isAnimationInProgress){
      return;
    }
    const index = -1;
    let flag = false;

    const animateCell = (index: number) => {
      if(index === animationOrder.length - 1){
        this.isAnimationInProgress = false;
      }
      if (!flag) {
        flag = true;
        setTimeout(async () => {
          const element = document.getElementById(
            `${animationOrder[index][0]}-${animationOrder[index][1]}`
          );
          if (element) {
            element.classList.remove('unvisited');
            element.classList.add('current');
          }
          if (index < animationOrder.length - 1) {
            animateCell(flag ? index : index + 1);
          }
        }, 10);
      } else {
        flag = false;
        setTimeout(async () => {
          const element = document.getElementById(
            `${animationOrder[index][0]}-${animationOrder[index][1]}`
          );
          if (element) {
            element.classList.remove('current');
            element.classList.add('visited');
          }
          if (index < animationOrder.length - 1) {
            animateCell(flag ? index : index + 1);
          }
        }, 10);
      }
    }

    animateCell(index + 1);
    this.isAnimationInProgress = true;
  }

  createWall(row: number, column: number) {
    if(this.isAnimationInProgress){
      return;
    }
    if (
      this.shouldAddWall &&
      !this.isStartPoint(row, column) &&
      !this.isEndPoint(row, column)
    ) {
      this.graph[row][column].wall = true;
    }
  }

  startWallCreation(row: number, column: number) {
    if(this.isAnimationInProgress){
      return;
    }
    if (!this.isStartPoint(row, column) && !this.isEndPoint(row, column))
      this.shouldAddWall = true;
  }

  stopWallCreation() {
    if(this.isAnimationInProgress){
      return;
    }
    this.shouldAddWall = false;
  }

  changeStart(row: number, column: number) {
    if(this.isAnimationInProgress){
      return;
    }
    if (this.changeStartPointMode) {
      this.startPoint = [row, column];
    }
    if (this.changeEndPointMode) {
      this.endPoint = [row, column];
    }
  }

  onDragStartEvent(row: number, column: number) {
    if(this.isAnimationInProgress){
      return;
    }
    if (this.isStartPoint(row, column)) {
      this.changeStartPointMode = true;
      this.changeEndPointMode = false;
    }
    if (this.isEndPoint(row, column)) {
      this.changeEndPointMode = true;
      this.changeStartPointMode = false;
    }
  }

  resetModes() {
    if(this.isAnimationInProgress){
      return;
    }
    this.changeEndPointMode = false;
    this.changeStartPointMode = false;
  }

  isStartPoint(row: number, column: number) {
    return row === this.startPoint[0] && column === this.startPoint[1];
  }

  isEndPoint(row: number, column: number) {
    return row === this.endPoint[0] && column === this.endPoint[1];
  }
}
