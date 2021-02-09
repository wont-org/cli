import merge from 'webpack-merge'
import webpack from 'webpack'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
import { pathExistsSync } from 'fs-extra'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import baseConfig from './webpack.base'
import { setNodeEnv } from '../common/utils'
import { Answers } from './../types/index.d'

const prodConfig = () => {
    const config: webpack.Configuration = {
        mode: 'production', // production 默认开启 tree-shaking Ter
        plugins: [
            new CleanWebpackPlugin(),
            new HardSourceWebpackPlugin(),
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
    const { 
        externals,
     } = wontConfig
    if (externals) {
        config.externals = {
            'react': 'React',
            'react-dom': 'ReactDOM',
        }
    }
    config.optimization = {
        // 分包
        splitChunks: {
            minSize: 0, // 引用包大小
            cacheGroups: {
                vendors: {
                    name: `chunk-vendors`,
                    test: /[\\/]node_modules[\\/]/,
                    // test: /(react|react-dom|react-router-dom)/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: `chunk-common`,
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                },
            },
        }
    }
    return config
}


function build() {
    setNodeEnv('production')
    const config = merge(baseConfig(), prodConfig())
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