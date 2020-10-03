import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import webpack from 'webpack'
import WebpackBar from 'webpackbar';
import { getEntry, isDev } from '../common/utils'
const { entry, htmlWebpackPlugins } = getEntry()
import { 
    GREEN,
    CWD,
    CONFIG_BABEL,
} from '../common/const'
import { 
    SCRIPT_EXTS,
    STYLE_EXTS,
    CACHE_DIR,
    DIST,
    POSTCSS_CONFIG_FILE,
} from '../common/const';

const CACHE_LOADER = {
    loader: 'cache-loader',
    options: {
      cacheDirectory: CACHE_DIR,
    },
}
const baseConfig = () => {
    const CSS_LOADERS = [
        isDev() ? 'style-loader' : MiniCssExtractPlugin.loader, // 打包为css文件，与style loader互斥
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    config: POSTCSS_CONFIG_FILE,
                },
            },
        },
    ]
    const config: webpack.Configuration = {
        entry,
        /**
         * 文件指纹 [name][(hash|chunkhash|contenthash)].[ext]
         * name entry name
         * hash 一个文件修改，则整个项目构建的hash值也将更改
         * chunkhash 和webpack打包的chunk有关，根据entry生成不同chunkhash
         * contenthash 根据文件内容生成hash，内容不变，则contenthash不变
         * ext 文件后缀
         */
        output: {
            path: DIST,
            filename: '[name].js'
        },
        resolve: {
            extensions: [...SCRIPT_EXTS, ...STYLE_EXTS],
        },
        module: {
            rules: [
                {
                    test: /.[jt]sx?$/,
                    use: [
                        CACHE_LOADER,
                        {
                            loader: 'babel-loader',
                            options: require(CONFIG_BABEL),
                        },
                        // 'eslint-loader',
                    ]
                },
                {
                    test: /.css$/,
                    use: [
                        ...CSS_LOADERS,
                    ],
                },
                {
                    test: /.less$/,
                    use: [
                        ...CSS_LOADERS,
                        'less-loader',
                    ],
                },
                // url-loader可替换file-loader
                // url-loader基于file-loader 多了小图片自动转base64 limit来实现
                {
                    test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: '[name]_[contenthash:8].[ext]'
                        }
                    },
                },
                {
                    test: /.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[contenthash:8].[ext]'
                        }
                    }
                },
            ]
        },
        plugins: [
            new FriendlyErrorsPlugin({
                clearConsole: false,
            }),
            new WebpackBar({
                name: 'Wont Cli',
                color: GREEN,
            }),
            ...htmlWebpackPlugins,
        ],
        // devtool: isDev() ? 'eval' : 'cheap-source-map',
        devtool: isDev() ? 'eval' : false,
    }
    if(!isDev()) {
        config!.plugins!.unshift( 
            new MiniCssExtractPlugin({
                filename: '[name]_[contenthash:8].css'
            }),
        )
    }
    return config
}

export default baseConfig