import { cloneDeep } from 'lodash';
import { HeapObj, MinHeap } from './heap';
import { getNeighbour } from './neighbour';
import { getPath } from './compute_path';

export function dijkstra(
  start: Array<number>,
  end: Array<number>,
  matrix: Array<Array<{ wall: boolean; visited: boolean; weight: number }>>
) {
  const nodes: HeapObj[] = initializeNodes(start, matrix);

  const set: Set<string> = new Set();
  const rowCount = matrix.length;
  const colCount = matrix[0]?.length || 0;
  const visitedOrder = [];
  const previous: { [id: string]: string } = {};

  const h = new MinHeap();
  h.build(nodes);

  while (!h.isEmpty()) {
    const minNode = h.extractMin();
    if (minNode) {
      const neighbours = getNeighbour(
        minNode.coords[0],
        minNode.coords[1],
        rowCount,
        colCount
      ).reverse();

      matrix[minNode.coords[0]][minNode.coords[1]].visited = true;
      visitedOrder.push(minNode.coords);
      if (minNode.coords[0] === end[0] && minNode.coords[1] === end[1]) {
        return {
          visited: visitedOrder,
          path: getPath(previous, end),
        };
      }
      neighbours.forEach((neighbour) => {
        if (
          !matrix[neighbour[0]][neighbour[1]].visited &&
          !matrix[neighbour[0]][neighbour[1]].wall
        ) {
          if (
            minNode.cost + matrix[neighbour[0]][neighbour[1]].weight <
            h.getNodeByCoords(neighbour).cost
          ) {
            h.decreaseKey(
              neighbour,
              minNode.cost + matrix[neighbour[0]][neighbour[1]].weight,
              minNode.coords
            );

            previous[
              `${neighbour[0]}_${neighbour[1]}`
            ] = `${minNode.coords[0]}_${minNode.coords[1]}`;
          }
        }
      });
    }
  }

  return {
    visited: visitedOrder,
    path: [],
  };
}

function initializeNodes(
  start: Array<number>,
  matrix: Array<Array<{ wall: boolean; visited: boolean; weight: number }>>
) {
  const nodes: HeapObj[] = [];
  matrix.forEach((row, r) => {
    row.forEach((cell, c) => {
      nodes.push({
        coords: [r, c],
        cost: r === start[0] && c === start[1] ? 0 : Number.MAX_VALUE,
        parent: [-1, -1],
      });
    });
  });

  return nodes;
}
