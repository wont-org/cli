import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { entry, htmlWebpackPlugins } from '../common/utils'
import { 
    POSTCSS_CONFIG_FILE,
    SCRIPT_EXTS,
    STYLE_EXTS,
    CACHE_DIR,
    DIST,
} from './../common/const';

const CSS_LOADERS = [
    'style-loader',
    'css-loader',
    {
        loader: 'postcss-loader',
        // options: {
        //     config: {
        //         path: POSTCSS_CONFIG_FILE,
        //     },
        // },
    },
];

const CACHE_LOADER = {
    loader: 'cache-loader',
    options: {
      cacheDirectory: CACHE_DIR,
    },
}

const baseConfig = {
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
    plugins: [
        new CleanWebpackPlugin(),
        ...htmlWebpackPlugins,
    ],
    module: {
	    rules: [
            {
                test: /.[jt]sx?$/,
                use: [
                    CACHE_LOADER,
                    'babel-loader',
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
                        limit: 10240
                    }
                },
            },
            {
                test: /.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: 'file-loader',
            },
        ]
    },
}

export default baseConfig