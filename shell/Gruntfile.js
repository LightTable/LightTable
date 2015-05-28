module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "download-electron": {
      version: "0.22.1",
      outputDir: "./atom-shell",
      rebuild: true
    }
  });

  grunt.loadNpmTasks('grunt-download-electron');

};
