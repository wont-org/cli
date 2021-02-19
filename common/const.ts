import { join, } from 'path'

// Colors
export const GREEN = '#07c160';

// root paths
export const CWD = process.cwd();
export const CACHE_DIR = join(CWD, 'node_modules/.cache');

// config
export const CONFIG_DIR = join(CWD, 'config')
export const POSTCSS_CONFIG_FILE = join(CWD, 'postcss.config.js')
export const CONFIG_WONT = join(CWD, 'wont.config.js')
export const CONFIG_BABEL = join(__dirname, '../config/babel.config.js')
// react
export const MPA_REACT = join(CWD, 'src/pages/**/index.tsx')
export const SPA_REACT = join(CWD, 'src/main.tsx')
// vue
export const MPA_VUE = join(CWD, 'src/pages/**/index.vue')
export const SPA_VUE = join(CWD, 'src/main.vue')

// dist
export const DIST = join(CWD, 'dist')

// ext
export const SCRIPT_EXTS = ['.js', '.jsx', '.vue', '.ts', '.tsx'];
export const STYLE_EXTS = ['.css', '.less', '.scss'];

// export script
export const EXPORT_ES = 'export default '
export const EXPORT_LIB = 'module.exports = '

// template
export const TPL_ROOT = join(__dirname, '../../template')
export const TPL = {
    html: join(TPL_ROOT, 'public/index.html'),
    htmlMobile: join(TPL_ROOT, 'public/index.mobile.html'),
    public: join(TPL_ROOT, 'public'),
    reactSPA: join(TPL_ROOT, 'react/spa'),
    reactMPA: join(TPL_ROOT, 'react/mpa'),
    declare: join(TPL_ROOT, 'react/declare.d.ts'),
    tsconfig: join(TPL_ROOT, 'react/tsconfig.json.tpl'),
    others: join(TPL_ROOT, 'others'),
    gitignore: join(TPL_ROOT, 'others/.gitignore.tpl'),
    postcss: join(TPL_ROOT, 'others/postcss.config.js'),
    postcssMobile: join(TPL_ROOT, 'others/postcss.mobile.config.js'),
}

// dest
export const DEST_PUBLIC = join(CWD, 'public')
export const DEST_HTML = join(DEST_PUBLIC, 'index.html')
export const DEST_SRC = join(CWD, 'src')

// script
export const REACT_CDN = `
<script src="https://cdn.bootcdn.net/ajax/libs/react/16.9.0/umd/react.production.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/react-dom/16.9.0/umd/react-dom.production.min.js"></script>
`
export const REACT_ROUTER_DOM = `
<script src="https://cdn.bootcdn.net/ajax/libs/react-router-dom/5.2.0/react-router-dom.min.js"></script>
`

export const VUE_CDN = `
<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.runtime.common.min.js"></script>
`

export const REACT_DEPS = {
    react: ['react@16.13.1', '@types/react@16.9.52', 'react-dom@16.13.1', '@types/react-dom@16.9.8'],
    reactRouter: ['react-router-dom@5.2.0', '@types/react-router-dom@5.1.6'],
}
