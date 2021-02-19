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
    TPL,
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
            message: 'Use externals (script framework in CDN)',
            type: 'confirm',
            default: true
        },
        {
            name: 'platform',
            message: 'Select platform build',
            type: 'list',
            choices: ['PC', 'Mobile'],
            default: 'PC'
        },
    ]
    const answers: Answers = await prompt(questions)
    const {
        // TODO 支持 vue 后删除默认值，Answers.framework改为必选
        framework = 'React',
        mode,
        platform,
    } = answers
    console.log('answers :>> ', answers)

    let deps: string[] = []
    let devDeps: string[] = ['@wont/cli@latest', '-D']

    // generate root config
    writeFileSync(join(targetDir, 'wont.config.js'), EXPORT_LIB + JSON.stringify(answers, null, 4))

    genPKG()

    // copy right template
    try {
        copySync(TPL.gitignore, `${targetDir}/.gitignore`)
        if (platform === 'Mobile') {
            copySync(TPL.postcssMobile, `${targetDir}/postcss.config.js`)
            copySync(TPL.htmlMobile, `${targetDir}/public/index.html`)
            devDeps.unshift('postcss-pxtorem')
        } else {
            copySync(TPL.postcss, `${targetDir}/postcss.config.js`)
            copySync(TPL.html, `${targetDir}/public/index.html`)
        }
    } catch (error) {
        throw(error)
    }
    const othersFiles: string[] = [
        '.browserslistrc',
        '.env.development',
        '.env.production',
    ]
    copyTplToTarget(TPL.others, targetDir, othersFiles)

    // generate framework deps
    if(framework === 'React') {
        if (mode === 'mpa') {
            try {
                copySync(TPL.reactMPA, `${targetDir}/src`)
            } catch (error) {
                throw(error)
            }
        } else {
            try {
                copySync(TPL.reactSPA, `${targetDir}/src`)
            } catch (error) {
                throw(error)
            }
        }
        try {
            copySync(TPL.tsconfig, `${targetDir}/tsconfig.json`)
            console.log(`copy ${chalk.green('tsconfig.json')} success! \n `)
        } catch (error) {
            throw(error)
        }

        deps = [...REACT_DEPS.react, '-S']
        if(mode === 'spa') {
            deps.unshift(...REACT_DEPS.reactRouter)
        }
        install(deps)
    }

    // finnally install
    install(devDeps)
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

function copyTplToTarget(from: string, to: string, files: string[]) {
    files.forEach(item=> {
        try {
            copySync(`${from}/${item}`, `${to}/${item}`)
            console.log(`\n copy ${chalk.green(item)} success!`)
        } catch (err) {
            console.log(`\n copy ${chalk.red(item)} error!`)
            console.log('err :>> ', err)
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