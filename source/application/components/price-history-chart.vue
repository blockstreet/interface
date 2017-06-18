<script lang="babel">
    export default {
        props: {
            series: {
                type: Array
            },
            row: {
                type: String,
                default: 'even'
            },
            color: {
                type: String,
                default: '0, 0, 0'
            },
            price: {
                type: Number,
                default: 0
            },
            zoom: {
                type: Function,
                default: () => { }
            }
        },

        data() {
            return {
                navigator: JSON.parse(JSON.stringify(this.series[0].data))
            }
        },

        computed: {
            options() {
                return {
                    chart: {
                        animation: true,
                        type: 'area',
                        spacingLeft: 0,
                        spacingRight: 0,
                        spacingTop: 10,
                        spacingBottom: 0,
                        paddingLeft: 0,
                        marginLeft: 0,
                        marginBottom: 2,
                        style: {
                            fontFamily: '"Open Sans", sans-serif',
                            fontSize: '12px'
                        },
                        zoomType: 'x',
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        height: '350px'
                    },
                    tooltip: {
                        style: {
                            padding: 15,
                            fontWeight: 'bold'
                        },
                        pointFormat: (this.price >= 0.1 // eslint-disable-line
                            ? '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>${point.y:.4f}</b>' // eslint-disable-line
                            : '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>${point.y:.8f}</b>'), // eslint-disable-line
                        dateTimeLabelFormats: {
                            millisecond: '%A, %b %e, %H:%M:%S.%L',
                            second: '%A, %b %e, %H:%M:%S',
                            minute: '%A, %b %e, %H:%M',
                            hour: '%A, %b %e, %H:%M',
                            day: '%A, %b %e, %Y',
                            week: 'Week from %A, %b %e, %Y',
                            month: '%B %Y',
                            year: '%Y'
                        }
                    },
                    rangeSelector: {
                        enabled: true,
                        height: 30,
                        buttonTheme: {
                            fill: this.row === 'even' ? '#fbfcfd' : '#eceff4',
                            r: 1,
                            style: {
                                color: 'rgba(0, 0, 0, 0.80)'
                            },
                            states: {
                                select: {
                                    fill: `rgba(${this.color}, 0.75)` || 'rgba(102, 133, 194, 0.3)',
                                    style: {
                                        color: this.row === 'even' ? '#fbfcfd' : '#eceff4',
                                        fontWeight: 'normal'
                                    }
                                },
                                hover: {
                                    fill: `rgba(${this.color}, 0.75)` || 'rgba(102, 133, 194, 0.3)',
                                    style: {
                                        color: this.row === 'even' ? '#fbfcfd' : '#eceff4',
                                        fontWeight: 'normal'
                                    }
                                },
                                disabled: {
                                    style: {
                                        color: 'rgba(0, 0, 0, 0.40)'
                                    }
                                }
                            }
                        },
                        buttonPosition: {
                            x: 10,
                            y: 8
                        },
                        buttonSpacing: 0,
                        inputPosition: {
                            x: -10,
                            y: -2
                        },
                        inputBoxHeight: 18,
                        inputBoxBorderColor: '#ccd6eb',
                        inputEditDateFormat: '%m-%e-%Y',
                        inputStyle: {
                            fontWeight: 'normal'
                        },
                        buttons: [{
                            type: 'day',
                            count: 1,
                            text: '1d'
                        }, {
                            type: 'week',
                            count: 1,
                            text: '1w'
                        }, {
                            type: 'month',
                            count: 1,
                            text: '1m'
                        }, {
                            type: 'month',
                            count: 3,
                            text: '3m'
                        }, {
                            type: 'year',
                            count: 1,
                            text: '1y'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],
                        selected: 6,
                        inputEnabled: false
                    },
                    scrollbar: {
                        enabled: false,
                        liveRedraw: false,
                        barBackgroundColor: 'transparent',
                        barBorderWidth: 0,
                        buttonBackgroundColor: 'transparent',
                        buttonBorderWidth: 0,
                        buttonArrowColor: 'transparent',
                        rifleColor: '#555',
                        trackBackgroundColor: 'transparent',
                        trackBorderWidth: 0,
                        trackBorderColor: 'silver'
                    },
                    navigator: {
                        adaptToUpdatedData: false,
                        height: 50,
                        outlineWidth: 0,
                        maskFill: `rgba(${this.color}, 0.075)` || 'rgba(102, 133, 194, 0.3)',
                        series: {
                            color: `rgba(${this.color}, 0.75)`,
                            lineWidth: 1.5,
                            data: this.navigator
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    xAxis: {
                        events: {
                            afterSetExtremes: this.zoom
                        },
                        minRange: 3600 * 1000,
                        crosshair: {
                            color: '#e5e5e5',
                            width: 2,
                            zIndex: 2,
                            dashStyle: 'shortdash'
                        },
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            minute: '%I:%M %p',
                            hour: '%I:%M %p',
                            day: '%e. %b',
                            week: '%e. %b',
                            month: '%b \'%y',
                            year: '%Y'
                        },
                        startOnTick: false,
                        endOnTick: false,
                        gridLineWidth: 0,
                        minPadding: 0,
                        maxPadding: 0,
                        tickLength: 0
                    },
                    yAxis: {
                        labels: {
                            format: '\${value}' // eslint-disable-line
                        },
                        offset: -50,
                        opposite: false,
                        gridlineWidth: 1,
                        gridLineColor: this.row === 'even' ? '#d8e2e7' : '#eceff4',
                        floor: 0
                    },

                    // Apply default series properties to incoming series
                    series: this.series.map(entry => Object.assign({
                        name: 'Price',
                        data: [],
                        type: 'line',
                        lineWidth: 1.5,
                        color: `rgba(${this.color}, 0.75)`,
                        states: {
                            hover: {
                                lineWidth: 1.5
                            }
                        },
                        dataGrouping: {
                            enabled: false
                        }
                    }, entry)) || []
                }
            }
        }
    }
</script>

<template lang="html">
    <highstock class="chart-container" ref="chart":options="options"></highstock>
</template>

<style lang="less">

</style>
