var fs = require("fs"),
    test = require("tape"),
    child_process = require("child_process"),
    path = require("path"),
    bin = require.resolve("../bin/replace");

function getText(file) {
  var content = fs.readFileSync(file, "utf-8");
  return content;
}

function join(file) {
  return path.join(__dirname, file);
}

test('quotes parsing', function (t) {
  t.plan(1);

  var input = join("test_files/test_basic.txt");
  var original = getText(input);
  t.on("end", function () {
    fs.writeFileSync(input, original, "utf-8");
  });

  child_process.spawnSync(process.execPath, [bin, "ac", "'single'", input]);

  t.equal(getText(input), "aa'single'cc");
});
