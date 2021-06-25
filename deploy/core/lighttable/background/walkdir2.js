var fs = require('fs');
var _path = require('path');

var curtime = function() {
  return (new Date()).getTime();
}

var walk = function(path,options){

  var start = curtime();
  var allPaths = [];
  if(path.push) {
    var queue = path;
  } else {
    var queue = [path];
  }
  var stat = null;
  var children = null;
  var child = null;
  var isDir = null;
  var filter = options.filter;
  var limit = options.limit;
  var cur = null;
  var limited = false;
  var basename = null;

  while(cur = queue.shift()) {

    try {
      children = fs.readdirSync(cur);
    } catch(e) {
      console.error("Couldn't read dir " + cur);
      continue;
    }

    for(var i = 0; i < children.length; i++) {
      basename = children[i];
      child = _path.join(cur, basename);
      try {
        stat = fs.statSync(child);
      } catch(e) {
        try {
          stat = fs.lstatSync(child);
        } catch(e) {
          continue;
        }
      }
      isDir = stat.isDirectory();

      if(isDir) {
         basename += _path.sep;
      }

      if(!filter || !basename.match(filter)) {
        if(isDir) {
          queue.push(child);
        } else if(!limit || allPaths.length <= limit) {
          allPaths.push(child);
        } else {
          queue = [];
          limited = true;
          break;
        }
      }
    }
  }

  return {time: curtime() - start,
          paths: allPaths,
          total: allPaths.length,
          limited: limited};

}

module.exports = walk;