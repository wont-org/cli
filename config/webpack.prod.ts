import merge from 'webpack-merge'
import webpack from 'webpack'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'
// import HtmlWebpackExternalsPlugin from 'html-webpack-externals-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import baseConfig from './webpack.base'
import { setNodeEnv } from '../common/utils'

const prodConfig: webpack.Configuration = {
    mode: 'production', // production 默认开启 tree-shaking
    plugins: [
        new CleanWebpackPlugin(),
        // // 压缩
        // new OptimizeCssAssetsWebpackPlugin({
        //     assetNameRegExp: /\.css$/g,
        //     cssProcessor: require('cssnano') // 预处理器
        // }),
    ],
    // webpack4 已内置
    // externals: {
    //     'react': 'react',
    //     'react-dom': 'react-dom',
    // },
    optimization: {
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
    },
}


function build() {
    setNodeEnv('production')
    const config = merge(baseConfig(), prodConfig)
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