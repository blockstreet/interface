<template>
    <div class="tray" v-if="display">
        <sidebar></sidebar>
    </div>
</template>

<script lang="babel">
    export default {
        components: {
            sidebar: require('./sidebar.vue')
        },

        computed: {
            display() {
                if (this.$route.name === 'ticker.index') return false
                if (this.$route.name === 'education.index') return false
                return true
            }
        }
    }
</script>

<style lang="less" scoped>
    .tray {
        display: flex;
        flex-grow: 1;
        max-width: 300px;
    }

    @media only screen and (max-width: 1280px) {
        .tray { display: none; }
    }
</style>
