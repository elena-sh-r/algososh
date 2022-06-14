interface IQueue<T> {
  enqueue: (element: T) => void;
  dequeue: () => void;
  clear: () => void;
  getElements: () => T[];
  getSize: () => number;
  getHeadIdx: () => number;
  getTailIdx: () => number;
}

export class Queue<T> implements IQueue<T> {
  emptyElement: T;
  elements: T[] = [];
  headIdx: number = -1;
  tailIdx: number = -1;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  setAddedIdx: React.Dispatch<React.SetStateAction<number>>;
  setDeletedIdx: React.Dispatch<React.SetStateAction<number>>;

  constructor(
    size: number,
    emptyElement: T,
    setRender: React.Dispatch<React.SetStateAction<boolean>>,
    setValue: React.Dispatch<React.SetStateAction<T>>,
    setAddedIdx: React.Dispatch<React.SetStateAction<number>>,
    setDeletedIdx: React.Dispatch<React.SetStateAction<number>>,
  ) {
      this.setRender = setRender;
      this.setValue = setValue;
      this.setAddedIdx = setAddedIdx;
      this.setDeletedIdx = setDeletedIdx;

      this.emptyElement = emptyElement;

      for (let i=0; i<size;i++) {
        this.elements.push(emptyElement);
      }
  }

  enqueue = (element: T) => {
    if (this.headIdx < 0) {
      this.headIdx = 0;
    }

    let newTailIdx = this.tailIdx + 1;

    if (newTailIdx > this.elements.length - 1) {
      return;
    }

    this.elements[newTailIdx] = element;

    this.tailIdx = newTailIdx;
    this.setAddedIdx(newTailIdx);  
    this.setValue(this.emptyElement);
    this.setRender(true);
  }

  dequeue = () => {
    let newHeadIdx = this.headIdx + 1;

    this.elements[this.headIdx] = this.emptyElement;

    if (newHeadIdx > this.tailIdx) {
      this.headIdx = this.tailIdx = -1;
    } else {
      this.headIdx = newHeadIdx;
    }

    this.setDeletedIdx(-1);
    this.setValue(this.emptyElement);
    this.setRender(true);
  }

  clear = () => {
    const size = this.elements.length;
    for (let i=0; i<size;i++) {
      this.elements[i] = this.emptyElement;
    }

    this.headIdx = -1;
    this.tailIdx = -1;
    this.setValue(this.emptyElement);
    this.setRender(true);
  }

  getElements = () => {return this.elements};
  getSize = () => {return this.elements.length};
  getHeadIdx = () => {return this.headIdx};
  getTailIdx = () => {return this.tailIdx};
}
