
/**
 * Decodes bencoded data.
 *
 * @param  {Buffer} data
 * @param  {String} encoding
 * @return {Object|Array|Buffer|String|Number}
 */
function decode( data, encoding ) {

  decode.position = 0
  decode.encoding = encoding || null

  decode.data = !( data instanceof Buffer )
    ? new Buffer( data )
    : data

  return decode.next()

}

decode.position = 0
decode.data     = null
decode.encoding = null

decode.next = function() {

  switch( decode.data[decode.position] ) {
    case 0x64: return decode.dictionary(); break
    case 0x6C: return decode.list(); break
    case 0x69: return decode.integer(); break
    default:   return decode.bytes(); break
  }

}

decode.find = function( chr ) {

  var i = decode.position
  var c = decode.data.length
  var d = decode.data

  while( i < c ) {
    if( d[i] === chr )
      return i
    i++
  }

  return -1

}

decode.dictionary = function() {

  decode.position++

  var dict = {}

  while( decode.data[decode.position] !== 0x65 ) {
    dict[ decode.bytes() ] = decode.next()
  }

  decode.position++

  return dict

}

decode.list = function() {

  decode.position++

  var lst = []

  while( decode.data[decode.position] !== 0x65 ) {
    lst.push( decode.next() )
  }

  decode.position++

  return lst

}

decode.integer = function() {

  var end    = decode.find( 0x65 )
  var number = decode.data.toString('ascii', decode.position+1, end )

  decode.position += end + 1 - decode.position

  return parseInt( number )
}

decode.bytes = function() {

  var sep    = decode.find( 0x3A )
  var length = parseInt(decode.data.toString('ascii', decode.position, sep ), 10)
  var end    = ++sep + length

  decode.position += end - decode.position

  return decode.encoding
            ? decode.data.toString(decode.encoding, sep, end )
            : decode.data.slice( sep, end )

}

// Expose
module.exports = decode
