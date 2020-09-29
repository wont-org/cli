
export type Mode = 'spa' | 'mpa'
export type Framework = 'React' | 'Vue'
export type Platform = 'PC' | 'Mobile'
export type NodeEnv = 'production' | 'development'
export interface Answers {
    mode?: Mode
    framework?: Framework
    externals: boolean
    platform?: Platform
}