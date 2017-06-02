---
title: Unleash the Power of Nesting
metaDesc: JSON objects often allow developers to break out of the common relational
  data schemas employed in databases like MySQL and MSSQL.
summary: The use of nested JSON object often allows developers to break out of the
  common relational schemas employed in databases like MySQL and MSSQL.  When not
  limited to a shallow data schema based on rows and columns, data can take on new
  strucutres to better align with development needs.  When JSON is used in a persitence
  layer, nested objects can often be used to replace simple relationships that might
  have existed in a relational data schema.
tags:
- nesting
date: 12-10-2013
author: Dave Romero
---

The use of nested JSON object often allows developers to break out of the common relational schemas employed in databases like MySQL and MSSQL.  When not limited to a shallow data schema based on rows and columns, data can take on new strucutres to better align with development needs.  When JSON is used in a persitence layer, nested objects can often be used to replace simple relationships that might have existed in a relational data schema.

## Nested JSON Object

An example of an 'employee' object stored in JSON.

```json
{
  "id" : "1",
  "f_name" : "Adam",
  "l_name" : "Smith",
  "skills" : [
    "web development",
    "ux design",
    "data science"
  ],
  "team": "engineering"
}
```

Nesting like this can greatly simplify data storage and make data more easily digestible and traversible by an app.  Unlike data stored in rows and columns, JSON can be structured to be infinitely deep.  Objects can be nested inside objects, nested inside objects, etc..

## Relational Database Structure

A similar dataset to the above might look like the following in a relational data schema:

### employee [table]

```
  | id  | f_name    | l_name    | team        |
  ---------------------------------------------
  | 1   | Adam      | Smith     | engineering |
```

### skill [table]

```
  | id    | name            |
  ---------------------------
  | 1     | web development |
  | 2     | ux design       |
  | 3     | data science    |
```

### employee_skill [table]

```
  | id    | employee_id (fk)  | skill_id (fk) |
  ---------------------------------------------
  | 1     | 1                 | 1             |
  | 2     | 1                 | 2             |
  | 3     | 1                 | 3             |
```

In this case, to define the relationships between skills and employees we're forced to use three tables, each with a rigid structure.  The cost-benefit of JSON is evident, especially if data storage requirements ever change.  Imagine the cost of maintaining 3 tables versus one flexible JSON object.  Not all data is suited for JSON.  For those who value maintainability and flexibility over rigid schemas, it's a fantastic alternative&mdash;one increasing greatly in popularity.
