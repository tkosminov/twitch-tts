import { LinkedListNode } from "./linked-list-node";

export class LinkedList<T> {
  public head: LinkedListNode<T> | null = null;
  public tail: LinkedListNode<T> | null = null;

  public append(value: T) {
    const new_node = new LinkedListNode(value);

    if (!this.head) {
      this.head = new_node;
      this.tail = new_node;

      return;
    }

    if (this.tail) {
      this.tail.next = new_node;
    }

    this.tail = new_node;
  }

  public deleteHead() {
    if (!this.head) {
      return null;
    }

    const deleted_head = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deleted_head;
  }
}