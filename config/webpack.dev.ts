import WebpackDevServer from 'webpack-dev-server'
import merge from 'webpack-merge'
import webpack from 'webpack'
import portfinder from 'portfinder'
import baseConfig from './webpack.base'
import { setNodeEnv, logServerInfo } from '../common/utils'

const devConfig: webpack.Configuration = {
    watch: false,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300, // aggregateTimeout ms 后执行  默认300ms
        poll: 1000, // 轮询是否发生变化 默认每秒1000次 也就是1ms/次
    },
	mode: 'development',
    devServer: {
        open: false,
        compress: true,
        port: 8080,
        // quiet: true,
        stats: 'minimal',
        host: '127.0.0.1',
        contentBase: false,
        publicPath: '/',
        hot: true,
    },
}

async function dev() {
    setNodeEnv('development')
    const config = merge(baseConfig(), devConfig)
    const server = new WebpackDevServer(webpack(config), devConfig.devServer)
    const basePort = devConfig!.devServer!.port || 8080
    portfinder.basePort = basePort
    const port = await portfinder.getPortPromise()
    const host = devConfig!.devServer!.host || 'localhost'
    server.listen(port, host, ()=> {
        logServerInfo(port)
    })
}

export {
    devConfig,
    dev,
}