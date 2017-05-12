/**
 * The routes
 *
 * @type {object} The routes
 */
export default [
    // Dashboard View
    {
        path: '/',
        component: require('layouts/dashboard.vue'),
        redirect: '/news',
        children: [
            // Home
            {
                path: '/news',
                name: 'home.index',
                component: require('pages/news/index.vue')
            },

            // News
            {
                path: '/news/:id',
                name: 'news.singleton',
                component: require('pages/news/singleton.vue')
            },

            // Ticker
            {
                path: '/ticker',
                name: 'ticker.index',
                component: require('pages/ticker/index.vue')
            },

            // Education
            {
                path: '/education',
                name: 'education.index',
                component: require('pages/education/index.vue')
            },

            // ICO's
            {
                path: '/ico',
                name: 'ico.index',
                component: require('pages/ico/index.vue')
            }
        ]
    },

    // Fallback Routes
    {
        path: '/',
        redirect: '/home'
    }, {
        path: '/*',
        redirect: '/home'
    }
]
