const webpack = require('webpack');
const Merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.config.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = Merge(commonConfig, {
        devtool: 'cheap-inline-module-source-map',

        module: {
            rules: [

                {
                    test: /\.scss$/,  //подключаем стили, при продакшине выгружаем в отдельный файл
                    exclude: /node_modules/,
                    use: [
                        "style-loader",
                        {
                            loader: 'css-loader',
                            query: {
                                localIdentName: '[local]__[path]__[hash:base64:3]',
                                modules: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader', options: { sourceMap: true }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader',
                    include: /node_modules/,
                },
            ]
        },

        devServer: {            //сервер для девелопмента
            contentBase: path.join(__dirname, '/../build'),
            compress: true,
            hot: true,
            historyApiFallback: true,
            port: 9000,
            stats: 'errors-only',
            open: true
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            // enable HMR globally
            new webpack.NamedModulesPlugin(),
            new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                analyzerHost: '127.0.0.1',
                analyzerPort: 8888,
            }),

        ]
    });
