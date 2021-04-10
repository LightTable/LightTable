var fs = require("fs"),
    path = require("path"),
    chalk = require("chalk"),
    minimatch = require("minimatch"),
    sharedOptions = require("./bin/shared-options");

module.exports = function(options) {
    var matched = [];
    // If the path is the same as the default and the recursive option was not
    // specified, search recursively under the current directory as a
    // convenience.
    if (options.paths.length === 1 &&
        options.paths[0] === sharedOptions.paths.default[0] &&
        !options.hasOwnProperty('recursive')) {
        options.paths = ['.'];
    }

    var lineCount = 0,
        limit = 400; // chars per line

    if (options.r) {
        options.recursive = true;
    }

    if (!options.color) {
        options.color = "cyan";
    }

    var flags = "g"; // global multiline
    if (options.ignoreCase) {
        flags += "i";
    }
    if (options.multiline) {
        flags += "m";
    }

    var regex;
    if (options.regex instanceof RegExp) {
        regex = options.regex;
    }
    else {
        regex = new RegExp(options.regex, flags);
    }
    var canReplace = !options.preview && options.replacement !== undefined;

    var includes;
    if (options.include) {
        includes = options.include.split(",");
    }
    var excludes = [];
    if (options.exclude) {
        excludes = options.exclude.split(",");
    }
    var ignoreFile = options.excludeList || path.join(__dirname, '/defaultignore');
    var ignores = fs.readFileSync(ignoreFile, "utf-8").split("\n");
    excludes = excludes.concat(ignores);

    var replaceFunc;
    if (options.funcFile) {
        eval('replaceFunc = ' + fs.readFileSync(options.funcFile, "utf-8"));
    }

    if(options.z) {
          process.stdin.resume();
          _input = "";
          process.stdin.on("data", function (input) {
            _input += input;
          });
          
          process.stdin.on("end", function () {
              const text = replacizeText(_input);
              process.stdout.write(text);
          });
    } else {
        for (var i = 0; i < options.paths.length; i++) {
            if (options.async) {
                replacizeFile(options.paths[i]);
            }
            else {
                replacizeFileSync(options.paths[i]);
            }
        }
    }

    return matched;

    function canSearch(file, isFile) {
      var inIncludes = includes && includes.some(function(include) {
          return minimatch(file, include, { matchBase: true });
      })
      var inExcludes = excludes.some(function(exclude) {
          return minimatch(file, exclude, { matchBase: true });
      })

      return ((!includes || !isFile || inIncludes) && (!excludes || !inExcludes));
    }

    function replacizeFile(file) {
      fs.lstat(file, function(err, stats) {
          if (err) throw err;

          if (stats.isSymbolicLink()) {
              // don't follow symbolic links for now
              return;
          }
          var isFile = stats.isFile();
          if (!canSearch(file, isFile)) {
              return;
          }
          if (isFile) {
              fs.readFile(file, "utf-8", function(err, text) {
                  if (err) {
                      if (err.code == 'EMFILE') {
                          console.log('Too many files, try running `replace` without --async');
                          process.exit(1);
                      }
                      throw err;
                  }

                  text = replacizeText(text, file);
                  if (canReplace && text !== null) {
                      fs.writeFile(file, text, function(err) {
                          if (err) throw err;
                      });
                  }
              });
          }
          else if (stats.isDirectory() && options.recursive) {
              fs.readdir(file, function(err, files) {
                  if (err) throw err;
                  for (var i = 0; i < files.length; i++) {
                      replacizeFile(path.join(file, files[i]));
                  }
              });
          }
       });
    }

    function replacizeFileSync(file) {
      var stats = fs.lstatSync(file);
      if (stats.isSymbolicLink()) {
          // don't follow symbolic links for now
          return;
      }
      var isFile = stats.isFile();
      if (!canSearch(file, isFile)) {
          return;
      }
      if (isFile) {
          var text = fs.readFileSync(file, "utf-8");

          var replacizedText = replacizeText(text, file);

          if (replacizedText !== null) {
              if (canReplace) {
                  fs.writeFileSync(file, replacizedText);
              } else {
                  matched.push({ text, path: file });
              }
          }
      }
      else if (stats.isDirectory() && options.recursive) {
          var files = fs.readdirSync(file);
          for (var i = 0; i < files.length; i++) {
              replacizeFileSync(path.join(file, files[i]));
          }
      }
    }

    function replacizeText(text, file) {
        var match = text.match(regex);
        if (!match) {
            return null;
        }

        if (!options.silent && file) {
            var printout = options.noColor ? file : options.fileColor ? chalk[options.fileColor](file) : file;
            if (options.count) {
                var count = " (" + match.length + ")";
                count = options.noColor ? count : chalk.grey(count);
                printout += count;
            }
            console.log(printout);
        }
        if (!options.silent && !options.quiet
           && !(lineCount > options.maxLines)
           && options.multiline) {
            var lines = text.split("\n");
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                if (line.match(regex)) {
                    if (++lineCount > options.maxLines) {
                        break;
                    }
                    var replacement = options.replacement || "$&";
                    if (!options.noColor) {
                      replacement = chalk[options.color](replacement);
                    }
                    line = line.replace(regex, replaceFunc || replacement);
                    // only console log if file not stdin
                    file && console.log(" " + (i + 1) + ": " + line.slice(0, limit));
                }
            }
        }
        if (canReplace) {
            return text.replace(regex, replaceFunc || options.replacement);
        }
    }
}
