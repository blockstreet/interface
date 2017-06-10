<template>
    <div id="tray" class="tray">
        <gutter></gutter>
        <sidebar></sidebar>
    </div>
</template>

<script lang="babel">
    require('particles.js')

    const particles = window.particlesJS

    export default {
        components: {
            sidebar: require('./sidebar.vue'),
            gutter: require('./gutter.vue')
        },

        mounted() {
            particles.load('tray', 'https://blockstreet.io/assets/particles/particles.tray.json')
        }
    }
</script>

<style lang="less">
    @import '~assets/less/partials/vars';

    .tray {
        display: flex;
        z-index: 50;
        height: 100%;
        position: relative;
        background: @dark-blue-gray;

        canvas.particles-js-canvas-el {
            position: absolute;
            left: 0;
            top: 0;
        }
    }


    @media (min-width: @screen-laptop-min) and (min-width: @screen-desktop-min) {
        .tray { width: 400px; }

        .application.education .tray {
            width: 400px;

            .sub-navigation {
                display: flex;
            }
        }
    }

    @media (max-width: @screen-tablet-max) {
        .tray {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            transition: all 0.5s ease;
            background: transparent;
            z-index: 1000;
            pointer-events: none;

            &.scrolling-down { opacity: 0; }
            canvas.particles-js-canvas-el { display: none !important; }
        }
    }
</style>
