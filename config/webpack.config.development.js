const webpack = require('webpack');
const Merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.config.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = Merge(commonConfig, {
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            path.join(__dirname, '../src', 'index.tsx'),
        ],
        vendor: ['react', 'react-dom']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'react-hot-loader!awesome-typescript-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
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
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, '../build'),
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            filename: '../build/index.html',
            hash: true,
            inject: true,
            template: './src/index.pug',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888,
        })
    ],
    target: 'web',
    stats: false
});
