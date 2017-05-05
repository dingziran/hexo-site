---
title: es6_iterator
date: 2016-05-13 11:44:43
tags:
  - ES6
  - Language
categories:
  - Exercise
thumbnail: /uploads/2018.jpg
---
## 常用遍历数组方法

### for循环
```javascript
for (var index = 0; index < myArray.length; index++) {
  console.log(myArray[index]);
}
```
优点是可以通过手动对index修改来操作流程，比如执行一次跳过两次

缺点是没有创建子变量，导致每一次引用都需要带索引，比如myArray[index]
### ES6的forEach方法
```
myArray.forEach(function (value) {
  console.log(value);
});
```
优点是可以传递函数来遍历数组，更加抽象。

缺点是不能提前通过break中断，匿名函数创建的scope使得yield操作也不再支持
### for-in方法
```
for (var index in myArray) {    // don't actually do this
  console.log(myArray[index]);
}
```
优点是for-in方法面向的是Object，也就是支持js的所有类型（因为所有类型都是Object的子类型）

缺点同理，有时我们只希望遍历数组的0,1,2,3...字段，但是它却遍历所有字段，比如
```
var array=[1,2,3]
array.field=4
for(var index in array){
    console.log(index)
}

# 0
# 1
# 2
# field
```
额外输出了field属性，所以for-in方法比较适合遍历对象，而不是数组。
### ES6的for-of方法
```
for (var value of myArray) {
  console.log(value);
}
```
缺点是得不到索引

优点很多，首先解决了for-in的问题，并且同for循环一样支持break, continue, return语句

另外for-of支持的情况更多，比如特殊字符
![特殊字符](/uploads/es6_iterator_1.png)
这里for-in方法把他们当成了4个元素，而for-of方法处理则十分正确

## for-of的机制

如果想让对象支持for-of语句，则需要设置Symbal.iterator方法，拥有Symbal.iterator方法的对象被称为`iterable`，调用对象的Symbal.iterator方法，会返回一个具有.next()方法的对象，称之为`iterator`，.next()方法返回遍历是否结束。

这个概念在很多语言中都适用，但是每个语言的具体实现方法不相同。比如java中的iterator包括.hasNext()和.next()方法，python语言中包括.next()方法，而遍历应该结束的时候会抛出StopIteration事件，js中包括.next()方法，返回的值包括了是否结束的标识，.return()方法在break和return语句的时候调用，.throw(exc)方法存在，但是for-of不会调用它。
