#!/usr/bin/env node

var parseArguments = require("./parse-arguments"),
    replace = require("../replace");

/* Additional options that apply to `replace`, but not `search` */
var positionalArgs = {
    replacement: {
        position: 1,
        string: true,
        describe: "Replacement string for matches",
        demandOption: true
    },
    paths: {
        position: 2,
        array: true,
        describe: "File or directory to search",
        default: ["*"]
    }
};

var addlOptions = {
    'function-file': {
        alias: 'f',
        describe: "Path of file containing JS replacement function",
        hidden: true
    },
    silent: {
        abbr: 's',
        boolean: true,
        describe: "Don't print out anything"
    },
    preview: {
        abbr: 'p',
        boolean: true,
        describe: "Preview the replacements, but don't modify files"
    }
}

var options = parseArguments("replace", positionalArgs, addlOptions);

replace(options);
