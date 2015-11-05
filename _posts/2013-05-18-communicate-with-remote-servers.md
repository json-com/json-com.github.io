---
title: Communicate with Remote Servers
description: |
  When you need to send data back and forth with a RESTful webservice or other
  backend server, you need a way to structure the data that you send and
  receive.
summary: |
  When you need to send data back and forth with a RESTful webservice or other
  backend server, you need a way to structure the data that you send and
  receive. In a previous age, ajax requests would send key-value pairs to
  webservices using query parameters or as form-encoded values in the body of a
  POST request.
tags:
 - rest
author: Phoenix Zerin

layout: post
redirect_from:
 - /json-tutorial/communicate-with-remote-servers/
---

When you need to send data back and forth with a RESTful webservice or
other backend server, you need a way to structure the data that you send
and receive.

In a previous age, ajax requests would send key-value pairs to
webservices using query parameters or as form-encoded values in the body
of a POST request.

However, this gets really bulky when you need to send arrays and nested
objects. Imagine trying to transmit these data via URL parameters:

    {
      "subscribe": [
        "peter",
        "henrietta",
        "xavier"
      ]
    }

The resulting URL might look something like this:

    http://www.example.com/services/subscribe?subscribe[]=peter&subscribe[]=henrietta&subscribe[]=xavier

Yuck.

However, ajax requests are perfectly capable of sending JSON-encoded
payloads within the body of a POST request, which is much cleaner. Here
is an example of how to send a JSON-encoded POST body with the jQuery
library:

    $.ajax({
      "contentType": "application/json",
      "data": '{"subscribe": ["peter", "henrietta", "xavier"]}',
      ...
    });

Note that you have to send the JSON object as a string, since otherwise
jQuery will invoke the object’s toString() method, and you’ll end up
sending “\[object Object\]”, which is not particularly helpful!

Just about every server-side language has a JSON library, so decoding
the incoming request payload on the server side is trivial. Here are
some resources for common server-side languages:

-   C\#
-   Java
-   PHP
-   Python
-   Ruby

Don’t forget to have the remote service send back its response in JSON,
too!
