---
title: Keep Track of Progress
metaDesc: Periodically save your progress to a file so that your program knows exactly
  where to leave off in the event of a crash.
summary: Let's pretend that you are tasked with writing a one-off script to process
  a massive amount of backlogged data (a few of you might not have to pretend very
  hard).  Because this script is ultimately going to be run once and then discarded,
  it would be a waste to spend lots of time building error handling routines and making
  the process super robust &mdash; it would be far less expensive just to expect failure
  and come up with an efficient way to deal with it.
tags:
- files
date: 2013-05-28
author: Phoenix Zerin
---

Let's pretend that you are tasked with writing a one-off script to process a massive amount of backlogged data (a few of you might not have to pretend very hard).  Because this script is ultimately going to be run once and then discarded, it would be a waste to spend lots of time building error handling routines and making the process super robust &mdash; it would be far less expensive just to expect failure and come up with an efficient way to deal with it.

And if there's one thing you can count on, it's failure.  Servers will go offline, files will disappear, hamsters will chew through the power cables... one way or another, you're going to run into a situation where a script or job that you've written will not be able to complete its task successfully.

And then what?

Well, you've got two options:

1. Clear out all the partially-processed data (assuming that's even possible!), run the job again and hope extra hard that it works this time!
2. Periodically save your progress to a file so that your program knows exactly where to leave off in the event of a crash.

I don't know about you, but I am rather partial to option #2.

For the purposes of this example, let's say that you manage a website with a huge number of hosted image files (<a href="http://creativecommons.org/licenses/by-sa/3.0/">cc-by-sa</a>, of course).  One day, you noticed that other website owners are using your images without properly crediting your site.  I know that barely ever happens in real life, but bear with me here.
p So you've gotta write a script that does two things:

1. Submit each photo to a reverse image search API to locate unauthorized uses of the image and log the offending websites to a file for later follow-up.
2. Apply a watermark to each image so that future content copiers will attribute the images correctly whether they want to or not.

Step 1 could potentially take awhile, and there are a lot of opportunities for something to get screwed up somewhere along the line.  Network outages, connection timeouts, the remote server sends back a 503 &mdash; there are a lot of ways this process could fail.

Even the watermarking process could go boom.  A corrupted or oddly-formatted image might cause the image processor to crash.

Since you can't spend hours and hours making your script fail-proof, you'll have to find a way to keep track of your script's progress so that in the event that something does break, the program can recover gracefully (and something **will** break &ndash; usually right after you go home for the evening, wasting an entire night's worth of processing time).

JSON to the rescue!  Yeah, I bet you were wondering when I'd get to the point already.

Imagine you started off with a `status.json` file that looked something like this:

```json
{
  "img_1856322": {
    "search":     false,
    "watermark":  false
  },
  "img_1856323": {
    "search":     false,
    "watermark":  false
  },
  ... and so on ...
}
```

How this file was generated is outside the scope of this article, but given that you've made it this far, I bet you've already thought of at least 3 devilishly clever ways to do it.

When your script starts up, it reads the JSON object from the status file and starts traversing it, looking for tasks that haven't been completed yet.  As it finishes each step, it updates the object with the results (and don't forget to write the JSON back to <code>status.json</code> each time it is updated so that you don't lose your status in the event that the entire script gets crash-y!).

After awhile, <code>status.json</code> starts to show signs of life (explanatory comments added):

```json
{
  "img_1856322": {
    "search":     [],   // Oh good; nobody's using this image!  It's mine!  All mine!!
    "watermark":  true  // Watermark completed successfully (:
  },
  "img_1856323": {
    "search":     ["http://www.istealimages.com/buy_my_poster/totally_legit.jpg"],  // Somebody is abusing our image!  Release the hounds!
    "watermark":  ["DivideByZeroError", "Unexpected divide by zero in region 42."]  // Oops; something went wrong during the watermarking!  Wait... *unexpected* divide by zero?
  }
  ... you get the idea ...
}
```
Notice something else cool about `status.json`?  It doubles as a log file once the script is finished running!  Not only do you have a lean placemarker file for your script, but it's also in a format that's easy for a human to scan through.

For really complex jobs or periodic tasks, you will probably find that it is worth the time to integrate a fully-featured job manager and spend the extra effort tuning your script for robustness.  But when you have a one-off task to crunch through, consider using a JSON-formatted status file so that both you and your script can keep a handle on things.
