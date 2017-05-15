<template>
    <div class="page page-education">
        <div class="content-body">
            <div v-if="information" class="education">
                <div
                    class="section"
                    v-for="(section, index) in information"
                    :class="{ 'active': waypoints.includes(index) }"
                    ref="section">
                    <v-waypoint
                        v-on:waypoint-in="waypointIn(index)"
                        v-on:waypoint-out="waypointOut(index)">
                    </v-waypoint>
                    <markdown
                        ref="markdown"
                        class="markdown"
                        :toc="true"
                        :toc-anchor-link="false"
                        :source="section">
                    </markdown>
                </div>
            </div>
            <div class="help-gutter">
                <div class="helper" :style="{ top: helper.offset + 'px' }">
                    <div v-for="(item, key) in helper.dictionary" class="term" :id="'lookup-' + key">
                        <div class="title">{{ key.replace('-', ' ') }}</div>
                        <p class="definition">{{ item }}</p>
                    </div>
                    <div v-if="helper.keys.length === 0">
                        Nothing to show.
                    </div>
                </div>
            </div>
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

        watch: {
            waypoints(value) {
                if (value.length > 0) {
                    const index = value[value.length - 1]
                    this.helper.element = this.$refs.section[index]
                    this.helper.offset = this.helper.element.offsetTop
                    this.helper.height = this.helper.element.clientHeight
                }
            }
        },

        mounted() {
            Vue.$http.get('https://raw.githubusercontent.com/blockstreet/content/master/education.md')
                .then((response) => { this.information = this.splitMarkdown(response) })
                .catch(error => console.log(error))

            Vue.$http.get('https://raw.githubusercontent.com/blockstreet/content/master/terms.json')
                .then((response) => { this.helper.dictionary = response })
                .catch(error => console.log(error))
        },

        methods: {
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
            },

            splitMarkdown(text) {
                const sections = []
                let section

                function addSection() {
                    if (section) sections.push(section.join('\n'))
                }

                text.split('\n').forEach((line) => {
                    if (/^([#]{1,2}\s\[)/.test(line)) {
                        addSection()
                        section = []
                    }

                    (section = section || []).push(line)
                })

                addSection()
                return sections
            }
        }
    }
</script>

<style lang="less">
    @import '~assets/less/partials/vars';

    .page-education {
        background: @color-white;

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

            p {
                font-family: blockstreet-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
                margin-bottom: 25px;
                --x-height-multiplier: 0.35;
                --baseline-multiplier: 0.179;
                letter-spacing: .01rem;
                font-weight: 400;
                font-style: normal;
                letter-spacing: -.003em;
                line-height: 1.58;
            }

            table {
                background: transparent;

                td { vertical-align: top; }
            }
        }


        @media (min-width: @screen-desktop-min) {
            .education {
                margin-left: auto;
                margin-right: 75px;
                max-width: 850px;

                .section {
                    margin-bottom: 125px;

                    &.active {
                        &:before {
                            content: '';
                            position: absolute;
                            width: 1px;
                            height: 100%;
                            left: -50px;
                            top: 0;
                            background: @color-link;
                            opacity: 0.5;
                        }

                        .helpers { display: flex; }
                    }

                    h1 > a, h2 > a {
                        position: relative;
                        margin-left: -50px;
                        padding-left: 50px;

                        &:hover {
                            &:before {
                                content: '\f0c1';
                                display: block;
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 45px;
                                margin-left: 5px;
                                height: 2em;
                                font-family: 'FontAwesome';
                                font-size: 0.6em;
                                line-height: 2em;
                                text-align: center;
                            }
                        }
                    }
                }
            }

            .markdown {
                table {
                    font-size: 18px;
                    margin: 50px 0;

                    thead {
                        th {
                            background: transparent;
                            border-top: 0;
                        }
                    }

                    th, td { width: 50%; padding: 15px 0; }
                    th:first-child, td:first-child { padding-right: 10px; }
                    th:last-child, td:last-child { padding-left: 10px; }
                }
            }
        }

        @media (max-width: @screen-laptop-max) {
            .help-gutter { display: none; }
        }

        @media (min-width: @screen-laptop-min) {
            .education {
                margin-top: 50px;

                .section {
                    p {
                        font-size: 21px;
                        margin-bottom: 30px;
                        letter-spacing: -.003em;
                    }
                }
            }
        }

        @media (max-width: @screen-tablet-max) {
            .education {
                padding: 20px;

                .section {
                    margin-bottom: 50px;

                    p {
                        font-size: 18px;
                        margin-bottom: 21px;
                        letter-spacing: -.004em;
                    }
                }

                .markdown {
                    table {
                        margin: 25px 0;
                    }
                }
            }
        }
    }
</style>
