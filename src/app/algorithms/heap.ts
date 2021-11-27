import { cloneDeep } from 'lodash';

export interface HeapObj {
  coords: [number, number];
  cost: number;
  parent: [number, number];
}

export class MinHeap {
  private _heap: HeapObj[] = [];
  private _coordsToIndexMap: { [coords: string]: number } = {};

  getParent(index: number) {
    return Math.floor((index - 1) / 2);
  }

  build(arr: HeapObj[]) {
    this._heap = cloneDeep(arr);

    for (let i = this._heap.length - 1; i >= 0; i--) {
      this._coordsToIndexMap[this.getIdFromCoords(this._heap[i].coords)] = i;

      if (i < Math.floor(this._heap.length / 2) + 1) {
        this._heapify(i);
      }
    }
  }

  private _heapify(index: number) {
    const left = 2 * index + 1;
    const right = left + 1;
    let smallest = index;

    if (
      left < this._heap.length &&
      this._heap[left].cost < this._heap[smallest].cost
    ) {
      smallest = left;
    }

    if (
      right < this._heap.length &&
      this._heap[right].cost < this._heap[smallest].cost
    ) {
      smallest = right;
    }

    if (smallest !== index) {
      const temp = this._heap[index];
      this._heap[index] = this._heap[smallest];
      this._heap[smallest] = temp;

      this._coordsToIndexMap[
        this.getIdFromCoords(this._heap[smallest].coords)
      ] = smallest;
      this._coordsToIndexMap[this.getIdFromCoords(this._heap[index].coords)] =
        index;

      this._heapify(smallest);
    }
  }

  extractMin() {
    if (this._heap.length == 0) {
      return null;
    }
    const min = this._heap[0];
    delete this._coordsToIndexMap[this.getIdFromCoords(min.coords)];
    this._heap[0] = this._heap.pop()!;
    this._coordsToIndexMap[this.getIdFromCoords(this._heap[0].coords)] = 0;
    this._heapify(0);
    return min;
  }

  decreaseKey(
    coords: [number, number],
    cost: number,
    parent: [number, number]
  ) {
    let index = this._coordsToIndexMap[this.getIdFromCoords(coords)];
    this._heap[index].cost = cost;
    this._heap[index].parent = parent;

    while (
      index > 0 &&
      this._heap[index].cost < this._heap[this.getParent(index)].cost
    ) {
      const parentIndex = this.getParent(index);

      const temp = this._heap[index];
      this._heap[index] = this._heap[parentIndex];
      this._heap[parentIndex] = temp;

      this._coordsToIndexMap[
        this.getIdFromCoords(this._heap[parentIndex].coords)
      ] = parentIndex;
      this._coordsToIndexMap[this.getIdFromCoords(this._heap[index].coords)] =
        index;

      index = parentIndex;
    }
  }

  isEmpty() {
    return this._heap.length == 0;
  }

  getNodeByCoords(coords: [number, number]) {
    const index = this._coordsToIndexMap[this.getIdFromCoords(coords)];
    return this._heap[index];
  }

  getIdFromCoords(coords: [number, number]) {
    return `${coords[0]}_${coords[1]}`;
  }
}
