<template>
    <div class="page page-ticker">
        <div class="header">
            <div class="options">
                <h1>Cryptocurrency Market Capitalization</h1>
                <button type="button" class="btn" v-on:click="refresh()">
                    <span v-if="!loading">Refresh</span>
                    <i class="fa fa-spin fa-refresh" v-if="loading || !loaded"></i>
                </button>
            </div>
        </div>

        <div class="content-body">
            <div class="table-container" v-if="ticker.length > 0">
                <div class="flex-table table-primary table-striped">
                    <div class="table-header">
                        <div class="cell text-center index">#</div>

                        <div class="cell sortable"
                            v-for="header in headers"
                            v-on:click="sort(header.key)"
                            :class="[{
                                'sorted': sorted && sorted.key === header.key,
                                'descending': sorted && sorted.direction === 1,
                                'ascending': sorted && sorted.direction === -1
                            }, header.key.replace('percent_change_', ''), header.type, header.icon]"
                        >
                            <span class="header-title truncatable">{{ header.title }}</span>
                        </div>
                    </div>

                    <div class="table-body">
                        <div class="table-row"
                            v-for="(currency, index) in sortedTicker"
                            :class="{ 'expanded': index === expanded.index }"
                            :style="{ 'order': index }"
                        >
                            <div class="cells" v-on:click="expand(index, currency)">
                                <div class="cell index">
                                    {{ sorted.direction === -1 ? (100 - index) : (index + 1)  }}
                                </div>

                                <div class="cell symbol">
                                    <span>{{ currency.symbol }}</span>
                                    <i class="coin" :class="`coin-${currency.symbol.toLowerCase()}`"></i>
                                </div>

                                <div class="cell name">
                                    <span class="truncatable">{{ currency.name }}</span>
                                </div>

                                <div class="cell number price">
                                    <div class="aligner">
                                        <span class="cash">$</span>
                                        <span v-html="fractional(currency.price)"></span>
                                    </div>
                                </div>

                                <div class="cell number market_cap">
                                    <span class="cash">$</span>{{ humanNumber(currency.market_cap )}}
                                </div>

                                <div class="cell number supply">
                                    <span class="cash"></span>{{ humanNumber(currency.supply )}}
                                </div>

                                <div class="cell number percent hour" :class="{
                                    'up': currency.percent_change_hour > 0,
                                    'down': currency.percent_change_hour < 0
                                }">
                                    {{ percent(currency.percent_change_hour) }}
                                </div>

                                <div class="cell number percent day" :class="{
                                    'up': currency.percent_change_day > 0,
                                    'down': currency.percent_change_day < 0
                                }">
                                    {{ percent(currency.percent_change_day) }}
                                </div>

                                <div class="cell number percent week" :class="{
                                    'up': currency.percent_change_week > 0,
                                    'down': currency.percent_change_week < 0
                                }">
                                    {{ percent(currency.percent_change_week) }}
                                </div>
                            </div>
                        </div>

                        <div class="details" v-if="chart && expanded !== false"
                            :style="{ 'order': expanded.index }"
                            :class="{
                                'even': expanded.index % 2 === 0,
                                'odd': expanded.index % 2 !== 0,
                                'no-data': expanded.currency.price_history === false
                            }">

                            <highstock
                                :options="chart"
                                ref="highchart"
                                class="chart-container">
                            </highstock>

                            <div class="no-data-warning" v-if="expanded.currency.price_history === false">
                                No price history data for {{ expanded.currency.name }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="loading" v-if="ticker.length === 0">
                    <i class="fa fa-gear fa-spin fa-fw"></i>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="babel">
    import Vue from 'vue'
    import chartConstructor from 'utilities/chart'
    import colorMap from 'utilities/colors'

    export default {
        data() {
            return {
                ticker: [],
                loaded: false,
                loading: false,
                expanded: false,
                chart: false,
                sorted: false,
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
                }]
            }
        },

        computed: {
            sortedTicker() {
                if (!this.sorted) return this.ticker

                const sortedArray = this.ticker.slice(0)
                let typeSorter

                if (this.sorted.type === 'number') {
                    console.log('sorting num')
                    typeSorter = (key, previous, current) => (previous[key] - current[key])
                } else if (this.sorted.type === 'string') {
                    typeSorter = (key, previous, current) => {
                        if (previous[key] < current[key]) return 1
                        if (previous[key] > current[key]) return -1
                        return 0
                    }
                } else {
                    console.error('Invalid type passed to sorting function.', typeof this.sorted.key, this.sorted.key)
                    return this.ticker
                }

                sortedArray.sort((previous, current) => typeSorter(this.sorted.key, previous, current))
                if (this.sorted.direction === -1) return sortedArray
                return sortedArray.reverse()
            }
        },

        created() {
            this.refresh()
        },

        methods: {
            padLeft(number, size) {
                return (`0000/${number}`).substr(-size)
            },

            padRight(input) {
                return (`${input.substring(0, 2)}/${input.substring(2, 4)}`)
            },

            fractional(number) {
                number = Number(number).toFixed(4)
                const numbers = String(number).split('.')

                let integers = this.padLeft(Number(numbers[0]), 5)
                let decimals = number >= 0.1 ? this.padRight(numbers[1]) : numbers[1]

                if (integers.includes('/')) {
                    integers = integers.replace('/', '</span><span class="main">')
                    integers = `<span class="zero">${integers}`
                }

                if (decimals.includes('/')) {
                    if (String(number[1]).length > 2) {
                        decimals = `${decimals.slice(0, 2)}<span class="low">${decimals.slice(2, decimals.length)}</span>`
                    }

                    decimals = decimals.replace('/', '</span><span class="zero">')
                    decimals = `${decimals}</span>`
                }

                return `${integers}.${decimals}`
            },

            /**
             * Convert number to percent format. Negative percentages are already prefixed with a "-" sign.
             */
            percent(input) {
                return (input > 0 ? `+${Number(input).toFixed(2)}%` : `${Number(input).toFixed(2)}%`)
            },

            humanNumber(number) {
                if (number >= 1000000000000) return `${(Number(number) / 1000000000000).toFixed(2)}T`
                if (number >= 1000000000) return `${(Number(number) / 1000000000).toFixed(2)}B`
                if (number >= 1000000) return `${(Number(number) / 1000000).toFixed(2)}M`
                return Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            },

            refresh() {
                this.loading = true
                Vue.$http.get('https://blockstreet.io/api/ticker')
                    .then((response) => {
                        this.ticker = response.map((coin) => {
                            if (coin.symbol === 'ETC') coin.title = 'ETH Classic'
                            else coin.title = coin.name
                            coin.color = colorMap(coin.symbol)
                            return coin
                        })

                        this.loading = false
                        this.loaded = true
                    })
                    .catch(error => console.log(error))
            },

            expand(index, currency, sortOverride) {
                if (!sortOverride && this.expanded.index === index) {
                    this.expanded = false
                    return
                }

                Vue.$http.get(`/price/${currency.id}`)
                    .then((response) => {
                        if (response && response.length > 0) {
                            this.expanded = { index, currency }
                            currency.price_history = response

                            this.chart = chartConstructor({
                                onZoom: (event) => {
                                    console.log(event)
                                    // this.$refs.highchart
                                },
                                series: [{
                                    name: 'Price (USD)',
                                    data: response.map(coin => [(coin[0] * 1000), coin[1]])
                                }],
                                row: (this.expanded.index % 2 === 0 ? 'even' : 'odd'),
                                color: currency.color,
                                price: currency.price
                            })
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

            sort(key) {
                if (this.sorted && this.sorted.key === key) {
                    this.sorted.direction = this.sorted.direction * -1
                    return
                }

                this.sorted = {
                    key,
                    direction: 1,
                    type: typeof this.ticker[0][key]
                }

                // Redraw the chart
                if (this.expanded !== false) {
                    this.expand(this.expanded.index, this.sortedTicker[this.expanded.index], true)
                }
            }
        }
    }
</script>

<style src="./ticker.less" lang="less"></style>
