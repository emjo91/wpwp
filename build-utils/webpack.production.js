const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = () => ({
	output: {
		filename: './assets/dist/scripts/app.min.js'
	}, //end output
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['babel-preset-env']
					}
				}
			}
		]
	},
	plugins: [
        new CleanWebpackPlugin(['./assets/dist/scripts/*','./assets/dist/styles/*'])
	], //end plugins
	optimization: {
		minimizer: [
			new UglifyJSPlugin({
				cache: true,
				parallel: true
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	} //end opt
});