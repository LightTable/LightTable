var Benchmark = require('benchmark')
var bencode = require('../')
var buf = require('fs').readFileSync(__dirname + '/test.torrent');
var str = buf.toString();

var decoding = new Benchmark.Suite({
  maxTime: 10
})
  .add('bencode buffer', function() {
    bencode.decode(buf);
  })
  .add('bencode string', function() {
    bencode.decode(str);
  })
  .on( 'cycle', function ( event ) {
    console.log( event.target.toString() )
  })
  .on( 'complete', function ( event, bench ) {
    console.log(
      '\nFastest is ' + this.filter( 'fastest' ).pluck( 'name' ) + '\n\n'
    )
  })
  .on('error', function() {
    console.log(arguments)
  })
  .run()
