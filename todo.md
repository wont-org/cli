# cli
cli for react and vue

# todo
## SPA
- [x]  empty dir src
- [x]  mkdir src
- [x]  touch main.tsx?
- [x]  declare.d.ts
## MPA
- [x]  empty dir src
- [x]  mkdir src && mkdir src/demo
- [x]  cd src/demo && touch index.tsx? index.less? index.vue?
- [x]  cd src && touch declare.d.ts /// react or vue

## config.(js|ts|json)
- [x]  gen wont.config.js
- [ ]  config document.title from 'html-webpack-plugin', needs wont.config.js has right title config
- [x]  gen entry or entries ~~(MPA needs glob)~~ choice spa or mpa, and **Convention over configuration**

## framework
- [x]  react
- [ ]  vue

## env config
- [x]  done from dotenv

## optimize
- [x]  externals

## dev config
- [ ]  proxy from devServer (provide webpack.js option to merge is ok)
- [x]  port take up (portfinder)

## platform
- [ ]  mobile (mainly about rem, can work with pxtorem postcss plugins)
- [ ]  pc

## init dir
- [x] ~~make sure dir is exit or has conflict, and resolve conflict by overwrite, both, some like git diff~~ make sure dir is exit, is exit, overwrite by emptyDir

## questions
- [x] ~~how to work with copy file to dest, like yeoman~~ fs-extra copySync is ok

## SSR(finally)
- [ ] to be continue…