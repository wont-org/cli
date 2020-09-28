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