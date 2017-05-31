const webpack = require('webpack');
const Merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.config.common');


module.exports = Merge(commonConfig, {
        devtool: 'cheap-inline-module-source-map',

        module: {
            rules: [

                {
                    test: /\.scss$/,  //подключаем стили, при продакшине выгружаем в отдельный файл
                    use: ['style-loader', 'css-loader', 'sass-loader']
                }
            ]
        },

        devServer: {            //сервер для девелопмента
            contentBase: path.join(__dirname, '/../build'),
            compress: true,
            hot: true,
            port: 9000,
            stats: 'errors-only',
            open: true
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            // enable HMR globally
            new webpack.NamedModulesPlugin(),
        ]
    });
