/**
 * Created by panpan on 5/24/14.
 */

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            src: 'js',
            dest: 'build'
        },
        concat: {
            options: {
                seperator: ';'
            },

            application: {
                src: [
                ],
                dest: ''
            }
        },

        jshint: {
            files: ['Gruntfile.js'],
            options: { }
        },

        watch :{
            scripts: {
                files: ['js/*.js', 'js/*/*.js', 'js/*/*/*.js'],
                tasks: ['concat']
            }
        }

    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-bower-install");

    grunt.registerTask('develop', ['concat', 'watch']);
};