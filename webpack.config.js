"use strict";
let webpack = require('webpack');
let path = require('path');
// let HtmlWebpackPlugin = require('html-webpack-plugin');
// let ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackBrowserPlugin = require('webpack-browser-plugin');
module.exports = {
    devtool: 'cheap-source-map',
    devServer: {
        hot: true,
        inline: true,
        contentBase: "./src",
        port: 3001,
        proxy: {
            '/sms-web/*': {
                target: 'http://localhost:9099',
                changeOrigin: true,
                secure: false
            }
        }
    },
    // devtool: "source-map",    //生成sourcemap,便于开发调试
    entry: {
        index: "./src/js/index.js",
        about: "./src/js/about.js",
        list: "./src/js/list.js",
        vendors: ['jquery'] //第三方库
    }, //入口文件
    output: {
        path: path.join(__dirname, "src"),
        publicPath: "",
        filename: "[name].bundle.js",
        chunkFilename: "[id].[hash].bundle.js"
    },
    resolve: {
        extensions: ["", ".js", ".jsx", ".tsx", ".ts"], //resolve.extensions 用于指明程序自动补全识别哪些后缀,
        // alias: {
        //     jquery: "jquery/src/jquery"
        // }
    },
    module: {
        //各种加载器，即让各种文件格式可用require引用
        loaders: [{
            test: /\.css$/,
            exclude: "/node_modules/",
            // loader: ExtractTextPlugin.extract("css-loader")
            loader: "style-loader!css-loader"
        }, {
            test: /\.scss$/,
            loader: "style!css!sass"
        }, {
            test: /\.(png|jpg|woff|woff2|eot|ttf|svg)/,
            loader: 'url-loader?limit=40000'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new WebpackBrowserPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
    ]
};