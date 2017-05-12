<template>
    <div class="sidebar">
        <div class="menu-section">
            <div class="menu-header">
                <h1 class="section-title">Currencies</h1>
                <!-- <i class="fa fa-refresh" v-on:click="refresh()"></i> -->
            </div>

            <ticker></ticker>
        </div>
    </div>
</template>


<script lang="babel">
    export default {
        components: {
            ticker: require('./ticker.vue')
        }
    }
</script>


<style lang="less" scoped>
    @import '~assets/less/partials/vars';

    .sidebar {
        display: flex;
        flex-grow: 1;
        flex-flow: column;
        background: @dark-blue;
        position: relative;
        color: @text-regular-gray;

        .menu-section {
            padding: 30px 0;
            border-bottom: 1px solid #2a3547;
            flex: 1 1 auto;

            .menu-header {
                display: flex;
                flex-direction: row;
                height: 42px;
                padding: 10px 30px;

                h1.section-title {
                    font-family: @font-text, sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    color: @text-faded-gray;
                    text-align: left;
                    line-height: 25px;
                    text-transform: uppercase;
                    flex: 1 1 auto;
                }

                i {
                    display: block;
                    height: 100%;
                    flex: 1 1 auto;
                    align-self: flex-end;
                    max-width: 20px;
                    color: @text-faded-gray;
                    cursor: pointer;
                    line-height: 25px;
                    text-align: right;
                }
            }
        }
    }
</style>
