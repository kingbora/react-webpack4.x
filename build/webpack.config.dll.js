/**
 * Created by wenbo.kuang on 2018/9/5
 */
'use strict';
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空打包目录的插件
const pkg = require("../package.json");
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
/*
* 尽量减少搜索范围
* target: '_dll_[name]'指定导出变量名字
* */
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        vendor: Object.keys(pkg.dependencies)
    },
    output: {
        path: resolve('dll'),
        filename: '[name].[hash].dll.js',
        library: '_dll_[name]' //全局变量名，其他模块会从此变量上获取里面模块
    },
    //manifest是描述文件
    plugins: [
        new CleanWebpackPlugin(['dll'], {
            root: path.join(__dirname, '..'),
            verbose: true,
            dry:  false
        }),
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: resolve('dll/manifest.json'),
            context: path.resolve(__dirname, '../')
        })
    ]
};