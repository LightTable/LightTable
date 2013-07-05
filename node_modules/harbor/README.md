# Harbor

> TCP port availability and assignment utility.

Harbor is a small little tool to find available TCP ports within a given range. It will remember
what server is assigned to each port, or which ports are unavailable due to system assignment.

## Installation

Harbor can be installed via [npm](http://npmjs.org).

```sh
npm install harbor
```

## Quick Start

Invoke the `harbor` primary export with a lower and upper bounds of port number to query. Then
claim a service name to query for an available port.

```js
var harbor = require('harbor')(1227, 1337);

harbor.claim('awesomeness', function (err, port) {
  if (err) throw err;
  console.log(port); // 1227
});
```

## API Reference

### Harbor

The primary export is a factory, but you can also create new Harbors manually.

```js
var Harbor = require('harbor')
  , harbor = new Harbor(1227, 1337);
```

The `harbor` constructor object is also an event emitter. 

- `claim (name, port)` upon claim of a port
- `release (name, port)` upon release of a port
- `full` upon all ports being claimed

Should you run out of ports, you can adjust the `harbor.min` or `harbor.max` to your needs.

#### .claim (name, cb)

- **@param** _{String}_ service name
- **@param** _{Function}_ callback

Find an available port for a named service. Names must be unique within a given Harbor. If
a claim for a name that already exists, the already assigned port will be returned.

Will emit `claim` event for new, successful claims. Alternatively could emit `full` event in
addition to returning an error in the callback.

```js
harbor.claim('awesomeness', function (err, port) {
  if (err) throw err; // will occur if all available ports are claimed
  console.log(port); // 1227
});
```

#### .release (name)

- **@param** _{String}_ service name

Indicate that the claimed port for `name` is no longer in use and can be returned
to the pool of available ports. 

Will emit `release` event if the port was previously claimed. Releasing a service 
name that does not exist has no impact.

```js
harbor.release('awesomeness');
```

#### .claimed

- **@returns** _{Array}_ claimed ports

Get an array of all claimed ports by this harbor interface. Does not include 
ports that are in use by system services within the harbor range.

## Tests

Tests are written in the BDD styles for the [Mocha](http://visionmedia.github.com/mocha) 
test runner using the `should` assertion interface from [Chai](http://chaijs.com). 
Running tests is simple:

    make test

## Contributing

Interested in contributing? Fork to get started. Contact [@logicalparadox](http://github.com/logicalparadox) 
if you are interested in being regular contributor.

#### Contibutors 

* Jake Luer ([@logicalparadox](http://github.com/logicalparadox))

## License

(The MIT License)

Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
