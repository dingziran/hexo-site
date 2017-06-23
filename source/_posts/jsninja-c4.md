---
title: javascript ninja chapter 4 understanding function
date: 2016-11-10 21:53:57
tags:
  - Javascript
  - Language
categories:
  - Learn 
thumbnail: 
---

## implicit function parameters

arguments 和paramters指向相同，除非在strict模式下

## this

means function context

## invoke function

1. as a function
2. as a method
3. as a constructor
4. via apply or call

## as a function

in nonstrict mode, 'this' will be the global context

in strict mode, 'this' wil be 'undefined'

## as a method

this will be the object, function is the method

## as a constructor

```javascript
function Ninja(){
    this.skulk = function(){
        return this;
    };
}

```

## return value of constructor

if return an object, discard this. if return a nonobject, nonobject is dicarded and this is return

## arrow function

don't have their own function context. instead they remember the value of this parameter at the time of their defination

## arrow function caveat

when arrow function defined in object's method, this point to global context

## bind
`obj.funA.bind(obj)` //create new function
