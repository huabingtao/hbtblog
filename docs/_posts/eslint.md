---
title: 从零配置 Eslint + Prettier + husky + lint-staged 构建前端代码工作流
date: 2020-04-27
tags:
  - Eslint
  - Typescript
author: link
location: ShangHai
---

## 写在前面

最近入职了新公司，领导让我修复项目中出现的`bug`，当我修复了`bug`提交代码的时候发现并没有提交上去而且还给我报了一堆的错误，于是我就发现了原来是在代码`commit`的时候用`eslint`去检查了代码，仔细看了看`package.json`发现`gitHooks` 在代码`pre-commit`(代码提交前的钩子)时期执行了`lint-staged`于是就去百度了[husky](https://www.npmjs.com/package/husky)可以在`commit` 或者 `push` 的时候去检验代码是否规范阻挡一些不合法的提交避免了不规范的代码提交到仓库里而[lint-staged](https://www.npmjs.com/package/lint-staged)只针对`git`工作区的代码做`linters`这样就避免了检查整个仓库的代码。为了详细了解其中的配置我也是查了好多资料看了很多文档，但是总感觉别的文章讲的不是很全面，特别是 eslint 配置那块对像我这样的新手小白来说比较难以理解，所以就有了这篇从零配置前端项目工作流的文章。

## 链接

参考文章

- [在 Typescript 项目中，如何优雅的使用 ESLint 和 Prettier](https://segmentfault.com/a/1190000019661168)
- [深入浅出 eslint——关于我学习 eslint 的心得](https://juejin.im/post/5bab946cf265da0ae92a75ca)
- [Eslint 中文官网](https://eslint.bootcss.com/)

## 准备工作

### 初始化项目

`yarn init`一路回车后创建好了`package.json`文件，接着`git init`初始化 git 仓库,后面我们要做代码提交的校验所以这里提前安装好方便后面的开发。

### 配置 .editorconfig

EditorConfig 用于在基本代码库中维持一致的编码风格和设置，例如缩进样式、选项卡宽度、行尾字符以及编码等。这里可以根据具体项目用什么框架开发具体设置。

在 vscode 中搜索安装[EditorConfig](https://editorconfig.org/)插件,根目录下新建 `.edittorconfig`文件写入一些配置代码。

```
// .editorconfig

root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 120

[*.md]
trim_trailing_whitespace = false
```

## 配置 Eslint

### 关于 eslint

ESLint 属于一种 QA 工具，是一个 ECMAScript/JavaScript 语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。对 eslint 还不了解的同学这里提供了几个学习的网站。

[深入浅出 eslint——关于我学习 eslint 的心得](https://juejin.im/post/5bab946cf265da0ae92a75ca)

[Eslint 中文官网](https://eslint.bootcss.com/)

#### 在项目中安装 eslint

`yarn add -D eslint`

在项目中安装了`eslint`还不够我们想要的是在编辑器中也能够提示`eslint`的规则

#### 在 vscode 中安装 eslint 插件

vscode 直接搜索`eslint`，安装插件后需要在 settings.json 中开启。

```json
// settings.json 中的部分配置

{
  "editor.formatOnSave": false, // 每次保存自动格式化
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "window.zoomLevel": 0, // 原始缩放比例
  "editor.codeActionsOnSave": {
    // 在保存时用eslint规则进行修复
    "source.fixAll.eslint": false
  },
  "eslint.enable": true, //是否开启vscode的eslint
  "eslint.options": {
    //指定vscode的eslint所处理的文件的后缀
    "extensions": [".js", ".vue", ".ts", ".tsx"]
  }
}
```

### 配置 eslint 规则

在根目录下新建.eslintrc.js 文件并配置一条规则。

```js
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    semi: ['error', 'never'], // 禁止使用分号
  },
};
```

> 需要注意的是 vscode 下需要装 eslint 插件才能有相应的语法提示。

这时候我们写点示例代码到仓库中。

```js
// src/a.js

const a = 'hello'; //这里我有意了一个分号让代码不符合eslint的规则
```

接下来 vscode 给我们把不符合 eslint 规范的错误抛出来了,值得一提的是 eslint 不仅明确了哪一行而且连官网的链接也给出了点击直接可以打开这条报错的规则。

![图片](https://user-gold-cdn.xitu.io/2020/4/27/171ba572bcd69658?w=1004&h=392&f=png&s=33354)

### 让 Eslint 识别 Typescript

我们已经能够让`eslint`识别出`js`代码了,但是这还远远不够要知道很多库已经在用 ts,flow 重构了，最近刚更新的 vue3.0 就是用 ts 写的。但是有没有必要在项目上使用 ts 还是依实际情况而定这里我们让 eslint 去识别 Typescript 的代码。

首先安装依赖:

`yarn add typescript`

`yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin`

- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) 是一个 eslint 的解析器,该解析器利用 TypeScript ESTree 允许 ESLint 整理 TypeScript 源代码。
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) 是 eslint 识别 TypeScript 规则的插件 我们把他放入 extends 这个数组里。

```js
// eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    semi: ['error', 'never'], // 禁止使用分号
  },
};
```

现在`eslint`可以识别`Typescript`的代码了我们尝试写点不规范的代码。

```js
// src/b.ts

const b = 'hello';
```

![图片](https://user-gold-cdn.xitu.io/2020/4/27/171ba572bcf8fc24?w=1234&h=200&f=png&s=36686)

### Eslint --fix

`eslint`不仅可以帮我们提示代码的错误还可以自动帮我们修复，在`package.json`中写入`eslint --ext .tsx,.ts,.js --fix ./src`

```json
"scripts": {
	"lint": "eslint --ext .tsx,.ts,.js --fix ./src"
}
```

运行 `yarn lint` 发现 eslint 自动帮我们去掉了代码块结尾的分号，其实 eslint 只能 fix 掉部分规范具体看文档的规则前面是否带了一个小扳手，如果带的话证明可以修复。

![图片](https://user-gold-cdn.xitu.io/2020/4/27/171ba572bd21a593?w=1798&h=292&f=png&s=74496)

## Prettier 一个美化代码风格神器

我们已经可以使用`eslint`去规范代码，接下来我们再使用`prettier`这个工具将代码格式化为统一的风格。

### 配置 Prettier

根目录下新建配置文件`.prettierrc.js`。

```js
module.exports = {
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: false,
  jsxBracketSameLine: true,
  arrowParens: 'avoid',
  insertPragma: true,
  tabWidth: 4,
  useTabs: false,
};
```

### 安装 `Prettier` 依赖

`yarn add -D prettier eslint-config-prettier eslint-plugin-prettier`

- eslint-config-prettier 用来关闭`eslint`和 `prettier`冲突的规则，我们要将这个放置在`extends`的最后，这样它就有机会覆盖其他配置。

- slint-plugin-prettier 前面我们关闭了`eslint`的规则，现在我们开启`prettier`的规则。

```js
// eslintrc.js

module.exports = {
  parser: '@typescript-eslint/parser', //定义ESLint的解析器
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ], //定义文件继承的子规范
  plugins: ['@typescript-eslint', 'prettier'], //定义了该eslint文件所依赖的插件
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': 1, //  eslint-plugin-prettier 使用prettier作为eslint规则
    semi: ['error', 'never'], // 禁止使用分号
  },
};
```

最后新增一条`prettier --write`命令这是[prettier cli](https://prettier.io/docs/en/cli.html)格式化的语法。

```json
// package.json

"scripts": {
	"lint": "eslint --ext .tsx,.ts,.js --fix ./src",
	 "fix": "prettier --write  ./src"
}

```

### 使用 Prettier

运行 `yarn fix` 编辑器就可以根据`.prettierrc.js`里面的规范去美化代码了。

目前我们可以通过 `yarn fix` 去美化代码风格但是实际上往往会在提交前忘记`yarn fix`,有没有什么办法能在`git commit`的时候去检验代码并且修复不规范的代码，如果无法修复就阻止本次提交呢？显然是有的。

## husky + lint-staged 构建代码工作流

[husky](https://github.com/typicode/husky) 是一个 Git Hook 工具,它可以在代码提交前允许我们做一些事情，从而防止一些不好的代码被提交上去。
[lint-staged](https://github.com/okonet/lint-staged) 是针对工作区修改的文件,这对我们只希望处理将要提交的文件将会非常有用。

### 安装 husky lint-staged 依赖

`yarn add -D husky lint-staged`

```!
注意 windows 用户需要使用 npm 包管理器安装不然 git hooks会失效
```

### 配置 husky & lint-staged

我们需要在代码提交前对代码做一下格式化并且如果代码不符合规范就不让提交,简单的做法就是在`husky`的`pre-commit`钩子去运行 `lint-staged`,`lintstaged`主要就干了三件事：

第一件就是调用`eslint --fix` 修复不合符 eslint 规范的代码。

第二件`prettier --write`美化代码格式。

最后如果都通过了就允许代码`commit`。

```json
// package.json 完整代码

{
  "name": "lint4",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^2.29.0",
    "@typescript-eslint/parser": "^2.29.0",
    "eslint": "^6.8.0",
    "eslint-config-prettier": "^6.11.0",
    "eslint-plugin-prettier": "^3.1.3",
    "husky": "^4.2.5",
    "lint-staged": "^10.1.7",
    "prettier": "^2.0.5"
  },
  "dependencies": {
    "typescript": "^3.8.3"
  },
  "scripts": {
    "lint": "eslint --ext .tsx,.ts,.js --fix ./src",
    "fix": "prettier --write  ./src"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*{.ts,.js}": [
      "eslint --ext .tsx,.ts --fix ./src",
      "prettier --write",
      "git add"
    ]
  }
}
```

## 案例

写点伪代码.....

![案例](http://file.huabingtao.com/juejin/eslint/4.png)

```git
git add .
git commit -m 'test'
```

perfect！
![案例](http://file.huabingtao.com/juejin/eslint/5.png)

## 总结

以上就是本次分享的全部内容，对于一个中大型的项目来说规范代码的质量尤为重要。

我们已经学会了如何从零去配置一个项目的工作流，真实的场景可能是需要在 vue 或者 react 以及其他的框架中去配置 husky、lint-staged、Typescripe 等

简单回顾下工作流比较重要的几点：

- 通过 Eslint 去约束 Javascript/Typescript
- Prettier 美化代码，统一代码风格
- 使用 husky + lint-staged 在 commit 前做检查，避免存在不规范或者存在 bug 的代码入仓库

最后，感谢您阅读这篇文章，有任何问题或反馈请给我留言。
