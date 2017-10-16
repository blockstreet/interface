<template>
    <div class="page page-about">
        <div class="content-body">
            <section class="white">
                <div class="about" v-html="content" v-if="content"></div>
            </section>

            <section class="grey">
                <div class="team">
                    <h1>Blockstreet Team</h1>

                    <div class="members">
                        <div class="member animate-slash">
                            <img class="profile" src="https://avatars0.githubusercontent.com/u/6503504?s=460&v=4" alt="profile">
                            <div class="name">Nick Lombardi</div>
                            <div class="responsibilities">Project Management, Engineering</div>
                            <div class="social">
                                <a href="https://github.com/nkmlombardi"><i class="fa fa-github"></i></a>
                                <a href="https://www.linkedin.com/in/nklombardi"><i class="fa fa-linkedin"></i></a>
                                <a href="https://angel.co/nlombardi">
                                    <img src="https://assets.angel.co/webpack/64bfdcefe79bd40c1c90e9096fd76255.svg" alt="Angelist" width="14">
                                    <!-- <i class="fa-angellist"></i> -->
                                </a>
                            </div>
                        </div>

                        <div class="member animate-slash">
                            <img class="profile" src="https://avatars2.githubusercontent.com/u/7926950?s=460&v=4" alt="profile">
                            <div class="name">Josh Semedo</div>
                            <div class="responsibilities">Content, News</div>
                            <div class="social">
                                <a href="https://github.com/Suhmedoh"><i class="fa fa-github"></i></a>
                                <a href="https://www.linkedin.com/in/josh-semedo-9a7498128"><i class="fa fa-linkedin"></i></a>
                            </div>
                        </div>

                        <div class="member animate-slash">
                            <img class="profile" src="https://avatars2.githubusercontent.com/u/14863147?s=460&v=4" alt="profile">
                            <div class="name">Kevin Conley</div>
                            <div class="responsibilities">Content</div>
                            <div class="social">
                                <a href="https://github.com/kmanc"><i class="fa fa-github"></i></a>
                                <a href="https://www.linkedin.com/in/conleykevin"><i class="fa fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="babel">
    export default {
        data() {
            return {
                content: false
            }
        },

        created() {
            this.$http.get('content/about/index.md').then((data) => { this.content = data })
        }
    }
</script>

<style lang="less">
    @import '~assets/less/partials/vars';

    .page-about {
        .content-body {
            padding: 0;
            min-height: 100vh !important;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
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

        section {
            &.white {
                background: #fff;
            }
        }

        .about, .team {
            max-width: 740px;
            flex: 1 1 auto;
            color: rgba(0, 0, 0, .8);
            margin: auto;
            height: 100%;
        }

        .team {
            padding: 50px 0;
        }

        .members {
            display: flex;
            flex: 1;
            justify-content: space-between;

            .member {
                display: flex;
                flex: 1;
                padding: 10px 0;
                flex-direction: column;
                max-width: 200px;
                cursor: pointer;

                .profile {
                    height: 200px;
                    width: 200px;
                }

                .responsibilities {
                    font-style: italic;
                }

                .name {
                    font-weight: 600;
                    padding: 10px 0;
                }

                .social {
                    display: flex;
                    justify-content: center;
                    padding: 15px 0;

                    a {
                        color: @color-text;
                        padding: 0 10px;
                        font-size: 1.5em;
                    }
                }
            }
        }

        .animate-slash {
            background-position: center;
            background-size: cover;
            position: relative;
            overflow: hidden;

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

        @media (min-width: @screen-desktop-min) {
            .about, .team {
                max-width: 850px;
                font-size: 20px;
                margin-top: 50px;
                margin-bottom: 50px;

                ul { margin-bottom: 25px; }
                h1, h2 { margin-top: 50px; }
            }
        }


        @media (min-width: @screen-laptop-min) and (max-width: @screen-laptop-max) {
            .about {
                margin-top: 50px;
                margin-bottom: 50px;
                font-size: 18px;

                ul { margin-bottom: 15px; }
                h1, h2 { margin-top: 50px; }
            }
        }
    }
</style>
