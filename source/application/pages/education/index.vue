<template>
    <div class="page page-education">
        <div class="content-body">
            <div class="education" v-if="information" v-html="information"></div>
        </div>
    </div>
</template>

<script lang="babel">
    import Vue from 'vue'
    import VueMarkdown from 'vue-markdown'
    import VueWaypoint from 'vue-waypoint'

    export default {
        components: {
            markdown: VueMarkdown,
            waypoint: VueWaypoint
        },

        data() {
            return {
                information: false,
                waypoints: [],
                helper: {
                    element: {},
                    offset: 0,
                    height: 100,
                    keys: {},
                    dictionary: {}
                },
                references: this.$refs
            }
        },

        computed: {
            section() { return this.$route }
        },

        watch: {
            waypoints(value) {
                if (value.length > 0) {
                    const index = value[value.length - 1]
                    this.helper.element = this.$refs.section[index]
                    this.helper.offset = this.helper.element.offsetTop
                    this.helper.height = this.helper.element.clientHeight
                }
            },

            section(route) {
                this.loadContent(route)
            }
        },

        mounted() {
            this.loadContent(this.$route)
        },

        methods: {
            loadContent(route) {
                let path = route.path
                if (route.meta.type === 'index') path = `${path}/index`

                Vue.$http.get(`content${path}.md`)
                    .then((response) => {
                        this.information = response
                    })
                    .catch(error => console.log(error))
            },

            setupListeners() {
                this.$nextTick(() => {
                    if (this.waypoints.length > 0) {
                        const $ = window.jQuery
                        const vm = this
                        // this.helper.keys = {}

                        $('.active lookup[key]').each(function hoverHandler() {
                            const key = $(this).attr('key')

                            $(this).hover(
                                () => {
                                    $('.helper .term').each(function handle() {
                                        $(this).stop().hide()
                                    })

                                    vm.helper.height = $(this).offsetTop
                                    $(`#lookup-${key}`).stop().show()
                                },
                                () => { $(`#lookup-${key}`).stop().fadeOut(0) }
                            )
                        })
                    }
                })
            },

            waypointIn(index) {
                const element = this.$refs.markdown[index].$el.children[0]
                this.waypoints.slice(0, 1)

                if (element.tagName === 'H2') {
                    this.waypoints.push(index)
                    this.waypoints.sort((a, b) => a - b)
                    this.setupListeners()
                }

                // Disable routing on tablet / mobile
                if (document.documentElement.clientWidth > 1200) {
                    Vue.router.push({ path: `#${element.id}` })
                }
            },

            waypointOut(index) {
                const element = this.$refs.markdown[index].$el.children[0]
                if (element.tagName === 'H2') this.waypoints.splice(this.waypoints.indexOf(index), 1)
            }
        }
    }
</script>

<style lang="less">
    @import '~assets/less/partials/vars';

    .page-education {
        // background: @color-white;

        .content-body {
            padding: 0;
            min-height: 100vh !important;
            display: flex;
            flex-direction: row;
        }

        .help-gutter {
            display: flex;
            flex: 1 1 auto;
            position: relative;
            max-width: 400px;
            margin-right: auto;

            .helper {
                display: flex;
                flex: 1 1 auto;
                flex-direction: column;
                padding: 0 50px 0 0;
                left: 0;
                position: absolute;
                width: 100%;
                height: 100%;

                .term {
                    display: none;

                    .title {
                        font-weight: 600;
                        text-transform: capitalize;
                        font-size: 1.25em;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #c5d6de;
                        margin-bottom: 15px;
                        height: 2.25em;
                        line-height: 2.25em;
                    }

                    .definition {
                        text-align: justify;
                        font-size: 0.9em;
                    }
                }
            }
        }

        .education {
            max-width: 740px;
            flex: 1 1 auto;
            color: rgba(0, 0, 0, .8);
            margin: auto;

            lookup[key] {
                cursor: pointer;
            }

            .section {
                position: relative;

                .vue-waypoint__waypoint {
                    position: absolute;
                    top: 70%;
                }

                .markdown {
                    position: relative;
                    flex: 1 1 auto;
                }
            }

            h1, h2, {
                font-weight: 700;
                font-style: normal;
                font-size: 40px;
                line-height: 1.04;
                letter-spacing: -.028em;
                margin: 15px 0;
                padding-bottom: 10px;
                border-bottom: 1px solid @color-border;

                a { color: inherit; }
            }

            h3, h4 {
                margin-top: 24px;
                margin-bottom: 16px;
                font-weight: 600;
                line-height: 1.25;
            }

            h1 { font-size: 2.6em; }
            h2 { font-size: 2.25em; }
            h4 { font-size: 1em; }

            p, span, table {
                font-family: blockstreet-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
                --x-height-multiplier: 0.35;
                --baseline-multiplier: 0.179;
                line-height: 1.58;
                letter-spacing: -.003em;
            }

            p { margin-bottom: 25px; }

            table {
                position: relative;
                background: @color-white;
                box-shadow: 0px 6px 6px -6px rgba(0, 0, 0, 0.075);
                display: flex;
                flex-direction: column;
                padding: 50px 0;

                thead {
                    display: flex;
                    flex-direction: column;

                    tr {
                        display: flex;
                        border-bottom: 1px solid @color-border;
                    }
                }

                tbody {
                    display: flex;
                    flex: 1 1 auto;
                    flex-direction: column;

                    tr {
                        border-bottom: 1px solid @color-border;
                        display: flex;
                        flex: 1 1 auto;

                        td {
                            vertical-align: top;
                            flex-grow: 1;
                            flex-basis: 0;

                            &:first-child { padding-left: 0; }
                            &:last-child { padding-right: 0; }
                        }

                        &:last-child { border-bottom: 0; }
                    }
                }

                th, td {
                    flex: 1 1 auto;
                    padding: 10px;
                }

                &:before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: @color-white;
                    top: 0;
                    left: -100%;
                    box-shadow: 0px 6px 6px -6px rgba(0, 0, 0, 0.075);
                }

                &:after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: @color-white;
                    top: 0;
                    right: -100%;
                    box-shadow: 0px 6px 6px -6px rgba(0, 0, 0, 0.075);
                }
            }
        }


        @media (min-width: @screen-desktop-min) {
            .education {
                max-width: 850px;
                font-size: 20px;

                h1, h2 { margin-top: 50px; }

                table {
                    max-width: (@screen-desktop-min);
                    width: 140%;
                    margin: 50px 0 50px -20%;
                }
            }
        }


        @media (min-width: @screen-laptop-min) and (max-width: @screen-laptop-max) {
            .education {
                margin-top: 50px;
                font-size: 18px;

                table { margin: 50px 0; }
            }
        }


        @media (max-width: @screen-laptop-max) {
            .education {
                table { width: 100%; }
            }
        }


        @media (max-width: @screen-tablet-max) {
            .education {
                padding: 20px;

                table {
                    padding: 10px 0;
                    margin: 25px 0;
                }
            }
        }
    }
</style>
