<template>
    <div class="navigation">
        <!-- <div class="icon-navigation">
            <div class="link" v-for="item in menu" :class="{ 'active': $route.name === item.name }">
                <i class="fa" :class="item.icon"></i>
            </div>
        </div> -->

        <div class="item-container primary" v-for="item in menu" :class="{
            'active': $route.name.includes(item.name)
        }">
            <router-link
                :to="{ name: item.name, path: item.path }"
                class="row-item"
                tag="div"
                :class="{ 'active': $route.name.includes(item.name) }"
            >
                <i class="fa" :class="item.icon"></i>
                <span class="title">{{ item.title }}</span>
            </router-link>

            <div class="submenu-container" v-if="item.subitems.length > 0  && $route.name.includes(item.name)">
                <div class="item-container" v-for="subitem in item.subitems" :class="{
                    'active': $route.name.includes(subitem.name),
                    'completed': (Math.round(Math.random() * 2) % 2)
                }">
                    <router-link
                        v-if="subitem.type === 'view'"
                        :to="{ name: subitem.name }"
                        class="row-item"
                        tag="a"
                        :class="{ 'active': $route.name.includes(subitem.name) }"
                    >{{ subitem.title }}</router-link>

                    <!-- <a class="row-item" v-if="subitem.type === 'hash'" :href="subitem.path">{{ subitem.title }}</a> -->

                    <div class="childmenu-container" v-if="subitem.subitems.length > 0 ">
                        <div class="item-container" v-for="childitem in subitem.subitems" :class="{
                            /*'active': $route.name.includes(subitem.name),*/
                            'completed': true
                        }">
                            <router-link
                                v-if="childitem.type === 'view'"
                                :to="{ name: childitem.name }"
                                class="row-item"
                                tag="a"
                                :class="{ 'active': $route.name.includes(childitem.name) }"
                            >{{ childitem.title }}</router-link>

                            <!-- <a class="row-item" v-if="childitem.type === 'hash'" :href="childitem.path">{{ childitem.title }}</a> -->
                        </div>
                    </div>
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
                    icon: 'fa-newspaper-o',
                    subitems: []
                }, {
                    name: 'ticker.index',
                    title: 'Price Tracker',
                    icon: 'fa-database',
                    subitems: [
                        // {
                        //     name: 'home.index',
                        //     title: 'Currencies',
                        //     type: 'view',
                        //     subitems: []
                        // }, {
                        //     name: 'home.index',
                        //     title: 'Assets',
                        //     type: 'view',
                        //     subitems: []
                        // }
                    ]
                }, {
                    name: 'education',
                    title: 'Education',
                    icon: 'fa-graduation-cap',
                    subitems: [{
                        name: 'education.cryptocurrency',
                        title: 'Cryptocurrency',
                        type: 'view',
                        subitems: [{
                            name: 'education.cryptocurrency.economics',
                            title: 'Economics',
                            type: 'view'
                        }, {
                            name: 'education.cryptocurrency.exchanges',
                            title: 'Exchanges',
                            type: 'view'
                        }, {
                            name: 'education.cryptocurrency.initial-coin-offering',
                            title: 'Initial Coin Offering',
                            type: 'view'
                        }, {
                            name: 'education.cryptocurrency.legality',
                            title: 'Legality',
                            type: 'view'
                        }]
                    }, {
                        name: 'education.blockchain',
                        title: 'Blockchain',
                        type: 'view',
                        subitems: [{
                            name: 'education.blockchain.addresses',
                            title: 'Addresses',
                            type: 'view'
                        }, {
                            name: 'education.blockchain.decentralization',
                            title: 'Decentralization',
                            type: 'view'
                        }, {
                            name: 'education.blockchain.digital-signature',
                            title: 'Digital Signature',
                            type: 'view'
                        }, {
                            name: 'education.blockchain.forking',
                            title: 'Forking',
                            type: 'view'
                        }, {
                            name: 'education.blockchain.hashing',
                            title: 'Hashing',
                            type: 'view'
                        }, {
                            name: 'education.blockchain.immutability',
                            title: 'Immutability',
                            type: 'view'
                        }, {
                            name: 'education.blockchain.mining',
                            title: 'Mining',
                            type: 'view'
                        }]
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

        & > .item-container:last-child { border-bottom: 1px solid rgba(255, 255, 255, 0.03); }

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

            &.primary > .row-item {
                padding-left: 30px;
                padding-right: 30px;
            }

            .row-item {
                display: flex;
                flex: 1 1 auto;
                border-top: 1px solid rgba(255, 255, 255, 0.03);
                padding-top: 1.5px;
                padding-bottom: 1.5px;

                i.fa {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 42px;
                    overflow: hidden;
                    opacity: 0.15;

                    &:before {
                        position: absolute;
                        top: -6px;
                        right: 20px;
                        width: 80px;
                        text-align: center;
                        font-size: 60px;
                        transition: all 0.1s;
                    }
                }

                &.active {
                    color: @text-hover-gray;
                    border-left: 1.5px solid @color-link;
                    margin-left: -1.5px;
                }
            }

            &:hover {
                color: @text-hover-gray;

                i.fa {
                    color: @text-hover-gray;
                    opacity: 0.2;

                    &:before {
                        transform: rotate(-14deg);
                        transform-origin: 50% 40%;
                    }
                }
            }

            &.active {
                background: @dark-blue-gray;
                // color: @text-hover-gray;

                & > .row-item {
                    // border-left: 1.5px solid @color-link;
                    // margin-left: -1.5px;

                    i {
                        opacity: 0.2;

                        &:before {
                            transform: rotate(-14deg);
                            transform-origin: 50% 40%;
                        }
                    }
                }
            }

            &.completed a:after { color: @color-bg-green; }
        }

        .submenu-container {
            .item-container.completed a:after { color: @color-bg-green; }

            a {
                padding-left: 60px;
                padding-right: 30px;
                color: inherit;
                display: flex;
                flex: 1 1 auto;

                // &:after {
                //     content: '\f00c';
                //     font-family: FontAwesome;
                //     position: absolute;
                //     right: 0;
                //     top: 0;
                //     height: 100%;
                //     width: 50px;
                //     text-align: center;
                // }
            }
        }

        .childmenu-container {
            a {
                padding-left: 90px;
                padding-right: 30px;
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
