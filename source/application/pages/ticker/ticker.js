import Vue from 'vue'
import utility from 'utilities'
import moment from 'moment'

export default {
    components: {
        'price-history-chart': require('components/price-history-chart.vue')
    },

    data() {
        return {
            // Inject utility into component so it can be used in rendering the template
            numbers: utility.numbers,

            assets: [],
            statistics: false,
            loaded: false,
            loading: false,
            expanded: false,
            chart: false,

            // Set default sorting, false for none
            sorted: {
                direction: 1,
                key: 'market_cap',
                type: 'number'
            },

            updatedAt: moment(),
            search: '',

            headers: [{
                key: 'symbol',
                title: 'Symbol',
                type: 'string',
                icon: 'right'
            }, {
                key: 'name',
                title: 'Name',
                type: 'string',
                icon: 'right'
            }, {
                key: 'price',
                title: 'Price',
                type: 'number',
                icon: 'left'
            }, {
                key: 'market_cap',
                title: 'Market Cap',
                type: 'number',
                icon: 'left'
            }, {
                key: 'supply',
                title: 'Supply',
                type: 'number',
                icon: 'left'
            }, {
                key: 'percent_change_hour',
                type: 'number',
                title: 'Hour',
                icon: 'left'
            }, {
                key: 'percent_change_day',
                title: 'Day',
                type: 'number',
                icon: 'left'
            }, {
                key: 'percent_change_week',
                title: 'Week',
                type: 'number',
                icon: 'left'
            }],

            // Refresh interval to be attached
            refreshInterval: null
        }
    },

    computed: {
        ticker() {
            let ticker = this.assets

            if (this.search !== '') ticker = this.filterTicker(ticker)
            if (this.sorted) ticker = this.sortTicker(ticker)

            return ticker
        }
    },

    created() {
        // Refresh ticker and
        this.refresh()
        this.refreshInterval = setInterval(() => {
            this.refresh()
            this.updatedAt = moment()
            console.log('Ticker refreshed.')
        }, 1000 * 60)
    },

    destroyed() {
        // Kill the refresh interval on leaving the page
        clearInterval(this.refreshInterval)
    },

    methods: {
        refresh() {
            this.loading = true
            Vue.$http.get('/statistics').then(response => { this.statistics = response })
            Vue.$http.get('/currencies')
                .then((response) => {
                    this.assets = response.map((coin) => {
                        coin.color = utility.colors.get(coin.symbol)
                        return coin
                    })

                    this.loading = false
                    this.loaded = true
                })
                .catch(error => console.log(error))
        },

        transformHistory(history) {
            return history.map(point => [(point.time * 1000), point.close])
        },

        expand(index, currency, sortOverride) {
            if (!sortOverride && this.expanded.index === index) {
                this.expanded = false
                return
            }

            Vue.$http.get(`/currencies/${currency.id.toLowerCase()}/history`)
                .then((response) => {
                    if (response && response.length > 0) {
                        this.expanded = { index, currency }
                        currency.price_history = response

                        this.chart = {
                            series: [{
                                name: 'Price (USD)',
                                data: this.transformHistory(response)
                            }],
                            row: (this.expanded.index % 2 === 0 ? 'even' : 'odd'),
                            color: currency.color,
                            price: currency.price,
                            interval: 'daily'
                        }
                    } else {
                        this.expanded = { index, currency }
                        this.expanded.currency.price_history = false
                    }
                })
                .catch((error) => {
                    console.error('Empty price history returned.', error)
                    this.expanded.currency.price_history = false
                })
        },

        calculateHistoryInterval(duration) {
            if (duration.asDays() > 7 && duration.asDays() <= 31) return 'hourly'
            else if (duration.asDays() > 1 && duration.asDays() <= 7) return 'hourly'
            else if (duration.asDays() <= 1) return 'minutely'
            return 'daily'
        },

        zoom(event) {
            if (event.dataMin === event.min && event.dataMax === event.max) return

            console.log('Min: ', moment(event.min).format())
            console.log('Max: ', moment(event.max).format())

            const interval = this.calculateHistoryInterval(moment.duration(moment(event.max).diff(moment(event.min))))

            Vue.$http.get(`/currencies/${this.expanded.currency.id.toLowerCase()}/history`, {
                params: {
                    start: moment(event.min).unix(),
                    end: moment(event.max).unix(),
                    interval
                }
            }).then((response) => {
                this.chart.series[0].data = this.transformHistory(response)
                this.chart.interval = interval
            })
            .catch((error) => {
                console.error('Empty price history returned.', error)
                this.expanded.currency.price_history = false
            })
        },

        sort(key) {
            if (this.sorted && this.sorted.key === key) {
                this.sorted.direction = this.sorted.direction * -1
                return
            }

            this.sorted = { key, direction: 1, type: typeof this.ticker[0][key] }

            // Redraw the chart
            if (this.expanded !== false) {
                this.expand(this.expanded.index, this.sortedTicker[this.expanded.index], true)
            }
        },

        sortTicker(ticker) {
            // Make a copy so we aren't modifying the data source
            ticker = ticker.slice(0)
            let typeSorter

            if (this.sorted.type === 'number') {
                typeSorter = (key, previous, current) => (previous[key] - current[key])
            } else if (this.sorted.type === 'string') {
                typeSorter = (key, previous, current) => {
                    if (previous[key] < current[key]) return 1
                    if (previous[key] > current[key]) return -1
                    return 0
                }
            } else {
                console.error('Invalid type passed to sorting function.', typeof this.sorted.key, this.sorted.key)
                return this.assets
            }

            ticker.sort((previous, current) => typeSorter(this.sorted.key, previous, current))
            if (this.sorted.direction === -1) return ticker
            return ticker.reverse()
        },

        filterTicker(ticker) {
            console.log('Search!', this.search)

            return ticker.filter(currency => currency.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0)
        }
    }
}
