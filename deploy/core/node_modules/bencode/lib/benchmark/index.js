"use strict";
var util      = require('util')
  , events    = require('events')
  , microtime = require('microtime')

var Benchmark = {
    Test: require('./test.js')
  , Suite: require('./suite.js')
}

module.exports = Benchmark;
