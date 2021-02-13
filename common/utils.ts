import HtmlWebpackPlugin from 'html-webpack-plugin'
import chalk from 'chalk'
import { pathExistsSync } from 'fs-extra'
import glob from 'glob'
import { basename, dirname } from 'path'
import address from 'address'
import dotenv from 'dotenv'
import portfinder from 'portfinder'
import { Answers } from './../types/index.d'

import {
    MPA_REACT,
    SPA_REACT,
    SPA_VUE,
    GREEN,
    DEST_HTML,
    REACT_CDN,
    VUE_CDN,
    CONFIG_WONT,
} from './const';
import {
    NodeEnv,
} from '../types'

const isDev = () => process.env.NODE_ENV === 'development'

function getDirName(pathStr: string) {
    return basename(dirname(pathStr))
}

function getHtmlConfig(entryName: string) {

    const params = {
        title: entryName,
        template: DEST_HTML,
        filename: `${entryName}.html`,
        chunks: [entryName],  // chunks主要用于多入口文件
        inject: true,
        templateParameters: {
            framework: '',
        },
        minify: {
            html5: true,
            // preserveLineBreaks: false, // 未找到对应参数

            //是否对大小写敏感，默认false
            caseSensitive: true,

            //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
            collapseBooleanAttributes: true,

            //是否去除空格，默认false
            collapseWhitespace: true,

            //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
            minifyCSS: true,

            //是否压缩html里的js（使用uglify-js进行的压缩）
            minifyJS: true,

            // Prevents the escaping of the values of attributes  防止转义属性值
            preventAttributesEscaping: true,

            //是否移除属性的引号 默认false
            removeAttributeQuotes: false,

            //是否移除注释 默认false
            removeComments: true,

            //从脚本和样式删除的注释 默认false
            // removeCommentsFromCDATA: true,

            //是否删除空属性，默认false
            removeEmptyAttributes: true,

            //  若开启此项，生成的html中没有 body 和 head，html也未闭合
            removeOptionalTags: false,

            //删除多余的属性
            removeRedundantAttributes: true,

            //删除script的类型属性，在h5下面script的type默认值：text/javascript 默认值false
            removeScriptTypeAttributes: true,

            //删除style的类型属性， type="text/css" 同上
            removeStyleLinkTypeAttributes: true,

            //使用短的文档类型，默认false
            useShortDoctype: true,
        }
    }
    let wontConfig: Answers = {}
    if(pathExistsSync(CONFIG_WONT)) {
        wontConfig = require(CONFIG_WONT)
    }
    const {
        externals = false,
        framework = '',
    } = wontConfig

    if(isDev()) {
        params.templateParameters.framework = ''
        return params
    }
    
    if(externals) {
        if(framework === 'React') {
            params.templateParameters.framework = REACT_CDN
        }
        if(framework === 'Vue') {
            params.templateParameters = {
                framework: VUE_CDN,
            }
        }
    }
    return params
}
function getEntry() {
    let wontConfig: Answers = {}
    if(pathExistsSync(CONFIG_WONT)) {
        wontConfig = require(CONFIG_WONT)
    }
    const { 
        mode,
        framework,
    } = wontConfig
    if(mode === 'spa') {
        let index = SPA_REACT
        if(framework === 'Vue') {
            index = SPA_VUE
        }
        return {
            entry: {
                index,
            },
            htmlWebpackPlugins: [new HtmlWebpackPlugin(getHtmlConfig('index'))]
        }
    }

    const entriesDir = glob.sync(MPA_REACT)

    let entry = {}
    let htmlWebpackPlugins: any = []
    entriesDir.forEach(item=> {
        const entryName = getDirName(item)
        console.log('pages :>> ', entryName)
        entry[entryName] = item
        
        const options = getHtmlConfig(entryName)
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin(options)
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}


function setNodeEnv(value: NodeEnv) {
    const path = `.env.${value}`
    let parsed = {}
    if(pathExistsSync(path)) {
        const config = dotenv.config({
            path: `.env.${value}`
        })
        parsed = config.parsed || {}
    }
    process.env = {
        ...parsed,
        NODE_ENV: value,
    }
}

function logServerInfo(port, name = 'Site') {
    const local = `http://localhost:${port}/`;
    const network = `http://${address.ip()}:${port}/`;
  
    console.log(`\n  ${name} running at:\n`);
    console.log(`  ${chalk.bold('Local')}:    ${chalk.hex(GREEN)(local)} `);
    console.log(`  ${chalk.bold('Network')}:  ${chalk.hex(GREEN)(network)}`);
}

async function getPort(basePort: number) {
    portfinder.basePort = basePort
    const port = await portfinder.getPortPromise()
    return port
}

export {
    NodeEnv,
    isDev,
    getEntry,
    setNodeEnv,
    logServerInfo,
    getPort,
}