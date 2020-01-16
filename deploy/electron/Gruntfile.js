module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "download-electron": {
            version: "1.8.8",
            outputDir: "./electron",
            rebuild: true
        }
    });

    grunt.loadNpmTasks('grunt-download-electron');

};