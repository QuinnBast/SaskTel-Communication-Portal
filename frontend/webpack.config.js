const webpack = require('webpack');

const config = {
    entry: {
        "indexPage": __dirname + '/js/index.jsx',
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
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
            },
            // {
            //     test: /\.(css)$/,
            //     use: [{
            //         loader: 'style-loader', //injects CSS into pages
            //     }, {
            //         loader: 'css-loader',   //translates CSS into the javascript bundle
            //     }, {
            //         loader: 'postcss-loader', //Runs post CSS actions
            //         options: {
            //             plugins: function() {
            //                 return [
            //                     require('precss'),
            //                     require('autoprefixer')
            //                 ];
            //             }
            //         }
            //     }, {
            //         loader: 'sass-loader'   //Compiles sass into css to bundle
            //     }]
            // },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            }
        ]
    },
};

module.exports = config;