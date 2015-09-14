RFC 5322
========

An RFC 5322 email address parser that wraps https://github.com/FogCreek/email-addresses.

v 2.0.1

What?
-----
Want to see if something could be an email address? Want to grab the display name or just the address out of a string? Put your regexes down and use this parser!

This library does not *actually* validate email addresses - we can't really do that without sending an email. However, it attempts to parse addresses using the (fairly liberal) grammar specified in RFC 5322. You can use this to check if user input looks like an email address.

Why use this?
-------------
Use this library because you can be sure it really respects the RFC:
 - The functions in the recursive decent parser match up with the productions in the RFC
 - The productions from the RFC are written above each function for easy verification
 - Tests include all of the test cases from the [is_email](https://github.com/dominicsayers/isemail) project, which are extensive

Example
-------

```
$ meteor shell
> RFC5322.parseAddress('"Jack Bowman" <jack@fogcreek.com>')
{ parts:
   { name: [Object],
     address: [Object],
     local: [Object],
     domain: [Object] },
  name: 'Jack Bowman',
  address: 'jack@fogcreek.com',
  local: 'jack',
  domain: 'fogcreek.com' }
> RFC5322.parseAddressList('jack@fogcreek.com, Bob <bob@example.com>')
[ { parts:
     { name: null,
       address: [Object],
       local: [Object],
       domain: [Object] },
    name: null,
    address: 'jack@fogcreek.com',
    local: 'jack',
    domain: 'fogcreek.com' },
  { parts:
     { name: [Object],
       address: [Object],
       local: [Object],
       domain: [Object] },
    name: 'Bob',
    address: 'bob@example.com',
    local: 'bob',
    domain: 'example.com' } ]
> RFC5322("jack@fogcreek.com")
{ ast:
   { name: 'address-list',
     tokens: 'jack@fogcreek.com',
     semantic: 'jack@fogcreek.com',
     children: [ [Object] ] },
  addresses:
   [ { node: [Object],
       parts: [Object],
       name: null,
       address: 'jack@fogcreek.com',
       local: 'jack',
       domain: 'fogcreek.com' } ] }
> RFC5322("bogus")
null
> RFC5322.isValidAddress("test@example.com")
true
> RFC5322.isValidAddress("bogus")
false
```

Usage
-----
If you want to simply check whether a single address parses, you can use the ```isValidAddress``` method. If you want to check whether a list of addresses parses, you'll want to call ```parseAddressList``` and check whether the results are null or not.

If you want to examine the parsed address, for example to extract a name or address, you have some options. The object returned by ```parseAddress``` has four helper values on it: ```name```, ```address```, ```local```, and ```domain```. See the example above to understand is actually returned. (These are equivalent to ```parts.name.semantic```, ```parts.address.semantic```, etc.) These values try to be smart about collapsing whitespace, quotations, and excluding RFC 5322 comments. If you desire, you can also obtain the raw parsed tokens or semantic tokens for those fields. The ```parts``` value is an object referencing nodes in the AST generated. Nodes in the AST have two values of interest here, ```tokens``` and ```semantic```.

```
> a = RFC5322.parseAddress('Jack  Bowman  <jack@fogcreek.com >')
> a.parts.name.tokens
'Jack  Bowman  '
> a.name
'Jack Bowman'
> a.parts.name.semantic
'Jack Bowman '
> a.parts.address.tokens
'jack@fogcreek.com '
> a.address
'jack@fogcreek.com'
> a.parts.address.semantic
'jack@fogcreek.com'
```

If you need to, you can inspect the AST directly. The entire AST is returned when calling the module's function.

References
----------
 - http://tools.ietf.org/html/rfc5322
 - http://code.google.com/p/isemail/

Props
-----
Many thanks to [Dominic Sayers](https://github.com/dominicsayers) and his documentation and tests
for the [is_email](https://github.com/dominicsayers/isemail) function which helped greatly in writing this parser.

License
-------
Licensed under the MIT License. See the LICENSE file.
