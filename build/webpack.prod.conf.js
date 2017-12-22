var path = require('path')
var config = require('../configuration')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var PrerenderSpaPlugin = require('prerender-spa-plugin')
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    // devtool: config.build.productionSourceMap ? '#eval' : false,
	devtool: '#eval',
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
		new ProgressBarPlugin(),
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // new webpack.optimize.UglifyJsPlugin({
		// 	parallel: true,
		// 	uglifyOptions: {
		// 		compress: false
		// 	}
        // }),
		new ParallelUglifyPlugin({
		   cacheDir: '.cache/',
		   uglifyJS:{
		     output: {
		       comments: false
		     },
		     compress: {
		       warnings: false
		     }
		   }
	   }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),

        new PrerenderSpaPlugin(
          // Path to compiled app
          path.join(__dirname, '../dist'),
          // List of endpoints you wish to prerender
          [
              '/',
              '/news',
              '/ticker',
              '/education'
          ],
		  {
			captureAfterElementExists: '.content-body',
			maxAttempts: 10,
			navigationLocked: true,
			postProcessHtml: function (context) {
			  var titles = {
			    '/': 'Home',
			    '/about': 'Our Story',
			    '/contact': 'Contact Us'
			  }
			  return context.html.replace(
			    /<title>[^<]*<\/title>/i,
			    '<title>' + titles[context.route] + '</title>'
			  )
			}
		  }
        )
    ]
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

module.exports = webpackConfig
