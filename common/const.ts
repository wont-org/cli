import { join, } from 'path'

// root paths
export const CWD = process.cwd();
export const CACHE_DIR = join(__dirname, '../node_modules/.cache');

// config
export const CONFIG_DIR = join(__dirname, '../config')
export const POSTCSS_CONFIG_FILE = join(CONFIG_DIR, 'postcss.config.js')

// dist
export const DIST = join(__dirname, '../dist')

// ext
export const SCRIPT_EXTS = ['.js', '.jsx', '.vue', '.ts', '.tsx'];
export const STYLE_EXTS = ['.css', '.less', '.scss'];