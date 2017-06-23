---
title: reactive programming with rxjs chapter 1 the reactive way
date: 2016-12-16 20:44:53
tags:
  - Javascript
  - Stream
categories:
  - Learn 
thumbnail: 
---
## shortcomings for current mechanisms for handling asynchronous operations

### callback

1. callback hell
2. can run more than once or never
3. change error semantic
4. increasing complicated

### promise

only yield a single value, can't handle stream of events

### event emitter

1. events force side effects
2. events are not first class
3. miss events before listening

## Rx design pattern

Rx pattern is combine of observer pattern and iterator pattern

### observer pattern

```javascript
function Producer() {
    this.listeners = [];
}
Producer.prototype.add = function(listener) {
    this.listeners.push(listener);
};
Producer.prototype.remove = function(listener) {
    var index = this.listeners.indexOf(listener);
    this.listeners.splice(index, 1);
};
Producer.prototype.notify = function(message) {
    this.listeners.forEach(function(listener) {
    listener.update(message);
});
};
```

### iterator pattern

```javascript
function iterateOnMultiples(arr, divisor) {
    this.cursor = 0;
    this.array = arr;
    this.divisor = divisor || 1;
}
iterateOnMultiples.prototype.next = function() {
    while (this.cursor < this.array.length) {
        var value = this.array[this.cursor++];
        if (value % this.divisor === 0) {
            return value;
        }
    }
};
iterateOnMultiples.prototype.hasNext = function() {
    var cur = this.cursor;
    while (cur < this.array.length) {
        if (this.array[cur++] % this.divisor === 0) {
            return true;
        }
    }
    return false;
};
```

## create observable
```javascript
var observable = Rx.Observable.create(function(observer) {
    observer.onNext('Simon');
    observer.onNext('Jen');
    observer.onNext('Sergi');
    //observer.onCompleted()
    //observer.onError()
    observer.onCompleted(); // We are done
});
```

## create observer
```javascript
var observer = Rx.Observer.create(
    function onNext(x) { console.log('Next: ' + x); },
    function onError(err) { console.log('Error: ' + err); },
    function onCompleted() { console.log('Completed'); }
);
```

## subscribe observer to observable
```javascript
test.subscribe(
    function onNext(x) { console.log('Result: ' + x); },
    function onError(err) { console.log('Error: ' + err); },
    function onCompleted() { console.log('Completed'); }
);
```

## operator

In RxJS, methods that transform or query sequences are called operators.

Every operator applied to Observable creates new Observable

### from array

```javascript
Rx.Observable
    .from(['Adrià', 'Jen', 'Sergi'])
    .subscribe(
        function(x) { console.log('Next: ' + x); },
        function(err) { console.log('Error:', err); }
        function() { console.log('Completed'); }
    );
```

### from events

```javascript
var allMoves = Rx.Observable.fromEvent(document, 'mousemove')
allMoves.subscribe(function(e) {
    console.log(e.clientX, e.clientY);
});
```

### from Nodejs style callback

```javascript
var Rx = require('rx'); // Load RxJS
var fs = require('fs'); // Load Node.js Filesystem module
// Create an Observable from the readdir method
var readdir = Rx.Observable.fromNodeCallback(fs.readdir);
// Send a delayed message
var source = readdir('/Users/sergi');
var subscription = source.subscribe(
    function(res) { console.log('List of directories: ' + res); },
    function(err) { console.log('Error: ' + err); },
    function() { console.log('Done!'); });
```
