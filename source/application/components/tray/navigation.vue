<template>
    <div class="navigation">
        <div class="item-container" v-for="item in menu" :class="{ 'active': $route.name === item.name }">
            <router-link :to="{ name: item.name, path: item.path }" class="row-item" tag="div">
                <i class="fa" :class="item.icon"></i>
                <span class="title">{{ item.title }}</span>
            </router-link>

            <div class="submenu-container" v-if="item.subitems.length > 0  && $route.name === item.name">
                <div class="item-container" v-for="subitem in item.subitems" :class="{ 'active': ($route.hash === subitem.path) || ($route.name === subitem.name) }">
                    <router-link
                        v-if="subitem.type === 'view'"
                        :to="{ name: subitem.name }"
                        active-class="active"
                        class="row-item"
                        tag="a"
                        :class="{ 'active': $route.name === subitem.name }"
                    >{{ subitem.title }}</router-link>

                    <a class="row-item" v-if="subitem.type === 'hash'" :href="subitem.path">{{ subitem.title }}</a>
                </div>
            </div>
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
                    icon: 'fa-tachometer',
                    subitems: []
                }, {
                    name: 'ticker.index',
                    title: 'Price Tracker',
                    icon: 'fa-database',
                    subitems: []
                }, {
                    name: 'education.index',
                    title: 'Education',
                    icon: 'fa-graduation-cap',
                    subitems: [{
                        path: '#cryptocurrencies',
                        title: 'Cryptocurrencies',
                        type: 'hash'
                    }, {
                        path: '#blockchains',
                        title: 'Blockchains',
                        type: 'hash'
                    }, {
                        path: '#analogy-time',
                        title: 'Analogy',
                        type: 'hash'
                    }, {
                        path: '#efficiency',
                        title: 'Efficiency',
                        type: 'hash'
                    }, {
                        path: '#what-makes-it-valuable',
                        title: 'What makes it valuable?',
                        type: 'hash'
                    }, {
                        path: '#who-buys-cryptocurrencies',
                        title: 'Who buys cryptocurrencies?',
                        type: 'hash'
                    }, {
                        path: '#what-are-some-examples-of-cryptocurrencies',
                        title: 'Cryptocurrency Examples',
                        type: 'hash'
                    }]
                }, {
                    name: 'ico.index',
                    title: 'Initial Coin Offerings',
                    icon: 'fa-cubes',
                    subitems: []
                }]
            }
        }
    }
</script>


<style lang="less">
    @import '~assets/less/partials/vars';

    .navigation {
        list-style-type: none;
        margin: 0;
        padding: 0;
        font-size: 0.8em;
        // overflow-y: scroll;
        height: 100%;

        .item-container {
            text-decoration: none;
            color: @text-regular-gray;
            font-family: @font-text, sans-serif;
            line-height: 38px;
            position: relative;
            cursor: pointer;

            display: flex;
            flex: 1 1 auto;
            flex-direction: column;

            -webkit-touch-callout: none; /* iOS Safari */
              -webkit-user-select: none; /* Safari */
               -khtml-user-select: none; /* Konqueror HTML */
                 -moz-user-select: none; /* Firefox */
                  -ms-user-select: none; /* Internet Explorer/Edge */
                      user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */

            .row-item {
                display: flex;
                flex: 1 1 auto;
                padding: 0 30px 0 70px;

                i.fa {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 36px;
                    width: 30px;
                    text-align: center;
                    flex: 1 1 auto;
                    display: flex;
                    align-items: center;
                    padding: 0 0 0 30px;
                }
            }

            &:hover {
                color: @text-hover-gray;
            }

            &.active {
                background: @dark-blue-gray;
                color: @text-hover-gray;

                & > .row-item {
                    border-left: 1.5px solid @color-link;
                    margin-left: -1.5px;
                }
            }
        }

        .submenu-container {
            padding: 10px 0;

            a {
                padding: 0px 30px 0px 70px;
                color: inherit;
                display: flex;
                flex: 1 1 auto;
            }
        }
    }

    @media (min-width: @screen-laptop-min) and (max-width: @screen-laptop-max) {
        .navigation {
            font-size: 1em;
        }
    }

    @media (max-width: @screen-tablet-max) {
        .navigation {
            flex-direction: row;
            display: flex;
            flex: 1 1 auto;
            min-height: 50px;

            .item-container {
                &.active {
                    .row-item {
                        margin: 0;
                        border: 0;
                        border-bottom: 3px solid @color-bg-blue;
                    }
                }

                .row-item {
                    flex: 1 1 auto;
                    padding: 0;

                    .title { display: none; }

                    i.fa {
                        display: flex;
                        position: relative;
                        flex: 1 1 auto;
                        line-height: 50px;
                        padding: 0;
                        font-size: 1.5em;

                        &:before {
                            text-align: center;
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

                .submenu-container { display: none; }
            }
        }
    }
</style>
