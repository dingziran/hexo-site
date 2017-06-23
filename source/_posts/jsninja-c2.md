---
title: javascript ninja chapter 2 building the page at runtime
date: 2016-11-08 20:00:17
tags:
  - Javascript
  - Language
categories:
  - Reading notes
thumbnail: /uploads/124597.jpg
---

## DOM lifecycle

![DOM lifecycle](/uploads/jsninja_c2_1.png)

## page build phase

![page build phase](/uploads/jsninja_c2_2.png)

## global object in javascript (browser)

window document

html按顺序生成，script can't manipulate the dom element create below it 

## event: browser events, network events, user events, timer events

async, queue, single thread 

## two way to add event

by assign function to special property like window.load or body.onclick

by using addEventListener method