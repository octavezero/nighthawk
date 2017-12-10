const webpack = require("webpack");
const merge = require('webpack-merge');
const exp = require('./webpack.config.base');

module.exports = merge({
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