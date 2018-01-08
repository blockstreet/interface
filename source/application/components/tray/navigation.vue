<template>
    <div class="navigation">
        <div class="item-container primary" v-for="(item, index) in menu" :class="{
            'active': $route.name.includes(item.name)
        }">
            <router-link
                :to="{ name: item.name, path: item.path }"
                class="row-item"
                tag="a"
                :class="{
                    'active': $route.name.includes(item.name)
                }"
            >
                <i class="menu fa" :class="item.icon"></i>
                <span class="title">{{ item.title }}</span>
            </router-link>

            <div class="submenu-container" v-if="item.subitems.length > 0  && $route.name.includes(item.name)">
                <div class="item-container" v-for="(subitem, index) in item.subitems"
                    @click="expand(index)"
                    :class="{
                        'active': $route.name.includes(subitem.name)
                    }"
                >
                    <router-link
                        v-if="subitem.type === 'view'"
                        :to="{ name: subitem.name }"
                        class="row-item"
                        tag="a"
                        :class="{
                            'active': $route.name.includes(subitem.name),
                            'read': hasRead(subitem.name)
                        }"
                    >
                        <i class="expand fa" :class="{
                            'fa-chevron-down' : $route.name.includes(subitem.name),
                            'fa-chevron-right' : !$route.name.includes(subitem.name)
                        }"></i>
                        {{ subitem.title }}
                    </router-link>

                    <!-- <a class="row-item" v-if="subitem.type === 'hash'" :href="subitem.path">{{ subitem.title }}</a> -->

                    <div class="childmenu-container" v-if="subitem.subitems.length > 0 && index === expanded">
                        <div class="item-container" v-for="childitem in subitem.subitems" :class="{
                            /*'active': $route.name.includes(subitem.name),*/
                        }">
                            <router-link
                                v-if="childitem.type === 'view'"
                                :to="{ name: childitem.name }"
                                class="row-item"
                                tag="a"
                                :class="{
                                    'active': $route.name.includes(childitem.name),
                                    'read': hasRead(childitem.name)
                                }"
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
        created() {
            this.$http.get('/content/education/navigation.json')
                .then((response) => {
                    this.educationMenu = response
                    this.educationMenu.forEach((item, index) => {
                        if (this.$route.name.includes(item.name)) this.expanded = index
                    })
                })
                .catch(error => console.log(error))
        },

        computed: {
            menu() {
                return [{
                    name: 'news.index',
                    title: 'News',
                    icon: 'fa-newspaper-o',
                    subitems: []
                }, {
                    name: 'about.index',
                    title: 'About Us',
                    icon: 'fa-user',
                    subitems: []
                }, {
                    name: 'ticker.index',
                    title: 'Price Tracker',
                    icon: 'fa-database',
                    subitems: []
                }, {
                    name: 'education',
                    title: 'Education',
                    icon: 'fa-graduation-cap',
                    subitems: this.educationMenu
                }]
            },

            localStorage() { return window.localStorage }
        },

        data() {
            return {
                educationMenu: [],
                expanded: false
            }
        },

        methods: {
            expand(index) {
                this.expanded = index
            },

            hasRead(routeName) {
                console.log(routeName, this.localStorage.getItem(routeName))
                return !!this.localStorage.getItem(routeName)
            }
        }
    }
</script>


<style lang="less">
    @import '~assets/less/partials/vars';

    .read {
        position: relative;

        &:after {
            content: '\f00c';
            font-family: 'FontAwesome';
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: 48px;
            text-align: center;
            color: @color-bg-green;
        }
    }

    .navigation {
        list-style-type: none;
        margin: 0;
        padding: 0;
        font-size: 0.8em;

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

              -webkit-animation: arrive 1s forwards; /* Safari 4+ */
              -moz-animation:    arrive 1s forwards; /* Fx 5+ */
              -o-animation:      arrive 1s forwards; /* Opera 12+ */
              animation:         arrive 1s forwards; /* IE 10+, Fx 29+ */

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
                color: inherit;
                position: relative;

                i.expand {
                    position: absolute;
                    left: 30px;
                    top: 0;
                    display: flex;
                    height: 100%;

                    &:before {
                        margin: auto;
                    }
                }

                i.menu.fa {
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

                i.menu.fa {
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

                    i.menu {
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
            font-size: 1.4em;

            // flex-direction: row;
            // display: flex;
            // flex: 1 1 auto;
            // min-height: 50px;

            // .item-container {
            //     &.active {
            //         .row-item {
            //             margin: 0;
            //             border: 0;
            //             border-bottom: 3px solid @color-bg-blue;
            //         }
            //     }
            //
            //     .row-item {
            //         flex: 1 1 auto;
            //         padding: 0;
            //
            //         .title { display: none; }
            //
            //         i.fa {
            //             display: flex;
            //             position: relative;
            //             flex: 1 1 auto;
            //             line-height: 50px;
            //             padding: 0;
            //             font-size: 1.5em;
            //
            //             &:before {
            //                 text-align: center;
            //                 width: 100%;
            //                 height: 100%;
            //             }
            //         }
            //     }
            //
            //     .submenu-container { display: none; }
            // }
        }
    }
</style>
