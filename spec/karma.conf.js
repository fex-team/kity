// Karma configuration
// Generated on Wed Oct 09 2013 19:20:49 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
//todo 顺序
        '../spec/tools/lib/seajs-2.1.1/sea-debug.js',
        '../src/core/config.js',
        '../src/core/class.js',
        '../src/core/kity.js',
        '../src/core/utils.js',
        '../spec/tools/js/UserAction.js',
        '../spec/karmaConfig.js',
        '../spec/SpecHelper.js',
        '../spec/core/*.js'
        ,'../spec/graphic/*.js'
//        ,'../spec/graphic/ellipse.js'
    ],


    // list of files to exclude
    exclude: [
        'karma.conf.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
//    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
    //coverage
//    reporters: ['progress', 'coverage'],
//    preprocessors: {
//        './src/core/*.js': ['coverage']
//    ,'./src/graphic/*.js': ['coverage']},
//    coverageReporter: {
//          type: 'html',
//          dir: './spec/coverage/'
//    }
//      ,
      reporters: ['progress','dots', 'junit'],
      junitReporter: {
          outputFile: 'test-results.xml'
      }
  });
};
