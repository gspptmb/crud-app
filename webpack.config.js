module.exports = {
    entry: ['./src/client/index.js'],
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    context: __dirname,
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      ]
    }
  }