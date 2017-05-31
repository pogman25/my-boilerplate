const webpack = require('webpack');

module.exports = function(env) {
    return require(`./config/webpack.config.${env}.js`)
};

/*
 const merge = require('webpack-merge');
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const ExtractTextPlugin = require('extract-text-webpack-plugin');
 const autoprefixer = require('autoprefixer');


 const common = require('./config/webpack.config.common');
 const production = require('./config/webpack.config.prod');
 const development = require('./config/webpack.config.dev');

const isProd = process.env.NODE_ENV === 'production';

const TARGET = process.env.npm_lifecycle_event;

if(TARGET === 'build') {
    module.exports = merge(common, production);
}

if(TARGET === 'start') {
    module.exports = merge(common, development);
}



const cssDev = ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    loader: ['css-loader', 'postcss-loader', 'sass-loader'],
    publicPath: '/build'
});
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {

    entry: {        //две точки входа
        app: './src/app.js',
        index: './src/index.js',
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },

    devtool: isProd ? false : 'cheap-inline-module-source-map',

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
              test: /\.scss$/,  //подключаем стили, при продакшине выгружаем в отдельный файл
              use: cssConfig
          },
          {
              test: /\.(png|jpg|jpeg|svg|gif)$/,   //обработчик изображений
              use: 'file-loader?name=images/[name].[ext]'
          }
      ]
    },

    devServer: {            //сервер для девелопмента
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        hot: true,
        port: 9000,
        stats: 'errors-only',
        open: true
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),  //не менять файлы при ошибке

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

if (isProd) {
    module.exports.plugins.push(
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
    );
}*/
