const path = require('path')
const merge = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { eslintProcessing, bundleFolder } = require('./utils')

const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, `../${bundleFolder}`),
        open: true,
        hot: true,
    },
    plugins: eslintProcessing(
        [
            new HtmlWebpackPlugin({
                title: 'Develope mode',
                filename: 'index.html',
                template: path.resolve(__dirname, './index.html'),
                minify: false,
                hash: false,
            }),
            new DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
            }),
        ]
    )
})
