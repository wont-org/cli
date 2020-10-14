import consola from 'consola'
import { join } from 'path'
import { execSync } from 'child_process'
import {
    writeFileSync,
    copySync,
    existsSync,
    ensureDirSync,
    emptyDirSync,
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
    TPL_REACT_SPA,
    TPL_TSCONFIG,
    EXPORT_LIB,
} from './../common/const'

let targetDir = ''
let projectName = ''

export async function init() {
    await genTargetDir()
    await genProject()
}

async function genProject() {
    process.chdir(targetDir)

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
        {
            name: 'mode',
            message: 'Select project mode',
            type: 'list',
            choices: ['spa', 'mpa'],
            default: 'spa'
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
        externals = false,
    } = answers
    console.log('answers :>> ', answers)
    // generate root config
    wontConfig = {
        framework,
        externals,
        mode,
    }
    writeFileSync(join(targetDir, 'wont.config.js'), EXPORT_LIB + JSON.stringify(wontConfig, null, 4))

    genPKG()
    // copy right template
    try {
        copySync(TPL_PUBLIC, `${targetDir}/public`)
        copySync(TPL_GITIGNORE, `${targetDir}/.gitignore`)
    } catch (error) {
        throw(error)
    }
    const configFiles = [
        '.browserslistrc',
        'postcss.config.js',
        '.env.development',
        '.env.production',
    ]
    copyFiles(configFiles)
    // generate framework deps
    if(framework === 'React') {
        if (mode === 'mpa') {
            try {
                copySync(TPL_REACT_MPA, `${targetDir}/src`)
            } catch (error) {
                throw(error)
            }
        } else {
            try {
                copySync(TPL_REACT_SPA, `${targetDir}/src`)
            } catch (error) {
                throw(error)
            }
        }
        try {
            copySync(TPL_TSCONFIG, `${targetDir}/tsconfig.json`)
            console.log(`copy ${chalk.green('tsconfig.json')} success! \n `)
        } catch (error) {
            throw(error)
        }

        let deps = [...REACT_DEPS, '-S']
        if(mode === 'spa') {
            deps.unshift('react-router-dom', '@types/react-router-dom')
        }
        install(deps)
    }
    // finnally install
    install(['@wont/cli@latest', '-D'])
    consola.success(`Successfully created ${chalk.yellow(projectName)}`);
    consola.success(
      `Run ${chalk.yellow(`cd ${projectName} && npm run dev`)} to start development!`
    )
}

function genPKG() {
    execSync('npm init -y')
    const path = process.cwd() + '/package.json'
    const pkg = readJsonSync(path)
    const scripts = {
        "dev": "wont-cli dev",
        "build": "wont-cli build",
    }
    pkg.main = ''
    pkg.scripts = scripts
    writeJsonSync(path, pkg)
}

function copyFiles(files: string[]) {
    files.forEach(item=> {
        try {
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
        ensureDirSync(targetDir)
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
        console.log(`\n emptyDir ${chalk.cyan(projectName)}...`)
        emptyDirSync(targetDir)
        console.log(`\n emptyDir ${chalk.green('Success')}`)
    } catch (err) {
        console.log(`\n emptyDir ${chalk.red(projectName)} error!`)
        throw(err)
    }
    
}