---
# from https://github.com/ludens/Jekyll/blob/gh-pages/archive.html
layout: page
title: Archives
permalink: /archives/
---

<div class="archive" id="home">
  <ul>
    {% for post in site.posts %}
      {% unless post.next %}
        <h3>{{ post.date | date: '%Y' }}-{{ post.date | date: '%-m' }}</h3>
      {% else %}
        {% capture year %}{{ post.date | date: '%Y %b' }}{% endcapture %}
        {% capture nyear %}{{ post.next.date | date: '%Y %b' }}{% endcapture %}
        {% if year != nyear %}
          <h3>{{ post.date | date: '%Y' }}-{{ post.date | date: '%-m' }}</h3>
        {% endif %}
      {% endunless %}
      <li>
      <a href="{{ post.url }}" class="noline">{{ post.title }}</a>
      <span>by {{ post.author }}</span>
      {% if post.category %} from <span class="category"><a href="/search.html?category={{ post.category }}" class="noline">{{ post.category }}</a></span>{% endif %}
    </li>
    {% endfor %}
  </ul>
</div>
