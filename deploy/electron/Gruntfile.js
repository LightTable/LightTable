module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "download-electron": {
      version: "4.0.0",
      outputDir: "./electron",
      rebuild: true
    }
  });

  grunt.loadNpmTasks('grunt-download-electron');

};
