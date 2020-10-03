import consola from 'consola'
import { join } from 'path'
import { execSync } from 'child_process'
import {
    writeFileSync,
    copySync,
    existsSync,
    removeSync,
    readJsonSync,
    writeJsonSync,
} from 'fs-extra'
import { prompt } from 'inquirer'
import chalk from 'chalk'
import { install } from '../common/pkg'
import { Answers } from '../types'
import { 
    CWD,
    REACT_DEPS,
    TPL_PUBLIC,
    TPL_GITIGNORE,
    TPL_REACT_MPA,
    EXPORT_LIB,
} from './../common/const'

let targetDir = ''
let projectName = ''

export async function init() {
    await genTargetDir()
    await genProject()
}

async function genProject() {
    let wontConfig = {}
    const questions = [
        // TODO
        // {
        //     name: 'framework',
        //     message: 'Select framework',
        //     type: 'list',
        //     choices: ['React', 'Vue'],
        //     default: 'React'
        // },
        // {
        //     name: 'mode',
        //     message: 'Select project mode',
        //     type: 'list',
        //     choices: ['spa', 'mpa'],
        //     default: 'mpa'
        // },
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
        mode = 'mpa',
        externals = false,
    } = answers
    console.log('answers :>> ', answers)
    wontConfig = {
        ...wontConfig,
        framework,
        externals,
        mode,
    }

    try {
        copySync(TPL_PUBLIC, `${targetDir}/public`) // public
        copySync(TPL_GITIGNORE, `${targetDir}/.gitignore`)
    } catch (error) {
        throw(error)
    }

    if(mode === 'mpa' && framework === 'React') {
        try {
            copySync(TPL_REACT_MPA, `${targetDir}/src`) // mpa src
        } catch (error) {
            throw(error)
        }
    }

    const configFiles = [
        // 'babel.config.js',
        '.browserslistrc', 'postcss.config.js', '.env.development', '.env.production']
    copyFiles(configFiles)

    process.chdir(targetDir)
    writeFileSync(join(targetDir, 'wont.config.js'), EXPORT_LIB + JSON.stringify(wontConfig, null, 4))

    execSync('npm init -y')
    const path = process.cwd() + '/package.json'
    const pkg = readJsonSync(path)
    const scripts = {
        "dev": "wont-cli dev",
        "build": "wont-cli build",
    }
    pkg.scripts = scripts
    writeJsonSync(path, pkg)
    if(framework === 'React') {
        install([...REACT_DEPS, '-S'])
    }
    install(['@wont/cli@latest', '-D'])
    consola.success(`Successfully created ${chalk.yellow(projectName)}`);
    consola.success(
      `Run ${chalk.yellow(`cd ${projectName} && npm run dev`)} to start development!`
    )
}

function copyFiles(files: string[]) {
    files.forEach(item=> {
        try {
            // console.log('pwd :>> ',join(__dirname, `../../${item}`), targetDir)
            copySync(join(__dirname, `../../${item}`), `${targetDir}/${item}`)
            console.log(`\n copy ${chalk.green(item)} success!`)
        } catch (err) {
            console.log(`\n copy ${chalk.red(item)} error!`)
            process.exit(1)
        }
    })
}

async function genTargetDir() {
    const createQuestion = {
        name: 'name',
        type: 'input',
        message: 'input your project name',
        validate(val: string) {
            if(!/^[a-zA-Z_]/.test(val)) {
                return '项目名称，只能以下划线，字母开头'
            }
            if(!/[a-zA-Z_]$/.test(val)) {
                return '项目名称，只能以下划线，字母结尾'
            }
            if (/[^A-Za-z0-9_-]/.test(val)) {
                return '项目名称，只允许输入字母、数字、下划线、连字符'
            }
            return true
        },
    }
    const { name } = await prompt(createQuestion)
    targetDir = join(CWD, name)
    projectName = name
    if(!existsSync(targetDir)) {
        return
    }
    const overwriteQuestion = {
        name: 'overwrite',
        message: `Target directory ${chalk.cyan(projectName)} already exists. Are you want to overwrite ?`,
        type: 'confirm',
        default: true,
    }
    const { overwrite } = await prompt(overwriteQuestion)
    if(!overwrite) {
        return
    }
    try {
        console.log(`\n remove ${chalk.cyan(projectName)}...`)
        removeSync(targetDir)
        console.log(`\n remove ${chalk.green('Success')}`)
    } catch (err) {
        console.log(`\n remove ${chalk.red(projectName)} error!`)
        throw(err)
    }
    
}