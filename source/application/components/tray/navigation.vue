<template>
    <div class="navigation">
        <!-- <div class="icon-navigation">
            <div class="link" v-for="item in menu" :class="{ 'active': $route.name === item.name }">
                <i class="fa" :class="item.icon"></i>
            </div>
        </div> -->

        <div class="item-container primary" v-for="item in menu" :class="{ 'active': $route.name === item.name }">
            <router-link :to="{ name: item.name, path: item.path }" class="row-item" tag="div">
                <i class="fa" :class="item.icon"></i>
                <span class="title">{{ item.title }}</span>
            </router-link>

            <div class="submenu-container" v-if="item.subitems.length > 0  && $route.name === item.name">
                <div class="item-container" v-for="subitem in item.subitems" :class="{
                    'active': ($route.hash === subitem.path) || ($route.name === subitem.name),
                    'completed': (Math.round(Math.random() * 2) % 2)
                }">
                    <router-link
                        v-if="subitem.type === 'view'"
                        :to="{ name: subitem.name }"
                        active-class="active"
                        class="row-item"
                        tag="a"
                        :class="{ 'active': $route.name === subitem.name }"
                    >{{ subitem.title }}</router-link>

                    <a class="row-item" v-if="subitem.type === 'hash'" :href="subitem.path">{{ subitem.title }}</a>

                    <div class="childmenu-container" v-if="subitem.subitems.length > 0 ">
                        <div class="item-container" v-for="childitem in subitem.subitems" :class="{
                            'active': ($route.hash === childitem.path) || ($route.name === subitem.name),
                            'completed': true
                        }">
                            <router-link
                                v-if="childitem.type === 'view'"
                                :to="{ name: childitem.name }"
                                active-class="active"
                                class="row-item"
                                tag="a"
                                :class="{ 'active': $route.hash === childitem.path }"
                            >{{ childitem.title }}</router-link>

                            <a class="row-item" v-if="childitem.type === 'hash'" :href="childitem.path">{{ childitem.title }}</a>
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
                        name: 'education.cryptocurrency',
                        title: 'Cryptocurrency',
                        type: 'view',
                        subitems: []
                    }, {
                        name: 'education.blockchain',
                        title: 'Blockchain',
                        type: 'view',
                        subitems: []
                    }, {
                        name: 'education.cryptography',
                        title: 'Cryptography',
                        type: 'view',
                        subitems: []
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

    .icon-navigation {
        flex-direction: row;
        display: flex;
        flex: 1 1 auto;
        height: 60px;
        border-top: 1px solid rgba(255, 255, 255, 0.03);
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        margin-bottom: 25px;

        .link {
            flex: 1 1 auto;
            height: 100%;
            display: flex;
            text-align: center;
            align-items: center;
            border-right: 1px solid rgba(255, 255, 255, 0.03);
            cursor: pointer;

            &:last-child { border-right: 0; }
            &:hover { color: @color-white; }

            i {
                font-size: 22px;
                height: 22px;
                width: 100%;
            }
        }
    }

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
                padding-left: 70px;
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
                    height: 42px;
                    width: 30px;
                    text-align: center;
                    flex: 1 1 auto;
                    display: flex;
                    align-items: center;
                    padding: 0 0 0 30px;
                }
            }

            &:hover { color: @text-hover-gray; }

            &.active {
                background: @dark-blue-gray;
                color: @text-hover-gray;

                & > .row-item {
                    border-left: 1.5px solid @color-link;
                    margin-left: -1.5px;
                }
            }

            &.completed a:after { color: @color-bg-green; }
        }

        .submenu-container {
            .item-container.completed a:after { color: @color-bg-green; }

            a {
                padding-left: 70px;
                padding-right: 30px;
                color: inherit;
                display: flex;
                flex: 1 1 auto;

                &:after {
                    content: '\f00c';
                    font-family: FontAwesome;
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 100%;
                    width: 50px;
                    text-align: center;
                }
            }
        }

        .childmenu-container {
            a {
                padding-left: 60px;
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
