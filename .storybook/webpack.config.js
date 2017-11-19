const genDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config.js");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (config, env) => {
    const newConfig = genDefaultConfig(config, env);

    newConfig.module.rules.push({
        test: /\.tsx?$/,
        use: ["awesome-typescript-loader"],
        include: [/stories/, /components/]
    });

    newConfig.module.rules.push({
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
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
        })
    });

    newConfig.plugins.push(
        new ExtractTextPlugin({
            filename: "[contenthash].css",
            allChunks: true,
            disable: true
        })
    );

    newConfig.resolve.extensions.push(".tsx");
    newConfig.resolve.extensions.push(".ts");
    newConfig.resolve.extensions.push(".js");
    newConfig.resolve.extensions.push(".scss");

    return newConfig;
};
