const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const nodeExternal = require('webpack-node-externals')
module.exports = merge(base,{
    target:"node",// 告知webpack，打包出来的文件将在node环境下运行
    mode:"development",
    entry:"./src/server/index.js",
    output:{
        path:path.resolve('build'),
        filename:'server.js'
    },
    externals:[nodeExternal()],
})