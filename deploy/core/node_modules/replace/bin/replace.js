#!/usr/bin/env node

var nomnom = require("nomnom"),
    replace = require("../replace"),
    sharedOptions = require("./shared-options");

/* Additional options that apply to `replace`, but not `search` */
var addlOptions = {
    replacement: {
        position: 1,
        help: "Replacement string for matches",
        required: true
    },
    paths: {
        position: 2,
        help: "File or directory to search (default is '*')",
        type: "string",
        list: true,
        default: ["*"]
    },
    funcFile: {
        abbr: 'f',
        full: 'function-file',
        metavar: 'PATH',
        help: 'file containing JS replacement function',
        hidden: true
    },
    maxLines: {
        string: '-n NUMLINES',
        help: 'limit the number of lines to preview'
    },
    silent: {
        abbr: 's',
        flag: true,
        help: "Don't print out anything"
    },
    preview: {
        abbr: 'p',
        flag: true,
        help: "Preview the replacements, but don't modify files"
    }
}

var opts = {};
for (var opt in sharedOptions) {
    opts[opt] = sharedOptions[opt];
}
for (var opt in addlOptions) {
    opts[opt] = addlOptions[opt];
}

var options = nomnom.options(opts)
  .script("replace")
  .parse();

replace(options);
