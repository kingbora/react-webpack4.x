/**
 * Created by wenbo.kuang on 2018/9/5
 */
'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const devWebpackConfig = merge(baseConfig, {
    entry: {
        index: ['./src/app.tsx', 'react-hot-loader/patch']
    },
    devtool: 'cheap-module-eval-source-map', //指定加source-map的方式
    devServer: {
        inline:true,//打包后加入一个websocket客户端
        hot:true,//热加载
        contentBase: resolve('static'), //静态文件根目录
        port: 3380, // 端口
        host: 'localhost',
        overlay: true,
        compress: false // 服务器返回浏览器的时候是否启动gzip压缩
    },
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll:1000 //每秒询问的文件变更的次数
    },
    plugins: [
        new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]), // 忽略掉 d.ts 文件，避免因为编译生成 d.ts 文件导致又重新检查。
        new webpack.DllReferencePlugin({
            manifest: resolve('dll/manifest.json')
        }),
        new webpack.HotModuleReplacementPlugin(), //HMR
        new webpack.NamedModulesPlugin() // HMR
    ]
});

module.exports = devWebpackConfig;