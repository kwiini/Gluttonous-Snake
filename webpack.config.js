const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 写入 webpack 的所有配置信息
module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",
    // 指定打包文件所在位置
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件
        filename: 'bundle.js',
        // 不使用 箭头函数
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    // 指定 webpack 打包时使用的模块
    module: {
        // 指定要 load 的 rule
        rules: [
            {
                // test 指定规则生效的文件
                test: /\.ts$/,
                // 要使用的 loader
                use: [
                    // 配置 babel
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        // 设置 babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            'chrome': "127",
                                            'ie': '11'
                                        },
                                        // 指定 core-js 的版本
                                        "corejs": "3",
                                        // 使用 corejs 的方式
                                        "useBuiltIns": "usage" // 表示按需加载
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node-module/
            },
            // 设置 less 文件的处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    // 配置 webpack 插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "这是一个自定义的 title"
            template: "./src/index.html"
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
};