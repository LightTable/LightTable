var path = require("path");

module.exports = {
    regex: {
        position: 0,
        help: "JavaScript regex for searching file e.g. '\\d+'",
        required: true
    },
    paths: {
        position: 1,
        help: "File or directory to search (default is '*')",
        list: true,
        type: "string",
        default: ["*"]
    },
    recursive: {
        abbr: 'r',
        flag: true,
        help: "Recursively search directories"
    },
    ignoreCase: {
        abbr: 'i',
        flag: true,
        help: "Ignore case when searching"
    },
    multiline: {
        abbr: 'm',
        flag: true,
        help: "Match line by line, default is true",
        default: true
    },
    include: {
        string: '--include=PATHS',
        help: "Only search in these files, e.g. '*.js,*.foo'"
    },
    exclude: {
        string: '--exclude=PATHS',
        help: "Don't search in these files, e.g. '*.min.js'"
    },
    excludeList: {
        full: 'exclude-list',
        metavar: 'FILE',
        help: "File containing a new-line separated list of files to ignore",
        default: path.join(__dirname, "..", "defaultignore"),
        hidden: true
    },
    maxLines: {
        string: '-n NUMLINES',
        help: 'limit the number of lines to preview'
    },
    count: {
        abbr: 'c',
        flag: true,
        help: 'display count of occurances in each file'
    },
    quiet: {
        abbr: 'q',
        flag: true,
        help: "Just print the names of the files matches occured in (faster)"
    },
    color: {
        metavar: 'COLOR',
        help: "highlight color, e.g. 'green' or 'blue'",
        choices: ['red', 'green', 'blue', 'cyan', 'yellow', 'magenta', 'bold', 'italic'],
        default: 'cyan'
    },
    fileColor: {
        help: "highlight matching file's name in color, e.g. 'green' or 'blue'",
        choices: ['red', 'green', 'blue', 'cyan', 'yellow', 'magenta', 'bold', 'italic'],
        default: 'yellow'
    },
    async: {
        abbr: 'a',
        flag: true,
        help: "asynchronously read/write files in directory (faster)",
        hidden: true
    }
}
