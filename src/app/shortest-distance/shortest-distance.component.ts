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
  @ViewChildren('cells') cells!: QueryList<ElementRef>;

  public graph = new Array<Array<any>>();

  private rowCount = 35;
  private colCount = 70;

  private modes = { fast : 0.05 , medium : 0.5 , slow: 1}

  private currentMode = 'fast';

  public shouldAddWall = false;

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
    const animationOrder = BFS([15, 15], [30, 30], this.graph);
    this.animate(animationOrder);
  }

  delay(ms : number){ return new Promise(resolve => setTimeout(resolve, ms))}

  animate(animationOrder: Array<Array<number>>) {
    animationOrder.forEach((point , i) => {
      if (this.cells.length > 0) {
        const element = this.cells.find(
          (cell) => cell.nativeElement.id === `${point[0]}-${point[1]}`
        );
        setTimeout(async() => {
          element?.nativeElement.classList.remove('unvisited');
          element?.nativeElement.classList.add('current');
        } , i*200*this.modes['fast']);
        setTimeout(async() => {
          element?.nativeElement.classList.remove('current');
          element?.nativeElement.classList.add('visited');
        } , (i*200*this.modes['fast'] + 8));

      }
    });
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
