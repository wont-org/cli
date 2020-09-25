import path from 'path'

const config = {
    tplHTML: path.join(__dirname, './public/index.html'),
    entries: {
        index: path.join(__dirname, './src/pages/index'),
    },
}

export default config