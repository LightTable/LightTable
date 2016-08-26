# node-stream-zip

node.js library for reading and extraction of ZIP archives.  
Features:

- it never loads entire archive into memory, everything is read by chunks  
- large archives support  
- all operations are non-blocking, no sync i/o  
- fast initialization  
- no dependencies, no binary addons  
- decompression with built-in zlib module
- deflate, deflate64, sfx, macosx/windows built-in archives  
- ZIP64 support  

# Installation

`$ npm install node-stream-zip`
	
# Usage

```javascript
var StreamZip = require('node-stream-zip');  
var zip = new StreamZip({  
    file: 'archive.zip',  
    storeEntries: true    
});
zip.on('error', function(err) { /*handle*/ });
zip.on('ready', function() {
    console.log('Entries read: ' + zip.entriesCount);
    // stream to stdout
    zip.stream('node/benchmark/net/tcp-raw-c2s.js', function(err, stm) {
        stm.pipe(process.stdout);
    });
    // extract file
    zip.extract('node/benchmark/net/tcp-raw-c2s.js', './temp/', function(err) {
        console.log('Entry extracted');
    });
    // extract folder
    zip.extract('node/benchmark/', './temp/', function(err, count) {
        console.log('Extracted ' + count + ' entries');
    });
    // extract all
    zip.extract(null, './temp/', function(err, count) {
        console.log('Extracted ' + count + ' entries');
    });
    // read file as buffer in sync way
    var data = zip.entryDataSync('README.md');
});
zip.on('extract', function(entry, file) {
    console.log('Extracted ' + entry.name + ' to ' + file);
});
zip.on('entry', function(entry) {
    // called on load, when entry description has been read
    // you can already stream this entry, without waiting until all entry descriptions are read (suitable for very large archives) 
    console.log('Read entry ', entry.name);
});
```

# Building

The project doesn't require building. To run unit tests with [nodeunit](https://github.com/caolan/nodeunit):  
`$ npm test`

# Known issues

- [utf8](https://github.com/rubyzip/rubyzip/wiki/Files-with-non-ascii-filenames) file names
- AES encrypted files  

# Contributors

ZIP parsing code has been partially forked from [cthackers/adm-zip](https://github.com/cthackers/adm-zip) (MIT license). 