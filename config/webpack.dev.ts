import { join } from 'path'
import datahubMiddleware from 'datahub-proxy-middleware'
import DataHub from 'macaca-datahub'
import WebpackDevServer from 'webpack-dev-server'
import merge from 'webpack-merge'
import webpack from 'webpack'
import baseConfig from './webpack.base'
import { setNodeEnv, logServerInfo, getPort } from '../common/utils'
import { CONFIG_WONT, CWD } from '../common/const'
import { get } from '@wont/utils'

const datahubConfig = () => {
    const customDevConfig = require(CONFIG_WONT) || {}
    const port = get(customDevConfig, 'mock.port', 5678)
    return {
        port,
        hostname: '0.0.0.0',
        store: join(CWD, './mock'),
        proxy: {
          '/api': {
            hub: 'demo',
            target: `http://localhost:${port}`,
          },
        },
        showBoard: true,
    }
}

const devConfig = (): webpack.Configuration => {
    const mockConfig = datahubConfig()
    return {
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
            host: '0.0.0.0',
            contentBase: false,
            publicPath: '/',
            hot: true,
            before: app => {
                datahubMiddleware(app)(mockConfig);
            },
            after: () => {
              const defaultDatahub = new DataHub({
                port: datahubConfig().port,
              })
              defaultDatahub.startServer(mockConfig).then(() => {
                logServerInfo(mockConfig.port, 'Mock')
              });
            },
        },
    }
}

async function dev() {
    setNodeEnv('development')
    const customDevConfig = require(CONFIG_WONT).dev || {}
    const config = merge(baseConfig(), devConfig(), customDevConfig)
    const server = new WebpackDevServer(webpack(config), config.devServer)
    const basePort = config!.devServer!.port || 8080
    const port = await getPort(basePort)
    const host = config!.devServer!.host || 'localhost'
    server.listen(port, host, ()=> {
        logServerInfo(port)
    })
}

export {
    devConfig,
    dev,
}