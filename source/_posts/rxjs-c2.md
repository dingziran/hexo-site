---
title: reactive programming with rxjs chapter 2 deep in the sequence
date: 2016-12-19 22:33:40
tags:
  - Javascript
  - Stream
categories:
  - Learn 
thumbnail: 
---
## basic sequence operator

map, filter, reduce, flatMap

##  cancel sequence

`subscription.dispose();`

## handle errors

onError handler

.catch takes an Observable or function that return Observable

.retry will retry the whole sequence
