var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

function getExternalModules(exceptions)
{
    let nodeModules = {};

    fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        if(exceptions && exceptions.indexOf(mod) !== -1)
            return;
        nodeModules[mod] = 'commonjs ' + mod;
    });
    return nodeModules;
}

var clientConfig = {
    resolve : {
        extensions: ['', '.ts', '.js', '.json']
    },
    target: 'web',
    module: {
        loaders: [
            {
                test: /\.ts$/, 
                loader: 'ts-loader'
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.json$/, loader: 'json-loader' },
            { 
                test: /\.scss$/, 
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            }        
        ],
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader'
            }
        ]
    },
    plugins: [
       new ExtractTextPlugin("../styles/style.css")
    ],
    externals: getExternalModules(null),
    output: {
         path: './public/scripts',
         filename: 'client.js'
    },
    context: __dirname,
    entry: './client/app',
    devtool: 'source-map'
};

var serverConfig = {
    resolve : {
        extensions: ['', '.ts', '.js', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/, 
                loader: 'ts-loader',
                exclude: /client/
            },
            { test: /\.json$/, loader: 'json-loader' }        
        ],
         preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader'
            }
        ]
    },
    externals: getExternalModules(null),
    output: {
         path: './',
         filename: 'app.js'
    },
    context: __dirname,
    target: 'node',
    entry: './app',
    devtool: 'source-map',
     node: {
        global: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: true,
        fs:true
    },
};

module.exports = [ clientConfig, serverConfig ];