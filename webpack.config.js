const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    extensions: ['.js', '.json', '.scss', '.css'],
    alias: {
      services: path.resolve(__dirname, 'app/services'),
      app: path.resolve(__dirname, 'app/'),
      ui: path.resolve(__dirname, 'app/base/ui'),
      tools: path.resolve(__dirname, 'app/base/tools'),
      public: path.resolve(__dirname, 'app/public'),
    },
  },
  devServer: {
    contentBase: './app',
    historyApiFallback: true,
    inline: true,
  },
  module: {
    rules: [{
      test: /(\.jsx|\.js)$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
    }, {
      test: /(\.scss|\.css)$/,
      exclude: /node_modules/,
      loaders: ['style-loader', 'css-loader', {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: [path.resolve(__dirname, 'app/base/scss/')],
        },
      }],
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 3000,
        name: 'public/img/[name].[hash].[ext]',
      },
    }],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/app/index.html'),
    }),
    new CopyWebpackPlugin([{
      from: './app/public/iconfont.js',
      to: './public/[name].[ext]',
    }, {
      from: './app/public/img/*',
      to: './public/img/[name].[ext]',
    }]),
  ],
};
