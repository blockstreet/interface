<template>
    <div class="page page-education">
        <div class="content-body">
            <div class="breadcrumbs">
                <div class="breadcrumb" v-for="(breadcrumb, index) in breadcrumbs">
                    <div class="title">
                        {{ breadcrumb }}
                    </div>

                    <span class="spacer" v-if="index !== breadcrumbs.length - 1">
                        <i class="fa fa-chevron-right"></i>
                    </span>
                </div>
            </div>

            <div class="education" v-if="information" v-html="information"></div>
        </div>

        <progress value="0">
            <div class="progress-container">
                <span class="progress-bar"></span>
            </div>
        </progress>
    </div>
</template>

<script lang="babel">
    export default {
        metaInfo() {
            return {
                title: `${this.section.meta.title || 'Education'} | Blockstreet`,
                meta: [
                    { description: 'Straight forward blockchain and cryptocurrency information for non-technical readers.' }
                ]
            }
        },

        data() {
            return {
                information: false,
                helper: {
                    element: {},
                    offset: 0,
                    height: 100,
                    keys: {},
                    dictionary: {}
                },
                references: this.$refs,
                progress: []
            }
        },

        computed: {
            section() { return this.$route },
            breadcrumbs() {
                return this.$route.name.split('.')
            }
        },

        watch: {
            section(route) {
                this.loadContent(route)
            }
        },

        mounted() {
            this.progress = window.localStorage.getItem(this.$route.name)
            this.loadContent(this.$route)
        },

        methods: {
            loadContent(route) {
                let path = route.path
                if (route.meta.type === 'index') path = `${path}/index`

                this.$http.get(`content${path}.md`)
                    .then((response) => {
                        this.information = response
                        document.getElementsByClassName('content-body')[0].scrollTop = 0

                        const $ = window.jQuery
                        let currentRoute = route.name

                        setTimeout(() => {
                            if (currentRoute === this.$route.name) {
                                console.log(`${route.name} read, progress updated!`)
                                window.localStorage.setItem(route.name, true)
                            }
                        }, 5000)

                        setTimeout(() => {
                            $('p').hide()
                            $('ul').hide()
                            $('h3').hide()
                            $('h4').hide()

                            $('h1').nextAll().each(function activate() {
                                if (this.tagName === 'H2') return false // stop execution
                                return $(this).show()
                            })

                            const that = this

                            $('h2').click(function clickHeader() {
                                // console.log('header2 clicked', this, context, that)

                                $(this).toggleClass('active')

                                currentRoute = route.name

                                setTimeout(() => {
                                    if (currentRoute === that.$route.name) {
                                        console.log(`${route.name}.${this.id} read, progress updated!`)
                                        window.localStorage.setItem(`${route.name}.${this.id}`, true)
                                    }
                                }, 5000)

                                $(this).nextAll().each(function toggleSection() {
                                    if (this.tagName === 'H2') return false // stop execution
                                    // if (this.tagName === 'H3') return false // stop execution
                                    // if (this.tagName === 'H4') return false // stop execution

                                    return $(this).toggle()
                                })
                            })

                            $(document).ready(() => {
                                const getMax = () => $(document).height() - $(window).height()
                                const getValue = () => $(window).scrollTop()
                                let progressBar

                                if ('max' in document.createElement('progress')) {
                                    // Browser supports progress element
                                    progressBar = $('progress')

                                    // Set the Max attr for the first time
                                    progressBar.attr({ max: getMax() })

                                    // On scroll only Value attr needs to be calculated
                                    $(document).on('scroll', () => progressBar.attr({ value: getValue() }))

                                    // On resize, both Max/Value attr needs to be calculated
                                    $(window).resize(() => progressBar.attr({ max: getMax(), value: getValue() }))
                                } else {
                                    progressBar = $('.progress-bar')
                                    let max = getMax()
                                    let value
                                    let width

                                    const getWidth = () => {
                                        // Calculate width in percentage
                                        value = getValue()
                                        width = (value / max) * 100
                                        width = `${width}%`
                                        return width
                                    }

                                    const setWidth = () => progressBar.css({ width: getWidth() })

                                    $(document).on('scroll', setWidth)
                                    $(window).on('resize', () => {
                                        // Need to reset the Max attr
                                        max = getMax()
                                        setWidth()
                                    })
                                }
                            })
                        })
                    })
                    .catch(error => console.log(error))
            }
        }
    }
</script>

<style lang="less">
    @import '~assets/less/partials/vars';

    progress {
      /* Positioning */
      position: fixed;
      left: 0;
      bottom: 0;

      /* Dimensions */
      width: 100%;
      height: 5px;

      /* Reset the appearance */
      -webkit-appearance: none;
         -moz-appearance: none;
              appearance: none;

      /* Get rid of the default border in Firefox/Opera. */
      border: none;

      /* Progress bar container for Firefox/IE10+ */
      background-color: transparent;

      /* Progress bar value for IE10+ */
      color: red;
    }

    .page-education {
        .illustration {
            background: #9e9e9e0f;
            display: flex;
            justify-content: center;
            padding: 30px 0;
            margin: 30px 0;
            position: relative;

            &:before, &:after {
                background: #9e9e9e0f;
                top: 0;
                width: 100%;
                height: 100%;
                position: absolute;
                content: '';
            }

            &:before {
                left: -100%;
            }

            &:after {
                right: -100%;
            }
        }

        .content-body {
            padding: 0;
            min-height: 100vh !important;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
        }

        .breadcrumbs {
            display: flex;
            margin: 50px auto 0 auto;
            flex: 0 0 auto;

            .breadcrumb {
                display: flex;
                text-transform: uppercase;
                font-size: 0.9em;
                font-family: 'Proxima Nova', sans-serif;
                font-weight: 600;
            }

            .spacer {
                margin: 0 25px;
            }
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
            height: 100%;

            lookup[key] {
                cursor: pointer;
            }

            .section {
                position: relative;

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

            h2 {
                cursor: pointer;
                padding-left: 50px;
                position: relative;

                &:before {
                    font-family: FontAwesome;
                    content: '\f054';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 50px;
                    height: 100%;
                    text-align: center;
                }

                &.active {
                    &:before { content: '\f078'; }
                }
            }

            h3, h4 {
                margin-top: 24px;
                margin-bottom: 6px;
                font-weight: 700;
                line-height: 1.25;
            }

            h1 { font-size: 2.5em; }
            h2 { font-size: 1.65em; }
            h3 { font-size: 1.40em; }
            h4 { font-size: 1.10em; }

            p, span {
                font-family: blockstreet-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
                --x-height-multiplier: 0.35;
                --baseline-multiplier: 0.179;
                line-height: 1.58;
                letter-spacing: -.003em;
            }

            p { margin-bottom: 25px; }

            ul {
                li {
                    margin-left: 35px;
                    position: relative;

                    &:before {
                        content: '-';
                        position: absolute;
                        right: 100%;
                        top: 0;
                        width: 35px;
                        text-align: center;
                    }
                }
            }

            table {
                position: relative;
                background: @color-white;
                box-shadow: 0px 6px 6px -6px rgba(0, 0, 0, 0.075);
                display: flex;
                flex-direction: column;
                padding: 25px 0;

                thead {
                    display: flex;
                    flex-direction: column;

                    tr {
                        display: flex;
                        border-bottom: 1px solid @color-border;
                        font-weight: 700;
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
                            padding: 8px 10px;

                            font-family: blockstreet-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
                            --x-height-multiplier: 0.35;
                            --baseline-multiplier: 0.179;
                            // line-height: 1.58;
                            letter-spacing: -.003em;
                            font-size: 0.9em;

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
            .breadcrumbs {
                width: 850px;
            }

            .education {
                max-width: 850px;
                font-size: 20px;
                margin-bottom: 50px;

                h1, h2 { margin-top: 50px; }

                table {
                    max-width: (@screen-desktop-min);
                    width: 140%;
                    margin: 50px 0 50px -20%;
                }
            }
        }


        @media (min-width: @screen-laptop-min) and (max-width: @screen-laptop-max) {
            .breadcrumbs {
                width: 740px;
                margin: 50 auto 0 auto;
            }

            .education {
                margin-bottom: 50px;
                font-size: 18px;

                h1, h2 { margin-top: 50px; }
                table { margin: 50px 0; }
            }
        }


        @media (max-width: @screen-laptop-max) {
            .education {
                table { width: 100%; }
            }
        }


        @media (max-width: @screen-tablet-max) {
            .breadcrumbs {
                margin-top: 25px;
                max-width: 740px;
                padding: 0 20px;
                font-size: 1.4em;
                flex-wrap: wrap;
                flex: 1 1 auto;
                flex-direction: column;

                .breadcrumb {
                    flex-direction: column;
                    text-align: center;
                }

                .spacer {
                    i {
                        transform: rotate(90deg);
                    }
                }
            }

            .education {
                font-size: 17px;
                padding: 20px;

                table {
                    padding: 10px 0;
                    margin: 25px 0;
                }
            }
        }
    }
</style>
