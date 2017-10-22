const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {resolve} = require('path');

require('dotenv').config();
const srcFolder = resolve(__dirname, 'src');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    // entry: [ resolve(srcFolder, 'index.jsx'), resolve(srcFolder, 'sw.js') ],
    entry: {
        main: resolve(srcFolder, 'index.jsx'),
        vendor: ['react', 'react-dom', 'jquery', 'semantic-ui-css'],
        sw: resolve(srcFolder, 'sw.js'),
    },
    output: {
        path: resolve('dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({template: resolve(srcFolder, 'index.tpl.html')}),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new webpack.EnvironmentPlugin(['WEBHOOK_URL', 'VAPID_PUBLIC']),
        new webpack.ProvidePlugin({
            Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
            fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
        }),
        new CopyWebpackPlugin([
            { from: '_redirects' }
        ])
    ],
    module: {
        rules: [{
            test: /\.(html)$/,
            use: {loader: 'file-loader'},
            exclude: [resolve(srcFolder, 'index.tpl.html')],
        }, {
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader',
                query: { cacheDirectory: true }, // important for performance
            },
            include: [srcFolder ], // important for performance!
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
        }, {
            test: /\.(eot|woff|woff2|ttf)$/,
            use: {loader: 'file-loader'},
        }, {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: {loader: 'file-loader'},
        }],
    },
    devServer: {
        contentBase: './dist',
        proxy: {
            '/api/**': {
                target: `http://localhost:8081`,
                pathRewrite: { '^/api': '' },
            },
        },
    },
};