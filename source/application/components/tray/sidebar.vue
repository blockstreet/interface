<template>
    <div class="sidebar">
        <div class="logo-container">
            <div class="logo" id="logo">
                <i class="icon-logo logo-bull-o"></i>
            </div>
            <div class="logo-title">
                Blockstreet
            </div>
        </div>

        <div class="menu-section">
            <div class="menu-header">
                <h1 class="section-title">Navigation</h1>
            </div>

            <navigation></navigation>
        </div>
    </div>
</template>


<script lang="babel">
    export default {
        components: {
            navigation: require('./navigation.vue')
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
        }

        .menu-section {
            padding: 30px 0;
            flex: 1 1 auto;
            max-height: 100%;
            background: @dark-blue;

            .menu-header {
                display: flex;
                flex-direction: row;
                height: 42px;
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
    }

    @media (min-width: @screen-laptop-min) {
        .sidebar {
            width: 300px;
            border-left: 1px solid @color-text;
            border-right: 1px solid @color-text;
        }
    }


    @media (max-width: @screen-tablet-max) {
        .logo-container {
            display: none;
        }

        .sidebar {
            flex: 1 1 auto;

            .menu-section {
                padding: 0;
            }

            .menu-header {
                display: none !important;
            }
        }
    }
</style>
