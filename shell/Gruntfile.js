module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "download-atom-shell": {
      version: "0.20.3",
      outputDir: "./atom-shell",
      rebuild: true
    }
  });

  grunt.loadNpmTasks('grunt-download-atom-shell');

};
