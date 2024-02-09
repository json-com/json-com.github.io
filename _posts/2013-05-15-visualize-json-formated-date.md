---
layout: post
title: Visualize JSON-formatted Data
metaDesc: Can you remember the last time you came across a data visualization library
  that didn't use JSON as the primary input?
summary: Can you remember the last time you came across a data visualization library
  that didn't use JSON as the primary input?  If you have data in JSON format data,
  whether it's coming from a document-oriented data store (i.e. CouchDB, MongoDB)
  or a hand-coded JSON object, you'll be able to leverage it quickly with a web-based
  visualization library. This usually requires transforming the data slightly to get
  it in the exact structure required by the visualization library.
tags:
- data
- visualization
date: 2013-05-15
author: Dave Romero
---

Can you remember the last time you came across a data visualization library that didn't use JSON as the primary input?  If you have data in JSON format data, whether it's coming from a document-oriented data store (i.e. CouchDB, MongoDB) or a hand-coded JSON object, you'll be able to leverage it quickly with a web-based visualization library. This usually requires transforming the data slightly to get it in the exact structure required by the visualization library.

JSON is the most popular data interchange format on the web and it has been embraced by the creators of the most popular data visualization libraries on the web, namely Highcharts and D3.  There are so many different styles and dimensionalities possible with visualization that table-oriented data is no longer enough to reach full potential. JSON is flexible enough to support many thousands of combinations of data structures needed by today's visualization and is becoming the universal format of choice.

```js
var myDataSet = [
  {
    "label": "week one",
    "goalReached": true,
    "avgTemp": "84.3"
    "miles": {
      "mon": "12",
      "tues": "0",
      "wed": "15",
      "thu": "0", 
      "fri": "21" 
    } 
  },
  {...},
  {...}
]
```
