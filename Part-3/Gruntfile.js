module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    './ES6ToEs5.js': './ES6.js'
                }
            }
        },
        uglify: {
            build: {
                files: {
                    './ES5.min.js': './ES5.js'
                }

            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-uglify');  
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask('default', ['babel','uglify','watch']);

};