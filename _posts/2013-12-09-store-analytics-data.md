---
layout: post
title: Store Analytics Data
metaDesc: The utility and flexibility of the JSON format is clear when persisting
  analytics data to an object database (a database that stores native JSON)
summary: JSON is a attractive option for setting up a custom analytics data store.  The
  flexibility of JSON allows for website owners flexibly store data and get creative
  in changing tracked data over— all without worring about changing a database schema.
tags:
- data
- analytics
date: 2013-12-09
author: Dave Romero
---

JSON is a attractive option for setting up a custom analytics data store.  The flexibility of JSON allows for website owners flexibly store data and get creative in changing tracked data over— all without worring about changing a database schema.

Here's an example of what an object containing analytics data might look like: 

```json
{
  "_id":"0e494339-c94e-4834-93e6-8f0896c5346c",
  "_timestamp":"1386697259630",
  "_uid":"843f8e4f888de5b9",
  "_url":"http://www.mysite.com",
  "_referrer":"",
  "_category":"campaign",
  "_action":"share",
  "_browser":{
    "pdf":"1",
    "qt":"1",
    "realp":"0",
    "wma":"0",
    "dir":"0",
    "fla":"1",
    "gears":"0",
    "ag":"0",
    "java":"1",
    "res":"1440x900",
    "cd":"24",
    "cookie":"1"
  },
  "medium":"twitter",
  "campaign_id":"1",
  "product_id":"2",
  "other_field": "anything"
}
```

Notice some fields are prefixed with an underscore— these denote 'default' fields while fields without an underscore are considered 'custom' fields.  This allows as to create extend our JSON objects, while still providing the bare minimum defaults that would be used in an analytics application.  Say for example, in one month of implementing analytics tracking, business requirements change and now it's important to track a new field 'widget_type'.  Without making a change to a database schema (common with relational databases), we can add the 'widget_type' field to analytics object and save.  

Over time as tracking requirements broaden, the size (and number of fields) in your analytics objects scales infinitely to meet. When these objects are stored with a great DBAAS (DataBase As A Service) like 
  a(href="http://cloudant.com") cloudant.com 
  data can be easily mined for interesting patterns and returned to a dashboard for further visualization.  Many web-based data visualization libraries use JSON natively, so starting in this format will be an additional time-saver.
