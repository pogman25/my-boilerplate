const cssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');
const csso = require("postcss-csso");

module.exports = {
    plugins: [
        cssnext({
            browsers: ['last 3 versions', 'IE > 10'],
        }),
        postcssReporter({
            clearMessages: true,
        }),
        csso
    ]
};
