const webpack = require('webpack');
const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
        modules: ['node_modules']
    },
    output: {
        path: path.join(__dirname, '../build'),
        filename: path.join('assets', 'js', '[name].[hash:3].js'),
        chunkFilename: '[name].[hash:3].chunk.js',
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.pug$/,  //конвертируем pug в html
                use: 'pug-loader'
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[hash:6].[ext]'
                    }  
                  }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
        ]
    },

    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),  //не менять файлы при ошибке
        new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(ru)$/),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'assets/js/vendor.[hash:3].js',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
    ]
};
