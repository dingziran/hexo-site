---
title: es6_parameters
date: 2016-07-06 16:09:53
tags:
  - ES6
  - Language
categories:
  - Exercise
thumbnail: /uploads/2695.jpg
---

## Rest Parameters

通常使用arguments来处理不定长参数

```
function containsAll(haystack) {
  for (var i = 1; i < arguments.length; i++) {
    var needle = arguments[i];
    if (haystack.indexOf(needle) === -1) {
      return false;
    }
  }
  return true;
}
```

使用rest parameter的...可以避免使用arguments

```
function containsAll(haystack, ...needles) {
  for (var needle of needles) {
    if (haystack.indexOf(needle) === -1) {
      return false;
    }
  }
  return true;
}
```

## Default Parameters

```
function animalSentence(animals2="tigers", animals3="bears") {
    return `Lions and ${animals2} and ${animals3}! Oh my!`;
}
```

需要注意的是，es6的default parameters是在函数调用的时候求值，所以以下用法可以支持

```
function animalSentenceFancy(animals2="tigers",
    animals3=(animals2 == "bears") ? "sealions" : "bears")
{
  return `Lions and ${animals2} and ${animals3}! Oh my!`;
}
```
