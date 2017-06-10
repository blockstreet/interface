var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var env = require('node-env-file')
env('.environment')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_LOCATION: `"${process.env.DEV_API}"`
})
