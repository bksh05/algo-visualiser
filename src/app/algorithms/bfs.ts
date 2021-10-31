const actions = ['ca', 'cs', 'ac', 'sc'];

export function BFS(
  start: Array<number>,
  end: Array<number>,
  matrix: Array<Array<{wall : boolean , visited: boolean}>>
) :Array<Array<number>> {

  const queue = new Array<Array<number>>();
  queue.push(start);
  matrix[start[0]][start[1]].visited = true;
  const orderVisited = [start];

  const rowCount = matrix.length;
  const colCount = matrix[0].length;
  let count = 0;

  while (queue.length > 0) {
    const current = queue.shift()!;
    orderVisited.push(current);

    for (let i = 0; i < actions.length; i++) {
      let nextRow = current[0];
      let nextCol = current[1];

      if (actions[i] === 'sc') {
        if (current[0] - 1 < 0) {
          continue;
        }
        nextRow = current[0] - 1;
      } else if (actions[i] === 'ac') {
        if (current[0] + 1 >= rowCount) {
          continue;
        }
        nextRow = current[0] + 1;
      } else if (actions[i] === 'ca') {
        if (current[1] + 1 >= colCount) {
          continue;
        }
        nextCol = current[1] + 1;
      } else if (actions[i] === 'cs') {
        if (current[1] - 1 < 0) {
          continue;
        }
        nextCol = current[1] - 1;
      }

      if (!matrix[nextRow][nextCol].visited && !matrix[nextRow][nextCol].wall) {
        count++;
        matrix[nextRow][nextCol].visited = true;
        if (nextRow == end[0] && nextCol == end[1]) {
          return orderVisited;
        }
        queue.push([nextRow, nextCol]);
      }
    }
  }

  return orderVisited;
}
