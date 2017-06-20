'use strict';
 
module.exports = function(grunt) {
    grunt.initConfig({
        imagemin: {
          dynamic: {
            options: {
              optimizationLevel: 3
            },
            files: [{
              expand: true,
              cwd: 'src/img/',
              src: ['*.{png,jpg,svg}', '*/*.{png,jpg,svg}'],
              dest: 'app/img/'
            }]
          }
        },
        minifyHtml: {
            options: {
                cdata: true
            },
            dist: {
                files: {
                    'app/index.html': 'src/index.html'
                }
            }
        },
            //Babel required because Foundation is a...
        // babel: {
        //     options: {
        //         sourceMap: true
        //     },
        //     dist: {
        //         files: {
        //           "src/js/main.babel.js": "src/js/*.js"
        //         }
        //     }
        // },
        concat: {
            css: {
                src: ['src/css/*.css'],
                dest: 'src/css/main.concat.css'
              },
 
            js: {
                src: ['src/js/jquery.js', 'src/js/*.js', 'src/js/foundation.js', 'src/js/foundation.equalizer.js', 'src/js/foundation.reveal.js'],
                dest: 'src/js/main.concat.js'
              }
            },
        uglify: {
            js: {
                src: 'src/js/main.concat.js',
                dest: 'app/js/main.min.js'
                }
            },
        cssmin: {
            css: {
                src: 'src/css/main.concat.css',
                dest: 'app/css/main.min.css'
                }
            }
        });
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-minify-html');
    // grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('build', ['imagemin', 'minifyHtml', 'concat', 'uglify', 'cssmin']);
};