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

test('recursive', function (t) {
  t.plan(7);

  replace({
    regex: "a",
    replacement: "b",
    paths: [join("test_files/test_paths")],
    recursive: true
  });

  var changedFiles = [
    join("test_files/test_paths/test1.txt"),
    join("test_files/test_paths/test2.txt"),
    join("test_files/test_paths/sample1.txt")];
  var expected = "bbbb";
  changedFiles.forEach(function(file) {
    t.equal(getText(file), expected, "recursive replace on directory " + file);
  })

  var expected = "aaaa";
  var ignored = join("test_files/test_paths/test.png");
  t.equal(getText(ignored), expected, "skip file with match in defaultignore");

  replace({
    regex: "b",
    replacement: "a",
    paths: [join("test_files/test_paths")],
    recursive: true
  });

  changedFiles.forEach(function(file) {
    t.equal(getText(file), expected, "reverting worked");
  });
});

test('include', function(t) {
  t.plan(5);

  replace({
    regex: "a",
    replacement: "b",
    paths: [join("test_files/test_paths")],
    recursive: true,
    include: "sample*.txt"
  });

  var changedFiles = [
    join("test_files/test_paths/sample1.txt"),
  ];
  var expected = "bbbb";
  changedFiles.forEach(function(file) {
    t.equal(getText(file), expected, "replace in included file " + file);
  });

  var ignoredFiles = [
    join("test_files/test_paths/test1.txt"),
    join("test_files/test_paths/test2.txt"),
    join("test_files/test_paths/test.png")];
  var expected = "aaaa";
  ignoredFiles.forEach(function(file) {
    t.equal(getText(file), expected, "don't replace in not-included file " + file);
  });

  replace({
    regex: "b",
    replacement: "a",
    paths: [join("test_files/test_paths")],
    recursive: true
  });

  var expected = "aaaa";
  changedFiles.forEach(function(file) {
    t.equal(getText(file), expected, "reverting worked");
  });
})

test('exclude', function(t) {
  t.plan(6);

  replace({
    regex: "a",
    replacement: "b",
    paths: [join("test_files/test_paths")],
    recursive: true,
    exclude: "*sample*.txt"
  });

  var changedFiles = [
    join("test_files/test_paths/test1.txt"),
    join("test_files/test_paths/test2.txt")];
  var expected = "bbbb";
  changedFiles.forEach(function(file) {
    t.equal(getText(file), expected, "replace in non-excluded file " + file);
  });

  var ignoredFiles = [
    join("test_files/test_paths/sample1.txt"),
    join("test_files/test_paths/test.png")];
  var expected = "aaaa";
  ignoredFiles.forEach(function(file) {
    t.equal(getText(file), expected, "don't replace in excluded file " + file);
  });

  replace({
    regex: "b",
    replacement: "a",
    paths: [join("test_files/test_paths")],
    recursive: true
  });

  var expected = "aaaa";
  changedFiles.forEach(function(file) {
    t.equal(getText(file), expected, "reverting worked");
  });
})