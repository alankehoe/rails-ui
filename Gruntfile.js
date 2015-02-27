module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        'reporter': require('jshint-stylish'),
        'curly': true,
        'eqeqeq': true,
        'eqnull': true,
        'latedef': true,
        'noempty': true,
        'browser': true,
        'indent': 2,
        'quotmark': 'single',
        'strict': true,
        'undef': true,
        'unused': true,
        'predef': [
          'angular',
          '_',
          'swal'
        ],
        '-W083': true
      },
      src: ['app/assets/javascripts/application/**/*.{js}']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
};