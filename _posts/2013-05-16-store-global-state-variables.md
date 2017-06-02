---
title: Store Global State Variables
metaDesc: Ever build a JavaScript app and find there are certain variables you need
  to access in various places throughout the code?
summary: 'Ever build a JavaScript app and find there are certain variables you need
  to access in various places throughout the code?  If you’re doing it right, you’ve
  smartly designed your app in a modular, decoupled fashion -  yup, check. One way
  of using variables across these decoupled components is to pass them from one function
  to another, effectively pushing them down a daisy-chain as needed. '
tags:
- variables
date: 2013-05-16
author: Dave Romero
---

Ever build a JavaScript app and find there are certain variables you need to access in various places throughout the code?  If you’re doing it right, you’ve smartly designed your app in a modular, decoupled fashion -  yup, check. One way of using variables across these decoupled components is to pass them from one function to another, effectively pushing them down a daisy-chain as needed.  This is not always the best way because said variables are only accessible at the time when a function is fired.  An alternative to this approach is to use JSON to store your variables in a global object.

```js
var globalVars = {
  "miliseconds": "5000",
  "turtleFarts": "1.3"
  "laserBeams": 3
}

var getTurtleFartsPerSecond = function(){
  var tfps = globalvars.turtleFarts / (global.miliseconds / 1000)
  return tfps;
}

var getPiLaserBeamsPerSecond = function(){
  var PiL = (Math.PI * global.laserBeams) / (global.miliseconds / 1000)
}
```
