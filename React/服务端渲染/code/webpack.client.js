const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
    mode:"development",
    entry:"./src/index.js",
    output:{
        path: path.resolve('build'),
        filename: 'client.js'
    }
})