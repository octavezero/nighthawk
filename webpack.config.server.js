const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const exp = require('./webpack.config.base');

module.exports = merge({
	entry: [
		"react-hot-loader/patch",

		'webpack-dev-server/client?http://localhost:3000',
		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint
	
		'webpack/hot/only-dev-server',
		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates
	],

	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],

	devtool: "inline-source-map",

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loaders: [
					"react-hot-loader/webpack",
					"ts-loader"
				],
			},
			// This will cause the compiled CSS (and sourceMap) to be
			// embedded within the compiled javascript bundle and added
			// as a blob:// uri at runtime.
			{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
			}
		]
	},

	devServer: {
		host: 'localhost',
		port: 3000,
	
		historyApiFallback: true,
		// respond to 404s with index.html
	
		hot: true,
		// enable HMR on the server
	  },	
}, exp[1]);