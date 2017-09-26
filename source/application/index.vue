<template>
    <div class="application" :class="$route.path.replace('/', '')">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<style lang="less">
    @import '~assets/less/partials/vars';

    .application {
        width: 100%;
        display: flex;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
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
    import AuthService from './services/authentication'

    const auth = new AuthService()
    const { login, logout, authenticated, authNotifier } = auth

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
            // '$intercom.ready': function ready() {
            //     this.$intercom.boot()
            //     // this.$intercom.show()
            // }
        },

        data() {
            authNotifier.on('authChange', (authState) => {
                this.authenticated = authState.authenticated
            })

            return {
                auth,
                authenticated
            }
        },

        methods: {
            login,
            logout
        }
    }
</script>
