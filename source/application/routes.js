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
                name: 'education',
                component: require('pages/education/index.vue'),
                meta: { type: 'index' },
                children: [{
                    path: 'cryptocurrency',
                    name: 'education.cryptocurrency',
                    component: require('pages/education/index.vue'),
                    meta: { type: 'index' },
                    children: [{
                        path: 'economics',
                        name: 'education.cryptocurrency.economics',
                        component: require('pages/education/index.vue')
                    }, {
                        path: 'exchanges',
                        name: 'education.cryptocurrency.exchanges',
                        component: require('pages/education/index.vue')
                    }, {
                        path: 'initial-coin-offering',
                        name: 'education.cryptocurrency.initial-coin-offering',
                        component: require('pages/education/index.vue')
                    }, {
                        path: 'legality',
                        name: 'education.cryptocurrency.legality',
                        component: require('pages/education/index.vue')
                    }]
                }, {
                    path: 'blockchain',
                    name: 'education.blockchain',
                    component: require('pages/education/index.vue'),
                    meta: { type: 'index' },
                    children: [{
                        path: 'addresses',
                        name: 'education.blockchain.addresses',
                        component: require('pages/education/index.vue')
                    }, {
                        path: 'decentralization',
                        name: 'education.blockchain.decentralization',
                        component: require('pages/education/index.vue')
                    }, {
                        path: 'digital-signature',
                        name: 'education.blockchain.digital-signature',
                        component: require('pages/education/index.vue')
                    }, {
                        path: 'forking',
                        name: 'education.blockchain.forking',
                        component: require('pages/education/index.vue')
                    }, {
                        path: 'hashing',
                        name: 'education.blockchain.hashing',
                        component: require('pages/education/index.vue')
                    }, {
                        path: 'immutability',
                        name: 'education.blockchain.immutability',
                        component: require('pages/education/index.vue')
                    }, {
                        path: 'mining',
                        name: 'education.blockchain.mining',
                        component: require('pages/education/index.vue')
                    }]
                }]
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
