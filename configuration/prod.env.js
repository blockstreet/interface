var env = require('node-env-file')
env('.environment')

module.exports = {
    NODE_ENV: '"production"',
    API_LOCATION: `"${process.env.PROD_API}"`
}
