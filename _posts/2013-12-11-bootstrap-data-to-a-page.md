---
title: Bootstrap Data to a Page
description: |
  Use JSON Object to bootrap data from a server-side processing language page
  for use in an app's client side.
summary: |
  What does 'bootstrapping' mean exactly? Hard-coding your data to the page
  using synchronous server-side template. Most developers face the challenge of
  sending data from their server-side to the client-side to be used JavaScript.
  There are several solutions for this.
tags:
 - rest
 - data
date: 2013-12-11
author: Dave Romero

layout: post
redirect_from:
 - /json-tutorial/bootstrap-data-to-a-page/
---

What does ‘bootstrapping’ mean exactly? *Hard-coding your data to the
page using synchronous server-side template.*

Most developers face the challenge of sending data from their
server-side to the client-side to be used JavaScript. There are several
solutions for this. Among the most common is creating an REST endpoint
that can be consumed with asynchronous javascript, often using the
[jQuery Ajax] function.

-   How is page load time affected when loading data asynchronously?
    Does the user’s experience depend directly on this data?
-   Is there unecessary overhead creating an REST endpoint?
-   Does the REST endpoint need to be secure? Authenticated? CSRF
    Tokenized?

Depending on the answers to these questions, bootstrapping may be an
elegant solution for getting the data to the client-side quickly and
with minimal development.

It typically looks something like this on the server side:

    <script type="text/javascript">
    //bootstrapped data with server-side template
    var bootstrap = {
      "app_id": "{{app_id}}",
      "session_id": "{{session_id}}",
      "title": '{{title}}',
      "price": "{{price}}",
      "confirmation": "{{confirmation}}"
    };
    </script>

It looks like this when it’s rendered on the client side:

    <script type="text/javascript">
    //bootstrapped data rendered on client-side
    var bootstrap = {
      "app_id": "a1b2c3",
      "session_id": "x0y9z8",
      "title": "My Cool App",
      "price": "1.99",
      "confirmation": "Thanks for purchasing our app."
    };
    </script>

This boostrapped JSON object can now be called with JavaScript
immediately when the object is rendered by the browser:

`console.log(bootstrap)`
`{ "app_id": "a1b2c3", ... }`

`console.log(bootstrap.title)`
`My Cool App`

Note: it’s best to put the bootstrapped object near the top of the page
so it can used immediately, even before remaining html/css/javascript is
loaded.

The key benefit of the bootstrapped object comes in the time saved when
not having to use asynchronous JavaScript to call data from a REST
endpoint. If you typically use jQuery Ajax to do this, 100-500
milliseconds of prerequsite load time would be added just to gain access
to the `jQuery.ajax()` function. Any ajax request(s) retreiving data
from a REST endpoint comes with additional load time expense.

If your app depends on this data, synchronously loaded (aka
‘bootstrapped’) JSON data will make your app snappy and your users
happy. Not to mention, because of the server-side templating, REST
endpoint security considerations are nullified.

  [jQuery Ajax]: http://api.jquery.com/jQuery.ajax/ "jQuery Ajax"
