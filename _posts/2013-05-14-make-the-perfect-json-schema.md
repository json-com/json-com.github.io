---
title: Make the Perfect JSON Schema
metaDesc: Schemas in JSON are unlimited in breadth and depth. With support for nested
  arrays and objects, JSON can be used to create flexible schemas.
summary: Schemas in JSON are unlimited in breadth and depth. With support for nested
  arrays and objects, JSON can be used to create flexible schemas which help store
  and transport data in a way that bests suits the needs of an application. When the
  architecture of an application changes (as do the data transport and data storage
  needs), it’s convenient to use a flexible format that isn't restrained by a two-dimensional,
  table-oriented paradigm
tags:
- schema
date: 5-14-2013
author: Dave Romero
---

Schemas in JSON are unlimited in breadth and depth. With support for nested arrays and objects, JSON can be used to create flexible schemas which help store and transport data in a way that bests suits the needs of an application. When the architecture of an application changes (as do the data transport and data storage needs), it's convenient to use a flexible format that isn't restrained by a two-dimensional, table-oriented paradigm.

Data can be complex, ugly, multi-dimensional and just plain weird. For this, JSON natively supports more complex structures like arrays-of-arrays and objects-of-objects.  Creating a schema with JSON (and storing your data in JSON) is often a great choice in order to future-proof your application to inevitable changes - you'll be able to adapt quickly and reduce the odds of having to re-architect you system when changes happen.

```js
var wickedSchema = {
  "nesty_o": {
    objectInAnObject: "sure"
  },
  "nesty_a": [
    ["three levels deep", "hells yeah"],
    "a string here",
    {"objectInAnArray": "yup"}
  ],
  "someString": "whoah buddy"
  "aNumber": "3.14"
}
```
