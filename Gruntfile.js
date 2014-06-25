/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        dependence: {
            options: {
                base: 'src'
            },

            files: [{
                src: '**/*.js',
                dest: 'dist/kity_tmp.js'
            }]
        },

        // Task configuration.
        transport: {

            options: {

                // module path
                paths: [ 'src' ],
                debug: false

            },

            cmd: {

                files: [ {

                    cwd: 'src',
                    src: '**/*.js',
                    dest: '.build_tmp'

                } ]

            }

        },

        concat: {

            options: {

                paths: [ 'src' ],
                include: 'all',
                noncmd: true

            },

            cmd: {

                files: {
                    '.build_tmp/kity-non.js': '.build_tmp/**/*.js'
                }

            },

            full: {

                options: {

                    banner: '/*!\n' +
                        ' * ====================================================\n' +
                        ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
                        ' * GitHub: <%= pkg.repository.url %> \n' +
                        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
                        ' * ====================================================\n' +
                        ' */\n\n' +
                        '(function () {\n',

                    footer: '})();'

                },

                files: {
                    'dist/kity.js': [ 'dev-lib/cmd-define.js', '.build_tmp/kity-non.js', 'dev-lib/exports.js' ]
                }

            },

            exports: {

                options: {

                    banner: '/*!\n' +
                        ' * ====================================================\n' +
                        ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
                        ' * GitHub: <%= pkg.repository.url %> \n' +
                        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
                        ' * ====================================================\n' +
                        ' */\n\n' +
                        '(function () {\n',

                    footer: '})();'

                },

                files: {
                    'dist/kity.js': [ 'dist/kity_tmp.js', 'exports.js' ]
                }

            }

        },

        uglify: {

            options: {

                banner: '/*!\n' +
                    ' * ====================================================\n' +
                    ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
                    ' * GitHub: <%= pkg.repository.url %> \n' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
                    ' * ====================================================\n' +
                    ' */\n'

            },

            minimize: {

                files: {
                    'dist/kity.min.js': 'dist/kity.js'
                }

            }

        },

        clean: {

            tmp: [ '.build_tmp' ]

        },

        jasmine: {
            kity: {
                src: ['dev-lib/cmd-define.js', 'dist/kity.min.js'],
                options: {
                    specs: [
                        'spec/core/*',
                        'spec/graphic/*'
                    ],
                    helpers: 'spec/SpecHelper.js',
                    host: 'http://127.0.0.1:7777/'
                }
            }
        },

        connect: {
            kity: {
                options: {
                    hostname: '0.0.0.0',
                    port: 7777,
                    base: '.'
                }
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-module-dependence');

    // Default task.
    grunt.registerTask('default', ['transport:cmd', 'concat:cmd', 'concat:full', 'uglify:minimize', 'clean:tmp']);
    grunt.registerTask('dep', ['dependence', 'concat:exports']);
    grunt.registerTask('test', ['default', 'connect:kity', 'jasmine:kity']);

};
