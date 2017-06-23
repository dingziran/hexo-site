---
title: es6_generator
date: 2016-05-17 18:40:53
tags:
  - ES6
  - Language
categories:
  - Learn
thumbnail: /uploads/1530.jpg
---

## 语法
```
function* test(){
    var ret = yield "hello";
    console.log(ret);
    return "hei";
}

var iter = test();
//[object Generator]
iter.next()
//{value:"hello",done:false}
iter.next("world")
//"world"
//{value:"hei", done:true}
```
Generator包括函数名上的*和yield关键字
当遇到yield，generator会被从栈上移出，而当执行到.next()方法，又会被放到执行栈中

## Generator的本质
Generator不是thread，而是iterator

```
// This should "ding" three times
for (var value of range(0, 3)) {
  alert("Ding! at floor #" + value);
}
```
当我们想要一个range做为iterable，我们需要设定range的Symbel.iterator属性为一个有.next()方法的对象
```
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {done: false, value: value};
    } else {
      return {done: true, value: undefined};
    }
  }
}

// Return a new iterator that counts up from 'start' to 'stop'.
function range(start, stop) {
  return new RangeIterator(start, stop);
}
```
这种实现方式十分复杂，使用generator则简单很多，generator内部实现了.next()和\[Symbol.iterator\]\(\)
```
function* range(start, stop) {
  for (var i = start; i < stop; i++)
    yield i;
}
```
## Generator的用法
### Making any object iterable
相比于RangeIterator之前的版本，将Symbol.iterator属性改用generator实现，简化.next()属性。下边例子我猜测写的，可能语法有问题
```
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  this.[Symbol.iterator]()=function*(){
    var curr = this.start;
    while(curr<this.stop){
        yield curr;
        curr++;
    }
    return this.stop;
  }
}
```
### Simplifying array-building functions
需要返回数组的函数可以写成generator，每个元素yield出去
```
function splitIntoRows(icons, rowLength) {
  var rows = [];
  for (var i = 0; i < icons.length; i += rowLength) {
    rows.push(icons.slice(i, i + rowLength));
  }
  return rows;
}
function* splitIntoRows(icons, rowLength) {
  for (var i = 0; i < icons.length; i += rowLength) {
    yield icons.slice(i, i + rowLength);
  }
}
```

### Results of unusual size
比如使用generator创建无限大的数组

### Refactoring complex loops
比如简化多层for循环为`for(var data of myNewGenerator(args))`

### Tools for working with iterables
比如generator版本的map, filter等，比如co库
