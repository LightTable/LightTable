module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "download-electron": {
            version: "2.0.18",
            outputDir: "./electron",
            rebuild: true
        }
    });

    grunt.loadNpmTasks('grunt-download-electron');

};