const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isBuild = !isDev;

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: "all"
		}
	}
	if (isBuild){
		config.minimizer = [
			new OptimizeCSSAssetsWebpackPlugin(),
			new TerserWebpackPlugin({parallel: true})
		];
		config.minimize = true;
	}
	return config;
}

const cssPreprocessing = (preprocessor) => {
	const stylesCompilation = [MiniCSSExtractPlugin.loader, "css-loader"];
	preprocessor && stylesCompilation.push(preprocessor);
	return stylesCompilation;
}

const babel = preset => {
	const options = {
		presets : ["@babel/preset-env"],
		plugins: ["@babel/plugin-proposal-class-properties"]
	}
	preset && options.presets.push(preset);
	return options;
}

module.exports = {
	mode: "development",
	entry: {
		main: [
			// "@babel/polyfill",
		 "./src/main.js"
		],
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "./dist"),
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/modules"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@pics": path.resolve(__dirname, "./src/assets/pics"),
			"@fonts": path.resolve(__dirname, "./src/assets/fonts"),
			"@icons": path.resolve(__dirname, "./src/assets/icons"),
			"@auxs": path.resolve(__dirname, "./src/assets/auxs"),
			"@css": path.resolve(__dirname, "./src/assets/css"),
			"@scss": path.resolve(__dirname, "./src/assets/scss"),
			"@less": path.resolve(__dirname, "./src/assets/less"),
			"@stylus": path.resolve(__dirname, "./src/assets/stylus"),
		}
	},
	optimization: optimization(),
	devServer: {
		port: 3500,
		hot: isDev
	},
	plugins: [
		new HTMLWebpackPlugin({
				template: "./src/index.html",
				minify: {
					removeTagWhitespace: isBuild,
					collapseWhitespace: isBuild,
					removeComments: isBuild,
					removeEmptyAttributes: isBuild,
				}
					}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
						patterns: [
							{
								from: path.resolve(__dirname, "src/assets/icons/fav.png"),
								to: path.resolve(__dirname, "dist/assets")
							}
						],
					}),
		new MiniCSSExtractPlugin({
			filename: "app.[contenthash].css"
		})

	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssPreprocessing()
			},
			{
				test: /\.less$/,
				use: cssPreprocessing("less-loader")
			},
			{
				test: /\.s[ac]ss$/,
				use: cssPreprocessing("sass-loader")
			},
			{
				test: /\.styl$/,
				use: cssPreprocessing("stylus-loader")	
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
				use: ["file-loader"]
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ["file-loader"]
			},
			{
				test: /\.xml$/,
				use: ["xml-loader"]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {loader: "babel-loader", options: babel()}
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {loader: "babel-loader", options: babel("@babel/preset-typescript")}
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {loader: "babel-loader", options: babel("@babel/preset-react")}
			}
		]	
	}
}