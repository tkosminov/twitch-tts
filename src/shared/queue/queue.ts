import { LinkedList } from "./linked-list";

export class Queue<T> {
  private linked_list: LinkedList<T> = new LinkedList<T>();

  public isEmpty() {
    return !this.linked_list.head;
  }

  public enqueue(value: T) {
    this.linked_list.append(value);
  }

  public dequeue() {
    const removed_head = this.linked_list.deleteHead();

    return removed_head ? removed_head.value : null;
  }
}