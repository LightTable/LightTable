var test = require('tap').test,
walkdir = require('../walkdir.js');

var expectedPaths = {
'dir/foo/x':'file',
'dir/foo/a':'dir'
};

test('no_recurse option',function(t){
  var paths = [];

  var emitter = walkdir(__dirname+'/dir/foo',{no_recurse:true},function(path,stat,depth){
    paths.push(path.replace(__dirname+'/',''));
    t.ok(depth === 1,' all paths emitted should have a depth of 1');
  });

  emitter.on('end',function(){
     var expected = Object.keys(expectedPaths);
     paths.forEach(function(v){ 
          t.ok(expected.indexOf(v) > -1,'all expected files should be in paths');
     });

     t.end();
  });
});
