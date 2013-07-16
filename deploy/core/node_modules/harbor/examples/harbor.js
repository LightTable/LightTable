var harbor = require('..')();

var names = [ 'one', 'two', 'three', 'four' ]
  , count = 4;

names.forEach(function (name) {
  harbor.claim(name, function (err, port) {
    if (err) throw err;
    console.log('%s => %d', name, port);
    --count || console.log(harbor.ports);
  });
});
