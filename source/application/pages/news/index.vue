<template>
    <div class="page page-home">
        <div class="content-body">
            <div class="news">
                <div class="item" v-for="article in articles">
                    <div class="news-image" :style="{ backgroundImage: 'url(' + article.image + ')' }"></div>

                    <div class="news-body">
                        <h1 class="title">{{ article.headline }}</h1>

                        <div class="details">
                            <span class="date">{{ article.date }}</span>
                            <span class="author">by <a href="#">{{ article.author }}</a></span>
                        </div>

                        <markdown
                            ref="markdown"
                            class="markdown"
                            :toc="true"
                            :toc-anchor-link="false"
                            :source="article.excerpt">
                        </markdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    import Vue from 'vue'
    import VueMarkdown from 'vue-markdown'

    export default {
        components: {
            markdown: VueMarkdown
        },

        data() {
            return {
                articles: [{
                    id: '0000-0000-0000',
                    headline: 'Blockstreet Launches',
                    image: 'https://raw.githubusercontent.com/nkmlombardi/desktop-backgrounds/master/mountain-purple.jpg',
                    date: 'May 2nd, 2017',
                    author: 'The Blockstreet Team',
                    excerpt: ''
                }]
            }
        },

        mounted() {
            Vue.$http.get('https://raw.githubusercontent.com/nkmlombardi/blockstreet/staging/news/04-04-2017.md')
                .then((response) => {
                    this.articles[0].excerpt = response
                })
                .catch(error => console.log(error))
        },

        methods: {
            enterArticle(id) {
                Vue.router.push({ name: 'news.singleton', params: { id } })
            }
        }
    }
</script>

<style lang="less">
    @import '~assets/less/partials/vars';

    .page-home {
        .news {
            display: flex;
            flex-direction: row;
            flex: 1 1 auto;
            height: 100%;
            flex-wrap: wrap;

            .item {
                flex: 1;
                background: @color-bg-grey-light;
                border: 1px solid @color-border-light;
                border-radius: 3px;
                overflow: hidden;
                flex-direction: column;
                position: relative;

                .news-image {
                    width: 100%;
                    height: 180px;
                    background-position: center;
                    background-size: cover;
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;

                    @-webkit-keyframes shine {
                        100% {
                            left: 125%;
                        }
                    }

                    @keyframes shine {
                        100% {
                            left: 125%;
                        }
                    }
                }

                .news-body {
                    display: flex;
                    flex-direction: column;
                    flex: 1 1 auto;

                    h1 {
                        font-weight: 700;
                        font-style: normal;
                        font-size: 36px;
                        line-height: 1.04;
                        letter-spacing: -.028em;
                        cursor: pointer;
                    }

                    .details {
                        border-top: 1px solid @color-border;
                        padding-top: 10px;
                        display: flex;
                        flex-direction: row;
                        margin-top: 10px;
                        font-size: 18px;
                        flex-wrap: wrap;

                        .author { margin-left: 5px; }
                    }

                    p {
                        margin-top: 10px;
                        font-size: 21px;
                    }

                    ul {
                        font-size: 21px;

                        li {
                            &:before {
                                content: '-';
                                margin: 0 15px 0 5px;
                            }
                        }
                    }
                }
            }
        }

        @media (min-width: @screen-laptop-min) {
            .news {
                .item {
                    min-height: 360px;
                    min-width: 600px;
                    max-width: 100%;
                    margin: 10px;

                    .news-image {
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

                    .news-body {
                        padding: 30px;

                        h1 { font-size: 36px; }
                        p { font-size: 21px; }
                    }
                }
            }
        }

        @media (min-width: @screen-desktop-min) {
            .news {
                padding: 30px;
            }
        }

        @media (min-width: @screen-tablet-min) and (max-width: @screen-tablet-max) {
            .news { padding: 20px; }
        }

        @media (max-width: @screen-tablet-max) {
            .news {
                flex-direction: column;

                .item {
                    min-width: 100%;
                    max-width: 100%;
                    margin-bottom: 20px;

                    &:last-child { margin-bottom: 0; }

                    .news-body {
                        padding: 20px;

                        h1 { font-size: 32px; }
                        p, ul { font-size: 18px; }
                    }
                }
            }
        }

        @media (max-width: @screen-mobile-max) {
            .news {
                .item {
                    padding: 0;
                    border-left: 0;
                    border-right: 0;

                    &:first-child { border-top: 0; }
                    &:last-child { margin-bottom: 0; }

                    .news-body {
                        .details {
                            justify-content: space-between;

                            .author { margin-left: 0; }
                        }
                    }
                }
            }
        }
    }
</style>
