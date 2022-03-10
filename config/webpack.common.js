const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { cacheLoader, cssProcessing, bundleFolder } = require('./utils')

module.exports = {
    entry: {
        app: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, `../${bundleFolder}`),
        globalObject: 'self',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendors',
                    enforce: true
                },
            }
        }
    },
    stats: {
        children: false
    },
    resolve: {
        alias: {
            "_app": path.resolve(__dirname, '../src'),
            "_assets": path.resolve(__dirname, '../src/assets'),
            "_styles": path.resolve(__dirname, '../src/styles'),
        },
        extensions: ['.jsx', '.js', '.tsx', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    { ...cacheLoader() },
                    {
                        loader: 'babel-loader',
                    }
                ],
            },
            cssProcessing({ withModules: false }),
            cssProcessing({ withModules: true }),
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/img'
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                use: [
                    { ...cacheLoader() },
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'assets/fonts'
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/[name].css',
        }),
    ],
    target: 'web',
}
