var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {

    entry: {
        app: './src/app.js',
        index: './src/index.js',
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },

    module: {
      rules: [
          {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: [{
              loader: 'babel-loader',
              options: {
                  presets: [['es2015', {modules: false}], 'react'],
                  plugins: ['syntax-dynamic-import']
              }
            }]
          },
          {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                  use: ['css-loader', 'sass-loader', 'postcss-loader']
              })
          }
      ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                        autoprefixer({
                            browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9', // React doesn't support IE8 anyway
                            ]
                        })
                ]
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // Specify the common bundle's name.
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest', // Specify the common bundle's name.
        }),
        new ExtractTextPlugin({filename: "[name].css", allChunks: true}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // React doesn't support IE8
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'My WebPack',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: __dirname +'/src/my-index.html', // Load a custom template (ejs by default see the FAQ for details)
        })
    ]
};