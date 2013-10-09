
exports.merge_objs = function() {
    var result = {}
    for( var i = 0 ; i < arguments.length ; i++ ) {
        var obj = arguments[i]
        if(typeof obj !== 'object') {
            continue
        }
        var keys = Object.getOwnPropertyNames(obj)
        var keyl = keys.length
        for( var j = 0 ; j < keyl ; j++ ) {
            var key = keys[j]
            result[key] = obj[key]
        }
    }
    return result
}

exports.time = function() {
    var t = process.hrtime()
    return t[0]*1e9 + t[1]
}
