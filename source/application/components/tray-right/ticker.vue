<template>
    <div class="ticker">
        <div class="coin" v-for="currency in ticker">
            <div class="icon">
                <!-- <i class="fa fa-lg fa-bitcoin"></i> -->
                <img :src="'http://coinmarketcap.com/static/img/coins/16x16/' + currency.name.toLowerCase().replace(' ', '-') + '.png'" alt="">
            </div>
            <div class="blocks">
                <div>{{ currency.symbol }}</div>
                <div class="text-right">{{ currency.price_usd | currency }}</div>
                <div class="text-capitalize color-blue-grey-lighter">{{ currency.name }}</div>
                <!-- <div class="color-blue-grey-lighter text-right">{{ currency.last_updated | moment('from', 'now') }}</div> -->
            </div>
        </div>

        <p class="empty" v-if="ticker.length === 0">
            Failed to retrieve currency data.
        </p>
    </div>
</template>


<script lang="babel">
    import Vue from 'vue'

    export default {
        data() {
            return {
                ticker: {}
            }
        },

        created() {
            Vue.$http.get('http://localhost:3000/ticker')
                .then((response) => { this.ticker = response.splice(0, 16) })
                .catch(error => console.log(error))
        }
    }
</script>


<style lang="less" scoped>
    @import '~assets/less/partials/vars';

    .ticker {
        margin: 15px 0 25px;
        display: flex;
        flex-direction: column;

        .coin {
            padding: 5px 30px;
            flex: 1 1 auto;
            flex-direction: row;
            display: flex;

            div.icon {
                max-width: 16px;
                flex: 1 1 auto;
                display: flex;
                align-items: center;
                margin-right: 20px;
            }

            .blocks {
                flex: 1 1 auto;
                flex-direction: row;
                flex-wrap: wrap;
                display: flex;
                max-width: 100%;

                div {
                    min-width: 50%;
                    max-width: 75%;
                    flex: 1 1 auto;
                }
            }

            &:hover {
                color: @text-hover-gray;
            }

            .primary {
                float: left;
                clear: both;
                height: 50%;
                width: 100%;
                position: relative;
            }

            .secondary {
                float: left;
                clear: both;
                height: 50%;
                width: 100%;
                position: relative;
                font-size: 12px;
            }

            .left {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                text-align: left;
            }

            .right {
                position: absolute;
                right: 0;
                top: 0;
                height: 100%;
                width: 100%;
                text-align: right;
            }
        }
    }
</style>
