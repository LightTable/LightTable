# COMMON ISSUE ON WINDOWS
There is a built-in replace command on windows, if you get an error like this

```shell
Invalid switch - -h
No files replaced
```

You are using the windows replace

# replace
`replace` is a command line utility for performing search-and-replace on files. It's similar to sed but there are a few differences:

* Modifies files when matches are found
* Recursive search on directories with -r
* Uses [JavaScript syntax](https://developer.mozilla.org/en/JavaScript/Guide/Regular_Expressions#Using_Simple_Patterns) for regular expressions and [replacement strings](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter).

# Install
With [node.js](http://nodejs.org/) and [npm](http://github.com/isaacs/npm):

	npm install replace -g

You can now use `replace` and `search` from the command line.


## Examples

Replace all occurrences of "foo" with "bar" in files in the current directory:

```
replace 'foo' 'bar' *
```

Replace in all files in a recursive search of the current directory:

```
replace 'foo' 'bar' . -r
```

Replace only in test/file1.js and test/file2.js:

```
replace 'foo' 'bar' test/file1.js test/file2.js
```

Replace all word pairs with "_" in middle with a "-":

```
replace '(\w+)_(\w+)' '$1-$2' *
```

Replace only in files with names matching *.js:

```
replace 'foo' 'bar' . -r --include="*.js"
```

Don't replace in files with names matching *.min.js and *.py:

```
replace 'foo' 'bar' . -r --exclude="*.min.js,*.py"
```

Preview the replacements without modifying any files:

```
replace 'foo' 'bar' . -r --preview
```

Replace using stdin:

```
echo "asd" | replace "asd" "dsa" -z
```

See all the options:

```
replace -h
```

## Search
There's also a `search` command. It's like `grep`, but with `replace`'s syntax.

```
search "setTimeout" . -r
```

## Programmatic Usage
You can use replace from your JS program:

```javascript
var replace = require("replace");

replace({
  regex: "foo",
  replacement: "bar",
  paths: ['./Test/'],
  recursive: false,
  silent: false,
});
```

## More Details

### Excludes
By default, `replace` and `search` will exclude files (binaries, images, etc) that match patterns in the `"defaultignore"` located in this directory.

### On huge directories
If `replace` is taking too long on a large directory, try turning on the quiet flag with `-q`, only including the necessary file types with `--include` or limiting the lines shown in a preview with `-n`.


## What it looks like
![replace](http://i.imgur.com/qmJjS.png)

