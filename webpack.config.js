const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title: "Zegar - Praca domowa 3"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([
            { from: 'src/assets', to: 'assets'}
        ])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    isProduction
                    ? MiniCssExtractPlugin.loader
                    : { loader : 'style-loader', options: { sourceMap : true } },
                    { loader : 'css-loader', options: { sourceMap : isProduction } },
                    { loader : 'postcss-loader', options: { sourceMap: isProduction } },
                    { loader : 'sass-loader', options: { sourceMap: isProduction } }

                ]
            }
        ]
    }
};