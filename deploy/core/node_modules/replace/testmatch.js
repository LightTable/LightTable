var minimatch = require("minimatch");

var includes;
var excludes = ["*.js"];

function canSearch(file, includes, excludes) {
  var inIncludes = includes && includes.some(function(include) {
    return minimatch(file, include, { matchBase: true });
  })
  var inExcludes = excludes && excludes.some(function(exclude) {
    return minimatch(file, exclude, { matchBase: true });
  })

  return ((!includes || inIncludes) && (!excludes || !inExcludes));
}


console.log(canSearch("test.js", includes, excludes));
console.log(canSearch("test.txt", includes, excludes));
console.log(canSearch("/node_modules/underscore/index.js", includes, excludes));

