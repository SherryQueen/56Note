function MyCircularQueue(length) {
  this.maxLength = length
  this.length = 0
  this.head = 0
  this.tail = length - 1
  this.array = []
}

MyCircularQueue.prototype.enQueue = function (val) {
  if (this.isFull()) return false
  this.tail++
  if (this.tail === this.maxLength) this.tail = 0
  this.array[this.tail] = val
  this.length++
  return true
}

MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) return false
  this.head++
  if (this.head === this.maxLength) this.head = 0
  this.length--
  return true
}

MyCircularQueue.prototype.Front = function () {
  return this.isEmpty() ? -1 : this.array[this.head]
}

MyCircularQueue.prototype.Rear = function () {
  return this.isEmpty() ? -1 : this.array[this.tail]
}

MyCircularQueue.prototype.isEmpty = function () {
  return !this.length
}

MyCircularQueue.prototype.isFull = function () {
  return this.maxLength === this.length
}
