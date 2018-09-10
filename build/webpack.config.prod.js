/**
 * Created by wenbo.kuang on 2018/9/5
 */
'use strict';
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空打包目录的插件
const WebpackParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const baseConfig = require('./webpack.config.base');

const prodWebpackConfig = merge(baseConfig, {
    entry: {
        index: './src/app.tsx'
    },
    plugins: [
        new CleanWebpackPlugin(['www'], {
            root: path.join(__dirname, '..'),
            verbose: true,
            dry:  false
        }),
        new OptimizeCssPlugin({
            cssProcessorOptions: {
                parser: require('postcss-safe-parser')
            }
        }),
        //用于css的tree-shaking，消除冗余css代码
        new PurifyCSSPlugin({
            // glob为扫描模块，使用其同步方法（请谨慎使用异步方法）
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),
        //用于js的tree-shaking，消除冗余js代码
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false //不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        })
    ]
});

module.exports = prodWebpackConfig;