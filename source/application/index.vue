<template>
    <div class="application" :class="$route.path.replace('/', '')">
        <router-view></router-view>
    </div>
</template>

<style lang="less">
    @import '~assets/less/partials/vars';

    .application {
        width: 100%;
        display: flex;
    }

    @media (min-width: @screen-laptop-min) {
        .application { height: 100%; }
    }
</style>

<script>
    /* ============
     * Entry Point
     * ============
     *
     * The entry point of the application
     */

    import { router } from './../bootstrap'
    // import datacenterService from './services/datacenters'

    export default {
        /**
         * The router
         */
        router,

        /**
         * Filters
         */
        filters: {
            currency(value) { return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') }
        },

        watch: {
            '$intercom.ready': function ready() {
                this.$intercom.boot()
                // this.$intercom.show()
            }
        }
    }
</script>
