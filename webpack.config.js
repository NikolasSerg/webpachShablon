const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const filename = (ext) => isDev ? `[name].${ext}`: `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        app: './index.js'
    },
    output: {
        filename: `${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8000
    },
    module: {
        rules: [
            {
              test: /\.css$/i,
              use: [
                MiniCssExtractPlugin.loader,  
                'css-loader'],
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
                test:/\.(png|jpg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    publicPath: 'assets'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            minfy: {
                collapseWhitespace: isProd
            },
            template: '/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `${filename('css')}`
        })
    ]
} 