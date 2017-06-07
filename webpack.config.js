const webpack = require('webpack');

module.exports = function(env) {
    return require(`./config/webpack.config.${env}.js`)
};