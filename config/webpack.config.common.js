const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {        //две точки входа
        app: './src/app.js',
        index: './src/index.js',
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, '/../build')
    },

    module: {
        rules: [
            {
                test: /\.pug$/,  //конвертируем pug в html
                use: 'pug-loader'
            },
            {
                test: /\.(js|jsx)$/,          //подключаем js
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [['es2015', {modules: false}], 'react'],
                        plugins: ['syntax-dynamic-import']        //динамическая подгрузка
                    }
                }]
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,   //обработчик изображений
                use: 'file-loader?name=images/[name].[ext]'
            }
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),  //не менять файлы при ошибке

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


        new HtmlWebpackPlugin({
            title: 'My WebPack',
            // minify: {
            //     collapseWhitespace: true
            // },
            //filename: './../index.html', //put in root folder
            hash: true,
            excludeChunks: ['app'],
            template: './src/index.pug', // Load a custom template (ejs by default see the FAQ for details)
        }),

        new HtmlWebpackPlugin({
            title: 'Contact Page',
            filename: 'app.html',
            hash: true,
            excludeChunks: ['index'],
            template: './src/app.pug'
        })
    ]
};
