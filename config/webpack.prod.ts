import merge from 'webpack-merge'
import webpack from 'webpack'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'
import { pathExistsSync } from 'fs-extra'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import baseConfig from './webpack.base'
import { setNodeEnv } from '../common/utils'
import { CWD, DIST, } from './../common/const'
import { Answers } from './../types/index.d'
import { dll } from '../config/webpack.dll'

const prodConfig = () => {
    const config: webpack.Configuration = {
        mode: 'production', // production 默认开启 tree-shaking Ter
        output: {
            filename: '[name].dll.js',
            path: DIST,
            library: '[name]',
        },
        plugins: [
            new CleanWebpackPlugin(),
            // // 压缩
            new OptimizeCssAssetsWebpackPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano') // 预处理器
            }),
            // new webpack.DefinePlugin({
            //     name: '[name]_[hash]',
            //     path: '[name].json',
            // }),
            new webpack.DllReferencePlugin({
                context: CWD,
                manifest: require(`${CWD}/manifest.json`),
            }),
        ],
    }
    // const configFile = `${process.cwd()}/wont.config.js`
    // let wontConfig: Answers = {}
    // if(pathExistsSync(configFile)) {
    //     wontConfig = require(configFile)
    // }
    // const { 
    //     externals,
    //     mode,
    //  } = wontConfig
    // if (externals) {
    //     config.externals = {
    //         'react': 'React',
    //         'react-dom': 'ReactDOM',
    //         // 'react-router-dom': 'ReactRouterDom',
    //     }
    // } else {
    //     let library = [
    //         'react',
    //         'react-dom',
    //     ]
    //     if(mode) {
    //         library.push('react-router-dom')
    //     }
    //     config.entry = {
    //         library,
    //     }
        // config.optimization = {
        //     // 分包
        //     splitChunks: {
        //         minSize: 0, // 引用包大小
        //         cacheGroups: {
        //             React: {
        //                 test: /react/,
        //                 name: 'react-vendors',
        //                 chunks: "all",
        //                 minChunks: 1,
        //             },
        //             ReactDom: {
        //                 test: /react-dom/,
        //                 name: 'react-dom-vendors',
        //                 chunks: "all",
        //                 minChunks: 1,
        //             },
        //             ReactRouterDom: {
        //                 test: /react-router-dom/,
        //                 name: 'react-router-dom-vendors',
        //                 chunks: "all",
        //                 minChunks: 1,
        //                 priority: 7,
        //             },
        //         }
        //     }
        // }
    // }
    return config
}


function build() {
    setNodeEnv('production')
    dll()
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