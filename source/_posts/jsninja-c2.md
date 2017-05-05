---
title: javascript ninja chapter 2
date: 2016-11-10 21:53:57
tags:
  - Javascript
  - Language
categories:
  - Reading notes
thumbnail: /uploads/124597.jpg
---

## function as first-class object

function can assign to object, push to array, as a property, pass to function, return by function, dynamic created and assigned

callback not alway be async

storing function in a collection

memorization

memorization is particularly useful when performing calculations for animations, search data or math

## define function

### function literal

### function declaration

```javascript
function myFun(){
    return 1;
}
```

### array funcition

```javascript
myArgs => myArgs*2
```


### function constructor

```javascript
new Function('a', 'b', 'return a+b')
```


### generator function

```
function* myGen(){
    yield 1;
}
```

## function declaration

function test(){}

name is mandatory

## function expression

var a = function(){}

defined where it will be used

## immediate functions

(function(){})(3)

used to mimic modules

because function(){} is a statement, js parser will check function' name

so to prevent statement check error, you should make it to be a expression

way 1: with parentheses (function(){})

way 2: with unary operators  +function(){}

## arrow functions

param => expression

## argument & parameter

A parameter is a variable that we list as part of a function definition.

An argument is a value that we pass to the function when we invoke it.

## rest arguments

function test(first, ...raminingNumbers){}

## default parameters

function test(first="abc", second=first+"!"){}
