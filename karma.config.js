var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['Firefox'],
    // browsers: ['PhantomJS'],
    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.' },
      ],
    },
    jsonFixturesPreprocessor: {
      variableName: '__json__'
    },
    pluguins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-fixture',
      'karma-html2js-preprocessor',
      'karma-json-fixtures-preprocessor',
    ],
    files: [
      'tests.webpack.js',
      { pattern: 'spec/fixtures/index.html'}
    ],
    frameworks: [
      'jasmine',
      'fixture'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
      'spec/fixtures/index.html': ['html2js'],
      'spec/fixtures/index.json': ['json_fixtures']
    },
    reporters: ['progress', 'coverage'],
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      module: {
        preLoaders: [
          {
            test: /-test\.js$/,
            include: /src/,
            exclude: /(bower_components|node_modules)/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.js?$/,
            include: /src/,
            exclude: /(node_modules|bower_components|__tests__)/,
            loader: 'babel-istanbul',
            query: {
              cacheDirectory: true,
            },
          },
        ],
        loaders: [
          {
            test: /\.js$/,
            include: path.resolve(__dirname, '../src'),
            exclude: /(bower_components|node_modules|__tests__)/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
            },
          },
        ],
      },
    },
  });
};
