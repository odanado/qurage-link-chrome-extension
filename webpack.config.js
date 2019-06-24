const path = require("path");

const config = {
  mode: "development",
  devtool: "cheap-module-source-map",
  resolve: {
    extensions: [".ts", ".js"]
  },
  entry: {
    scripts: path.resolve(__dirname, "scripts", "injector.ts"),
    inpage: path.resolve(__dirname, "scripts", "inpage.ts")
  },
  output: {
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.ts?$/, loader: "ts-loader" }
    ]
  }
};

module.exports = config;
