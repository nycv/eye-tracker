module.exports = {
  entry: ['@babel/polyfill', `${__dirname}/src/index.js`],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'dist.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [require('@babel/preset-env'), '@babel/preset-react'],
            plugins: [
              require('@babel/plugin-proposal-object-rest-spread'),
              require('@babel/plugin-proposal-class-properties'),
              require('@babel/plugin-transform-regenerator')
            ]
          }
        }
      }
    ]
  }

}

