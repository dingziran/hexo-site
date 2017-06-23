---
title: es6_destructuring
date: 2016-07-06 16:20:19
tags:
  - ES6
  - Language
categories:
  - Learn 
thumbnail: /uploads/2027.jpg
---
## array destructure

标准语法

```
[ variable1, variable2, ..., variableN ] = array;
```

增加赋值语句

```
var [ variable1, variable2, ..., variableN ] = array;
let [ variable1, variable2, ..., variableN ] = array;
const [ variable1, variable2, ..., variableN ] = array;
```

支持嵌套

```
var [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo);
// 1
console.log(bar);
// 2
console.log(baz);
// 3
```

地址越界和不足均类似array

```
console.log([][0]);
// undefined

var [missing] = [];
console.log(missing);
// undefined
```

支持iterable

```
function* fibs() {
  var a = 0;
  var b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
console.log(sixth);
// 5
```

## object destructure

```
var {name:nameA} = {name:"hi"}
var {name:nameB} = {name:"ho"}

var {foo, bar} = {foo:"lorem", bar:"ipsum"};
```

支持和array的各种嵌套
```
var complicatedObj = {
  arrayProp: [
    "Zapp",
    { second: "Brannigan" }
  ]
};

var { arrayProp: [first, { second }] } = complicatedObj;

console.log(first);
// "Zapp"
console.log(second);
// "Brannigan"
```

不同于array，不加声明的{}通常被理解为代码块，所以以下语法并不合法，除非:

```
{ blowUp } = { blowUp: 10 };
// Syntax error

({ safe } = {});
// No errors
```

## 不能被解构的东西

被解构的东西不能是非对象，如null,undefined

```
var {blowUp} = null;
// TypeError: null has no properties

var {wtf} = NaN;
console.log(wtf);
// undefined
```

## default value

```
var [missing = true] = [];
console.log(missing);
// true

var { message: msg = "Something went wrong" } = {};
console.log(msg);
// "Something went wrong"

var { x = 3 } = {};
console.log(x);
// 3
```

## 解构的应用

### 定义函数参数

有时候我们希望函数参数都放在一个对象中，省去记住参数的输入顺序

```
function removeBreakpoint({ url, line, column }) {
  // ...
}
```
