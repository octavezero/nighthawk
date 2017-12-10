const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const exp = require('./webpack.config.base');

let prodMain = merge({
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
			{
				test: /\.tsx?$/,
				loaders: [
					"ts-loader"
				],
			},
		]
	},
}, exp[0]);


let prodRenderer = merge({
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loaders: [
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
}, exp[1]);

module.exports = [prodMain, prodRenderer];