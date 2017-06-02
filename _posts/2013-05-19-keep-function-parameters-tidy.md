---
title: Keep Function Parameters Tidy
metaDesc: 'We''ve all been there before:  You finished putting together an awesome
  class or function whose behavior can be configured down to the smallest degree...'
summary: 'We''ve all been there before:  You finished putting together an awesome
  class or function whose behavior can be configured down to the smallest degree,
  and now to wire up all the different configuration values:'
tags:
- functions
date: 2013-05-19
author: Phoenix Zerin
---
We've all been there before:  You finished putting together an awesome class or function whose behavior can be configured down to the smallest degree, and now to wire up all the different configuration values:

```js
function jsonapi(url, data, pre_execute_hook, success_hook, failure_hook, error_hook, post_execute_hook, async, method, jsonp) {
  ...
}
```

What a mess.  Can you imagine trying to call that monstrosity?

```js
jsonapi('http://www.example.com/rest/doSomethingAwesome', {"subscribe": ["peter", "henrietta", "xavier"]}, null, mySuccessHandler, myFailureHandler, myErrorHandler, null, null, null, true);
```

At least you have some job security — nobody is going to want to maintain that thing!

However, there's a better way to organize your function parameters using JSON:

```js
function jsonapi(options) {
  // Merge options with default values.
  options = $.extend(
    {
      // Standard Options
      'url':          '',
      // Hooks
      'pre_execute':  null,
      'success':      null,
      'failure':      null,
      'error':        null,
      'post_execute': null,
      // Advanced Options
      'async':        true,
      'method':       'post',
      'jsonp':        null,
      'data':         null
    },
    (options || {})
  );
}
```

Note that we are using the extend() function from the jQuery library to merge values in the options parameter.

When you are invoking the function, pass a JSON-encoded object as the value of the options parameter:

```js
jsonapi({
  "url":      'http://www.example.com/rest/doSomethingAwesome',
  "data":     {"subscribe": ["peter", "henrietta", "xavier"]},
  "success":  mySuccessHandler,
  "failure":  myFailureHandler,
  "error":    myErrorHandler, 
  "jsonp":    true
});
```

You might have noticed several advantages to this method:

* The values you are passing at invocation time are self-documenting — even without looking at the function signature, you can tell which option each value corresponds to.
* You can omit any options that should use the default value — in the above example, the we did not have to pass a null value to the pre_execute, post_execute, method and async options; the function automatically uses default values if they are omitted from the JSON object passed to it.
* Individual options can be documented in the function body itself.
p One thing to be careful about though, is that the different options are no longer part of the function's signature, so IDE tooltips and auto-completion won't work.  Make sure you document well your functions and the options they expect if you are using this technique!
