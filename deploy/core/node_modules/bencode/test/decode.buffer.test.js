var assert  = require('assert')
var bencode = require('./lib.js')
var data    = require('./data.js')

describe("bencode", function() {
  describe("#decode(x)", function()  {
    it('should be able to decode an integer', function() {
      assert.deepEqual(bencode.decode('i123e'), 123);
      assert.deepEqual(bencode.decode('i-123e', 'utf8'), -123);
    });
    it('should be able to decode a float (as int)', function() {
      assert.deepEqual(bencode.decode('i12.3e'), 12);
      assert.deepEqual(bencode.decode('i-12.3e'), -12);
    });
    it('should be able to decode a string', function() {
      assert.deepEqual(bencode.decode('5:asdfe'), new Buffer('asdfe'));
      assert.deepEqual(bencode.decode('4:öö'), new Buffer('öö'));
    });
    it('should be able to decode "binary keys"', function() {
      assert.ok(bencode.decode(data.binKeyData).files.hasOwnProperty(data.binKeyName));
    });

    it('should be able to decode a dictionary', function() {
      assert.deepEqual(
        bencode.decode( 'd3:cow3:moo4:spam4:eggse' ),
        {
          cow: new Buffer('moo'),
          spam: new Buffer('eggs')
        }
      )
      assert.deepEqual(
        bencode.decode( 'd4:spaml1:a1:bee' ),
        { spam: [
          new Buffer('a'),
          new Buffer('b')
        ] }
      )
      assert.deepEqual(
        bencode.decode( 'd9:publisher3:bob17:publisher-webpage15:www.example.com18:publisher.location4:homee'),
        {
          'publisher': new Buffer('bob'),
          'publisher-webpage': new Buffer('www.example.com'),
          'publisher.location': new Buffer('home')
        }
      )
    });

    it('should be able to decode a list', function() {
      assert.deepEqual(
        bencode.decode( 'l4:spam4:eggse'),
        [ new Buffer('spam'),
          new Buffer('eggs') ]
      )
    });
    it('should return the correct type', function() {
      assert.ok(bencode.decode('4:öö') instanceof Buffer);
    });
    it('should be able to decode stuff in dicts (issue #12)', function() {
      var someData = {
        string: 'Hello World',
        integer: 12345,
        dict: {
          key: 'This is a string within a dictionary'
        },
        list: [ 1, 2, 3, 4, 'string', 5, {} ]
      }
      var result = bencode.encode( someData )
      var dat = bencode.decode ( result )
      assert.equal(dat.integer, 12345)
      assert.deepEqual(dat.string, new Buffer("Hello World"))
      assert.deepEqual(dat.dict.key, new Buffer("This is a string within a dictionary"))
      assert.deepEqual(dat.list, [1, 2, 3, 4, new Buffer('string'), 5, {}])
    });
  });
});
