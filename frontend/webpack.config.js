const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
        extensions: ['.js', '.jsx', '.css']
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
                 use:['style-loader','css-loader', 'sass-loader']
              },
            {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
                limit: 10000,
                name: "/dist/[name].[hash:8].[ext]",
            },
        },
        {
            test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
            loader: require.resolve("file-loader"),
            options: {
                name: "/dist/[name].[hash:8].[ext]",
            },
        }
        ]
    },
    plugins: [
        // Copy all images/files from the assets folder into the dist/assets folder for bundling.
        new CopyWebpackPlugin([
            { from: 'assets/', to: 'assets/'}
        ])
    ]
};

module.exports = config;