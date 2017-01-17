"use strict";
let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
// const WebpackBrowserPlugin = require('webpack-browser-plugin');
module.exports = {
    devServer: {
        hot: true,
        contentBase: "./build",
        proxy: {
            '/sms-web/*': {
                target: 'http://172.17.122.124:9099',
                changeOrigin: true,
                secure: false
            }
        }
    },
    devtool: "source-map", //生成sourcemap,便于开发调试
    entry: {
        index: "./src/js/index.js",
        about: "./src/js/about.js",
        list: "./src/js/list.js",
        vendors: ['jquery'] //第三方库
    }, //入口文件
    output: {
        path: path.join(__dirname, "build"),
        publicPath: "./",
        filename: "js/[name].[hash].bundle.js",
        chunkFilename: "[id].[hash].bundle.js"
    },
    resolve: {
        extensions: ["", ".js", ".jsx", ".tsx", ".ts"] //resolve.extensions 用于指明程序自动补全识别哪些后缀,
    },
    module: {
        //各种加载器，即让各种文件格式可用require引用
        loaders: [{
                test: /\.css$/,
                exclude: "/node_modules/",
                loader: ExtractTextPlugin.extract("css-loader"),
                publicPath: "../"
            },
            {
                test: /\.scss$/,
                exclude: "/node_modules/",
                loader: ExtractTextPlugin.extract("css!sass")
            },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)/,
                exclude: "/node_modules/",
                loader: 'url-loader?limit=50000$name=[path][name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            },
            except: ['$super', '$', 'exports', 'require'] //排除关键字
        }),
        // new ExtractTextPlugin("styles.css"),
        new ExtractTextPlugin("styles/[name].[hash].css"),
        // new ExtractTextPlugin({
        //     filename: "styles/[name].[hash].css",
        //     			disable: false,
        // 	allChunks: true
        // }),

        new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ "vendors", /* filename= */ "vendors.bundle.js", Infinity),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'pages/index.html',
            template: 'src/pages/index.html',
            chunks: ['index', 'vendors'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'pages/about.html',
            template: 'src/pages/about.html',
            chunks: ['about', 'vendors'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'src/pages/list.html',
            filename: 'pages/list.html',
            chunks: ['list', 'vendors'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        // new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
        // new WebpackBrowserPlugin(),
    ]
};