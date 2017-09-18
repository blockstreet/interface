<template>
    <div class="page page-home collection">
        <div class="content-body">
            <div class="news">
                <div class="item" v-for="(article, index) in articles">
                    <div class="header">
                        <!-- <h1 class="title" @click="enterArticle(article.slug)">{{ article.headline }}</h1> -->
                        <router-link
                            :to="{ name: 'news.single', params: { slug: article.slug } }"
                            class="title follow"
                            tag="a"
                        >
                            <h1>{{ article.headline }}</h1>
                        </router-link>

                        <div class="details">
                            <span class="author">
                                <span class="profile" style="background-image: url('/static/images/avatar-sign.png')"></span>
                                <a href="#">{{ article.author }}</a>
                            </span>
                            <span class="date">{{ article.dateFormatted }}</span>
                        </div>
                    </div>

                    <div
                        class="news-image"
                        :style="{
                            backgroundImage: 'url(' + `${source}/${environment}/images/${article.image}` + ')'
                        }">
                    </div>

                    <div class="news-body">
                        <div class="article-content markdown" v-html="article.contents"></div>

                        <router-link class="read-more-link" :to="{ name: 'news.single', params: { slug: article.slug } }">
                            <i class="fa fa-chevron-down"></i>
                            <span>Continue Reading</span>
                        </router-link>
                    </div>

                    <div class="footer">
                        <div class="tag">
                            <i class="fa fa-tags"></i> {{ article.tag }}
                        </div>

                        <div class="keep-reading">
                            <!-- <i class="fa fa-chevron-down"></i>
                            Keep Reading -->
                            <span class="words">{{ article.words }} words</span>
                        </div>

                        <div class="social">
                            <!-- <span class="facebook">
                                <i class="fa fa-facebook"></i>
                            </span>
                            <span class="twitter">
                                <i class="fa fa-twitter"></i>
                            </span>
                            <span class="reddit">
                                <i class="fa fa-reddit"></i>
                            </span>
                            <span class="link">
                                <i class="fa fa-link"></i>
                            </span> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    import moment from 'moment'

    export default {
        data() {
            return {
                metadata: [],
                contents: [],
                environment: null,
                source: null
            }
        },

        computed: {
            /**
             * The computed property needs to be calculated based on the contents property so that it is re-evaluated
             * at the correct time. If the property is calculated off of the metadata property it won't recompute when
             * a new XHR request completes for an article's content.
             */
            articles() {
                if (!this.metadata.length) return []

                return this.contents
                    .map((entry) => {
                        const meta = this.metadata.find(item => item.id === entry.id)
                        return Object.assign({}, meta, {
                            dateFormatted: moment(meta.date).fromNow(),
                            contents: this.excerpt(entry.content),
                            words: entry.content.split(' ').length
                        })
                    })
                    .sort((previous, current) => moment(current.date).valueOf() - moment(previous.date).valueOf())
            }
        },

        /**
         * Retrieve the index for the news page, then asynchronously fetch the contents for each article.
         */
        mounted() {
            this.environment = process.env.NODE_ENV === 'development' ? 'staging' : 'master'
            this.source = 'https://raw.githubusercontent.com/blockstreet/content'

            this.$http.get('content/news/index.json').then((metas) => {
                this.metadata = metas

                this.metadata.forEach((meta) => {
                    this.$http.get(`content/news/${meta.file}.md`).then((article) => {
                        this.contents.push({ id: meta.id, content: article })
                    })
                })
            })
        },

        methods: {
            /**
             * Create an excerpt from a block of text
             * @param  {String} [str] - Text block in markdown format
             * @return {String}       - The first two paragraphs of the text block
             */
            excerpt(str) {
                // Filter for paragraphs
                const strArr = str.split('\n').reduce((a, paragraph) => {
                    const isHeading = paragraph[0] === '#'
                    const isUL = paragraph[0] === '* '

                    // Match for strings that:
                    // 1. Begins with a number
                    // 2. Followed by '.'
                    // 3. Followed by a whitespace
                    const isOL = paragraph.match(/^\d.\s/g)

                    return !!paragraph && !isHeading && !isUL && !isOL
                        ? a.concat(paragraph)
                        : a
                }, [])

                // Take first two paragraphs
                return strArr[0] + '\n\n' + strArr[1] + '\n\n' + strArr[2] // eslint-disable-line
            }
        }
    }
</script>

<style lang="less">
    @import '~assets/less/partials/vars';

    .page-home.collection {
        .news {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            flex-wrap: wrap;

            .item {
                flex: 1;
                background: @color-white;
                border: 1px solid #e8e8e8;
                overflow: hidden;
                flex-direction: column;
                position: relative;
                padding-bottom: 50px;
                margin-bottom: 50px;

                .news-image {
                    width: 100%;
                    background-position: center;
                    background-size: cover;
                    position: relative;
                    overflow: hidden;

                    @-webkit-keyframes shine {
                        100% { left: 125%; }
                    }

                    @keyframes shine {
                        100% { left: 125%; }
                    }
                }

                .header {
                    a.title {
                        font-weight: 700;
                        font-style: normal;
                        letter-spacing: -.028em;
                        display: inline-block;
                        color: inherit;

                        &.follow {
                            cursor: pointer;
                        }
                    }

                    .details {
                        display: flex;
                        flex-direction: row;
                        font-size: 18px;
                        flex-wrap: nowrap;

                        .date {
                            flex: 1;
                            text-align: right;
                            line-height: 26px;
                            color: @color-placeholder;
                        }

                        .author {
                            flex: 2;
                            line-height: 26px;
                            margin-top: 3px;

                            .profile {
                                height: 26px;
                                width: 26px;
                                display: block;
                                float: left;
                                margin-right: 12.5px;
                                border-radius: 50%;

                                background-size: cover;
                                background-position: center center;
                                background-color: #F9F9F9;
                            }
                        }
                    }
                }

                .news-body {
                    display: flex;
                    flex-direction: column;
                    flex: 1 1 auto;

                    font-family: blockstreet-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
                    --x-height-multiplier: 0.35;
                    --baseline-multiplier: 0.179;
                    letter-spacing: .01rem;
                    font-weight: 400;
                    font-style: normal;
                    letter-spacing: -.003em;
                    line-height: 1.58;

                    // Limit height
                    // max-height: 500px;
                    //
                    // &:after {
                    //     content: '';
                    //     bottom: 53px;
                    //     left: 0;
                    //     display: flex;
                    //     height: 200px;
                    //     width: 100%;
                    //     position: absolute;
                    //
                    //     /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&0+1,1+100 */
                    //     background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 1%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
                    //     background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,0) 1%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
                    //     background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0) 1%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                    //     filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
                    // }

                    p {
                        margin-bottom: 20px;
                        & + ul { margin-top: -20px; }
                    }

                    ul {
                        margin: 20px 0;

                        li {
                            &:before {
                                content: '-';
                                margin: 0 15px 0 5px;
                            }
                        }
                    }

                    .read-more-link {
                        display: flex;
                        margin: 25px auto 5px auto;
                        background: #f0f0f0;
                        color: #4a4a4a;
                        border-radius: 3px;
                        height: 40px;
                        padding: 0 20px;

                        i {
                            display: flex;

                            &:before {
                                margin: auto 0;
                            }
                        }

                        span {
                            font-size: 0.9em;
                            margin: auto 0 auto 10px;
                            text-align: center;
                            font-family: 'Proxima Nova', sans-serif;
                            font-weight: 600;
                        }
                    }
                }

                .footer {
                    border-top: 1px solid #e8e8e8;
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    padding: 10px 40px;
                    color: #4a4a4a;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background: @color-white;

                    & > div { height: 32px; }

                    .tag {
                        flex: 1 1 auto;
                        text-transform: uppercase;
                        font-size: 16px;
                        line-height: 32px;
                        font-weight: 700;
                        letter-spacing: 0.5px;
                        max-width: 200px;
                    }

                    .keep-reading {
                        text-align: center;
                        flex: 2 0 auto;
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 32px;
                        letter-spacing: 0.5px;

                        i { margin-right: 10px; }

                        .words {
                            margin-left: 8px;
                            font-weight: 700;
                        }
                    }

                    .social {
                        flex: 1 1 auto;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        height: 100%;
                        text-align: right;
                        max-width: 200px;

                        span {
                            background-color: #f0f0f0;
                            color: #4a4a4a;
                            flex: 1 1 auto;
                            border-radius: 50%;
                            font-size: 16px;
                            display: inline-block;

                            i.fa {
                                width: 32px;
                                height: 32px;
                                line-height: 32px;
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }


        @media (min-width: @screen-desktop-min) {
            .news { margin: 50px auto; }
        }


        @media (min-width: @screen-laptop-min) {
            .news {
                max-width: 1000px;
                font-size: 20px;

                .item {
                    min-height: 360px;
                    min-width: 600px;
                    max-width: 100%;

                    .header { padding: 40px 40px 30px 40px; }

                    .news-image {
                        height: 400px;

                        &:before {
                            position: absolute;
                            top: 0;
                            left: -75%;
                            z-index: 2;
                            display: block;
                            content: '';
                            width: 50%;
                            height: 100%;
                            background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%);
                            background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%);
                            -webkit-transform: skewX(-25deg);
                            transform: skewX(-25deg);
                        }

                        &:hover::before {
                            -webkit-animation: shine .75s;
                            animation: shine .75s;
                        }
                    }

                    .header {
                        h1 { font-size: 42px; line-height: 1; }
                    }

                    .news-body {
                        padding: 30px 40px;
                    }
                }
            }
        }


        @media (min-width: @screen-laptop-min) and (max-width: @screen-laptop-max) {
            .content-body { padding: 20px; }
            .news { margin: 0px auto; }
        }


        @media (max-width: @screen-tablet-max) {
            .news {
                font-size: 18px;

                .item {
                    width: 100%;

                    &:not(:first-child) { margin-top: 20px; }

                    .header { padding: 20px; }
                    .news-image { height: 250px; }

                    .news-body {
                        padding: 20px;

                        h1 { font-size: 32px; }
                    }
                }
            }
        }

        @media (max-width: @screen-mobile-max) {
            .news {
                .item {
                    border-left: 0;
                    border-right: 0;
                    padding-bottom: 100px;
                    margin-bottom: 20px;

                    &:first-child { border-top: 0; }
                    &:last-child { margin-bottom: 0; }

                    .footer {
                        flex-direction: column;

                        & > div {
                            text-align: center !important;
                            min-width: 100%;
                            flex: 1 1 auto;
                        }
                    }
                }
            }
        }
    }
</style>
