<template>
    <div class="page page-ico">
        <div class="content-body">
            <div class="table-container">
                <div class="flex-table table-primary table-striped">
                    <div class="table-header">
                        <div class="cell">Name</div>
                        <div class="cell">Supply</div>
                        <div class="cell">Pool</div>
                        <div class="cell">Start Date</div>
                        <div class="cell">End Date</div>
                    </div>

                    <div class="table-body">
                        <div class="table-row" v-for="token in formattedUpcoming">
                            <div class="cells">
                                <div class="cell">{{ token.name }}</div>
                                <div class="cell">{{ token.supply }}</div>
                                <div class="cell">{{ token.pool }}</div>
                                <div class="cell">{{ token.start }}</div>
                                <div class="cell">{{ token.end }}</div>
                            </div>
                        </div>

                        <div class="table-row">
                            <div class="cells">
                                <div class="cell text-center">Completed Crowdsales</div>
                            </div>
                        </div>

                        <div class="table-row" v-for="token in formattedCompleted">
                            <div class="cells">
                                <div class="cell">{{ token.name }}</div>
                                <div class="cell">{{ token.supply }}</div>
                                <div class="cell">{{ token.pool }}</div>
                                <div class="cell">{{ token.start }}</div>
                                <div class="cell">{{ token.end }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="babel">
    import moment from 'moment'

    export default {
        computed: {
            formattedUpcoming() {
                return this.format(this.upcoming)
            },

            formattedCompleted() {
                return this.format(this.completed)
            },

            oi() {
                return JSON.stringify({ up: this.upcoming, down: this.completed })
            }
        },

        data() {
            return {
                upcoming: [{
                    name: 'TokenCard',
                    supply: 21000000,
                    pool: 13600000,
                    start: '5/2/2017',
                    end: '5/9/2017'
                }, {
                    name: 'Peerplays',
                    supply: 6000000,
                    pool: 950000,
                    start: '2/26/2017',
                    end: '5/15/2017'
                }, {
                    name: 'BAT Token',
                    supply: null,
                    pool: null,
                    start: null,
                    end: null
                }, {
                    name: 'Status',
                    supply: null,
                    pool: null,
                    start: null,
                    end: null
                }, {
                    name: 'Aragon',
                    supply: null,
                    pool: null,
                    start: null,
                    end: null
                }],

                completed: [{
                    name: 'Humaniq',
                    supply: null,
                    pool: null,
                    start: null,
                    end: null
                }, {
                    name: 'Edgeless',
                    supply: null,
                    pool: null,
                    start: null,
                    end: null
                }, {
                    name: 'vDice',
                    supply: null,
                    pool: null,
                    start: null,
                    end: null
                }, {
                    name: 'Gnosis',
                    supply: null,
                    pool: null,
                    start: null,
                    end: null
                }, {
                    name: 'Golem',
                    supply: null,
                    pool: null,
                    start: null,
                    end: null
                }, {
                    name: 'Matchpool',
                    supply: null,
                    pool: null,
                    start: null,
                    end: null
                }, {
                    name: 'Melonport',
                    supply: null,
                    pool: null,
                    start: null,
                    end: null
                }]
            }
        },

        methods: {
            format(input) {
                const dateFormat = { sameElse: 'MMMM Do, YYYY' }

                return input.map((ico) => {
                    ico.start = (ico.start ? moment(ico.start).calendar(null, dateFormat) : 'Unknown')
                    ico.end = (ico.end ? moment(ico.end).calendar(null, dateFormat) : 'Unknown')
                    ico.supply = (ico.supply ? this.humanNumber(ico.supply) : 'Unknown')
                    ico.pool = (ico.pool ? this.humanNumber(ico.pool) : 'Unknown')

                    return ico
                })
            },

            humanNumber(number) {
                if (number >= 1000000000000) return `${(Number(number) / 1000000000000).toFixed(2)}T`
                if (number >= 1000000000) return `${(Number(number) / 1000000000).toFixed(2)}B`
                if (number >= 1000000) return `${(Number(number) / 1000000).toFixed(2)}M`
                return Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
        }
    }
</script>

<style src="./ico.less"  lang="less"></style>
