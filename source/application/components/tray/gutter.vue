<template>
    <div id="gutter" class="gutter"></div>
</template>

<style lang="less" scoped>
    @import '~assets/less/partials/vars';

    .gutter {
        position: relative;
    }

    @media only screen and (min-width: @screen-desktop-min) {
        .gutter {
            width: 100px;
        }
    }

    @media (min-width: @screen-laptop-min) and (max-width: @screen-laptop-max) {
        .gutter {
            width: 75px;
        }
    }


    @media (max-width: @screen-tablet-max) {
        .gutter {
            display: none;
        }
    }
</style>
