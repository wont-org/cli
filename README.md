## Install

全局安装
```bash
npm i @wont/cli -g
```

## Usage

### 初始化项目
- 执行init后，根据cli提示输入项目名称，cli会自动生成对应项目，并装好相关依赖
```bash
wont-cli init
```
- **React、单页面、使用externals**生成目录结构如下
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
├── src
│   └── pages
│       └── index
│           ├── index.less
│           └── index.tsx
└── wont.config.js # 配置文件
```

- **React、多页面、使用externals**生成目录结构如下

- `wont.config.js`，相关配置均在此处，可更改选项，重新`dev`或`build`即可
目前支持配置如下
```js
module.exports = {
    "framework": "React", // 必选 React-默认 Vue-暂未支持
    "externals": true, // 是否启用script cdn接入 默认-true
    "mode": "mpa" // 必选，spa-单页面（默认） mpa-多页面 
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
