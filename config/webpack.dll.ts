import webpack from 'webpack'
import { pathExistsSync } from 'fs-extra'
import { setNodeEnv } from '../common/utils'
import { CWD, DIST, } from '../common/const'
import { Answers } from '../types'

const dllConfig = () => {
    const config: webpack.Configuration = {
        mode: 'production', // production 默认开启 tree-shaking Ter
        output: {
            filename: '[name].dll.js',
            path: DIST,
            library: '[name]',
        },
        plugins: [
            new webpack.DllPlugin({
                context: CWD,
                name: '[name]_[hash]',
                path: `${CWD}/manifest.json`,
            }),
            // new webpack.DllReferencePlugin({
            //     context: CWD,
            //     manifest: require(`${CWD}/manifest.json`),
            // }),
        ],
    }
    const configFile = `${process.cwd()}/wont.config.js`
    let wontConfig: Answers = {}
    if(pathExistsSync(configFile)) {
        wontConfig = require(configFile)
    }
    const { 
        externals,
        mode,
     } = wontConfig
    if (externals) {
        config.externals = {
            'react': 'React',
            'react-dom': 'ReactDOM',
            // 'react-router-dom': 'ReactRouterDom',
        }
    } else {
        let library = [
            'react',
            'react-dom',
        ]
        if(mode) {
            library.push('react-router-dom')
        }
        config.entry = {
            library,
        }
    }
    return config
}


function dll() {
    setNodeEnv('production')
    webpack(dllConfig(), (err, stats) => {
        if(err) {
            console.log('webpack build error :>> ', err)
        }
        // console.log('stats :>> ', stats);
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }))
    })
}
// dll()
export {
    dll,
}