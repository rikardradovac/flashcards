const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./app/src/index.jsx",
    output: {
        path: path.resolve(__dirname, "app/dist"),
        filename: "bundle.js",
        publicPath: '/'
    },
    resolve: {
        fallback: {
          "crypto": require.resolve("crypto-browserify"),
          "buffer": require.resolve("buffer/"),
          "path": require.resolve("path-browserify"),
          "stream": require.resolve("stream-browserify")
        }
    },

    devServer: {
        historyApiFallback: true,
    },
    
    module: {
        rules: [
            // loads .js/jsx/json files
            {
                test: /\.(js|jsx)$/,
                include: [path.resolve(__dirname, "app/")],
                loader: "babel-loader",
                exclude: '/node_modules/',
                resolve: {
                    extensions: [".js", ".jsx", ".json"]
                }
            },
            {
                // loads .html files
                test: /\.(html)$/,
                include: [path.resolve(__dirname, "app/")],
                use: {
                    loader: "html-loader"
                }
            },
            {
                // loads .css files
                test: /\.css$/,
                include: [path.resolve(__dirname, "app/")],
                use: [                    
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "app/src/index.html"),
            filename: "index.html"
        })
    ]
};