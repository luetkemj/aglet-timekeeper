const webpack = require('webpack');
const BabelEnginePlugin = require('babel-engine-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const path = require('path');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

function makeTemplate(name, obj) {
  const template = {
    alwaysWriteToDisk: true,
    inject: 'body',
    filename: `${name}.html`,
    template: `${srcPath}/${name}.prod.html`,
    hash: 'true',
    cache: 'true',
  };

  return Object.assign({}, template, obj);
}

const cssLoaderConfig = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    modules: true,
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
    minimize: true,
  },
};

const sassLoaderConfig = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
};

const sassLoaders = ExtractTextPlugin.extract({
  use: [cssLoaderConfig, sassLoaderConfig],
});

module.exports = {
  entry: `${srcPath}/index.js`,

  output: {
    filename: 'index.js',
    path: distPath,
    publicPath: '',
  },

  module: {
    rules: [{
      test: /\.js$/,
      include: /(src)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-0', 'react'],
        },
      },
    }, {
      test: /\.svg/,
      use: [{
        loader: 'url-loader',
      }],
    }, {
      test: /(\.scss)$/,
      exclude: /node_modules/,
      use: sassLoaders,
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: {
          loader: 'css-loader',
          options: {
            minimize: true,
          },
        },
      }),
    }],
  },

  plugins: [
    new BabelEnginePlugin({
      presets: ['env'],
    }),
    new HtmlWebpackPlugin(makeTemplate('index')),
    new HtmlWebpackHarddiskPlugin({
      outputPath: distPath,
    }),
    new CopyWebpackPlugin([{
      from: `${srcPath}/assets`,
      to: `${distPath}/assets`,
    }]),
    // Required for React to run in production mode
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: true,
      sourceMap: true,
    }),
    new ExtractTextPlugin('[name].min.css'),
  ],
};
