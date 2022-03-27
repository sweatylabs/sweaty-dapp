const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const path = require("path");

module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  entry: './src/lib/index.ts',
  output: {
    filename: 'demo/lib.js',
    path: path.resolve(__dirname, 'build'),
    library: "SweatyDapp",
    libraryTarget: 'umd',
    clean: true
  },
  optimization: {
    minimize: false,
  },
  devServer: {
    hot: true,
    liveReload: true,
    port: 9000,
    static: {
      directory: path.join(__dirname, 'public'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(m|j|t)s$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new NodePolyfillPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  }
};
