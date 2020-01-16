var path = require("path");

module.exports = {
    regex: {
        position: 0,
        string: true,
        describe: "JavaScript regex for searching file e.g. '\\d+'",
        demandOption: true
    },
    paths: {
        position: 1,
        array: true,
        describe: "File or directory to search",
        default: ["*"]
    },
    stdin: {
        abbr: 'z',
        boolean: true,
        describe: 'Use standard in for input'
    },
    recursive: {
        abbr: 'r',
        boolean: true,
        describe: "Recursively search directories"
    },
    ignoreCase: {
        abbr: 'i',
        boolean: true,
        describe: "Ignore case when searching"
    },
    multiline: {
        abbr: 'm',
        boolean: true,
        describe: "Match line by line",
        default: true
    },
    include: {
        string: true,
        describe: "Only search in these files, e.g. '*.js,*.foo'"
    },
    exclude: {
        string: true,
        describe: "Don't search in these files, e.g. '*.min.js'"
    },
    'exclude-list': {
        string: true,
        describe: "Path of file containing a new-line separated list of files to ignore",
        default: path.join(__dirname, "..", "defaultignore"),
        hidden: true
    },
    n: {
        number: true,
        describe: "Limit the number of lines to preview"
    },
    count: {
        abbr: 'c',
        boolean: true,
        describe: 'Display count of occurances in each file'
    },
    quiet: {
        abbr: 'q',
        boolean: true,
        describe: "Just print the names of the files matches occured in (faster)"
    },
    color: {
        string: true,
        describe: "Highlight color",
        choices: ['red', 'green', 'blue', 'cyan', 'yellow', 'magenta', 'bold', 'italic'],
        default: 'cyan'
    },
    fileColor: {
        string: true,
        describe: "Highlight matching file's name in color",
        choices: ['red', 'green', 'blue', 'cyan', 'yellow', 'magenta', 'bold', 'italic'],
        default: 'yellow'
    },
    async: {
        abbr: 'a',
        boolean: true,
        describe: "Asynchronously read/write files in directory (faster)",
        hidden: true
    },
    noColor: {
        boolean: true,
        describe: "Disable color output"
    }
};
