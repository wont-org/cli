import consola from 'consola'
import { join } from 'path'
import { execSync } from 'child_process'
import {
    readFileSync,
    writeFileSync,
    copySync,
    existsSync,
    emptyDir,
    mkdirSync,
    removeSync,
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
    PREFIX_SCRIPT,
} from './../common/const'

let targetDir = ''
let projectName = ''

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
        externals
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
    } catch (error) {
        throw(error)
    }
    if(externals) {
        const CDN = framework === 'React' ? REACT_CDN : VUE_CDN 
        const html = readFileSync(TPL_HTML)
        writeFileSync(`${targetDir}/public/index.html`, `${html}${CDN}`)
    }

    if(mode === 'mpa' && framework === 'React') {
        try {
            copySync(TPL_REACT_MPA, `${targetDir}/src`) // mpa src
        } catch (error) {
            throw(error)
        }
    }

    const configFiles = ['.babelrc', '.browserslistrc', '.gitignore', 'package.json', 'postcss.config.js', 'wont.config.ts']
    copyFiles(configFiles)

    process.chdir(targetDir)
    // execSync('npm init -y')
    if(framework === 'React') {
        execSync(`npm i ${REACT_DEPS.join(' ')} -S`)
        // install([...REACT_DEPS, '-S'])
    }
    execSync('npm install')
    // install()
    consola.success(`Successfully created ${chalk.yellow(projectName)}.`);
    consola.success(
      `Run ${chalk.yellow(`cd ${projectName} && npm run dev`)} to start development!`
    );
}

function copyFiles(files: string[]) {
    files.forEach(item=> {
        try {
            console.log('pwd :>> ',join(__dirname, `../../${item}`), targetDir)
            copySync(join(__dirname, `../../${item}`), `${targetDir}/${item}`)
            // console.log(`\n copy ${chalk.green(item)} success!`)
        } catch (err) {
            console.error(`copy ${item} error`, err)
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
            if (/^[a-zA-Z_][0-9a-zA-Z_]*$/.test(val)) {
                return true
            }
            return '项目名称，只允许输入字母、数字、下划线'
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
        throw(err)
    }
    
}