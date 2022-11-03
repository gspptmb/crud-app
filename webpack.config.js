'use strict';

module.exports = {
    entry: ['./src/client/index.js'],
    output: {
        path: __dirname,
        filename: './public/bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                ],
            },
        ],
    },
};
