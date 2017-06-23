---
title: reactive programming with rxjs chapter 3 building concurrent programs
date: 2016-12-19 22:33:40
tags:
  - Javascript
  - Stream
categories:
  - Learn 
thumbnail: 
---

## avoid external state

## pipeline are efficient

for example, lazy evaluation

## subject class

subject class is both observable and observer

```javascript
var subject = new Rx.Subject();
var source = Rx.Observable.interval(300)
    .map(function(v) { return 'Interval message #' + v; })
    .take(5);
source.subscribe(subject);
var subscription = subject.subscribe(
    function onNext(x) { console.log('onNext: ' + x); },
    function onError(e) { console.log('onError: ' + e.message); },
    function onCompleted() { console.log('onCompleted'); }
);
subject.onNext('Our message #1');
subject.onNext('Our message #2');
setTimeout(function() {
    subject.onCompleted();
}, 1000);
```

## AsyncSubject

only return last value

```javascript
function getProducts(url) {
    var subject;
    return Rx.Observable.create(function(observer) {
        if (!subject) {
        subject = new Rx.AsyncSubject();
        Rx.DOM.get(url).subscribe(subject);
        }
        return subject.subscribe(observer);
    });
}
var products = getProducts('/products');
// Will trigger request and receive the response when read
products.subscribe(
    function onNext(result) { console.log('Result 1:', result.response); },
    function onError(error) { console.log('ERROR', error); }
);
// Will receive the result immediately because it's cached
setTimeout(function() {
    products.subscribe(
        function onNext(result) { console.log('Result 2:', result.response); },
        function onError(error) { console.log('ERROR', error); }
    );
}, 5000);
```

## BehaviorSubject

## ReplaySubject

ReplaySubject is useful to make sure that Observers get all the values emitted by an Observable from the start

![title](/uploads/rxjs_c3_1.png)


```javascript
var subject = new Rx.ReplaySubject(2); // Buffer size of 2
var subject = new Rx.ReplaySubject(null, 200); // Buffer size of 200ms
```