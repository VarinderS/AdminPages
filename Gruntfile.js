/*
 * grunt-contrib-uglify
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    asciify: {
      banner: {
        text: 'STAR-WARS'
      },
      options:{ 
        font:'graffiti',
        log:true
      }
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      strict: {
        src: ['admin/css/sb-admin-2.css']
      }
    },

    cssmin: {
      combine: {
        options: {
          banner: '/*!\n <%= asciify_banner %> \n*/\n'
        },
        files: {
          'admin/dest/css/styles.css': ['admin/css/bootstrap.min.css', 'admin/css/plugins/metisMenu/metisMenu.min.css', 'admin/css/plugins/timeline.css', 'admin/css/sb-admin-2.css', 'admin/css/plugins/morris.css']
        }
      }
    },

    jshint: {
      all: [
        'admin/js/sb-admin-2.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run (and then tested).
    uglify: {
      compress: {
        files: {
          'admin/dest/js/main.min.js': ['admin/js/jquery-1.11.0.js', 'admin/js/bootstrap.min.js', 'admin/js/plugins/metisMenu/metisMenu.min.js', 'admin/js/plugins/morris/raphael.min.js', 'admin/js/plugins/morris/morris.min.js', 'admin/js/plugins/morris/morris-data.js', 'admin/js/sb-admin-2.js']
        },
        options: {
          banner: '/*!\n <%= asciify_banner %> \n*/\n',
          mangle: true,
          sourceMap: true,
          sourceMapName: 'admin/dest/js/map'
        }
      }
    },

    processhtml: {
      dist: {
        files: {
          'admin/index-new.html': ['admin/index.html']
        }
      }
    },

    watch: {
      css: {
        files: 'admin/css/sb-admin-2.css',
        tasks: ['csslint:strict']
      },
      scripts: {
        files: 'admin/js/sb-admin-2.js',
        tasks: ['jshint']
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-asciify');

  grunt.loadNpmTasks('grunt-contrib-csslint');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-processhtml');

  grunt.loadNpmTasks('grunt-contrib-watch');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.


  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'csslint:strict','asciify', 'uglify:compress', 'cssmin:combine', 'processhtml:dist']);


};
