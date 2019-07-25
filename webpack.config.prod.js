const path = require("path");

process.env.NODE_ENV = "production";

module.exports = {
    devtool: "cheap-module-source-map",
    entry: [
        "./src/index"
    ],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "ip-input.js",
        library: "ip-input",
        libraryTarget: 'umd',
        umdNamedDefine: true
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
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    }
}