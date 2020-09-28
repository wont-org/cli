import path from 'path'

const config = {
    tplHTML: path.join(process.cwd(), './public/index.html'),
    entries: {
        index: path.join(process.cwd(), './src/pages/index'),
    },
}

export default config