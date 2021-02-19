const autoprefixer = require('autoprefixer')
const pxToRem = require('postcss-pxtorem')

module.exports = {
    plugins: [
        autoprefixer,
        pxToRem({
            rootValue: 100,
            unitPrecision: 6,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: true,
            minPixelValue: 2,
            exclude: /node_modules/i
        })
    ]
}