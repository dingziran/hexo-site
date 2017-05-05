---
title: es6_template
date: 2016-05-30 17:24:09
tags:
  - ES6
  - Language
categories:
  - Exercise
thumbnail: /uploads/2294.jpg
---
## 基本
template string是由backtick包围的字符串，相对于单引号和双引号，它额外支持多行和string interpolation
```
var name="abc";
console.log(`My name is ${name}`);
//My name is abc
```

## Tagged Template

```
var message =
  SaferHTML`<p>${bonk.sender} has sent you a bonk.</p>`
```
等价于
```
var message =
  SaferHTML(templateData, bonk.sender);
```
其中templateDate的值为string数组`templateData will be like Object.freeze(["<p>", " has sent you a bonk.</p>"].`
```
function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
```
其中，有害的符号被转义

##Tagged Template的应用场景
1.　转义字符串
2.　i18n
3.　template like Mustache and Nunjucks
4.　dsl
