const webpack = require('webpack');
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Merge(commonConfig, {
        entry: {        
            main: './src/index.tsx'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.scss$/,  //подключаем стили, при продакшине выгружаем в отдельный файл
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: 'css-loader',
                                query: {
                                    localIdentName: '[hash:base64:6]',
                                    modules: true,
                                }
                            },
                            {
                                loader: 'postcss-loader'
                            },
                            {
                                loader: 'sass-loader'
                            }
                        ]
                    })

                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ['css-loader','postcss-loader']
                    }),
                    include: /node_modules/,
                }
            ]
        },

        plugins: [
            
            new ExtractTextPlugin({
                filename:  getPath => getPath('assets/css/[name][hash:5].css'),
                allChunks: true
            }),

            new HtmlWebpackPlugin({
                title: 'My WebPack',
                minify: {
                    collapseWhitespace: true
                },
                filename: '../build/index.html',
                hash: true,
                inject: true,
                template: './src/index.pug',
            }),

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
