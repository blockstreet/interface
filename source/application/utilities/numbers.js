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
        return (input > 0 ? `+${Number(input).toFixed(2)}%` : `${Number(input).toFixed(2)}%`)
    },

    human(number) {
        if (isNaN(number)) return ''
        if (number >= 1000000000000) return `${(number / 1000000000000).toFixed(2)}T`
        if (number >= 1000000000) return `${(number / 1000000000).toFixed(2)}B`
        if (number >= 1000000) return `${(number / 1000000).toFixed(2)}M`
        return Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
}
