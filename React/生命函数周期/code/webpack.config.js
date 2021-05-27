const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: '3000'
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将css包装成style元素插入html文件
          "style-loader",
          // 将css转化为js代码
          "css-loader",
          // 解析sass为css
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins:[
    new HtmlWebPackPlugin({
      title: 'Get Started',
      filename: "index.html",
      template: "./index.html"
    })
  ]
};