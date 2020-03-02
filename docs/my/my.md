---
show: false
sidebar: auto
sidebarDepth: 5
---

# 联系方式

- 手机：18818231998
- Email：huabingtao123@gmail.com

# 个人信息

- 华炳淘/男/1993
- 专科/上海农林职业技术学院
- 工作年限：4 年
- 掘金：https://juejin.im/user/592418062f301e006b2db045
- Github：https://github.com/huabingtao
- 期望职位：web 前端工程师(vue+react 方向)
- 期望薪资：税前月薪 20k~25k
- 期望城市：上海

# 技能清单

以下均为我熟练使用的技能

- 前端框架：Vue/React
- 前端 ui 框架: Element-ui/Ant-design/iview/Ant-mobile/Taro-ui/Bootstrap
- 前端工具：Webpack/Sass/Less/Styles
- 后端开发：Node/Koa2/Express/Nginx
- 数据库相关：MySQL
- 版本管理：Git/Svn
- 单元测试：Jest

# 工作经历

### 上海慧住信息科技有限公司 （ 2018 年 8 月 ~ 2020 年 2 月 ）

- 负责前端项目的架构设计,参与项目评审，配合产品经理和设计，参与产品的开发和业务实现并最终完成部署。
- 主导和负责八爪鱼酒店管理后台以及小程序的日常开发。
- 基于公司业务对前端框架工具对比,用适合的框架进行研发。
- 定期组织团队分享以及 codeRview。
- 工作之余阅读前端团队其他成员的代码,吸取别人的长处,约束团队代码保持一致。

### 上海寰易信息科技有限公司 （ 2018 年 3 月 ~ 2018 年 7 月 ）

- 参与项目评审，根据产品需求实现海易通管理后台和小程序的维护以及更新迭代。
- 使用 flex 对 h5 页面布局的重构使用 rem 对手机端页面进行适配。
- 负责 h5 活动页/pc/微信页面开发和维护。
- 使用小程序分包加载优化首次加载速度。
- 负责小程序账单部分功能的开发和维护。

### 晶睿互动   （ 2016 年 4 月 ~ 2018 年 3 月 ）

- 根据 ui 给出的 psd 高度还原成 h5 页面。
- 使用 vue.js 做页面动态渲染。
- 负责静态网页开发及 Js 交互。
- 同期工作之余提升自己原生 JS 编码能力。

# 项目经历

#### H 连锁飞燕小程序(上海慧住信息科技有限公司)2019.08-2019.12

项目描述：
飞燕店长小程序是一款为酒店店长量身定做的一款轻量级软件为店长赋能使能更好的管理酒店，主要功能有查看酒店经营数据、查看当前酒店在全国排行、店长日常任务拍照上传等功能。

技术栈：
**Taro-cli2.0 Axios Taro-ui React-redux**

主要内容：

- 使用 Taro-cli2.0 版本构建配套使用 Taro-ui 作为 ui 框架。
- Api 封装由于后端环境域名很多所以我选择对 Taro 原有的 Taro.request()进行封装，在跟目录建立配置文件通过 node 提供的 process.env.NODE_ENV 全局环境变量去对环境进行区分，添加 Taro 拦截器统一处理用户权限。
- 多个页面之间状态管理往往很棘手因此使用 Redux 处理，首先讲需要用到的表单数据存储在 store 中然后再通过 action 操作数据，组件中通过 redux 提供的 connect 方法将 store 中的数据作为 props 绑定到组件上。

#### 八爪鱼后台管理系统    （上海慧住信息科技有限公司）     2019.01-2020.02                               

项目描述：
八爪鱼后台管理系统主要功能包括角色权限、酒店录入、经营数据录入、酒店经营数据图表、全国门店统计图、店长入驻情况统计图等。

技术栈:
**Vue2.6 Vue-router Vue-cli3 ElementUi Easy-moke Vuex Axios Echart Nginx**

主要内容:

- 开发阶段使用 esay-moke 模拟数据增加前后端联调效率。
- 使用 axios 库进行 http 请求配置 nginx 解决跨域问题，封装 api 全局 filter 公共 vendor 公共 util 函数。
- 前端路由方面使用 vue-router 开启 history 模式，后端配置 nginx 重定向到 index.html 解决用户刷新报 404 错误。
- 封装全局 store 按模块进行拆分，使用 nginx 代理加载静态资源。
- 使用路由懒加载提升首页加载速度使用 webpack dll 配置打包第三方库提高项目开发阶段 webpack-dev-server 打包速度。
- 优化 svg 图标，利用 require.context 做文件夹的自动导入，使用 svg-sprite-loader 处理 svg 生成 symbol 图标。任何时候只要我们想用 svg 图标只要引入对应 svg 的文件名就可以了。

#### 动态生成任务表单（上海慧住信息科技有限公司）2019.08-2019.12

项目描述:
动态生成任务表单是给酒店店长开发的一款任务工具，任务模块通过和后端约定一种 json 数据格式可以动态生成表单，生成可提交的表单例如：输入框、选择日期控件、上传图片、单选、多选等表单。

技术栈:
**Vue2.6 Vue-cli3 Axios Vue-router**

主要技术:

- 通过组件化的方式去构建页面，整个应用都由一个个组件构成。
- 页面的根目录下创建 formGenerator 组件，根据数组渲染多个 vue 内置的“component”动态组件 component 组件通过:is 去挂载组件。
- 子组件使用 this.\$emit(‘input’,value)往父组件传递内容
- 父组件再通过@input 的方式去接受值由于父组件接收后通过 this.\$set 的方式驱动视图更新。
- 利用 webpack 的内置方法 require.context 动态引入组件实例，在通过 Objeck.key 遍历对象到 Vue 的 components 中实现组件的自动注册。
- 当表单发生嵌套时会形成嵌套的复杂表单所以我想到了使用 formGroup 成组的组件当渲染到复杂表单的时候递归 formGroup，formGroup 组件再去渲染更小粒度的组件完美的实现了表单的递归嵌套。

总结优点:

- 动态化表单的好处有代码量大大减少了哪怕有十几种不同控件组合而成的表单入口页面只需要一个就可以搞定。
- 维护成本降低很多如果有新增加一种类型的任务只要编写对应缺失的组件就可以生成页面。

缺点：

- 前后端数据格式严重耦合代码层面上有着大量的约定比如组件类型定义为 type 为 input 就只能是 input
- 业务逻辑较为复杂需要理解 Vue 组件动态组件、递归组件的原理。

# 开源项目

#### 日记本 2019.09-2019.10

项目描述:
前端用 React 构建，后端 Node + Koa2 使用 Sequelize 操作 mysql 数据库主要功能包括登录、注册、新增日记、修改日记、点赞等

技术栈:
**React16 React-router Ant-mobile Node.js Koa2 Mysql Nginx**

主要技术:

- 使用 validator.js 库编写中间件校验入参，打造全局异常处理开发阶段把错误抛到前端。
- 使用 es7 的 async 与 await 语法 避免了 promise 的循环嵌套，代码也更加简洁。
- 使用 Sequelize 对数据库进行增删改查以及用到了数据库的事物使点赞与点赞数保持一致。
- 使用 requireDirectory 做自动路由加载。
- 使用 react 以及 react-router 做路由跳转开发阶段配置 proxy 解决跨域问题，生产环境用 nginx 做反向代理解决跨域。

总结:

- 掌握了 Node 和 Mysql 数据库的使用,提升了编程思维和异步编程的能力。
- 深入理解了 Koa2 洋葱模型的理念，做出了全局异常处理中间件。
- 使用了 token 代替了传统的 session+cookie 的方式把 token 携带在请求头里这意味着请求是无状态的而且可以避免 CSRF 攻击。
- 提升了原生 JS 的功底以及熟悉了 ES6、7 语法。

# 技术文章

[React + node + koa2 打造日记本应用 进阶大前端](https://juejin.im/post/5e3588cae51d4502671a43b1)

# 致谢

感谢您花时间阅读我的简历，期待能有机会和您共事。
