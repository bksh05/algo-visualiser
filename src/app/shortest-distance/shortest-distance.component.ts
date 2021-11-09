import { Component, OnInit } from '@angular/core';
import { BFS } from '../algorithms/bfs';

@Component({
  selector: 'app-shortest-distance',
  templateUrl: './shortest-distance.component.html',
  styleUrls: ['./shortest-distance.component.scss'],
})
export class ShortestDistanceComponent implements OnInit {
  public graph = new Array<Array<any>>();

  public rowCount = 35;
  public colCount = 70;

  public startPoint = [
    Math.round((1 / 2) * this.rowCount),
    Math.round((1 / 4) * this.colCount),
  ];

  public endPoint = [
    Math.round((1 / 2) * this.rowCount),
    Math.round((3 / 4) * this.colCount),
  ];

  public shouldAddWall = false;

  public changeStartPointMode = false;
  public changeEndPointMode = false;

  constructor() {
    this.initializeGraph();
  }

  ngOnInit(): void {}

  initializeGraph() {
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
  }

  visualize() {
    this.resetGraph();
    const animationOrder = BFS(this.startPoint, this.endPoint, this.graph);
    this.animate(animationOrder);
  }

  resetGraph() {
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
    const index = -1;
    let flag = false;

    function animateCell(index: number) {
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
  }

  createWall(row: number, column: number) {
    if (
      this.shouldAddWall &&
      !this.isStartPoint(row, column) &&
      !this.isEndPoint(row, column)
    ) {
      this.graph[row][column].wall = true;
    }
  }

  startWallCreation(row: number, column: number) {
    if (!this.isStartPoint(row, column) && !this.isEndPoint(row, column))
      this.shouldAddWall = true;
  }

  stopWallCreation() {
    this.shouldAddWall = false;
  }

  changeStart(row: number, column: number) {
    if (this.changeStartPointMode) {
      this.startPoint = [row, column];
    }
    if (this.changeEndPointMode) {
      this.endPoint = [row, column];
    }
  }

  onDragStartEvent(row: number, column: number) {
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
