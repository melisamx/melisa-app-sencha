module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: {
            appName: 'Sencha',
            sencha: 'resources/views/sencha/',
            src: 'resources/assets/',
            output: '../../public/<%= pkg.appName.toLowerCase() %>/',
            proyect: {
                name: 'Melisa Sencha',
                version: '1.0.0',
                company: 'Melisa Company'
            }
        },
        uglify: {
            options: {
                report: 'min',
                banner: '/*!\n' + 
                    ' * <%= pkg.proyect.name %>\n' +
                    ' * Copyright (c) 2017 <%= pkg.proyect.company %>\n' +
                    ' * <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %>\n' +
                    ' */\n'
            },
            concat: {
                files: {
                    '<%= pkg.output %>js/melisa-sencha-classic.min.js': [
                        '<%= pkg.sencha %>override/Button.js',
                        '<%= pkg.sencha %>override/form/Panel.js',
                        '<%= pkg.sencha %>override/form/field/Text.js',
                        '<%= pkg.sencha %>override/form/field/ComboBox.js',
                        '<%= pkg.sencha %>util/Format.js',
                        '<%= pkg.sencha %>override/ux/Iframe.js',
                        '<%= pkg.sencha %>core/Logger.js',
                        '<%= pkg.sencha %>ux/Loader.js',
                        '<%= pkg.sencha %>core/Base.js',
                        '<%= pkg.sencha %>core/Menus.js',
                        '<%= pkg.sencha %>core/menus/Tree.js',
                        '<%= pkg.sencha %>core/AutoOpenModule.js',
                        '<%= pkg.sencha %>core/ProfileDesktop.js',
                        '<%= pkg.sencha %>core/ProfilePhone.js',
                        '<%= pkg.sencha %>core/ProfileTablet.js',
                        '<%= pkg.sencha %>core/module/Manager.js',
                        '<%= pkg.sencha %>core/Module.js',
                        '<%= pkg.sencha %>core/ViewController.js',
                        '<%= pkg.sencha %>core/module/Create.js',
                        '<%= pkg.sencha %>core/Application.js',
                        '<%= pkg.sencha %>view/desktop/wrapper/Default.js',
                    ],
                    '<%= pkg.output %>js/melisa-sencha-modern.min.js': [
                        '<%= pkg.sencha %>override/Button.js',
                        '<%= pkg.sencha %>override/form/Panel.js',
                        '<%= pkg.sencha %>override/form/field/Text.js',
                        '<%= pkg.sencha %>override/form/field/ComboBox.js',
                        '<%= pkg.sencha %>util/Format.js',
                        '<%= pkg.sencha %>override/ux/Iframe.js',
                        '<%= pkg.sencha %>override/plugin/PullRefresh.js',
                        '<%= pkg.sencha %>override/plugin/ListPaging.js',
                        '<%= pkg.sencha %>core/Logger.js',
                        '<%= pkg.sencha %>ux/Loader.js',
                        '<%= pkg.sencha %>ux/Navigate.js',
                        '<%= pkg.sencha %>core/Base.js',
                        '<%= pkg.sencha %>core/Menus.js',
                        '<%= pkg.sencha %>core/menus/Tree.js',
                        '<%= pkg.sencha %>core/AutoOpenModule.js',
                        '<%= pkg.sencha %>core/ProfileDesktop.js',
                        '<%= pkg.sencha %>core/ProfilePhone.js',
                        '<%= pkg.sencha %>core/ProfileTablet.js',
                        '<%= pkg.sencha %>core/module/Manager.js',
                        '<%= pkg.sencha %>core/Module.js',
                        '<%= pkg.sencha %>core/ViewController.js',
                        '<%= pkg.sencha %>core/module/Create.js',
                        '<%= pkg.sencha %>core/Application.js',
                        '<%= pkg.sencha %>view/universal/menu/TreeOptionsController.js',
                        '<%= pkg.sencha %>view/universal/menu/TreeOptions.js',                        
                        '<%= pkg.sencha %>view/phone/menu/Avatar.js',
                        '<%= pkg.sencha %>view/phone/menu/Avatars.js',
                        '<%= pkg.sencha %>view/phone/menu/Modal.js',
                        '<%= pkg.sencha %>view/phone/gmd/Card.js',
                        '<%= pkg.sencha %>view/phone/gmd/CardActions.js',
                        '<%= pkg.sencha %>view/phone/gmd/ButtonMedia.js',
                        '<%= pkg.sencha %>view/phone/gmd/ButtonAction.js',
                    ]
                }
            }
        },
        less: {
            options: {
                compress: true
            },
            all: {
                files: {
                    '<%= pkg.output %>css/passwordless-phone.css': '<%= pkg.src %>less/passwordless-phone.less'
                }
            }
        },
        watch: {
            files: ['<%= pkg.src %>less/**/*.less', '<%= pkg.sencha %>**'],
            tasks: ['less', 'uglify']
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', [
        'watch'
    ]);
    
};
