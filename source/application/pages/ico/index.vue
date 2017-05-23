<template>
    <div class="page page-ico">
        <div class="content-body">
            <div class="table-container">
                <div class="flex-table table-primary table-striped">
                    <div class="table-header">
                        <div class="cell">Status</div>
                        <div class="cell">Name</div>
                        <div class="cell">Symbol</div>
                        <div class="cell">Chain</div>
                    </div>

                    <div class="table-body">
                        <div class="table-row" v-for="token in list">
                            <div class="cells">
                                <div class="cell">{{ token.status }}</div>
                                <div class="cell">{{ token.name }}</div>
                                <div class="cell">{{ token.symbol }}</div>
                                <div class="cell">{{ token.chain }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="babel">
    import Vue from 'vue'
    import moment from 'moment'

    export default {
        computed: {

        },

        data() {
            return {
                list: false
            }
        },

        mounted() {
            Vue.$http.get('http://localhost:4000/api/content/ico/index.json')
                .then((response) => { this.list = response })
                .catch(error => console.log(error))
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
