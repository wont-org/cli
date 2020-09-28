
export type Mode = 'SPA' | 'MPA'
export type Framework = 'React' | 'Vue'
export type Framework = 'npm' | 'yarn'
export type Platform = 'PC' | 'Mobile'
export interface Answers {
    manager: Manger
    mode: Mode
    framework?: Framework
    externals: boolean
    platform?: Platform
}