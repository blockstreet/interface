<template>
    <div class="content home">
        <div class="content-body">
            <div class="news">
                <div class="item" >
                    <div class="news-image" :style="{ backgroundImage: 'url(' + article.image + ')' }"></div>

                    <div class="news-body">
                        <h1 class="title">{{ article.headline }}</h1>

                        <div class="details">
                            <span class="date">{{ article.date }}</span>
                            <span class="author">by <a href="#">{{ article.author }}</a></span>
                        </div>

                        <p>{{ article.excerpt }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    export default {
        data() {
            return {
                article: {
                    id: '0000-0000-0000',
                    headline: 'Bitcoin Core Roadmap Unveils Signature Optimization Plan',
                    image: 'https://raw.githubusercontent.com/nkmlombardi/desktop-backgrounds/master/mountain-purple.jpg',
                    date: 'February 23rd, 2017 at 12:00 AM',
                    author: 'Nick Lombardi',
                    excerpt: `Bitcoin Core developers released a new technology roadmap today that charts the project's planned transition from its
                        current digital signature algorithm to a more advanced alternative.`
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '~assets/less/partials/vars';

    .content-body {
        overflow-y: scroll;
    }

    .news {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        padding: 25px 0;

        .item {
            flex: 1 1 auto;
            background: @color-bg-grey-light;
            border: 1px solid @color-border-light;
            margin: 15px 30px;
            min-height: 360px;
            border-radius: 5px;
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
                display: flex;
                flex-direction: column;
                flex: 1 1 auto;

                h1.title {
                    font-size: 1.6rem;
                    flex: 1 1 auto;
                }

                div.details {
                    display: flex;
                    flex-direction: row;
                    margin-top: 10px;

                    span.date {
                        font-size: 16px;
                        flex-shrink: 0.5;
                    }

                    span.author {
                        font-size: 16px;
                        flex-shrink: 0.5;
                        margin-left: 5px;
                    }
                }

                p {
                    margin-top: 10px;
                }
            }
        }
    }
</style>
