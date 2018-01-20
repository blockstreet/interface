import MobileDetect from 'mobile-detect'

const isMobile = !!new MobileDetect(window.navigator.userAgent).mobile()

/**
 * The routes
 *
 * @type {object} The routes
 */

export default [{
    path: '/',
    component: require('layouts/dashboard.vue'),
    redirect: isMobile ? '/ticker' : '/news',
    children: [
        // News
        {
            path: '/news',
            name: 'news.index',
            component: require('pages/news/index.vue')
        },

        // News Singleton
        {
            path: '/news/:slug',
            name: 'news.single',
            component: require('pages/news/single.vue')
        },

        // About Us
        {
            path: '/about',
            name: 'about.index',
            component: require('pages/about/index.vue')
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
                meta: { type: 'index', title: 'Cryptocurrency' },
                children: [{
                    path: 'economics',
                    name: 'education.cryptocurrency.economics',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Economics' }
                }, {
                    path: 'exchanges',
                    name: 'education.cryptocurrency.exchanges',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Exchanges' }
                }, {
                    path: 'initial-coin-offering',
                    name: 'education.cryptocurrency.initial-coin-offering',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Initial Coin Offering' }
                }, {
                    path: 'legality',
                    name: 'education.cryptocurrency.legality',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Legality' }
                }, {
                    path: 'risk',
                    name: 'education.cryptocurrency.risk',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Risk' }
                }]
            }, {
                path: 'blockchain',
                name: 'education.blockchain',
                component: require('pages/education/index.vue'),
                meta: { type: 'index', title: 'Blockchain' },
                children: [{
                    path: 'addresses',
                    name: 'education.blockchain.addresses',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Addresses' }
                }, {
                    path: 'decentralization',
                    name: 'education.blockchain.decentralization',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Decentralization' }
                }, {
                    path: 'digital-signature',
                    name: 'education.blockchain.digital-signature',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Digital Signature' }
                }, {
                    path: 'forking',
                    name: 'education.blockchain.forking',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Forking' }
                }, {
                    path: 'hashing',
                    name: 'education.blockchain.hashing',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Hashing' }
                }, {
                    path: 'immutability',
                    name: 'education.blockchain.immutability',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Immutability' }
                }, {
                    path: 'mining',
                    name: 'education.blockchain.mining',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Mining' }
                }, {
                    path: 'wallets',
                    name: 'education.blockchain.wallets',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Wallets' }
                }, {
                    path: 'use-cases',
                    name: 'education.blockchain.use-cases',
                    component: require('pages/education/index.vue'),
                    meta: { title: 'Use Cases' }
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

// Fallback Routes
}, {
    path: '/',
    redirect: '/home'
}, {
    path: '/*',
    redirect: '/home'
}]
