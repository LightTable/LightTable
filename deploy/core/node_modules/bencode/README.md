# Bencode
[![npm](https://img.shields.io/npm/v/bencode.svg?style=flat-square)](https://npmjs.com/bencode)
[![npm downloads](https://img.shields.io/npm/dm/bencode.svg?style=flat-square)](https://npmjs.com/bencode)
[![build status](https://img.shields.io/travis/themasch/node-bencode/master.svg?style=flat-square)](https://travis-ci.org/themasch/node-bencode)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fthemasch%2Fnode-bencode.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fthemasch%2Fnode-bencode?ref=badge_shield)

A node library for encoding and decoding bencoded data,
according to the [BitTorrent specification](http://www.bittorrent.org/beps/bep_0003.html).

## Index

- [About BEncoding](#about-bencoding)
- [Installation](#install-with-npm)
- [Usage](#usage)
- [API](#api)

## About BEncoding

from [Wikipedia](https://en.wikipedia.org/wiki/Bencoding):

Bencode (pronounced like B encode) is the encoding used by the peer-to-peer
file sharing system BitTorrent for storing and transmitting loosely structured data.

It supports four different types of values:
- byte strings
- integers
- lists
- dictionaries

Bencoding is most commonly used in torrent files.
These metadata files are simply bencoded dictionaries.

## Install with [npm](https://npmjs.org)

```
npm install bencode
```

## Usage

```javascript
var bencode = require( 'bencode' )
```

You can also use node-bencode with browserify to be able to use it in a lot of modern browsers.

### Encoding

```javascript

var data = {
  string: 'Hello World',
  integer: 12345,
  dict: {
    key: 'This is a string within a dictionary'
  },
  list: [ 1, 2, 3, 4, 'string', 5, {} ]
}

var result = bencode.encode( data )

```

**NOTE** As of `bencode@0.8.0`, boolean values will be cast to integers (false -> 0, true -> 1).

#### Output

```
d4:dictd3:key36:This is a string within a dictionarye7:integeri12345e4:listli1ei2ei3ei4e6:stringi5edee6:string11:Hello Worlde
```

### Decoding

```javascript
var data = Buffer.from('d6:string11:Hello World7:integeri12345e4:dictd3:key36:This is a string within a dictionarye4:listli1ei2ei3ei4e6:stringi5edeee')
var result = bencode.decode( data )
```

#### Output

```javascript
{
  string: <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>,
  integer: 12345,
  dict: {
    key: <Buffer 54 68 69 73 20 69 73 20 61 20 73 74 72 69 6e 67 20 77 69 74 68 69 6e 20 61 20 64 69 63 74 69 6f 6e 61 72 79>
  },
  list: [ 1, 2, 3, 4, <Buffer 73 74 72 69 6e 67>, 5, {} ]
}
```

Automagically convert bytestrings to strings:

```javascript
var result = bencode.decode( data, 'utf8' )
```

#### Output

```javascript
{
  string: 'Hello World',
  integer: 12345,
  dict: {
    key: 'This is a string within a dictionary'
  },
  list: [ 1, 2, 3, 4, 'string', 5, {} ]
}
```

## API

The API is compatible with the [`abstract-encoding`](https://github.com/mafintosh/abstract-encoding) specification.

### bencode.encode( *data*, *[buffer]*, *[offset]* )

> `Buffer` | `Array` | `String` | `Object` | `Number` | `Boolean` __data__
> `Buffer` __buffer__
> `Number` __offset__

Returns `Buffer`

### bencode.decode( *data*, *[start]*, *[end]*, *[encoding]* )

> `Buffer` __data__
> `Number` __start__
> `Number` __end__
> `String` __encoding__

If `encoding` is set, bytestrings are
automatically converted to strings.

Returns `Object` | `Array` | `Buffer` | `String` | `Number`

### bencode.byteLength( *value* ) or bencode.encodingLength( *value* )

> `Buffer` | `Array` | `String` | `Object` | `Number` | `Boolean` __value__
