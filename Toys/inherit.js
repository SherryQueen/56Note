function inherit(Parent, Children) {
  const p = new Object(Parent.prototype)
  Children.prototype = p
  p.construct = Children
}

function SuperType(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function () {
  console.info(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)

  this.age = age
}

inherit(SuperType, SubType)

SubType.prototype.sayAge = function () {
  console.info(this.age)
}

const sub = new SubType('56', 20)
sub.sayName()
sub.sayAge()
