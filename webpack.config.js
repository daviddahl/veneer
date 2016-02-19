var path = require('path');

module.exports = {
  entry: {
    src: "./src/index.js",
    // test: "./test/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel" },
    ]
  }
};

