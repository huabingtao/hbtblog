---
show: false
sidebar: auto
sidebarDepth: 5
---

# 联系方式

- 手机：18818231998
- Email：huabingtao123@gmail.com

## 个人信息

- 华炳淘/男/1993
- 本科/华东理工大学
- 工作年限：7 年
- 个人博客：https://huabingtao.github.io/hbtblog/
- 掘金：https://juejin.im/user/592418062f301e006b2db045/posts
- Github：https://github.com/huabingtao

## 自我介绍

我是一名前端开发。熟练使用**Vue**，了解 Vue**组件化**、**响应式**原理，熟练使用**React**。熟练使用**Typescript**熟练编写单元测试。熟练**组件化模块化**及**构建优化**，擅长制定并规范团队协作模式。**前后端技术栈**均有尝试有**Node**开发经验。

## 技能清单

- 前端框架：Vue3/React
- 前端 ui 框架: Element-ui/Ant-design/iview/Ant-mobile/Taro-ui/Bootstrap
- 前端工具：Typescript/Webpack/Sass/Less/Styles
- 服务端：Node/Koa2/Express/Nginx
- 数据库：MySQL
- 版本管理：Git/Svn
- 单元测试：Jest/Testing-library

## 工作经历

### 华住酒店集团（2021 年 4 月 ～ 2022 年 12月）

- 担任华通组件库Owner负责华通组件库、组件库文档研发与维护
- 制定公组件库设计思路、代码规范、开发流程、组件测试相关，并推动了代码审核流程
- 收集公司其它项目组使用组件库需求，并分析不断优化提升用户体验。
- 参与定制版飞书内嵌h5、小程序研发

### 上海珍岛科技有限公司 （ 2020 年 8 月 ~ 2021 年 4月 ）

- 带领团队完成了商业云Pc以及小程序多个系统从0到1的建设和后续版本迭代。
- 参与使用服务端渲染优化项目首屏加载优化部分，加载速度从5s提升到1.5s提升渲染速度70%。
- 搭建项目脚手架，配置代码规范，完成前端项目CI、CD流程建设。

### 上海舍住信息科技有限公司 （ 2018 年 8 月 ~ 2020 年 6 月 ）

- 负责前端项目的架构设计,参与项目评审，参与产品的开发和业务实现并最终完成部署。
- 主导和负责公司管理后台以及小程序的日常开发。
- 搭建项目脚手架，集成框架全家桶，单元测试、集成测试解决方案，内部平台 CI 的对接。

### 晶睿文化传媒（上海）有限公司 （ 2015 年 7 月 ~ 2018 年 7月 ）

- 根据 ui 给出的 psd 高度还原成 h5 页面。
- 使用 vue.js 做页面动态渲染。
- 负责静态网页开发及 Js 动效交互。

## 项目经历

### 企业级移动端ui组件库(Vinko)

项目描述:
根据现有业务抽象了一套华通组件库，提供了一整套基础的 UI 组件以及常用的业务组件，这些组件都已经在华住的各类 H5 业务中广泛使用。

技术栈：
**React ReactHook Typescript Jest Dumi**

主要内容:

- 40+ 高质量组件
- 完善的中英文文档和示例
- 支持按需引入
- 支持主题定制
- 支持 TS 类型识别

主要技术：
- 使用 **husky** 和 **lint-staged** 对提交的代码进行检测避免不规范的代码提交，使用 **commitlint** 避免不符合规范的commit进入仓库。
- 使用 **Typescript** 编写，使用 **Jest** 配合@testing-library/react做组件单元测试。
- 使用 **Dumi** 构建组件库文档，使用Rollup输出 **umd/cjs/esm** 产物并支持按需加载。
- 使用 **Github Pages** 以及 Github Actions 完成文档站点自动部署。

### 加盟商C端

项目描述:
此项目为公司提供给意向加盟的合作伙伴的门户网站，由于项目需要支持seo所以项目采用ssr方案。

技术栈:
**React16 Node.js Koa2 Nginx**

主要技术:

- 项目中使用了 React 自带 renderToString() 和 renderToNodeStream() 把组件渲染为 html字符串并返回到客户端渲染提升了单页应用首次加载速度有效避免首次进入加载时间过长导致用户流失。
- 基于业务提炼出一套基于gif的埋点方案（优势在于防止阻塞页面加载、不会跨域、相对于png、jpg来说体积最小）。
- 采用路由同构方案。双端使用同一套路由规则，node server 通过req url path 进行组件的查找，得到需要渲染的组件再通过renderToString()渲染成html返回到客户端。
- 由于在客户端首次渲染会对比数据不一致会出现闪烁现象，所以需要对客户端数据进行设置项目中需要用到redux所以直接在模版中用Provide store={ store }对数据进行注入并设置`<div id="store"></div>`，在客户端通过获取元素id的方式拿到数据再在元素初始化的时候将数据注入到store中就可以实现双端数据同步，那么在首次加载页面的时候只会渲染一次了。

### 电商小程序低代码可视化建站

项目描述：
通过拖拽的方式搭建小程序、h5页面达到不写一行代码生成多个页面的小程序。通过后台返回json数据就可以产生一个由输入框、选择日期控件、上传图片、单选、多选按钮等组成的**h5表单页面**。

技术栈:
**Vue2.6 Vue-cli3 Element-ui Vant-ui**

主要内容:
- 组件化模块化的方式开发，因此代码具有可读性和可移植性
- 支持组件拖拽，改变组件层级
- 支持组件重做，撤销功能
  
主要技术:
- 拖拽功能主要依赖h5的 **dragstart** 事件，在拖拽刚开始时触发将信息记录在内存中。drop 事件，在拖拽结束时触发。主要将信息保存到内存中。由于拖拽组件到画布中是有先后顺序的，动态设置组件的 `z-index` 属性实现多层级效果。
- 使用数组栈的结构保存快照，每次执行新增，删除等操作的时候往数组中 `push` 一条数据。
- 每个组件都有像 `style` `data` 属性，因此在生成组件的时候都会使用工厂函数继承一些基础的属性到组件中，以便于维护和扩展。
- 通过Vue 内置的 **component** 动态组件 component 组件再通过 **:is** 的方式去挂载对应组件。
- 数据处理阶子组件使用 `this.$emit('input',value)` 往父组件传递内容，父组件再通过 `@input`的方式去接受子组件的值由于父组件接收后通过 `this.$set` 的方式驱动视图更新。
- 利用 **webpack** 的内置方法 `require.context` 动态引入组件实例，再通过 **Objeck.key** 遍历对象到 Vue 的 **components** 中实现组件的自动引入和注册，相当于是做了业务组件的**按需加载**。

总结:
- h5 表单是通过后台拖拽的方式生成的所以不需要一个个手动切页面，解放了生产力，提高了开发效率。
- 维护成本降低很多如果有新增加一种类型的任务只要编写对应的组件就可以生成产品想要的页面。


## 技术文章

- *《朴实无华的 JavaScript 闭包》*(https://juejin.im/post/5f0eddf5e51d45347246b82c)
- *《React + node + koa2 打造日记本应用 进阶大前端》*(https://juejin.im/post/5e3588cae51d4502671a43b1)
- *《从零配置 Eslint + Prettier + husky + lint-staged 构建前端代码工作流》* (https://juejin.im/post/5ea68dbce51d4546df73ad17)
- *《基于 vuepress 搭建博客教程 + 自动化部署 GitHub Actions》* (https://juejin.cn/post/6936843142293356558)
- *《Javascript 算法实现之冒泡排序》* (https://juejin.cn/post/7152064060916744229)

## 个人项目
- *基于 react 的移动端组件库* (huabingtao.github.io/react-single-ui/)
- *基于 vuepress 搭建的个人博客* (huabingtao.github.io/hbtblog/)
- *基于 vue3 实现的ios备忘录* (huabingtao.github.io/vue3-memo)


# 致谢

感谢您花时间阅读我的简历，期待能有机会和您共事。
