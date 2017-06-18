<template>
    <div class="sidebar" :class="active ? 'active' : ''">
        <div class="logo-container">
            <div class="logo" id="logo">
                <i class="icon-logo logo-bull-o"></i>
            </div>
            <div class="logo-title">
                <span>Blockstreet</span>
            </div>
            <div class="hamburger" v-on:click="toggleSidebar()">
                <i class="fa fa-bars" aria-hidden="true"></i>
            </div>
        </div>

        <div class="menu-section">
            <div class="menu-header">
                <h1 class="section-title">Navigation</h1>
            </div>

            <navigation></navigation>
        </div>

        <div class="close-tray" v-on:click="toggleSidebar(false)"></div>
    </div>
</template>


<script lang="babel">
    export default {
        components: {
            navigation: require('./navigation.vue')
        },

        data() {
            return {
                active: false,
                route: this.$route
            }
        },

        watch: {
            $route() {
                if (this.active) this.active = !this.active
            }
        },

        methods: {
            toggleSidebar(state) {
                if (state) this.active = state
                this.active = !this.active
            }
        }
    }
</script>


<style lang="less">
    @import '~assets/less/partials/vars';

    .sidebar {
        display: flex;
        flex-flow: column;
        position: relative;
        color: @text-regular-gray;
        height: 100%;
        z-index: 10;
        background: transparent;
        max-width: 300px;

        .logo-container {
            flex: 1 1 auto;
            background: transparent;
            flex-direction: column;
            max-height: 300px;
            display: flex;

            &:before,
            &:after,
            .logo:before,
            .logo:after {
                content: '';
                flex: 1 1 auto;
                background: @dark-blue;
                z-index: 30;
            }

            &:before { margin-bottom: -3px; flex-grow: 2; }
            &:after { margin-top: -3px; }

            .logo {
                position: relative;
                display: flex;
                flex-direction: row;
                z-index: 10;

                &:before { margin-right: -3px; }
                &:after { margin-left: -3px; }

                i.icon-logo {
                    font-smoothing: antialiased;
                    color: @dark-blue;
                    font-size: 7.5em;
                    font-weight: 400;
                    z-index: 20;
                    position: relative;
                    overflow: hidden;

                    &:before {
                        content: "\e906";
                        position: absolute;
                        left: 0;
                        top: 0;
                        color: @dark-blue;
                        z-index: 20;
                        text-shadow: @color-bg-page 1.5px 1px 0px;
                    }

                    &:after {
                        content: "\e906";
                        z-index: 10;
                        -webkit-text-stroke: 3px @color-link;
                    }
                }
            }

            .logo-title {
                background: @dark-blue;
                font-family: 'Proxima Nova';
                font-weight: 700;
                font-style: normal;
                font-size: 1.9em;
                letter-spacing: -.028em;
                text-transform: uppercase;
                text-align: center;
                color: @color-bg-page;
                // text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25);
            }

            .hamburger { display: none; }
        }

        .menu-section {
            padding: 30px 0;
            flex: 1 1 auto;
            max-height: 100%;
            background: @dark-blue;

            .menu-header {
                display: flex;
                flex-direction: row;
                min-height: 42px;
                max-height: 42px;
                padding: 10px 30px;

                h1.section-title {
                    font-family: @font-text, sans-serif;
                    font-size: 15px;
                    font-weight: 500;
                    color: @text-faded-gray;
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

        .close-tray { display: none; }
    }

    @media (min-width: @screen-laptop-min) {
        .sidebar {
            width: 300px;
            border-left: 1px solid @color-text;
            border-right: 1px solid @color-text;
        }
    }


    @media (max-width: @screen-tablet-max) {
        .sidebar {
            flex: 1 1 auto;
            min-width: 100%;
            max-height: 50px;
            pointer-events: all;

            .logo-container {
                max-height: 50px;
                background: @dark-blue;
                flex-direction: row;
                display: flex;

                .logo, &:before, &:after { display: none; }

                .logo-title {
                    display: flex;
                    flex-direction: column;
                    flex: 1 1 auto;
                    min-height: 100%;
                    order: 1;
                    justify-content: center;
                }

                .hamburger {
                    display: flex;
                    flex: 1 1 auto;
                    max-width: 50px;
                    order: 0;
                    flex-direction: column;
                    justify-content: center;

                    i {
                        font-size: 1.9em;
                        text-align: center;
                    }
                }
            }

            .menu-section { display: none; }

            &.active {
                min-height: 100%;
                max-height: 100%;
                flex-direction: column;

                .logo-container {
                    min-height: 50px;
                    max-height: 50px;
                    width: 90%;
                    border-right: 1px solid @color-text;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

                    .hamburger { order: 1; }
                    .logo-title {
                        order: 0;
                        text-align: left;
                        padding-left: 30px;
                    }

                    &:after {
                        content: '';
                        width: 100%;
                        height: 50px;
                        background: @dark-blue;
                        display: flex;
                        flex: 1 1 auto;
                        position: absolute;
                        top: 0;
                        left: 0;
                        margin: 0;
                        z-index: -1;
                    }
                }

                .menu-section {
                    padding: 0;
                    display: flex;
                    height: 100%;
                    width: 90%;
                    flex-direction: column;
                    border-right: 1px solid @color-text;

                    .menu-header {
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    }

                    .navigation {
                        overflow-y: scroll;

                        .item-container.primary {
                            &:first-child {
                                .row-item:first-child {
                                    border-top: none;
                                }
                            }
                        }
                    }
                }

                .close-tray {
                    display: flex;
                    flex: 1 1 auto;
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 10%;
                    height: 100%;
                }
            }
        }
    }
</style>
