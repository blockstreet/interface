/**
 * Takes in a series of graph lines as an argument, and allows you to overwrite
 * the existing styling for a series. This establishes a default style for
 * charts but allows you the autonomy to customize them.
 *
 * @param  {[array]}    series  array of overwriting arguments
 * @return {[object]}   chart   configuration
 */
export default configuration => ({
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
        pointFormat: (configuration.price >= 0.1 // eslint-disable-line
            ? '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>${point.y:.4f}</b>' // eslint-disable-line
            : '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>${point.y:.8f}</b>'), // eslint-disable-line
        dateTimeLabelFormats: {
            minute: '%I:%M:%S %p',
            hour: '%l:%M %p',
            day: '%e. %b',
            week: '%e. %b',
            month: '%b \'%y',
            year: '%Y'
        },
        xDateFormat: '%A, %B %e, %Y'
    },
    rangeSelector: {
        enabled: true,
        height: 30,
        buttonTheme: {
            fill: configuration.row === 'even' ? '#fbfcfd' : '#eceff4',
            r: 1,
            style: {
                color: 'rgba(0, 0, 0, 0.80)'
            },
            states: {
                select: {
                    fill: `rgba(${configuration.color}, 0.75)` || 'rgba(102, 133, 194, 0.3)',
                    style: {
                        color: configuration.row === 'even' ? '#fbfcfd' : '#eceff4',
                        fontWeight: 'normal'
                    }
                },
                hover: {
                    fill: `rgba(${configuration.color}, 0.75)` || 'rgba(102, 133, 194, 0.3)',
                    style: {
                        color: configuration.row === 'even' ? '#fbfcfd' : '#eceff4',
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
        selected: 6
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
        height: 50,
        outlineWidth: 0,
        maskFill: `rgba(${configuration.color}, 0.075)` || 'rgba(102, 133, 194, 0.3)',
        series: {
            color: `rgba(${configuration.color}, 0.75)`,
            lineWidth: 1.5
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
            afterSetExtremes: configuration.onZoom
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
        gridLineColor: configuration.row === 'even' ? '#d8e2e7' : '#eceff4',
        floor: 0
    },
    series: configuration.series.map(entry => Object.assign({
        name: 'Price',
        data: [],
        type: 'line',
        lineWidth: 1.5,
        color: `rgba(${configuration.color}, 0.75)`,
        states: {
            hover: {
                lineWidth: 1.5
            }
        }
    }, entry)) || []
})
