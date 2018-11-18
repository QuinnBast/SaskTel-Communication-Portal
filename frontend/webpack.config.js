const webpack = require('webpack');

const config = {
    entry: {
        "indexPage": __dirname + '/js/index.jsx',
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
            //{
            //     test: /\.(css)$/,
            //     use: [{
            //         loader: 'style-loader', //injects CSS into pages
            //     }, {
            //         loader: 'css-loader',   //translates CSS into the javascript bundle
            //     },
            //         {
            //         loader: 'postcss-loader', //Runs post CSS actions
            //         options: {
            //             plugins: function() {
            //                 return [
            //                     require('precss'),
            //                     require('autoprefixer')
            //                 ];
            //             }
            //         }
            //     },
            //         {
            //         loader: 'sass-loader'   //Compiles scss into css to bundle
            //     }]
            // },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            }
        ]
    },
    devServer: {
    historyApiFallback: true,
  },
};

module.exports = config;