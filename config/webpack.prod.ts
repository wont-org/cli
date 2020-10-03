import merge from 'webpack-merge'
import webpack from 'webpack'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'
import { pathExistsSync } from 'fs-extra'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import baseConfig from './webpack.base'
import { setNodeEnv } from '../common/utils'
import { Answers } from './../types/index.d'

const prodConfig = () => {
    const config: webpack.Configuration = {
        mode: 'production', // production 默认开启 tree-shaking
        plugins: [
            new CleanWebpackPlugin(),
            // // 压缩
            new OptimizeCssAssetsWebpackPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano') // 预处理器
            }),
        ],
    }
    const configFile = `${process.cwd()}/wont.config.js`
    let wontConfig: Answers = {}
    if(pathExistsSync(configFile)) {
        wontConfig = require(configFile)
    }
    const { externals } = wontConfig
    if (externals) {
        config.externals = {
            'react': 'React',
            'react-dom': 'ReactDOM',
        }
    } else {
        config.optimization = {
            // 分包
            splitChunks: {
                minSize: 0, // 引用包大小
                cacheGroups: {
                    React: {
                        test: /react/,
                        name: 'react-vendors',
                        chunks: "all",
                        minChunks: 1,
                    },
                    ReactDom: {
                        test: /react-dom/,
                        name: 'react-dom-vendors',
                        chunks: "all",
                        minChunks: 1,
                    },
                }
            }
        }
    }
    return config
}


function build() {
    setNodeEnv('production')
    const config = merge(baseConfig(), prodConfig())
    // console.log('config :>> ', JSON.stringify(config!.module!.rules, null, 2));
    webpack(config, (err, stats) => {
        if(err) {
            console.log('webpack build error :>> ', err)
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }))
    })
}

export {
    prodConfig,
    build,
}