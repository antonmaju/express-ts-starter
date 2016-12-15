let WebpackStripLoader = require("strip-loader");

let devConfig = require("./webpack.config.ts");

let stripLoader = {
    test: [/\.ts$/, /\.js$/],
    exclude: /node_modules/,
    loader: WebpackStripLoader.loader("console.log")
}

/**add strip loader to client config (index 0)*/
devConfig[0].module.loaders.push(stripLoader);

module.exports = devConfig;