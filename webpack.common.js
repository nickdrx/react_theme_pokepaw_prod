const path = require("path")

module.exports = {
  entry: {
    'pokepaw_konfigurator_ungezeichnet': "./scripts/pokepaw_konfigurator_ungezeichnet.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "assets")
  }
}