import { join } from 'path';
import {
    readFileSync,
    writeFileSync,
    copySync,
    existsSync,
    emptyDir,
    mkdirSync,
} from 'fs-extra'
import { prompt } from 'inquirer'
import chalk from 'chalk'
import { install } from '../common/pkg'
import { Answers } from '../types'
import { 
    CWD,
    TPL_HTML,
    DEST_HTML,
    REACT_CDN,
    VUE_CDN,
    REACT_DEPS,
    TPL_PUBLIC,
    DEST_PUBLIC,
    TPL_REACT_SPA,
    TPL_REACT_MPA,
    DEST_SRC,
    WONT_CONFIG,
    PREFIX_SCRIPT,
} from './../common/const'

export async function init() {
    let wontConfig = {}
    await genTargetDir()
    const questions = [
        // TODO
        {
            name: 'framework',
            message: 'Select framework',
            type: 'list',
            choices: ['React', 'Vue'],
            default: 'React'
        },
        {
            name: 'mode',
            message: 'Select project mode',
            type: 'list',
            choices: ['spa', 'mpa'],
            default: 'mpa'
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
        framework = 'React',
        mode = 'spa',
        externals
    } = answers
    console.log('answers :>> ', answers)
    wontConfig = {
        ...wontConfig,
        framework,
        externals,
        mode,
    }

    // if(framework === 'React') {
    //     install(manager, REACT_DEPS)
    // }
    writeFileSync(WONT_CONFIG, PREFIX_SCRIPT + JSON.stringify(wontConfig, null, 4))
    copySync(TPL_PUBLIC, DEST_PUBLIC) // public
    if(externals) {
        const CDN = `${framework.toUpperCase()}_CDN` 
        const html = readFileSync(TPL_HTML)
        writeFileSync(DEST_HTML, `${html}${CDN}`)
    }

    if(mode === 'mpa' && framework === 'React') {
        copySync(TPL_REACT_MPA, DEST_SRC) // mpa src
    }

    const configFiles = ['.babelrc', '.browserslistrc', '.gitignore', 'package.json', 'postcss.config.js', 'wont.config.ts']
    copyFiles(configFiles)

    if(framework === 'React') {
        install([...REACT_DEPS, '-S'])
    }
    install()

}

function copyFiles(files: string[]) {
    files.forEach(item=> {
        try {
            copySync(item, CWD)
            console.log(`\n copy ${chalk.green(item)} success!`)
        } catch (err) {
            console.error(err)
        }
    })
}

async function genTargetDir() {
    const createQuestion = {
        name: 'name',
        type: 'input',
        message: 'input your project name',
        validate(val: string) {
            if (/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(val)) {
                return true
            }
            return '项目名称，只允许输入字母、数字、下划线'
        },
    }
    const { name } = await prompt(createQuestion)
    const targetDir = join(CWD, name)
    if(!existsSync(targetDir)) {
        mkdirSync(targetDir)
        process.chdir(targetDir)
        return
    }
    const overwriteQuestion = {
        name: 'overwrite',
        message: `Target directory ${chalk.cyan(targetDir)} already exists. Are you want to overwrite ?`,
        type: 'confirm',
        default: true,
    }
    const { overwrite } = await prompt(overwriteQuestion)
    if(!overwrite) {
        return
    }
    try {
        console.log(`\n overwrite ${chalk.cyan(targetDir)}...`)
        emptyDir(targetDir)
        console.log(`\n overwrite ${chalk.green('Success')}`)
        process.chdir(targetDir)
    } catch (err) {}
    
}