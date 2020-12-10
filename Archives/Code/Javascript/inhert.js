function inherit(c, p) {
  function f() {}
  f.prototype = p.prototype

  const o = new f()
  o.constructor = c
  c.prototype = o
}

function P(word) {
  this.ans = 'PPP'
  this.word = word || 'P'
}

P.prototype.sayHello = function () {
  console.log('Hello', this.word, this.ans)
}

function C(word) {
  P.call(this, word)
  this.word = word || 'C'
}

inherit(C, P)

C.prototype.sayHi = function () {
  console.log('Hi', this.word)
}

const c = new C()
c.sayHello()
c.sayHi()
