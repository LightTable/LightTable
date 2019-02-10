module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "download-electron": {
      version: "0.36.7",
      outputDir: "./electron",
      rebuild: true,
      token: process.env.GITHUB_OAUTH_READONLY_TOKEN
    }
  });

  grunt.loadNpmTasks('grunt-download-electron');

};
