function setEntry() {
    const entriesDir = glob.sync(path.join(__dirname, './src/pages/*'))

    let entry = {}
    let htmlWebpackPlugins = []
    entriesDir.forEach(item=> {
        const entryName = item.slice(item.lastIndexOf('/')+1)

        const pageName = item.match(/src\/pages\/(.*)/)
        console.log(pageName, 'pageNames')

        const entryHtml = item + '/' + entryName + '.html'
        entry[entryName] = item + '/' + entryName + '.js'

        // 一个页面对应一个
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                // template: path.join(__dirname, 'src/index/index.html'),
                template: entryHtml ? entryHtml : tplHTML, // 一把来讲，共用一个模板
                filename: `${entryName}.html`,
                // chunks主要用于多入口文件
                chunks: [entryName],
                /**
                 *  注入选项。有四个选项值 true, body, head, false.
                 *  true：默认值，script标签位于html文件的 body 底部
                 *  body：script标签位于html文件的 body 底部（同 true）
                 *  head：script 标签位于 head 标签内
                 *  false：不插入生成的 js 文件，只是单纯的生成一个 html 文件
                 */
                inject: true,
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
                    removeAttributeQuotes: true,

                    //是否移除注释 默认false
                    removeComments: true,

                    //从脚本和样式删除的注释 默认false
                    removeCommentsFromCDATA: true,

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

            })
        )
    })
    // console.log(entry, 'entry')
    return {
        entry,
        htmlWebpackPlugins
    }
}