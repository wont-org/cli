## 特别说明
由于mock使用了[Macaca DataHub](https://macacajs.github.io/macaca-datahub/zh/)，必须使用node12.x下载
```bash
nvm use 12
```

## Feature
- 支持mock功能（集成[Macaca DataHub](https://macacajs.github.io/macaca-datahub/zh/)）
- 支持splitChunk，分基础包和业务包
- 支持使用node环境变量，根目录下.env.(production | development)文件配置环境即可，在项目中使用`process.env.xxx`
- 支持react 单页面(spa)、多页面(mpa)开发
- 支持externals免打包，通过script [BootCDN链入]
(https://www.bootcdn.cn/)
- 支持[css module](https://github.com/css-modules/css-modules)，支持less。(推荐)

```jsx
import style from './index.module.(less|css)'
import React from 'react'

const About = () => (
    // 会自动将连字符转换为驼峰 main-container => mainContainer
    <div className={style.mainContainer}>
        this is About page
    </div>
)
```
```css
.main-container {
    border: 1px solid red;
}
```
- 支持typescript
- 支持热更新
- 使用thread-loader、cache-loader、hard-source-webpack-plugin，打包速度up！
- 本地8080端口被占用，则自动开启8080+
- dev环境使用完整source-map，便于debugger，prod则不使用source-map

## Usage
### Install

全局安装
```bash
npm i @wont/cli@latest -g
```

### 初始化项目
- 执行init后，根据cli提示输入项目名称，cli会自动生成对应项目，并装好相关依赖
```bash
wont-cli init
```

- **React、spa单页面、使用externals**生成目录结构如下
```bash
├── .browserslistrc # postcss autofixer
├── .env.development # 环境变量，可在项目中 process.env.XXX
├── .env.production
├── .gitignore
├── dist # 构建产物
│   ├── chunk-vendors.js # 分包处理-基础包，react、react-dom、react-router-dom
│   ├── index.html
│   ├── index.js # 业务包
│   └── index_6a7ccc98.css
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   └── index.html
├── mock # mock本地数据
├── src
│   ├── components
│   │   └── button
│   │       └── index.tsx
│   ├── declare.d.ts
│   ├── main.less
│   ├── main.tsx
│   ├── pages
│   │   ├── about
│   │   │   └── index.tsx
│   │   └── home
│   │       └── index.tsx
│   ├── router # 路由配置，支持后台管理layout类型
│   │   └── index.tsx
│   └── styles # 全局样式
│       └── normalize.less
└── wont.config.js
```

- **React、mpa单页面、使用externals**生成目录结构如下
```bash
├── dist # build产物
│   ├── index.html
│   ├── index.js
│   └── index_0905e159.css
├── package-lock.json
├── package.json # 已在script上添加dev和build
├── postcss.config.js # 可在基础上添加postcss功能
├── public
│   └── index.html
├── mock # mock本地数据
├── src
│   └── pages
│       └── index
│           ├── index.less
│           └── index.tsx
└── wont.config.js # 配置文件
```

- `wont.config.js`，相关配置均在此处，可更改选项，重新`dev`或`build`即可
目前支持配置如下
```js
module.exports = {
    "framework": "React", // 必选 React-默认 Vue-暂未支持
    "externals": true, // 是否启用script cdn接入 默认-true，react、react-dom将自动cdn引入
    "mode": "spa", // 必选，spa-单页面（默认） mpa-多页面
    mock: {
        port: 3000, // 可指定mock端口，默认5678
    }
}
```

### 本地开发
```bash
wont-cli dev
```

### 打包
```bash
wont-cli build
```

## LICENSE

[MIT](./LICENSE)
