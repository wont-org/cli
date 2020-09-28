import { join, } from 'path'

// Colors
export const GREEN = '#07c160';

// root paths
export const CWD = process.cwd();
export const CACHE_DIR = join(CWD, 'node_modules/.cache');

// config
export const CONFIG_DIR = join(CWD, 'config')
export const POSTCSS_CONFIG_FILE = join(CONFIG_DIR, 'postcss.config.js')

// dist
export const DIST = join(CWD, 'dist')

// ext
export const SCRIPT_EXTS = ['.js', '.jsx', '.vue', '.ts', '.tsx'];
export const STYLE_EXTS = ['.css', '.less', '.scss'];

// html
export const TPL_HTML = join(CWD, 'public/index.html')

// script
export const REACT_CDN = `
<script src="https://cdn.bootcdn.net/ajax/libs/react/16.9.0/umd/react.production.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/react-dom/16.9.0/umd/react-dom.production.min.js"></script>
`
export const VUE_CDN = `
<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.runtime.common.min.js"></script>
`
// react
export const REACT_DEPS = ['react', 'react-dom']