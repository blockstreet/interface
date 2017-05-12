<template>
    <div class="logo-demonstration" id="demo">
        <div class="logo-container">
            <div class="logo" id="logo">
                <i class="icon-logo logo-bull-o"></i>
            </div>
            <div class="logo-title">
                Block Street
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    require('particles.js')

    const particles = window.particlesJS

    export default {
        mounted() {
            // particles.load('gutter', `${process.env.API_LOCATION}/assets/particles/particles.gutter.json`)
            // particles.load('logo', `${process.env.API_LOCATION}/assets/particles/particles.logo.json`)
            particles.load('demo', `${process.env.API_LOCATION}/assets/particles/particles.tray.json`)
        }
    }
</script>

<style lang="less">
    @import '~assets/less/partials/vars';

    .logo-demonstration {
        width: 100%;
        height: 100%;
        display: flex;
        flex: 1 1 auto;
        position: relative;
        background: transparent;
        z-index: 20;

        .particles-js-canvas-el {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            z-index: -1;
        }

        .logo-container {
            flex: 1 1 auto;
            background: transparent;
            flex-direction: column;
            display: flex;
            width: 100%;
            height: 100%;
            background: transparent;

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
                    font-size: 20em;
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
                        -webkit-text-stroke: 4px @color-link;
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
    }
</style>
