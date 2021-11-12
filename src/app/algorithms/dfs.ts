import { cloneDeep } from 'lodash';
import { getPath } from './compute_path';
import { getNeighbour } from './neighbour';

export function DFS(
  start: Array<number>,
  end: Array<number>,
  matrix: Array<Array<{ wall: boolean; visited: boolean }>>
) {
  const stack = new Array<Array<number>>();
  const previous: { [id: string]: string } = {};
  const visitedOrder = [];
  const rowCount = matrix.length;
  const colCount = matrix[0] ? matrix[0].length : 0;
  matrix[start[0]][start[1]].visited = true;
  stack.push(start);
  visitedOrder.push(start);

  while (stack.length > 0) {
    const currentCell = stack.pop()!;

    if (!matrix[currentCell[0]][currentCell[1]].visited) {
        visitedOrder.push(currentCell);
        matrix[currentCell[0]][currentCell[1]].visited = true;
      }
    if (currentCell[0] === end[0] && currentCell[1] === end[1]) {
      return {
        visited: visitedOrder,
        path: getPath(previous, end),
      };
    }

    const neighbours = getNeighbour(
      currentCell[0],
      currentCell[1],
      rowCount,
      colCount
    ).reverse();


    for (let i = 0; i < neighbours.length; i++) {
      const neighbour = matrix[neighbours[i][0]][neighbours[i][1]];
      if (!neighbour.visited && !neighbour.wall) {
        stack.push(neighbours[i]);
        previous[
          `${neighbours[i][0]}_${neighbours[i][1]}`
        ] = `${currentCell[0]}_${currentCell[1]}`;
      }
    }

  }

  return {
    visited: visitedOrder,
    path: [],
  };
}
