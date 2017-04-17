const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    loader: ['css-loader', 'sass-loader', 'postcss-loader'],
    publicPath: '/build'
});
const cssConfig = isProd ? cssProd : cssDev;

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
              test: /\.pug$/,
              use: 'pug-loader'
          },
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
              use: cssConfig
          },
          {
              test: /\.(png|jpg|jpeg|svg|gif)$/,
              use: 'file-loader?name=images/[name].[ext]'
          }
      ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        hot: true,
        port: 9000,
        stats: 'errors-only',
        open: true
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
        new ExtractTextPlugin({
            filename: "[name].css",
            disable: !isProd,
            allChunks: true}),
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
            // minify: {
            //     collapseWhitespace: true
            // },
            //filename: './../index.html', //put in root folder
            hash: true,
            excludeChunks: ['app'],
            template: __dirname +'/src/index.pug', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new HtmlWebpackPlugin({
            title: 'Contact Page',
            filename: 'app.html',
            hash: true,
            excludeChunks: ['index'],
            template: './src/app.pug'
        }),
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally
        new webpack.NamedModulesPlugin(),
    ]
};