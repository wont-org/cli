import {readFileSync, writeFileSync} from 'fs'
import { prompt } from 'inquirer'
import { install } from '../common/pkg'
import { Answers } from '../types'
import { TPL_HTML, REACT_CDN, VUE_CDN, REACT_DEPS } from './../common/const'

export async function init() {
    const questions = [
        {
            name: 'manager',
            message: 'Select package manager',
            type: 'list',
            choices: ['npm', 'yarn'],
            default: 'npm'
        },
        // TODO
        {
            name: 'xd',
            message: 'Select framework',
            type: 'list',
            choices: ['React', 'Vue'],
            default: 'React'
        },
        {
            name: 'mode',
            message: 'Select project mode',
            type: 'list',
            choices: ['SPA', 'MPA'],
            default: 'SPA'
        },
        {
            name: 'externals',
            message: 'use externals (script framework in CDN)',
            type: 'confirm',
            default: true
        },
        // TODO
        // {
        //     name: 'platform',
        //     message: 'Select platform build',
        //     type: 'list',
        //     choices: ['PC', 'Mobile'],
        //     default: 'PC'
        // },
    ]
    const answers: Answers = await prompt(questions)
    const { 
        manager,
        framework = 'React',
        mode = 'SPA',
        externals
    } = answers
    console.log('answers :>> ', answers)

    // if(framework === 'React') {
    //     install(manager, REACT_DEPS)
    // }
    // if(framework === 'Vue') {
    //     install(manager, REACT_DEPS)
    // }

    if(mode === 'SPA') {
        
    }

    if(externals) {
        const CDN = `${framework.toUpperCase()}_CDN` 
        const html = readFileSync(TPL_HTML)
        writeFileSync(TPL_HTML, `${html}${CDN}`)
    }
}