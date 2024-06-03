var path = require('path');
var webpack = require("webpack");

const TerserWebpackPlugin = require('terser-webpack-plugin');
const production = process.env.NODE_ENV === 'production';
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  // module: {
  //   loaders: [{
  //     test: /.jsx?$/,
  //     loader: 'babel-loader',
  //     exclude: /node_modules/,
  //     query: {
  //       presets: ['es2015', 'react']
  //     }
  //   }]
  
  optimization: {
    minimize: true,
    minimizer: [
      // new TerserWebpackPlugin({
      //   terserOptions: {
      //     ecma: undefined,
      //     warnings: false,
      //     parse: {},
      //     compress: {},
      //     mangle: true,
      //   },
      //   extractComments: false,
      // }),
      new TerserWebpackPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              esModule: false
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            // options: {...}
          }, {
            loader: 'resolve-url-loader',
            // options: {...}
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // <-- !!IMPORTANT!!
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/components/icons', to: 'icons' },
      ],
    }),
  ],
  resolve: {
    extensions: [".", ".js", ".jsx", ".scss"],
    // alias: {
      // '@src': path.resolve(__dirname, 'src'),
    // },
  },
  devServer: {
    port: 3002,
    hot: true
  }
};
