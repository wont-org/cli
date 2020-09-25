import merge from 'webpack-merge'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'
// import HtmlWebpackExternalsPlugin from 'html-webpack-externals-plugin'
import { baseConfig } from './webpack.base'

const LOADESR_CSS = [
    // 'style-loader', // 放入 head
    MiniCssExtractPlugin.loader, // 打包为css文件，与style loader互斥
    'css-loader',
    // 'postcss-loader',
]

const prodConfig: webpack.Configuration = {
	mode: 'production', // production 默认开启 tree-shaking
    module: {
	    rules: [
            {
                test: /.css$/,
                use: [
                    ...LOADESR_CSS,
                ],
            },
            {
                test: /.less$/,
                use: [
                    ...LOADESR_CSS,
                    'less-loader',
                ],
            },
            // {
            //     test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name]_[hash:8].[ext]'
            //         }
            //     },
            // },
            // {
            //     test: /.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name]_[hash:8].[ext]'
            //         }
            //     },
            // },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        // 压缩
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            // cssProcessor: import('cssnano') // 预处理器
        }),
        // scope Hoisting webpack 4 production 下默认开启
        // new webpack.optimize.ModuleConcatenationPlugin(),
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
    devtool: "cheap-source-map",
}


function build() {
    const config = merge(baseConfig, prodConfig)
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

build()

export default prodConfig