export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null = null;

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

