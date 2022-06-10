import React from "react";

interface IStack<T> {
  push: (element: T, setAddedIdx: React.Dispatch<React.SetStateAction<number>>) => void;
  pop: () => void;
  clear: () => void;
  getElements: () => T[];
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {

  elements: T[] = [];
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<number|string>>;
  setAddedIdx: React.Dispatch<React.SetStateAction<number>>;
  setDeletedIdx: React.Dispatch<React.SetStateAction<number>>;

  constructor(
    setRender: React.Dispatch<React.SetStateAction<boolean>>,
    setValue: React.Dispatch<React.SetStateAction<number|string>>,
    setAddedIdx: React.Dispatch<React.SetStateAction<number>>,
    setDeletedIdx: React.Dispatch<React.SetStateAction<number>>
  ) {
      this.setRender = setRender;
      this.setValue = setValue;
      this.setAddedIdx = setAddedIdx;
      this.setDeletedIdx = setDeletedIdx;
  }

  push = (element: T) => {
    this.setAddedIdx(this.elements.length);
    this.elements = [...this.elements, element];
    this.setValue('');
    this.setRender(true);
  }
  pop = () => {
    this.elements.splice(-1);
    this.setDeletedIdx(-1);
    this.setValue('');
    this.setRender(true);
  }
  clear = () => {
    this.elements = [];
    this.setValue('');
    this.setRender(true);
  }

  getElements = () => {return this.elements};
  getSize = () => {return this.elements.length};
}
