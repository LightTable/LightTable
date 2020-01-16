var fs = require("fs"),
    test = require('tape'),
    replace = require('../replace'),
    path = require("path");

function getText(file) {
  var content = fs.readFileSync(file, "utf-8");
  return content;
}

function join(file) {
  return path.join(__dirname, file);
}

test('basic', function (t) {
  t.plan(2);

  var file = join("test_files/test_basic.txt");

  replace({
    regex: "a",
    replacement: "b",
    paths:[file]
  });

  var expected = "bbbccc";
  t.equal(getText(file), expected, "single letter replace works");

  replace({
    regex: "b",
    replacement: "a",
    paths:[file]
  });

  var expected = "aaaccc";
  t.equal(getText(file), expected, "reverting worked");
});

test('numbers', function(t) {
  t.plan(2);

  var file = join("test_files/test_numbers.txt");

  replace({
    regex: "123",
    replacement: "456",
    paths:[file]
  });

  var expected = "a456b";
  t.equal(getText(file), expected, "number replace works");

  replace({
    regex: "456",
    replacement: "123",
    paths:[file]
  });

  var expected = "a123b";
  t.equal(getText(file), expected, "reverting worked");
})


test('multiline', function(t) {
  t.plan(3);

  var file = join("test_files/test_multiline.txt");

  replace({
    regex: "c$",
    replacement: "t",
    paths:[file],
    multiline: false
  });

  var expected = "abc\ndef";
  t.equal(getText(file), expected, "$ shouldn't match without multiline");

  replace({
    regex: "c$",
    replacement: "t",
    paths:[file],
    multiline: true
  });

  var expected = "abt\ndef";
  t.equal(getText(file), expected, "with multiline, $ should match eol");

  replace({
    regex: "t$",
    replacement: "c",
    paths:[file],
    multiline: true
  });

  var expected = "abc\ndef";
  t.equal(getText(file), expected, "reverting worked");
});

test('case insensitive', function(t) {
  t.plan(2);

  var file = join("test_files/test_case.txt");

  replace({
    regex: "a",
    replacement: "c",
    paths:[file],
    ignoreCase: true
  });

  var expected = "cccc";
  t.equal(getText(file), expected, "case insensitive replace");

  replace({
    regex: "c",
    replacement: "A",
    paths:[file]
  });

  var expected = "AAAA";
  t.equal(getText(file), expected, "reverting worked");
})

test('preview', function(t) {
  t.plan(1);

  var file = join("test_files/test_preview.txt");

  replace({
    regex: "a",
    replacement: "c",
    paths:[file],
    preview: true
  });

  var expected = "aaaa";
  t.equal(getText(file), expected, "no replacement if 'preview' is true");
})
