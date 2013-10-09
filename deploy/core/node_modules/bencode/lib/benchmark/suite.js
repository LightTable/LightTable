"use strict";
var util      = require('util')
  , events    = require('events')
  , Test      = require('./test.js')

var Suite = function(options)
{
    if(!(this instanceof Suite)) {
        return new Suite(options)
    }
    events.EventEmitter.call(this)
    this.options = options || {}
    this.tests = []
}

util.inherits(Suite, events.EventEmitter)

Suite.prototype.add = function(name, test, options)
{
    this.tests.push( new Test(name, test, options, this) )
    return this
}

Suite.prototype.run = function(options)
{
    var tl = this.tests.length
    var results = {}
    for(var a=0;a<5;a++) {
        for(var i=0;i<tl;i++) {
            var test = this.tests[i]
            var samples = test.run(options)
            if(!results[test.name]) {
                results[test.name] = samples
            }
            else {
                for(var j=0;j<samples.length;j++) {
                    results[test.name].push(samples[j])
                }
            }
        }
    }
    var stats = {}
    for(var i=0;i<tl;i++) {
        var test = this.tests[i]
        var s = results[test.name]
        stats[test.name] = this.doMathStuff(s)
    }
    console.log(stats)
}

Suite.prototype.doMathStuff = function(samples) {
    var l = samples.length
    var time = 0, runs = 0
    var maxOPS = 0
      , minOPS = Infinity
    for(var i=0; i < l ; i++ ) {
        time += samples[i][0]
        runs += samples[i][1]
        maxOPS = Math.max(samples[i][2], maxOPS)
        minOPS = Math.min(samples[i][2], minOPS)
    }
    return {
        avg: runs/time * 1e9,
        best: maxOPS,
        worst: minOPS
    }
}

module.exports = Suite

