/**
 * @filename    MyCircularQueue.js
 * @author      56
 * @description https://leetcode.cn/problems/design-circular-queue/
 */

class MyCircularQueue {
  _queue = [];
  _head = 0;
  _tail = 0;
  _insert = 0; // 下一个插入的下标
  _len = 0;
  _max = 0;

  constructor(k) {
    this._max = k;
  }

  enQueue(value) {
    if (this.isFull()) return false;
    this._queue[this._insert] = value;
    this._tail = this._insert;
    this._insert++;
    if (this._insert >= this._max) this._insert = 0;
    this._len++;
    return true;
  }

  deQueue() {
    if (this.isEmpty()) return false;
    this._head++;
    if (this._head >= this._max) this._head = 0;
    this._len--;
    return true;
  }

  Front() {
    return this.isEmpty() ? -1 : this._queue[this._head];
  }

  Rear() {
    return this.isEmpty() ? -1 : this._queue[this._tail];
  }

  isFull() {
    return this._len >= this._max;
  }

  isEmpty() {
    return this._len <= 0;
  }
}


// function MyCircularQueue(length) {
//   this.maxLength = length
//   this.length = 0
//   this.head = 0
//   this.tail = length - 1
//   this.array = []
// }

// MyCircularQueue.prototype.enQueue = function (val) {
//   if (this.isFull()) return false
//   this.tail++
//   if (this.tail === this.maxLength) this.tail = 0
//   this.array[this.tail] = val
//   this.length++
//   return true
// }

// MyCircularQueue.prototype.deQueue = function () {
//   if (this.isEmpty()) return false
//   this.head++
//   if (this.head === this.maxLength) this.head = 0
//   this.length--
//   return true
// }

// MyCircularQueue.prototype.Front = function () {
//   return this.isEmpty() ? -1 : this.array[this.head]
// }

// MyCircularQueue.prototype.Rear = function () {
//   return this.isEmpty() ? -1 : this.array[this.tail]
// }

// MyCircularQueue.prototype.isEmpty = function () {
//   return !this.length
// }

// MyCircularQueue.prototype.isFull = function () {
//   return this.maxLength === this.length
// }
