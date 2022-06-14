import { AnyMxRecord } from "dns";
import { LinkedListNode } from "./linkedListNode";

export class LinkedList<T> {
  head: LinkedListNode<T> | null = null;
  tail: LinkedListNode<T> | null = null;
  emptyValue: T;
  timeout:number;
  setValue:any;
  setIndexToProcess:any;
  setNewItem:any;
  setNewItemIndex:any;
  setOldItem:any;
  setOldItemIndex:any;
  setProgressIndex:any;
  setAddInProgress:any;
  setDeleteInProgress:any;

  constructor(emptyValue: T, setValue:any, setIndexToProcess:any, setNewItem:any, setNewItemIndex:any, setOldItem:any, setOldItemIndex:any, setProgressIndex:any, setAddInProgress:any, setDeleteInProgress:any, timeout:number, initialValues:T[]) {
    this.emptyValue = emptyValue;
    this.setValue = setValue;
    this.setIndexToProcess = setIndexToProcess;
    this.setNewItem = setNewItem;
    this.setNewItemIndex = setNewItemIndex;
    this.setOldItem = setOldItem;
    this.setOldItemIndex = setOldItemIndex;
    this.setProgressIndex = setProgressIndex;
    this.setAddInProgress = setAddInProgress;
    this.setDeleteInProgress = setDeleteInProgress;
    this.timeout = timeout;

    for (let i=0; i<initialValues.length; i++) {
      const node = new LinkedListNode<T>(initialValues[i]);

      if (!this.tail) {
        this.tail = node;
        this.head = this.tail;
        continue;
      }

      this.tail.next = node;
      this.tail = node;
    }
  }

  private sleep = (ms:number) => new Promise(r => setTimeout(r, ms));

  prepend = async (value: T) => {
    const node = new LinkedListNode<T>(value);

    this.setAddInProgress(true);
    this.setProgressIndex(-1);

    if (!this.tail) {
      this.tail = node;
      this.head = this.tail;

      this.setValue(this.emptyValue);
      this.setIndexToProcess('');
      this.setAddInProgress(false);
      return;
    }
  
    this.setAddInProgress(true);
    this.setNewItem(value);
    this.setNewItemIndex(0);
    this.setValue(this.emptyValue);
    this.setIndexToProcess('');

    await this.sleep(this.timeout);

    const oldHead = this.head;
    this.head = node;
    this.head.next = oldHead;

    this.setNewItem(null);

    await this.sleep(this.timeout);
    
    this.setNewItemIndex(-1);
    this.setAddInProgress(false);
  }

  append = async (value: T) => {
    const node = new LinkedListNode<T>(value);

    this.setAddInProgress(true);
    this.setProgressIndex(-1);

    if (!this.tail) {
      this.tail = node;
      this.head = this.tail;

      this.setValue(this.emptyValue);
      this.setIndexToProcess('');
      this.setAddInProgress(false);
      return;
    }

    this.setNewItem(value);
    this.setNewItemIndex(this.toArray().length - 1);
    this.setValue(this.emptyValue);
    this.setIndexToProcess('');

    await this.sleep(this.timeout);

    this.tail.next = node;
    this.tail = node;

    this.setNewItem(null);
    this.setNewItemIndex(this.toArray().length - 1);

    await this.sleep(this.timeout);

    this.setNewItemIndex(-1);
    this.setAddInProgress(false);
  }

  addByIndex = async (indexToAdd:number, value: T) => {
    if (!this.tail || !this.head) {
      return;
    }

    this.setAddInProgress(true);
    this.setNewItem(value);
    this.setNewItemIndex(indexToAdd);
    this.setValue(this.emptyValue);
    this.setIndexToProcess('');
    this.setProgressIndex(0);

    await this.sleep(this.timeout);

    let node = this.head;

    for (let i = 0; i<indexToAdd; i++) {
      if (node && node.next)
      {
        this.setProgressIndex(i+1);

        await this.sleep(this.timeout);

        if (i === indexToAdd - 1 && node) {
          const newNode = new LinkedListNode<T>(value);
          newNode.next = node.next;
          node.next = newNode;
          break;
        }

        node = node.next;
      }
    }

    this.setProgressIndex(-1);
    this.setNewItem(null);

    await this.sleep(this.timeout);

    this.setNewItemIndex(-1);
    this.setAddInProgress(false);
  }

  deleteByIndex = async (index:number) => {
    if (!this.tail || !this.head) {
      return;
    }

    if (index === 0 && this.head) {
      this.deleteHead();
      return;
    }
    
    this.setProgressIndex(-1);
    this.setDeleteInProgress(true);

    let prevNode = this.head;
    let node = this.head.next;

    this.setValue(this.emptyValue);
    this.setIndexToProcess('');
    this.setProgressIndex(0);

    await this.sleep(this.timeout);

    for (let i = 0; i<index; i++) {
      if (prevNode && node)
      {
        this.setProgressIndex(i+1);

        await this.sleep(this.timeout);

        if (i === index - 1 && node && prevNode) {
          this.setOldItem(node.value);
          this.setOldItemIndex(index);

          await this.sleep(this.timeout);

          prevNode.next = node.next;
          break;
        }

        prevNode = node;
        node = node.next;
      }
    }

    this.setOldItem(null);
    this.setOldItemIndex(-1);
    this.setDeleteInProgress(false);
  }

  deleteHead = async () => {
    if (!this.head) {
      return;
    }

    this.setProgressIndex(-1);
    this.setDeleteInProgress(true);
    this.setValue(this.emptyValue);
    this.setIndexToProcess('');
    this.setOldItem(this.head.value);
    this.setOldItemIndex(0);

    await this.sleep(this.timeout);

    const oldHead = this.head;
    this.head = oldHead.next;

    this.setOldItem(null);
    this.setOldItemIndex(-1);
    this.setDeleteInProgress(false);
  }

  deleteTail = async () => {
    if (!this.tail) {
      return;
    }

    this.setProgressIndex(-1);
    this.setDeleteInProgress(true);
    this.setValue(this.emptyValue);
    this.setIndexToProcess('');
    this.setOldItem(this.tail.value);
    this.setOldItemIndex(this.toArray().length - 1);

    await this.sleep(this.timeout);

    let node = this.head;

    if (this.head === this.tail) {
      this.head = this.tail = null;
    }

    while (true) {
      if (!node?.next || !this.tail) {
        break;
      }

      if (node.next === this.tail) {
        this.tail = node;
        this.tail!.next = null;
        break;
      }

      node = node.next;
    }

    this.setOldItem(null);
    this.setOldItemIndex(-1);
    this.setDeleteInProgress(false);
  }

  toArray = () => {
    const array = new Array<LinkedListNode<T>>();

    if (this.head) {
      let node = this.head;

      while (true) {
        if (node) {
          array.push(node);
        }

        if (!node.next) {
          break;
        }

        node = node.next;
      }
    }

    return array;
  }
} 
