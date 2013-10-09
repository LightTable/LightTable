var assert  = require('assert')
var bencode = require('./lib.js')
var data    = require('./data.js')

describe("bencode", function() {
  describe("#decode(x, 'uft8')", function() {
    it('should be able to decode an integer', function() {
      assert.deepEqual(bencode.decode('i123e', 'utf8'), 123);
      assert.deepEqual(bencode.decode('i-123e', 'utf8'), -123);
    });
    it('should be able to decode a float (as int)', function() {
      assert.deepEqual(bencode.decode('i12.3e', 'utf8'), 12);
      assert.deepEqual(bencode.decode('i-12.3e', 'utf8'), -12);
    });
    it('should be able to decode a string', function() {
      assert.deepEqual(bencode.decode('5:asdfe', 'utf8'), 'asdfe');
      assert.deepEqual(bencode.decode('4:öö', 'utf8'), 'öö');
    });
    it('should be able to decode "binary keys"', function() {
      var decoded = bencode.decode(data.binKeyData, 'utf8')
      assert.ok(decoded.files.hasOwnProperty(data.binKeyName));
    });

    it('should be able to decode a dictionary', function() {
      assert.deepEqual(
        bencode.decode( 'd3:cow3:moo4:spam4:eggse', 'utf8' ),
        {
          cow: 'moo',
          spam: 'eggs'
        }
      )
      assert.deepEqual(
        bencode.decode( 'd4:spaml1:a1:bee', 'utf8' ),
        { spam: [ 'a', 'b' ] }
      )
      assert.deepEqual(
        bencode.decode( 'd9:publisher3:bob17:publisher-webpage15:www.example.com18:publisher.location4:homee', 'utf8' ),
        {
          'publisher': 'bob',
          'publisher-webpage': 'www.example.com',
          'publisher.location': 'home'
        }
      )
    });

    it('should be able to decode a list', function() {
      assert.deepEqual(
        bencode.decode( 'l4:spam4:eggse', 'utf8' ),
        [ 'spam', 'eggs' ]
      )
    });
    it('should return the correct type', function() {
      assert.ok(typeof(bencode.decode('4:öö', 'utf8')) === 'string');
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
      var dat = bencode.decode ( result, 'utf8' )
      assert.equal(dat.integer, 12345)
      assert.deepEqual(dat.string, "Hello World")
      assert.deepEqual(dat.dict.key, "This is a string within a dictionary")
      assert.deepEqual(dat.list, [1, 2, 3, 4, 'string', 5, {}])
    });
  });
});
