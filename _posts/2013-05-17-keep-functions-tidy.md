---
title: Keep Functions Tidy
metaDesc: When you want to keep your functions out of the global namespace, use JSON.
summary: 'When you want to keep your functions out of the global namespace, use JSON.  A
  common development pattern for this is placing functions inside an object looks
  like this:'
tags:
- functions
date: 5-17-2013
author: Dave Romero
---

When you want to keep your functions out of the global namespace, use JSON.  A common development pattern for this is placing functions inside an object looks like this:

```js
var nameSpace = {
  "myFunc": function(x, y){
    return x + y;
  },
  "otherFunc": function(x, y, z){
    return this.myFunc(x, y) * z;
  }
}
```

Now you can access your functions the same way you access any other object property.  In this case, the functions are referred to as "methods".

```js
console.log( nameSpace.myFunc(1, 2) );
// returns 3
```

Another advantage you have of declaring functions in an object literal is gaining access to the ‚Äúthis‚Äù variable within each method.  In the example above, `this`ù refers to `nameSpace`ù object.  It can be referred to easily in this manner without declaring any functions in the global namespace.  Handy indeed.
