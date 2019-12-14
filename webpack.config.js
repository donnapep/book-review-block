const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config.js' );
const path = require( 'path' );
const IgnoreEmitPlugin = require( 'ignore-emit-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const TerserJSPlugin = require( 'terser-webpack-plugin' );

const production = process.env.NODE_ENV === '';

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve( process.cwd(), 'src/', 'index.js' ),
		// TODO: This will need to be changed when another block is added.
		style: path.resolve( process.cwd(), 'src/blocks/book-review/', 'style.scss' ),
		editor: path.resolve( process.cwd(), 'src/blocks/book-review/', 'editor.scss' ),
	},
	optimization: {
		...defaultConfig.optimization,
		minimizer: [ new TerserJSPlugin( {} ), new OptimizeCSSAssetsPlugin( {} ) ],
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, // Extract CSS into separate files.
					'css-loader', // Required by MiniCssExtractPlugin.
					{
						loader: 'postcss-loader', // Apply vendor prefixes
						options: {
							plugins: [
								require( 'autoprefixer' ),
							],
						},
					},
					{
						loader: 'sass-loader', // Compile Sass to CSS
						query: {
							sassOptions: {
								outputStyle: production ? 'compressed' : 'nested',
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		...defaultConfig.plugins,
		new MiniCssExtractPlugin( {
			filename: '[name].css',
		} ),
		new IgnoreEmitPlugin( [
			'editor.asset.php',
			'editor.js',
			'index.css',
			'style.asset.php',
			'style.js',
		] ),
	],
	resolve: {
		...defaultConfig.resolve,
		extensions: ['.js', '.jsx']
	}
};
