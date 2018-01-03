/* ============
 * Bootstrap File
 * ============
 *
 * Will configure and bootstrap the application
 */


/* ============
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue'

Vue.config.debug = process.env.NODE_ENV !== 'production'


/* ============
 * Vue Meta
 * ============
 *
 * https://github.com/declandewet/vue-meta
 */
import Meta from 'vue-meta'

Vue.use(Meta)


/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */
import Axios from 'axios'
import VueAxios from 'vue-axios'

Axios.defaults.baseURL = process.env.API_LOCATION
Axios.defaults.headers.common.Accept = 'application/json'

Axios.interceptors.request.use(
    (configuration) => {
        Vue.$Progress.start()
        return configuration
    },
    (error) => {
        Vue.$Progress.fail()
        return Promise.reject(error)
    }
)

Axios.interceptors.response.use(
    (response) => {
        Vue.$Progress.finish()
        return response.data
    },
    (error) => {
        Vue.$Progress.fail()
        return Promise.reject(error)
    }
)

Vue.use(VueAxios, Axios)
// Vue.$http = Axios


/* ============
 * Vuex Router Sync
 * ============
 *
 * Effortlessly keep vue-Router and vuex store in sync.
 *
 * https://github.com/vuejs/vuex-router-sync/blob/master/README.md
 */
// import VuexRouterSync from 'vuex-router-sync'


/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */
import VueRouter from 'vue-router'
import routes from './application/routes'

Vue.use(VueRouter)

export const router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition

        const position = {}
        // new navigation.
        // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position
    },
    mode: 'history',
    routes
})

Vue.router = router


/**
 * Google Tag Manager
 */
import VueGtm from 'vue-gtm'

Vue.use(VueGtm, {
    debug: false, // Whether or not display console logs debugs (optional)
    vueRouter: router, // Pass the router instance to automatically sync with router (optional)
    ignoredViews: ['homepage'] // If router, you can exclude some routes name (case insensitive) (optional)
})


/* ============
 * jQuery
 * ============
 *
 * Require jQuery
 *
 * http://jquery.com/
 */
import jQuery from 'jquery'

global.$ = window.$ = window.jQuery = jQuery


/* ============
 * Highcharts
 * ============
 *
 * Require Highcharts
 *
 * http://highcharts.com/
 */
import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts/highstock'

Vue.use(VueHighcharts, { Highcharts })


/* ============
 * Vue Progress Bar
 * ============
 *
 * A lightweight progress bar for vue
 *
 * https://github.com/hilongjw/vue-progressbar
 */
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
    color: '#74C7A8',
    failedColor: '#FFA2AD',
    thickness: '4px'
})
Vue.$Progress = Vue.prototype.$Progress


/*
 * ============
 * MomentJS
 * ============
 */
global.moment = require('moment')


/* ============
 * Font Awesome
 * ============
 *
 * Require font-awesome
 *
 * http://http://fontawesome.io/
 */
require('font-awesome/css/font-awesome.css')


/*
 * ============
 * VueAnalytics
 * ============
 */
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, { id: 'UA-76851133-2', router })


/* ============
 * Waypoints
 * ============
 *
 * https://www.npmjs.com/package/waypoints
 */
import VueWaypoint from 'vue-waypoint'

// Waypoint plugin
Vue.use(VueWaypoint)


/* ============
 * Intercom
 * ============
 *
 * https://www.npmjs.com/package/vue-intercom
 */
// import VueIntercom from 'vue-intercom'
//
// Vue.use(VueIntercom, { appId: 't45fbomu' })


/**
 * Currency Formatter
 */
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

/* Filters */
Vue.filter('currency', value => formatter.format(value))


/* ============
 * Styling
 * ============
 *
 * Require the application styling.
 *
 * If you don't want to use Scss, that's fine!
 * Replace the scss directory with the CSS preprocessor you want.
 * Require the entry point here & install the webpack loader.
 *
 * It's that easy...
 *
 * http://sass-lang.com/
 */
require('./assets/less/application.less')

export default { router }
