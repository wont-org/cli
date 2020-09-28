import { prompt } from 'inquirer'
import { install } from '../common/pkg'

export async function init() {
    const questions = [
        {
            name: 'manager',
            message: 'Select package manager',
            type: 'list',
            choices: ['npm', 'yarn'],
            default: 'npm'
        },
        // {
        //     name: 'structure',
        //     message: 'Select project structure',
        //     type: 'list',
        //     choices: ['SPA', 'MPA'],
        //     default: 'SPA'
        // },
        {
            name: 'framework',
            message: 'Select framework',
            type: 'list',
            choices: ['React', 'Vue'],
            default: 'React'
        },
        // {
        //     name: 'platform',
        //     message: 'Select platform build',
        //     type: 'list',
        //     choices: ['PC', 'Mobile'],
        //     default: 'PC'
        // },
    ]
    const answers = await prompt(questions)
    const { manager, framework } = answers
    console.log('answers :>> ', answers)
    if(framework === 'React') {
        install(manager, ['react', 'react-dom'])
    }
}