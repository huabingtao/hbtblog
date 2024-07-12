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

我是一名前端开发工程师，熟练掌握Vue和React框架，深入了解Vue的组件化和响应式原理。熟练使用TypeScript，并具备编写单元测试的能力。在组件化、模块化开发和构建优化方面经验丰富，擅长制定并规范团队协作模式。除了前端技术，我还涉猎后端技术栈，拥有Node.js开发经验，能够胜任全栈开发的工作需求。

## 技能清单

- 前端框架：Vue3/React
- 前端 ui 框架: Element-ui/Ant-design/iview/Ant-mobile/Taro-ui/Bootstrap
- 前端工具：Typescript/Webpack/Sass/Less/Styles
- 服务端：Node/Koa2/Express/Nginx
- 数据库：MySQL
- 版本管理：Git/Svn
- 单元测试：Jest/Testing-library

## 工作经历

### 上海左岸芯慧电子科技有限公司（2023 年 2 月 ～ 至今）

- 主导前端技术选型与架构设计，确保架构的合理性和扩展性。
- 作为公司App端开发负责人，设计并优化App的整体流程，提升App与内嵌H5页面的通信效率和性能。
- 参与公司老项目的升级与优化工作，提升系统稳定性和性能。

### 华住酒店集团（2021 年 4 月 ～ 2022 年 12月）

- 担任华通组件库Owner，负责组件库及其文档的研发与维护。
- 制定并实施组件库的设计思路、代码规范、开发流程及组件测试相关标准，推动并完善了代码审核流程。
- 收集并分析公司各项目组对组件库的需求，持续优化以提升用户体验。
- 参与定制版飞书的内嵌H5页面及小程序的研发工作。

### 上海珍岛科技有限公司 （ 2020 年 8 月 ~ 2021 年 4月 ）

- 参与并完成了多个商业云PC端和小程序系统的从0到1建设及后续版本迭代工作。
- 参与并优化了服务端渲染项目的首屏加载，加载速度从5秒提升至1.5秒，提高了渲染速度70%。
- 搭建项目脚手架，制定并配置代码规范，成功实施前端项目的CI/CD流程建设。

### 上海舍住信息科技有限公司 （ 2018 年 8 月 ~ 2020 年 6 月 ）

- 负责前端项目的架构设计，参与项目评审及产品开发，最终完成部署。
- 主导并负责公司管理后台及小程序的日常开发。
- 搭建项目脚手架，集成框架全家桶，单元测试、集成测试解决方案，及内部平台CI的对接。

### 晶睿文化传媒（上海）有限公司 （ 2015 年 7 月 ~ 2018 年 7月 ）
- 根据UI设计高度还原PSD文件为H5页面。
- 使用Vue.js实现页面动态渲染。
- 负责静态网页开发及JS动效交互。

## 项目经历

### 企业级移动端ui组件库(Vinko)

项目描述:
根据现有业务抽象了一套华通组件库，提供了一整套基础的UI组件及常用业务组件，广泛应用于华住的各类H5业务中。

技术栈：
**React ReactHook Typescript Jest Dumi**

主要内容:

- 40+ 高质量组件
- 完善的中英文文档和示例
- 支持按需引入
- 支持主题定制
- 支持 TS 类型识别

主要技术：
- 使用Husky和Lint-staged进行代码检测，避免不规范代码提交；使用Commitlint规范提交信息。
- 采用TypeScript编写组件库，使用Jest和 **@testing-library/react** 进行单元测试。
- 使用Dumi构建组件库文档，使用Rollup输出UMD/CJS/ESM产物并支持按需加载。
- 通过GitHub Pages和GitHub Actions实现文档站点自动部署。
  
### 加盟商C端

项目描述:
为公司提供意向加盟合作伙伴的门户网站，采用SSR方案以支持SEO。

技术栈:
**React16 Node.js Koa2 Nginx**

主要技术:

- 使用React的renderToString()和renderToNodeStream()方法将组件渲染为HTML字符串，提升单页应用的首次加载速度。
- 提炼基于GIF的埋点方案，防止阻塞页面加载、避免跨域、且体积最小。
- 采用路由同构方案，Node server通过请求URL路径查找并渲染组件，返回HTML至客户端。
- 解决首次渲染闪烁问题，通过在模版中注入Redux数据，实现双端数据同步。

### 电商小程序低代码可视化建站

项目描述：
通过拖拽方式搭建小程序、H5页面，实现无需编写代码生成多个页面的小程序。

技术栈:
**Vue2.6 Vue-cli3 Element-ui Vant-ui**

主要内容:
- 组件化、模块化开发，代码具有可读性和可移植性。
- 支持组件拖拽及层级变换，支持组件重做和撤销功能。
  
主要技术:
- 拖拽功能主要依赖h5的 **dragstart** 事件，在拖拽刚开始时触发将信息记录在内存中。drop 事件，在拖拽结束时触发。主要将信息保存到内存中。由于拖拽组件到画布中是有先后顺序的，动态设置组件的 `z-index` 属性实现多层级效果。
- 使用数组栈结构保存操作快照，实现撤销和重做功能。
- 利用Vue的动态组件及其: is属性挂载对应组件。
- 简化组件结构:子组件通过$emit('input', value)传递数据，父组件通过@input接收并更新视图。
- 使用Webpack的require.context动态引入组件，自动注册业务组件，实现按需加载。

总结:
- 通过后台拖拽生成H5表单页面，提升开发效率，降低维护成本。

## 技术文章

- *《朴实无华的 JavaScript 闭包》*(https://juejin.im/post/5f0eddf5e51d45347246b82c)
- *《React + node + koa2 打造日记本应用 进阶大前端》*(https://juejin.im/post/5e3588cae51d4502671a43b1)
- *《从零配置 Eslint + Prettier + husky + lint-staged 构建前端代码工作流》* (https://juejin.im/post/5ea68dbce51d4546df73ad17)
- *《基于 vuepress 搭建博客教程 + 自动化部署 GitHub Actions》* (https://juejin.cn/post/6936843142293356558)
- *《手把手教你把公司老项目从 webpack 3 升级到 webpack 5》* (https://juejin.cn/post/7301204029597958198)
- *《使用 uni-app 开发 APP 并上架 IOS 全过程》* (https://juejin.cn/post/7379958888909029395)

## 个人项目
- *基于 react 的移动端组件库* (huabingtao.github.io/react-single-ui/)
- *基于 vuepress 搭建的个人博客* (huabingtao.github.io/hbtblog/)
- *基于 vue3 实现的ios备忘录* (huabingtao.github.io/vue3-memo)

# 致谢

感谢您花时间阅读我的简历，期待能有机会和您共事。
