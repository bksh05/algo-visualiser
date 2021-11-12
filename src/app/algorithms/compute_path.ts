export function getPath(
  previous: { [id: string]: string },
  end: Array<number>
) {
  const path = Array<Array<number>>();
  path.push(end);
  let current = end;
  while (previous[current[0] + '_' + current[1]]) {
    current = previous[current[0] + '_' + current[1]]
      .split('_')
      .map((_) => parseInt(_));
    path.push(current);
  }
  return path.reverse();
}
