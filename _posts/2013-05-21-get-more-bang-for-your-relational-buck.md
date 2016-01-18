---
title: "Get More Bang for Your Relational Buck"
metaDesc: "From time to time, your data models might suffer from field creep &#151; you have to keep adding more and more fields to your models to work around edge cases..."
summary: "From time to time, your data models might suffer from field creep &#151; you have to keep adding more and more fields to your models to work around edge cases and unique business requirements."
tags: 
  - "config"
date: "2013-05-21"
author: "Phoenix Zerin"

layout: post
redirect_from:
 - /json-tutorial/get-more-bang-for-your-relational-buck/
---

From time to time, your data models might suffer from field creep &#151; you
have to keep adding more and more fields to your models to work around
edge cases and unique business requirements.

In the world of relational databases, this usually manifests either as
additional fields tacked onto an existing table, or a separate "detail"
table with a one-to-one relation to its corresponding source model &#151; and
these are just the least complicated approaches; there are far more
complex ways to address the situation!

![Relational Schema 1](/img/posts/93-relational-1.png)

*One approach to addressing the need for ever-more-specific-use-case
fields: add more (increasingly ridiculously-named) fields to the table.*

![Relational Schema 2](/img/posts/93-relational-2.png)

*An alternate approach: move all of those pesky "detail" fields into a
separate table that you can hide away in the closet whenever company
comes over.*

In addition to cluttering up your ERD, you are also leveraging the power
(and overhead!) of your relational database engine for things that don't
actually need it.

Your pet store application might never need to filter a select query by
userstory183274\_marker value, but thanks to user story 183274, you
still have to store that information with each pet.

Perhaps there's another approach, one that is more scalable and doesn't
clutter up your database tables with (almost) useless fields... and yet
still makes this custom information accessible to your application.

Well, as it happens, there is! Combine all of those extra "detail"
fields into a single detail field that uses – you guessed it – JSON to
store key/value pairs!

![Relational Schema 3](/img/posts/93-relational-3.png)

Much easier on the eyes!

Let's peek at some values in our newly JSON-ified Pet table:

  pet\_id | owner\_id | species\_id | name |     detail
  --------|-----------|-------------|----------|---------------------------------------------------------------
  1       | 1         | 1           | 'Bowser' | `{"collar_manufacturer": "PetProtector", "rabies_flag": true}`
  2       | 1         | 2           | 'Oliver' | `{"has_name_tag": false, "music_preference": "Light Jazz"}`
  3       | 2         | 1           | 'Marcus' | `{"userstory183274_marker": "FILENOTFOUND"}`

*Notice that in the time it took to draft up this table, we added a new
feature: Musical Preference. Oliver likes Light Jazz.*

Some of the benefits of storing "extra" data about your models this way:

-   You can add additional properties without having to alter your
    database schema.
-   Keeps your database schema tidy; only "essential" fields show up in
    your tables.

There are a few costs to this approach that you should be aware of,
however:

-   It requires additional application logic to encode/decode the JSON
    in the detail field. This has implications both for performance and
    development time.
-   These fields are not indexable! If you need to search/filter by a
    property in a detail field, you will need to move it to its own
    column in the database table or use a system such as Lucene to index
    and search that value.
-   Extracting data from a detail field is an all-or-nothing operation;
    you have to pull the entire JSON string from the database and decode
    it in your application to find a specific property. This is usually
    not an issue for modern ORMs, since all columns are usually
    automatically pulled in every time they fetch a record from
    the database.

For storing one-off properties and flag values that you only need at the
application level (i.e., you do not need to index/filter/search these
values), think about whether you can store these values in a single
JSON-formatted string instead of bloating your tables with extra fields.

And if you find that you're using this feature a lot in your
relational-database-powered application, you might want to consider
whether a NoSQL solution such as CouchDB is a better fit for some or all
of your data!
