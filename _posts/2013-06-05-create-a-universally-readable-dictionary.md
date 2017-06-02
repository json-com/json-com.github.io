---
layout: post
title: Create a Universally-Readable Dictionary
description: |
  Have you ever needed to create a dictionary?  Whether needing a dictionary for language, addresses, bibliographies, calendars or otherwise, JSON can help.
summary: |
  You ever need to create a dictionary? Of course you do!  Heck, I do it all the time! Oh, stop looking at me like that.  I don't just mean language dictionaries!  Address books, blogrolls, bibliographies, calendar events grouped by date... anywhere you have a list of words/phrases/terms/names/etc. and their corresponding definitions/explanations/details/etc., you've got a dictionary.
tags:
 - data
date: 2013-06-05
author: Phoenix Zerin
redirect_from:
 - /json-tutorial/create-a-universally-readable-dictionary/
---

You ever need to create a dictionary?

Of course you do! Heck, I do it all the time!

Oh, stop looking at me like that. I don't just mean language
dictionaries! Address books, blogrolls, bibliographies, calendar events
grouped by date... anywhere you have a list of
words/phrases/terms/names/etc. and their corresponding
definitions/explanations/details/etc., you've got a dictionary.

For example, suppose you wanted to create a list of tourist attractions
in your favorite city:

    Cerro San Cristóbal: A really big hill on the north side of town.
    La Vega:             Awesome place to buy veggies.
    Patio Bellavista:    Great nightlife and dining.

I'm going to go ahead and take the liberty of assuming that your
favorite city is Santiago de Chile, but if this is completely
unacceptable to you, feel free to follow along with your own list.

Not too shabby. Now, let's tweak it a little bit by putting everything
in quotes:

    "Cerro San Cristóbal": "A really big hill on the north side of Santiago."
    "La Vega":             "Awesome place to buy veggies."
    "Patio Bellavista":    "Great nightlife and dining."

And just so that it's clear where each entry in the list ends, we'll add
a comma at the end:

    "Cerro San Cristóbal": "A really big hill on the north side of Santiago.",
    "La Vega":             "Awesome place to buy veggies.",
    "Patio Bellavista":    "Great nightlife and dining."

And for good measure, let's decorate it with some curly braces because
they're just so goshdarned pretty:

    {
      "Cerro San Cristóbal": "A really big hill on the north side of Santiago.",
      "La Vega":             "Awesome place to buy veggies.",
      "Patio Bellavista":    "Great nightlife and dining."
    }

Well, would you look at that — we now have ourselves a
properly-formatted JSON object! Not only is it still perfectly readable
by humans, but you can now feed it into a script in just about any
language.

And since most JSON readers don't mind a little whitespace, you can make
it even prettier:

    {
      "Cerro San Cristóbal":
        "A really big hill on the north side of Santiago.",

      "La Vega":
        "Awesome place to buy veggies.",

      "Patio Bellavista":
        "Great nightlife and dining."
    }

With a little bit of JSON, you can easily create attractive definition
lists that are readable both by humans *and* computers!
