import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shortest-distance',
  templateUrl: './shortest-distance.component.html',
  styleUrls: ['./shortest-distance.component.scss'],
})
export class ShortestDistanceComponent implements OnInit {
  public graph = new Array<Array<any>>();

  private rowCount = 35;
  private colCount = 70;

  public shouldAddWall = false;

  constructor() {
    this.initializeGraph();
  }

  ngOnInit(): void {
  }

  initializeGraph() {
    for (let i = 0; i < this.rowCount; i++) {
      const cells = [];
      for (let j = 0; j < this.colCount; j++) {
        cells.push({
          visited : false,
          wall: false
        });
      }
      this.graph.push(cells);
    }
  }
}
