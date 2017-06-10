<template>
    <div class="layout">
        <vue-progress-bar></vue-progress-bar>
        <tray></tray>

        <router-view></router-view>
    </div>
</template>


<script lang="babel">
    import throttle from 'throttle-debounce/debounce'

    export default {
        components: {
            tray: require('components/tray/tray.vue')
        },

        mounted() {
            const $ = window.jQuery

            // show hide subnav depending on scroll direction
            let position = $(window).scrollTop()
            const topbarHeight = $('.tray')[0].clientHeight

            $(window).scroll(throttle(200, () => {
                const scroll = $(window).scrollTop()

                console.log(scroll, position, topbarHeight)

                if (scroll < topbarHeight / 2) {
                    $('.tray')
                        .stop(true, false)
                        .removeClass('scrolling-down')

                    console.log('top')
                } else if (scroll > position) {
                    $('.tray')
                        .stop(true, false)
                        .addClass('scrolling-down')
                    console.log('down')
                } else {
                    $('.tray')
                        .stop(true, false)
                        .removeClass('scrolling-down')
                    console.log('up')
                }

                position = scroll
            }))
        }
    }
</script>


<style lang="less">
    @import '~assets/less/partials/vars';

    .layout {
        width: 100%;
        display: flex;
        align-items: stretch;
        flex-flow: row;
    }

    .page {
        display: flex;
        flex: 1;
        flex-direction: column;
        flex-grow: 8;
    }

    @media (min-width: @screen-laptop-min) {
        .layout { height: 100%; }
        .content-body { overflow-y: scroll; }
    }

    @media (max-width: @screen-tablet-max) {
        .layout { flex-direction: column; }

        .page {
            display: initial;
            margin-top: 50px;
        }
    }
</style>
