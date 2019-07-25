const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
    devtool: "cheap-module-source-map",
    entry: [
        "./example/index"
    ],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "example/index.html"
        })
    ],
    devServer: {
        stats: "minimal",
        overlay: true,
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: false
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader", "eslint-loader"]
          },
          {
            test: /\.(css|scss|sass)$/,
            use: ["style-loader", "css-loader", "sass-loader"]
          },
        ]
    }
}