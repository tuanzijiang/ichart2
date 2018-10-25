const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: path.join(__dirname, '/main.js'),
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'app.[hash].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.less', '.css'],
    alias: {
      services: path.resolve(__dirname, 'app/services'),
      app: path.resolve(__dirname, 'app/'),
    },
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    inline: true,
  },
  module: {
    rules: [{
      test: /(\.jsx|\.js)$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
    }, {
      test: /(\.less|\.css)$/,
      exclude: /node_modules/,
      loaders: ['style-loader', 'css-loader', 'less-loader'],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/app/index.html'),
    }),
  ],
};
