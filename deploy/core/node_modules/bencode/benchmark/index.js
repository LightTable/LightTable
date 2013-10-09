
var Benchmark = require( '../lib/benchmark' )
var fs        = require( 'fs' )

var bencode     = require( '../' )
var bencoding   = require( 'bencoding' )
var dht_bencode = require( 'dht-bencode' )
var bncode      = require( 'bncode' )
var dht         = require( 'dht.js/lib/dht/bencode' )

var buffer = fs.readFileSync( __dirname + '/test.torrent' )
var object = bencode.decode( buffer, 'ascii' )
var doEncode = true,
    doDecode = true;
if(process.argv.length > 2) {
  doEncode = (process.argv.indexOf('encode') !== -1);
  doDecode = (process.argv.indexOf('decode') !== -1);
}
// ////////////////////////////////////////////////////////////////////////////
if(doEncode) {
console.log( 'ENCODING\n' )
var encoding = new Benchmark.Suite()

  .add( 'bencode', function () {
    bencode.encode( object )
  })
  .add( 'bencoding', function () {
    bencoding.encode( object )
  })
  .add( 'dht-bencode', function () {
    dht_bencode.bencode( object )
  })
  .add( 'bncode', function () {
    bncode.encode( object )
  })
  .add( 'dht.js', function () {
    dht.encode( object )
  })

  .on( 'cycle', function ( event ) {
    console.log( event.target.toString() )
  })
  .on( 'complete', function ( event, bench ) {
    console.log(
      '\nFastest is ' + this.filter( 'fastest' ).pluck( 'name' ) + '\n\n'
    )
  })
  .run()
}

// ////////////////////////////////////////////////////////////////////////////
if(doDecode) {
console.log( 'DECODING\n' )
var decoding = new Benchmark.Suite()

  .add( 'bencode', function () {
    bencode.decode( buffer )
  })
  .add( 'bencoding', function () {
    bencoding.decode( buffer )
  })
  .add( 'dht-bencode', function () {
    dht_bencode.bdecode( buffer )
  })
  .add( 'bncode', function () {
    bncode.decode( buffer )
  })
  .add( 'dht.js', function () {
    dht.decode( buffer )
  })

  .on( 'cycle', function ( event, bench ) {
    console.log( event.target.toString() )
  })
  .on( 'complete', function ( event, bench ) {
    console.log(
      '\nFastest is ' + this.filter( 'fastest' ).pluck( 'name' ) + '\n'
    )
  })
  .run()
}
