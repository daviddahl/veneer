var path = require('path');

module.exports = {
  entry: {
    test: "./test/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "test-bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel" },
    ]
  }
};

