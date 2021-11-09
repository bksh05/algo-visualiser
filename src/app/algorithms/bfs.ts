import { getNeighbour } from './neighbour';

export function BFS(
  start: Array<number>,
  end: Array<number>,
  matrix: Array<Array<{ wall: boolean; visited: boolean }>>
): Array<Array<number>> {
  const queue = new Array<Array<number>>();
  queue.push(start);
  matrix[start[0]][start[1]].visited = true;
  const orderVisited = [start];

  const rowCount = matrix.length;
  const colCount = matrix[0].length;

  while (queue.length > 0) {
    const current = queue.shift()!;
    orderVisited.push(current);
    if (current[0] == end[0] && current[1] == end[1]) {
      return orderVisited;
    }

    const neighbours = getNeighbour(current[0], current[1], rowCount, colCount);
   
    for (let i = 0; i < neighbours.length; i++) {
      if (
        !matrix[neighbours[i][0]][neighbours[i][1]].visited &&
        !matrix[neighbours[i][0]][neighbours[i][1]].wall
      ) {
        matrix[neighbours[i][0]][neighbours[i][1]].visited = true;
        
        queue.push(neighbours[i]);
      }
    }
  }

  return orderVisited;
}
