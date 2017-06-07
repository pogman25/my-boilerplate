const webpack = require('webpack');
const Merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.config.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = Merge(commonConfig, {
        module: {
            rules: [

                {
                    test: /\.scss$/,  //подключаем стили, при продакшине выгружаем в отдельный файл
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        loader: ['css-loader', 'postcss-loader', 'sass-loader'],
                        publicPath: '/build'
                    })
                }
            ]
        },

        plugins: [

            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: [
                        autoprefixer({          //префиксер для css
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

            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),

            new ExtractTextPlugin({
                filename: "[name].css",
                allChunks: true}),

            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
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
            })
        ]
    });
