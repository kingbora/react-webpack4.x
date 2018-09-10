/**
 * Created by wenbo.kuang on 2018/9/5
 */
'use strict';
const path = require("path");
const os = require("os");
const HappyPack = require("happypack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html的插件
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'); //配合html-webpack-plugin插入需要的css文件或js文件到生成的html中

const happyThreadPool = HappyPack.ThreadPool( { size: os.cpus().length } );

const isDebug = process.env.NODE_ENV === "development";

function assetsPath(_path_) {
    return path.posix.join('static', _path_)
}

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    output: {
        path: resolve('www'), //打包后的输出目录，必须是绝对路径
        filename: 'scripts/[name].[hash].js', //打包后的文件名称
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.css', '.ts', '.tsx', '.json', '.scss'],
        alias: {} //配置别名可以加快webpack查找模块的速度
    },
    module: {
        //多个loader是有顺序要求的，从右往左写，因为转换时是从从右往左转换的
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                loader: 'happypack/loader?id=happy-pack-css',
                include: [resolve('src')], //限制范围，提高打包速度
                exclude: /node_modules/ //排除不处理的目录，提高打包速度
            },
            {
                test: /\.jsx?$/,
                loader: 'happypack/loader?id=happy-pack-js',
                include: [resolve('src')],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: 'happypack/loader?id=happy-pack-ts',
                include: [resolve('src')],
                exclude: /node_modules/
            },
            { //file-loader 解决css等文件中引入图片路径的问题
                // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: assetsPath('images/[name].[hash:7].[ext]'), // 图片输出的路径
                        limit: 1024
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    optimization: { //webpack4.x的最新优化配置项，用于提取公共代码
        splitChunks: {
            chunks: "all",
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                commons: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        // 多入口的html文件用chunks这个参数来区分
        new HtmlWebpackPlugin({
            template: resolve('src/index.html'),
            filename:'index.html',
            chunks:['index', 'common'],
            hash:true,//防止缓存
            minify:{
                collapseWhitespace:true, //去除多余空格
                removeAttributeQuotes:true//压缩 去掉引号
            }
        }),
        new AddAssetHtmlPlugin({
            filepath: resolve("dll/*.js"),
            outputPath: 'scripts',
            publicPath: 'scripts',
            includeSourcemap: false
        }),
        /*
         * cacheDirectory用来缓存loader的执行结果，减少webpack构建时babel重新编译过程。
         * 默认使用缓存目录(node_modules/.cache/babel-loader)，如果未找到根目录下的node_module，将降级回退到操作系统默认的临时文件目录
         * */
        new HappyPack({
            id: 'happy-pack-ts',
            loaders: [
                'babel-loader?cacheDirectory=true',
                {
                    loader: 'ts-loader',
                    query: {
                        happyPackMode: true
                    }
                }
            ],
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true
        }),
        new HappyPack({
            id: 'happy-pack-js',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true
        }),
        new HappyPack({
            id: 'happy-pack-css',
            loaders: [
                isDebug ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        sourceMap: true,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                }, {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true
                    }
                },{
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }],
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true
        }),
        new MiniCssExtractPlugin({
            filename: isDebug ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: isDebug ? 'css/[id].css' : 'css/[name].[hash].css'
        })
    ]
};