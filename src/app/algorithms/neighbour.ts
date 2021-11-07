export function getNeighbour(
  i: number,
  j: number,
  rowCount: number,
  colCount: number
) {
  const neighbours = new Array<Array<number>>();

    if (rowCount <= 0 && colCount <= 0) {
      return neighbours;
    }

    if (i >= rowCount || j >= colCount) {
      return neighbours;
    }

  if (i - 1 >= 0) {
    neighbours.push([i - 1, j]);
  }

  if (j + 1 < colCount) {
    neighbours.push([i, j + 1]);
  }

  if (i + 1 < rowCount) {
    neighbours.push([i + 1, j]);
  }

  if (j - 1 >= 0) {
    neighbours.push([i, j - 1]);
  }

  return neighbours;
}
