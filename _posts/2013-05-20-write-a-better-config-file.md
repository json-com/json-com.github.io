---
title: Write a Better Config File
metaDesc: Anyone who's been writing applications for awhile has run into the problem
  of making the application's behavior configurable in different operating environments.
summary: Anyone who's been writing applications for awhile has run into the problem
  of making the application's behavior configurable in different operating environments.  From
  DSNs to administrator email addresses, it's important to have a set of configuration
  values that live outside the codebase.
tags:
- config
date: 2013-05-20
author: Phoenix Zerin
---

Anyone who's been writing applications for awhile has run into the problem of making the application's behavior configurable in different operating environments.  From DSNs to administrator email addresses, it's important to have a set of configuration values that live outside the codebase.

But how to store these values in a format that a computer can easily read and write?

A lot of solutions have been tried over the years, including INI, XML and YAML.  Each of these formats has its strengths, but they all lack the combination of power and simplicity that JSON offers.

Consider a configuration file that stores database connection strings for different operating modes.  Let's start by seeing how you might write it with INI syntax:

```ini
[prod]
sql_username   = dbuser
sql_password   = dbpass
sql_hostname   = 192.168.113.172
sql_portnum    = 3306
sql_database   = app_database
redis_hostname = 192.168.113.173
redis_portnum  = 6379

[test]
sql_username   = dbuser
sql_password   = dbpass
sql_hostname   = 192.168.113.172
sql_portnum    = 3306
sql_database   = test_app_database
redis_hostname = 192.168.113.175
redis_portnum  = 6379
```

Well, it gets the job done, but it's kind of... verbose.  Plus, if that config file gets long enough, it will get really difficult to separate the different sections (prod, test, etc.).

What about an XML config file?

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE configurations SYSTEM "path/to/config.dtd">
<configurations>
  <configuration mode="prod">
    <option key="sql">
      <value key="username" type="string">dbuser</value>
      <value key="password" type="string">dbpass</value>
      ...
    </option>
    <option key="redis">
      <value key="hostname" type="inet_addr">192.168.113.173</value>
      <value key="portnum" type="integer">6379</value>
    </option>
  </configuration>
  <configuration mode="test">
  ...
  </configuration>
</configurations>
```

Yuck &mdash; and I thought INI was verbose!  I didn't even want to type the entire thing out, it got so huge!  And by the way, good luck trying to store array values!

How about YAML?

```yaml
---
prod:
  sql:
    username: dbuser
    password: dbpass
    ...
  redis:
    hostname:  192.168.113.173
    portnum:   6379

test:
  sql:
    username: dbuser
    password: dbpass
    ...
  redis:
    hostname:  192.168.113.175
    portnum:   6379
```

Not bad.  Definitely easy for a human to read, and there are libraries in practically every programming language to read and write YAML files.  But I'll share with you a little secret:  YAML is JSON-compatible!

That's right; the above configuration file could also be written like this:

```yaml
---
prod:
  sql:   {"username": "dbuser", "password": "dbpass", ...}
  redis: {"hostname": "192.168.113.173", "portnum": 6379}
test:
  sql:   {"username": "dbuser", "password": "dbpass", ...}
  redis: {"hostname": "192.168.113.175", "portnum": 6379}
p Well, if you're going to go and use a configuration file format that's compatible with JSON... why not use JSON?
pre.
{
  "prod": {
    "sql": {
      "username": "dbuser",
      "password": "dbpass",
      ...
    },
    "redis": {
      "hostname": "192.168.113.173",
      "portnum":  6379
    }
  }, 
  "test": {
    ...
  }
}
```

Not only do you get an easy to read syntax (for both humans and computers), but you also get the advantage of being able to explicitly supply a type for your configuration values.

Try to set a configuration value to null in an INI or YAML file (credit where it's due, at least XML can handle this... if you don't mind typing a dozen extra characters!).

What about true or false?  In JSON, this is just part of the syntax:

```json
{
  "prod": {
    "use_caching": true
  },
  "test": {
    "use_caching": false
  }
}
```

And with JSON libraries available in nearly every programming language (or supported natively if you are developing a Node.js app!), it's incredibly easy to integrate a JSON configuration into your application!
