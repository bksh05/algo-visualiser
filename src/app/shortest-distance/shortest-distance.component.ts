import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
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
    Math.round((1 / 4) * this.colCount)
  ];

  public endPoint = [
    Math.round((1 / 2) * this.rowCount),
    Math.round((3 / 4) * this.colCount),
  ];

  public shouldAddWall = false;

  constructor() {
    this.initializeGraph();
    console.log(this.endPoint);
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

  createWall(i: number, j: number) {
    if (this.shouldAddWall) {
      this.graph[i][j].wall = true;
    }
  }

  startWallCreation() {
    this.shouldAddWall = true;
  }

  stopWallCreation() {
    this.shouldAddWall = false;
  }
}
