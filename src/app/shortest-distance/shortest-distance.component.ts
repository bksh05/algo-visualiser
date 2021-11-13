import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BFS } from '../algorithms/bfs';
import { DFS } from '../algorithms/dfs';
import { StateService } from '../service/state.service';

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

  public selectedAlgoCode = '';

  private selectedAlgorithmSubscription?: Subscription;
  private triggerVisualizeSubscription?: Subscription;

  constructor(private state: StateService) {
    this.selectedAlgorithmSubscription =
      this.state.selectedAlgorithmSubject.subscribe((algoCode) => {
        this.selectedAlgoCode = algoCode;
      });

    this.state.triggerVisualize.subscribe((bool) => {
      if (bool) {
        this.visualize();
      }
    });
  }

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
    if (this.isAnimationInProgress) {
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
    if (this.isAnimationInProgress) {
      return;
    }
    this.resetGraph();

    let result = null;

    switch (this.selectedAlgoCode) {
      case 'BFS':
        result = BFS(this.startPoint, this.endPoint, this.graph);
        break;
      case 'DFS':
        result = DFS(this.startPoint, this.endPoint, this.graph);
        break;
    }

    if (result) {
      this.animate(result);
    }
  }

  resetGraph() {
    if (this.isAnimationInProgress) {
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

  animate(animationData: {
    visited: Array<Array<number>>;
    path: Array<Array<number>>;
  }) {
    if (this.isAnimationInProgress) {
      return;
    }
    const index = -1;
    let flag = false;

    const visitedOrder = animationData.visited;
    const pathOrder = animationData.path;

    const animateCell = (index: number) => {
      if (index === visitedOrder.length - 1) {
        animatePath(0);
      }
      if (!flag) {
        flag = true;
        setTimeout(async () => {
          const element = document.getElementById(
            `${visitedOrder[index][0]}-${visitedOrder[index][1]}`
          );
          if (element) {
            element.classList.remove('unvisited');
            element.classList.add('current');
          }
          if (index < visitedOrder.length - 1) {
            animateCell(flag ? index : index + 1);
          }
        }, 10);
      } else {
        flag = false;
        setTimeout(async () => {
          const element = document.getElementById(
            `${visitedOrder[index][0]}-${visitedOrder[index][1]}`
          );
          if (element) {
            element.classList.remove('current');
            element.classList.add('visited');
          }
          if (index < visitedOrder.length - 1) {
            animateCell(flag ? index : index + 1);
          }
        }, 10);
      }
    };

    const animatePath = (index: number) => {
      setTimeout(async () => {
        if (index == pathOrder.length - 1) {
          this.isAnimationInProgress = false;
        }
        const element = document.getElementById(
          `${pathOrder[index][0]}-${pathOrder[index][1]}`
        );
        if (element) {
          element.classList.remove('visited');
          element.classList.add('current');
        }
        if (index < pathOrder.length - 1) {
          animatePath(index + 1);
        }
      }, 50);
    };

    animateCell(index + 1);
    this.isAnimationInProgress = true;
  }

  createWall(row: number, column: number) {
    if (this.isAnimationInProgress) {
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
    if (this.isAnimationInProgress) {
      return;
    }
    if (!this.isStartPoint(row, column) && !this.isEndPoint(row, column))
      this.shouldAddWall = true;
  }

  stopWallCreation() {
    if (this.isAnimationInProgress) {
      return;
    }
    this.shouldAddWall = false;
  }

  onDragStartEvent(row: number, column: number) {
    if (this.isAnimationInProgress) {
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

  changePoints(row: number, column: number) {
    if (this.isAnimationInProgress) {
      return;
    }
    if (this.changeStartPointMode) {
      this.startPoint = [row, column];
    }
    if (this.changeEndPointMode) {
      this.endPoint = [row, column];
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
