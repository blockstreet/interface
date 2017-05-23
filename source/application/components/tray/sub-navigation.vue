<template>
    <div class="sub-navigation">
        <div class="link" v-for="item in menu" :class="{ 'active': $route.name === item.name }">
            <i class="fa" :class="item.icon"></i>
        </div>
    </div>
</template>


<script lang="babel">
    export default {
        data() {
            return {
                menu: [{
                    name: 'home.index',
                    title: 'News',
                    icon: 'fa-tachometer'
                }, {
                    name: 'ticker.index',
                    title: 'Price Tracker',
                    icon: 'fa-database'
                }, {
                    name: 'home.index',
                    title: 'News',
                    icon: 'fa-graduation-cap'
                }, {
                    name: 'ticker.index',
                    title: 'Price Tracker',
                    icon: 'fa-cubes'
                }]
            }
        }
    }
</script>


<style lang="less">
    @import '~assets/less/partials/vars';

    .sub-navigation {
        display: none;
        flex-flow: column;
        position: relative;
        color: @text-regular-gray;
        flex: 3 1 auto;
        z-index: 10;
        background: @dark-blue-gray;
        max-width: 70px;
        border-right: 1px solid @color-text;
        flex-direction: column;
        padding-top: 60px;

        .link {
            max-height: 60px;
            flex: 1 1 auto;
            height: 100%;
            display: flex;
            text-align: center;
            align-items: center;
            border-top: 1px solid rgba(255, 255, 255, 0.075);
            cursor: pointer;

            &:last-child { border-bottom: 1px solid rgba(255, 255, 255, 0.075); }
            &:hover { color: @color-white; }

            i {
                font-size: 18px;
                height: 18px;
                width: 100%;
            }
        }
    }

    @media (min-width: @screen-laptop-min) and (max-width: @screen-laptop-max) {

    }

    @media (max-width: @screen-tablet-max) {

    }
</style>
