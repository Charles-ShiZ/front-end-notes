const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
  	entry: './src/index.js',
  	output: {
    	filename: 'bundle.[chunkhash:8].js',
    	path: path.resolve(__dirname, 'dist'),
    	clean: true
  	},
  	devServer: {
    	contentBase: './dist',
    	hot: true,
		port: '8082'
  	},
	devtool: 'source-map',
  	module: {
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
			  test: /\.(woff|woff2|eot|ttf|otf)$/i,
			  type: 'asset/resource',
			}
		]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Get Started',
      filename: "index.html",
      template: "./index.html"
    })
  ]
}