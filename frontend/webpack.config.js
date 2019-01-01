const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const config = {
    entry: {
        "indexPage": __dirname + '/js/App.jsx',
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        alias: {
            '../../theme.config$': path.join(__dirname, 'css/theme.config')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loaders: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env',
                        '@babel/react',{'plugins': ['@babel/plugin-proposal-class-properties']}
                    ]
                }
            },
            {
                test:/\.(s*)css$/,
                use:['css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use     : [ MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'less-loader']
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve("url-loader"),
                options: {
                    limit: 10000,
                    name: "../dist/images/[name].[ext]",
                },
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
                options: {
                    mimetype: "application/font-woff",
                    limit: 10000,
                    name: "../dist/fonts/[name].[ext]",
                },
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader",
                options: {
                    limit: 10000,
                    name: "../dist/fonts/[name].[ext]",
                },
            }
        ]
    },
    plugins: [
        // Copy all images/files from the assets folder into the dist/assets folder for bundling.
        new CopyWebpackPlugin([
            { from: 'assets/', to: 'assets/'}
        ]),
        new MiniCssExtractPlugin()
    ]
};

module.exports = config;