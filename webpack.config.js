const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require("copy-webpack-plugin");


const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        app: './index.js'
    },
    output: {
        filename: `${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
        // publicPath: path.resolve(__dirname, 'src'),
        // publicPath: path.resolve(__dirname, 'dist'),
        publicPath: ""
    },
    devServer: {
        // historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        // compress: true,
        hot: true,
        port: 8000
    },
    module: {
        rules: [{
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /\.s[ca]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./img/${filename('[ext]')}`
                    }
                }]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./fonts/${filename('[ext]')}`
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            minfy: {
                collapseWhitespace: isProd
            },
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`
        }),
        // new CopyPlugin({
        //     patterns: [{
        //         from: path.resolve(__dirname, "src/assets"),
        //         to: path.resolve(__dirname, "dist/assets")
        //     }],
        // }),
    ]
}