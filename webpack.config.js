const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {resolve} = require('path');

require('dotenv').config();
const srcFolder = resolve(__dirname, 'src');

const redirectApiPattern = /(\/api\/\*)\W(http.+)(\/\:splat)\W(\d+)/g;
const API_URL = process.env.API_URL;

module.exports = {
    devtool: 'cheap-module-eval-source-map',
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
        new webpack.EnvironmentPlugin(['API_URL', 'VAPID_PUBLIC']),
        new webpack.ProvidePlugin({
            Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
            fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
        }),
        new CopyWebpackPlugin([{
            from: '_redirects',
            toType: 'file',
            transform:  function(content, path){
                if (path.includes('_redirects')) {
                    const result = content.toString('utf8').replace(redirectApiPattern, `$1 ${API_URL}$3 $4`);
                    console.log('Replace _redirects', result);
                    return result;
                }

                return content;
            }
        }])
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