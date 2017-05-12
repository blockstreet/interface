<template>
    <span slot></span>
</template>

<script lang="babel">
    export default {
        props: {
            key: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                dictionary: {
                    notebook: `When we refer to a "big notebook of transations, we are really
                        referring to the blockchain." This allows us to use a simple concept that everyone can understand
                        and lead it into a greater understanding.`,
                    'intrinsic-value': `The intrinsic value is the actual value of a company or an asset based on an
                        underlying perception of its true value including all aspects of the business, in terms of both
                        tangible and intangible factors. This value may or may not be the same as the current market value.`
                }
            }
        },

        computed: {
            result() { return this.dictionary[this.key] }
        }
    }
</script>

<style lang="less" scoped>
    @import '~assets/less/partials/vars';

    .tray {
        display: flex;
    }

    @media only screen and (min-width: @screen-desktop-min) {
        .tray { width: 400px; }
    }

    @media only screen and (min-width: @screen-laptop-min) and (max-width: @screen-laptop-max) {
        .tray { width: 300px; }
    }

    @media (max-width: @screen-tablet-max) {
        .tray {
            max-height: 50px;
            flex: 1 1 auto;
        }
    }
</style>
