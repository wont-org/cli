import { join, } from 'path'

// Colors
export const GREEN = '#07c160';

// root paths
export const CWD = process.cwd();
export const CACHE_DIR = join(CWD, 'node_modules/.cache');

// config
export const CONFIG_DIR = join(CWD, 'config')
export const POSTCSS_CONFIG_FILE = join(CWD, 'postcss.config.ts')
export const WONT_CONFIG = join(CWD, 'wont.config.js')
export const MPA_REACT = join(CWD, 'src/pages/**/index.tsx')
export const SPA_REACT = join(CWD, 'src/main.tsx')

// dist
export const DIST = join(CWD, 'dist')

// ext
export const SCRIPT_EXTS = ['.js', '.jsx', '.vue', '.ts', '.tsx'];
export const STYLE_EXTS = ['.css', '.less', '.scss'];

// js prefix
export const PREFIX_SCRIPT = 'export default '

// template
export const TPL_DIR = join(__dirname, '../template')
export const TPL_HTML = join(TPL_DIR, 'public/index.html')
export const TPL_PUBLIC = join(TPL_DIR, 'public')
export const TPL_REACT_SPA = join(TPL_DIR, 'spa-react/src')
export const TPL_REACT_MPA = join(TPL_DIR, 'mpa-react/src')

// dest
export const DEST_PUBLIC = join(CWD, 'public')
export const DEST_HTML = join(DEST_PUBLIC, 'index.html')
export const DEST_SRC = join(CWD, 'src')

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