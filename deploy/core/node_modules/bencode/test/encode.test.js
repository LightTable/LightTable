var assert = require("assert");
var bencode = require('./lib.js');

describe("bencode", function() {
  describe("#encode()", function() {
    it('should always return a Buffer', function() {
      assert.ok(Buffer.isBuffer(bencode.encode({})), "its not a buffer for empty dicts");
      assert.ok(Buffer.isBuffer(bencode.encode("test")), "its not a buffer for strings");
      assert.ok(Buffer.isBuffer(bencode.encode([3, 2])), "its not a buffer for lists");
      assert.ok(Buffer.isBuffer(bencode.encode({"a": "b", 3: 6})), "its not a buffer for big dicts");
      assert.ok(Buffer.isBuffer(bencode.encode(123)), "its not a buffer for numbers");
    });
    it('should sort dictionories', function() {
      var data = {
        string: 'Hello World',
        integer: 12345,
      };
      assert.equal(bencode.encode(data).toString(), "d7:integeri12345e6:string11:Hello Worlde");
    })
    it('should force keys to be strings', function() {
      var data = {
        12: 'Hello World',
        34: 12345,
      };
      assert.equal(bencode.encode(data).toString(), "d2:1211:Hello World2:34i12345ee")
    })
    it('should be able to encode a positive integer', function() {
      assert.equal(bencode.encode(123), 'i123e');
    })
    it('should be able to encode a negative integer', function() {
      assert.equal(bencode.encode(-123), 'i-123e');
    })
    it('should be able to encode a positive float (as int)', function() {
      assert.equal(bencode.encode(123.5), 'i123e');
    })
    it('should be able to encode a negative float (as int)', function() {
      assert.equal(bencode.encode(-123.5), 'i-123e');
    })
    it('should be able to encode a string', function() {
      assert.equal(bencode.encode("asdf"), '4:asdf');
      assert.equal(bencode.encode(":asdf:"), '6::asdf:');
    })
    it('should be able to encode a unicode string', function() {
      assert.equal(bencode.encode("ö±sdf"), '7:ö±sdf');
      assert.equal(bencode.encode(new Buffer("ö±sdf")), '7:ö±sdf');
    })
    it('should be able to encode a buffer', function() {
      assert.equal(bencode.encode(new Buffer("asdf")), '4:asdf');
      assert.equal(bencode.encode(new Buffer(":asdf:")), '6::asdf:');
    })
    it('should be able to encode an array', function() {
      assert.equal(bencode.encode([32, 12]), 'li32ei12ee');
      assert.equal(bencode.encode([":asdf:"]), 'l6::asdf:e');
    })
    it('should be able to encode an object', function() {
      assert.equal(bencode.encode({"a": "bc"}), 'd1:a2:bce')
      assert.equal(bencode.encode({"a": "45", "b": 45}), 'd1:a2:451:bi45ee')
      assert.equal(bencode.encode({"a": new Buffer("bc")}), 'd1:a2:bce')
    })
  })
});
