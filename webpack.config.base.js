const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let main = { 
	entry: [
		'./src/main/index.ts'
	],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'main.js',
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",
	target: "electron-main",

	node: {
		__dirname: false,
		__filename: false
	},

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
	},

	module: {
		rules: [
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.(jpg|png|svg|ico)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
				},
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
				},
			}
		]
	},
};

let renderer = {
	entry: [
		'./src/renderer/index.tsx'
	],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'renderer.js',
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",
	target: "electron-renderer",

	node: {
		__dirname: false,
		__filename: false
	},

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
	},

	
	plugins: [
		new HtmlWebpackPlugin({
			chunksSortMode: 'dependency',
			template: path.resolve(__dirname, './src/renderer/index.html')
		}),
	],

	module: {
		rules: [
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.(jpg|png|svg|ico)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
				},
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
				},
			}
		]
	},
};

module.exports = [main, renderer];