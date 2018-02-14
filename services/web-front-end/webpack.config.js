'use strict';
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry:     {
        app: [
            'babel-polyfill',
            './src/main.js'

        ],
        print: './src/print.js',
        upload: ['babel-polyfill','./src/upload.js']
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([ { from: 'src/pages/**/*' , flatten:true} ], {})
    ],
    module: {
        loaders: [{
        // Only run `.js` and `.jsx` files through Babel
            test: /\.js?$/,
            //skip the files in the node_modules directory
            exclude: /node_modules/,
            loader: 'babel-loader',
            // Options to configure the babel. here we have set up the preset. this can be replaced with .babelrc file
            query: {
                presets: ['env']
            }
        }],
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
            ,
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },

        ]
    }
};
