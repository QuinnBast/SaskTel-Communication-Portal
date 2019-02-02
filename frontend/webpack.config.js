const webpack = require('webpack');
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
              }
        ]
    },
};

module.exports = config;