module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "download-electron": {
      version: "0.22.1",
      outputDir: "./electron",
      rebuild: true
    },
    compress: {
      windows: {
        options : {
          archive: '../package/LightTableWin.zip'
        },
        files: [
          { expand: true, cwd: '../package/LightTableWin/', src: ['LightTable/**/*'], dest: 'LightTable/' }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-download-electron');
  grunt.loadNpmTasks('grunt-contrib-compress');

};
