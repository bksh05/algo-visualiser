import { Component, EventEmitter, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AllowedAlgorithms } from '../models/algorithm.model';
import { StateService } from '../service/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public items: MenuItem[] = [];
  public allowedAlgo?: Array<AllowedAlgorithms>;
  public selectedAlgoChange = new EventEmitter<string>();

  public selectedAlgoCode = '';

  constructor(private state: StateService) {
    this.allowedAlgo = [
      {
        name: 'Breadth First Search',
        code: 'BFS',
      },
      {
        name: 'Depth First Search',
        code: 'DFS',
      },
      {
        name: 'Dijkstra\'s Algorithm',
        code: 'Dijkstra'
      }
    ];
  }

  ngOnInit(): void {
    this.calculateMenuItems(true);
  }

  selectAlgorithm(algoCode: string) {
    this.selectedAlgoCode = algoCode;
    this.calculateMenuItems();
    this.state.selectedAlgorithmSubject.next(algoCode);
  }

  triggerVisualize() {
    this.calculateMenuItems();
    this.state.triggerVisualize.next(this.selectedAlgoCode !== '');
  }

  clear(command: string){
    this.state.boardTriggers.next(command);
  }

  calculateMenuItems(isFirst: boolean = false) {
    this.items = [
      {
        label: 'Algorithms',
        items: this.allowedAlgo?.map((algo) => {
          return {
            label: algo.name,
            command: () => {
              this.selectAlgorithm(algo.code);
            },
          };
        }),
      },
      {
        label: isFirst
          ? `Visualize`
          : this.selectedAlgoCode !== ''
          ? `Visualize ${this.selectedAlgoCode}`
          : 'Pick an algorithm',

        command: () => this.triggerVisualize(),
      },
      {
        label: 'Reset Board',
        command:  () => this.clear('reset'),
      },
      {
        label: 'Clear Walls and weight',
        command:  () => this.clear('walls and weights'),
      },
      {
        label: 'Clear Paths',
        command:  () => this.clear('paths'),
      },
    ];
  }
}
