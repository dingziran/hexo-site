---
title: es6_modules
date: 2016-07-28 17:47:47
tags:
  - ES6
  - Language
categories:
  - Learn 
thumbnail: /uploads/5656.jpg
---
## module basics

js作用域默认是文件内

es6默认是"use strict", import和export是关键字

可以export任何最外层的function, class, var, let, or const.

```javascript
export function detectCats(canvas, options) {
  var kittydar = new Kittydar(options);
  return kittydar.detectCats(canvas);
}

export class Kittydar {
  ... several methods doing image processing ...
}
```

```javascript
import {detectCats, Kittydar} from "kittydar.js";

function go() {
    var canvas = document.getElementById("catpix");
    var cats = detectCats(canvas);
    drawRectangles(canvas, cats);
}
```

## export lists

```javascript
export {detectCats, Kittydar};

// no `export` keyword required here
function detectCats(canvas, options) { ... }
class Kittydar { ... }
```

## Renaming imports and exports

```javascript
import {flip as flipOmelet} from "eggs.js";
import {flip as flipHouse} from "real-estate.js";
```

```javascript
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

## default exports

```javascript
import _ from "lodash";
// import {default as _} from "lodash";
```

```javascript
let myObject = {
  field1: value1,
  field2: value2
};
export {myObject as default};

export default {
  field1: value1,
  field2: value2
};
```

## module objects

```javascript
import * as cows from "cows";
```

## aggregating modules

```javascript
// world-foods.js - good stuff from all over

// import "sri-lanka" and re-export some of its exports
export {Tea, Cinnamon} from "sri-lanka";

// import "equatorial-guinea" and re-export some of its exports
export {Coffee, Cocoa} from "equatorial-guinea";

// import "singapore" and export ALL of its exports
export * from "singapore";
```
