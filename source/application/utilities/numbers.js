import numeral from 'numeral'

export default {
    padLeft(number, size) {
        return (`0000/${number}`).substr(-size)
    },

    padRight(input) {
        return (`${input.substring(0, 2)}/${input.substring(2, 4)}`)
    },

    fractional(number) {
        number = Number(number).toFixed(4)
        const numbers = String(number).split('.')

        let integers = this.padLeft(Number(numbers[0]), 5)
        let decimals = number >= 0.1 ? this.padRight(numbers[1]) : numbers[1]

        if (integers.includes('/')) {
            integers = integers.replace('/', '</span><span class="main">')
            integers = `<span class="zero">${integers}`
        }

        if (decimals.includes('/')) {
            if (String(number[1]).length > 2) {
                decimals = `${decimals.slice(0, 2)}<span class="low">${decimals.slice(2, decimals.length)}</span>`
            }

            decimals = decimals.replace('/', '</span><span class="zero">')
            decimals = `${decimals}</span>`
        }

        return `${integers}.${decimals}`
    },

    /**
     * Convert number to percent format. Negative percentages are already prefixed with a "-" sign.
     */
    percent(input) {
        if (!input) return false
        const number = numeral(input)
        let format = '+0,0.00'

        if (number.value() >= 1000000) {
            format = format + 'a' // eslint-disable-line
        }

        // Input is already a percent, so we only need to format the number
        const perc = numeral(input).format(format) + '%' // eslint-disable-line

        return !!input && perc
    },

    human(input, decimals = 2) {
        if (isNaN(input)) return ''

        const number = numeral(input)

        // Build decimal format for numeral.js
        let decimalFormat = ''
        for (let i = 0; i < decimals; i += 1) {
            decimalFormat += '0'
        }
        decimalFormat = decimalFormat && '.' + decimalFormat // eslint-disable-line

        // We only want 2 decimal places for numbers >= 1M
        const format = number.value() >= 1000000 ? '0.00a' : `0,0${decimalFormat}`

        return number.format(format).toUpperCase()
    },

    /**
     * Extracts currency symbol from numeral.js and prepends it to the returned value
     */
    currency(input) {
        const symbol = numeral(0).format('$()')[0]
        return input && symbol + input
    }
}
