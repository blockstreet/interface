var path = require('path')
var config = require('../configuration')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
    // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
    // various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

const HappyPack = require('happypack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: './source/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
	plugins: [
        new HappyPack({
            id: '1',
            threads: 4,
            loaders: ['babel-loader', 'eslint-loader']
        }),
    ],
    resolve: {
		modules: [
            path.join(__dirname, 'source'),
            'node_modules'
        ],
        extensions: ['.js', '.vue'],
        alias: {
            'source': path.resolve(__dirname, '../source'),
            'app': path.resolve(__dirname, '../source/application'),
            'assets': path.resolve(__dirname, '../source/assets'),
            'static': path.resolve(__dirname, '../static'),
            'components': path.resolve(__dirname, '../source/application/components'),
            'layouts': path.resolve(__dirname, '../source/application/layouts'),
            'locale': path.resolve(__dirname, '../source/application/locale'),
            'mixins': path.resolve(__dirname, '../source/application/mixins'),
            'pages': path.resolve(__dirname, '../source/application/pages'),
            'services': path.resolve(__dirname, '../source/application/services'),
            'store': path.resolve(__dirname, '../source/application/store'),
            'transformers': path.resolve(__dirname, '../source/application/transformers'),
            'utilities': path.resolve(__dirname, '../source/application/utilities')
        }
    },
    module: {
		rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                },
                include: projectRoot,
                exclude: /node_modules/
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
            }, {
                test: /\.html$/,
                loader: 'vue-html-loader'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /[\.](le|sc|c)ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:['css-loader', 'less-loader']
				})
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
