import WebpackDevServer from 'webpack-dev-server'
import merge from 'webpack-merge'
import webpack from 'webpack'
import baseConfig from './webpack.base'
import { DIST } from './../common/const'

const devConfig: webpack.Configuration = {
    watch: false,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300, // aggregateTimeout ms 后执行  默认300ms
        poll: 1000, // 轮询是否发生变化 默认每秒1000次 也就是1ms/次
    },
	mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        open: false,
        compress: true,
        port: 8080,
        // quiet: true,
        stats: 'minimal',
        host: '127.0.0.1',
        contentBase: DIST,
        hot: true
    },
    devtool: "#@source-map",
}

function runDev() {
    const config = merge(baseConfig, devConfig)
    const server = new WebpackDevServer(webpack(config), devConfig.devServer)
    server.listen(8080, '127.0.0.1', () => {
        console.log('Starting server on http://127.0.0.1:8080');
    });
}
runDev()

export default devConfig