import { dev } from '../config/webpack.dev'
import { build } from '../config/webpack.prod'

function compileSite(production = false) {
    if(production) {
        build()
    } else {
        dev()
    }
}

export {
    compileSite,
}