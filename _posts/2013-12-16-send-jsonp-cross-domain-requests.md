---
title: "Send JSONP Cross-domain Requests"
metaDesc: "JSONP is an excellent sending and receiving data while avoiding web browser's same origin policy"
summary: "In developing web applications it's commonplace to send and receive data to APIs (Application Programmable Interfaces) that exist on other domains.  This cross-domain communication is often performed directly in the browser, on the client-side using JavaScript. Cross-domain communication can be accomplished using a server-side languages like Python, Nodejs, PHP, etc., however for cases where responses from cross-domain requests are utilized in the browser, JavaScript can save time and simplify development."
tags:
  - "rest"
  - "data"
date: 2013-12-16
author: "Dave Romero"

layout: post
redirect_from:
 - /json-tutorial/send-jsonp-cross-domain-requests/
---

Cross-domain Requests
---------------------

In developing web applications it's commonplace to send and receive data
to APIs (Application Programmable Interfaces) that exist on other
domains. This cross-domain communication is often performed directly in
the browser, on the client-side using JavaScript. Cross-domain
communication can be accomplished using a server-side languages like
Python, Nodejs, PHP, etc., however for cases where responses from
cross-domain requests are utilized in the browser, JavaScript can save
time and simplify development. Addintionaly, JavaScript requests are
asynchronous— meaning they can be run in parallel with other processes.
For example, JavaScript requests to other domains can be processed
asynchronously while the page is still loading.

Same-origin Policy
------------------

Same-origin policy is an important security concept in client-side
programming languages including JavaScript. This policy is observed by
all web browsers and limits scripts running on a site to only sending
requests with the same site. Browers use a combination of port number
(e.g. 80) and hostname (e.g. my.domain.com) to determine the scope of
the 'site'. There are however exceptions to the same-origin policy,
including using the HTML &lt;script&gt; tag to retreive a dynamically
generated JavaScript file from an external site. The most prominent of
method of exploiting this exception is JSONP.

JSON with Padding (JSONP)
-------------------------

JSONP uses the &lt;script&gt; tag to retreive remote JavaScript code
containing formatted JSON data with a function call wrapped around it.
The data is not parsed, rather it is evaluated by the JavaScript
interpreter.

A typical JSONP request may look like:

    <script type="application/javascript"
      src="http://remote.domain.com/data/?callback=jsonpcallback&id=123">
    </script>

The dynamicall generated JavaScript file may look like:

    jsonpcallback({
      "id": "123",
      "comments": "6",
      "name": "sample"
    });

The "padding" in JSONP refers to the function call that wraps the
formatted JSON object. This padding isn't always a function call. Though
not common, padding could also be a variable assignment:

    var data = {
      "id": "123",
      "comments": "6",
      "name": "sample"
    };

The purpose of the padding is to allow a means for the formatted data to
be put to use in the application.

jQuery for JSONP
----------------

The jQuery JavaScript library has functions to make using JSONP a
snap.[jQuery's
\$.ajax()](http://learn.jquery.com/ajax/working-with-jsonp/) function
will automatically handle &lt;script&gt; tag injection and response
handling (i.e. calling the 'callback' function).

    $.ajax({
      //JSONP API
      url: "http://remote.domain.com/data/?callback=jsonpcallback&id=123",
      //the name of the callback function
      jsonp: "jsonpcallback",
      //tell jQuery to expect JSONP
      dataType: "jsonp",
      //tell YQL what we want and that we want JSON
      data: {
        id: "123"
      },
      //work with the response
      success: function(data) {
        console.log(data); //formatted JSON data
      }
    });

`console.log(data);``{ "id": "123", "comments": "6", "name": "sample" }`

Alternatively, if jQuery is not available- which is often the case when
developing embeddable widgets- raw JavaScript can be used. The following
is minimal JSONP implementation:

    //callback function
    function jsonpcallback(data) {
        //do stuff with JSON
        console.log(data);
    }

    //create HTML script tag
    var script = document.createElement('script');
    script.src = "http://remote.domain.com/data/?callback=jsonpcallback&id=123"

    //inject script tag into head
    document.getElementsByTagName('head')[0].appendChild(script);
