---
title: React + node + koa2 搭建笔记本
date: 2020-02-01
tags:
  - js
  - React
  - Node
author: link
location: ShangHai
---

## 前言

你好，这是一篇入门级前后端分离的全栈教程。前端用**React**构建，后端**Node + Koa2** 使用**Sequelize**链接数据库，数据库采用 **mysql** 虽然是入门级但还是希望你了解过 React 和 Node 本篇不会对如 react 组件、Node.js 模块、koa 路由、koa 中间件等基本内容作详细讲解，由于时间关系 ui 样式不作为本次学习的重点使用了 antd-mobil 框架。

## 项目截图

![](http://file.huabingtao.com/juejin/nodeKoa/1.jpeg)

## 项目预览

线上[预览](http://diary.huabingtao.com/)地址。
账号:127@qq.com 密码:111111

## 源码获取

[react 前端源码](http://github.com/huabingtao/react-diary)

[node+koa2 后端源码](http://github.com/huabingtao/koa-diary)

## Node 后端开发

### 环境安装

- mysql 的版本号: mysql-5.7.27
- node 的版本号 : 10.15.3
- Navicat 是数据库可视化工具方便我们查看数据库中的表，同学们选择进行安装。
- Postman 用于调试接口的工具。

### Node 初体验

#### 1) 创建项目

新建文件夹 koa-diary 在文件夹下新建 **package.json** 写入

```json
{
  "name": "koa-diary",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "koa": "^2.7.0",
    "koa-bodyparser": "^4.2.1",
    "koa-router": "^7.4.0",
    "lodash": "^4.17.11",
    "mysql2": "^1.6.5",
    "require-directory": "^2.1.1",
    "sequelize": "^5.6.1",
    "validator": "^10.11.0"
  },
  "scripts": {
    "start": "nodemon --inspect-brk",
    "start:prod": "node app.js"
  },
  "dependencies": {
    "koa2-cors": "^2.0.6",
    "loadsh": "0.0.4"
  }
}
```

执行 **yarn** 或者 **npm install** 安装依赖
这些依赖到用到的时候再去解释先冲就完事了！！！🤣

#### 2) 第一个 node 程序

我们一般程序主入口会放在根目录下，新建 app.js 添加代码：

```js
// app.js
const Koa = require('koa');
const app = new Koa();
app.listen(3000);
console.log('listen 3000');
```

打开命令行执行 `node app.js`

如果终端有打印 `listen 3000` node 监听了 3000 端口，接下来打开浏览器输入 _http://localhost:3000/_ 如果浏览器返回如图

![](http://file.huabingtao.com/juejin/nodeKoa/2.jpeg)
说明我们的服务器已经成功启动了但为什么返回 **Not Found** 因为我们的服务确实是什么都没返回啊！！！！

接下来我们写点东西让 node 返回点东西给前端! **app.js** 修改后

```
const Koa = require('koa')
const app = new Koa()
app.use(async (ctx, next) => {
  ctx.response.body = '<h1>Hello, koa2!</h1>'
})

app.listen(3000)
console.log('listen 3000')
```

再次访问*http://localhost:3000/* 不出意外你会看到

![](http://file.huabingtao.com/juejin/nodeKoa/3.jpeg)

#### 3) 使用 koa-router

打开 **app.js** 增加几行代码

```
const Koa = require('koa')
const Router = require('koa-router')
const router = new Router()
const app = new Koa()
router.get('/hello', (ctx, next) => {
  ctx.body = 'hello koa'
})
app.use(router.routes())
app.listen(3000)
console.log('listen 3000')
```

打开浏览器访问 http://localhost:3000/hello 不出意外如下图所示:

![](http://file.huabingtao.com/juejin/nodeKoa/4.jpeg)

浏览器输出了 hello koa 用 koa-router 写接口要比 node 原生的更**简洁**

**这难道就是传说中的接口吗？？大佬大佬！！**

接下来我们就要进行实战了，如果看到这里你还是有点吃力的话建议你去把**Node.js**以及**koa2**基础补一下再来食用哦 😏

#### 4) 使用 nodemon 监控进程

**nodemon**是一款监控进程的工具
nodemon 可以让我们改变代码后不需要手动重启服务，它会在我们改变代码后自动重启服务。

1 全局安装 nodemon
`yarn add nodemon -g`

2 打开 vscode 点击左边的爬虫选择创建**lunch.json**文件，接着选择 Node.js 环境

![](http://file.huabingtao.com/juejin/nodeKoa/5.jpeg)

![](http://file.huabingtao.com/juejin/nodeKoa/6.jpeg)

3 打开**lunch.js**文件 把配置改为**nodemon** 去监听进程

```json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: http://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "nodemon",
      "runtimeExecutable": "nodemon",
      "program": "${workspaceFolder}/app.js",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "启动程序",
      "program": "${workspaceFolder}/app.js"
    }
  ]
}
```

4 配置完成后把选项切换为**nodemon** 点击调试按钮就是那个播放按钮

![](http://file.huabingtao.com/juejin/nodeKoa/7.jpeg)

如果你看到控制台有如下输出，那么 nodemon 已经运行成功了。

现在你随便改几行代码保存一下就会发现**nodemon**在自动帮我们重启，偷懒的感觉怎么样。

![](http://file.huabingtao.com/juejin/nodeKoa/8.jpeg)

#### 5) 构建项目目录

一个好的的项目必须要有合理的目录，新建如下图一些文件夹。

![](http://file.huabingtao.com/juejin/nodeKoa/9.jpeg)

接下来会和大家解释这些目录的用处不要捉急！！😸😸

#### 6) 全局动态注册路由

目前我们是采取`app.use(router.routes())`的方式手动去注册路由。而且这很不**优雅**但是真实的开发场景路由一般会多达几十个甚至上百个再去手动的方式注册路由就显得有点蠢了，我们鼓励程序员 “偷懒” 这能让我们的代码看上去更**简洁**

第一步 在 app 目录下新建 api 文件夹用于存放所有 api
第二步 在 api 文件夹下新建**test.js**写入如下代码:

```
// api/test.js
const Router = require('koa-router')
const router = new Router({
  prefix: '/test'
})
router.get('/', async ctx => {
  ctx.body = '测试'
})
module.exports = router
```

第三步 在根目录下的 core 文件夹下新建 **init.js** 写入如下代码:

```js
// core/init.js
const Router = require('koa-router');
const Directory = require('require-directory');

class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRouters();
  }

  static initLoadRouters() {
    function checkRouter(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
    const path = process.cwd();
    Directory(module, `${path}/app/api`, { visit: checkRouter });
  }
}

module.exports = InitManager;
```

第四步 改造**app.js** 重启程序

```js
// app.js
const Koa = require('koa');
const InitManager = require('./core/init');
const app = new Koa();
InitManager.initCore(app);
app.listen(3000);
console.log('listen 3000');
```

打开 http://localhost:3000/test 不出意外的话浏览器显示如下图:

![](http://file.huabingtao.com/juejin/nodeKoa/10.jpeg)

现在我们已经可以完成**动态注册路由**了，只要我们把路由写在**api**文件夹下程序就会自动帮我们注册。

#### 7) 全局异常捕获

当我们程序出了故障应该明确地提示给前端用户也方便我们调试代码。我们使用**中间件**的方式写全局异常捕获，这需要了解**koa2**著名的**洋葱模型**，因为不是本节课重点所以不会详细讲解它。如果不懂什么是洋葱模型的话一定要先去了解清楚！！

第一步 在 config 文件夹下新建 **config.js** 写入代码:

```js
// config/config.js
module.exports = {
  // prod
  environment: 'dev',
};
```

第二步 打开 core 文件夹下的**init.js** 完整代码如下:

```js
// core/init.js
const Router = require('koa-router');
const Directory = require('require-directory');

class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.initLoadConfig();
  }

  static initLoadRouters() {
    function checkRouter(obj) {
      // console.log('obj', obj)

      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
    const path = process.cwd();
    Directory(module, `${path}/app/api`, { visit: checkRouter });
  }

  static initLoadConfig() {
    const path = process.cwd() + '/config/config.js';
    global.config = require(path);
  }
}

module.exports = InitManager;
```

第二步 在 core 下新建**http-exception.js** 写入代码:

```js
// core/http-exception.js
class HttpException extends Error {
  constructor(msg = '服务器异常', code = 400, errorCode = 10001) {
    super();
    this.msg = msg;
    this.code = code;
    this.errorCode = errorCode;
  }
}

module.exports = {
  HttpException,
};
```

第三步 在根目录下的**middlewares**文件夹下新建**exception.js** 写入代码:

```js
// middlewares/exception.js
const { HttpException } = require('../core/http-exception');
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const isHttpException = error instanceof HttpException;
    const isDev = global.config.environment === 'dev';
    if (isDev) {
      if (!isHttpException) {
        throw error;
      }
    }

    if (isHttpException) {
      ctx.body = {
        message: error.msg,
        errorCode: error.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = error.code;
    } else {
      ctx.body = {
        message: '服务器发生了点问题请稍后再试',
        errorCode: '9999',
        requestUrl: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = 500;
    }
  }
};

module.exports = catchError;
```

第四步 修改**app.js** 完整代码如下:

```js
// app.js
const Koa = require('koa');
const bodyParser = require('koa-bodyparser'); // 获取Body参数
const InitManager = require('./core/init'); //动态注册路由 || 全局挂载config
const catchError = require('./middlewares/exception'); // 全局异常
const cors = require('koa2-cors'); // 解决跨域

const app = new Koa();

app.use(cors());
app.use(catchError);
app.use(bodyParser());
InitManager.initCore(app);
app.listen(3000);
```

接下来我们修改下 api 文件夹下的 test.js 测试代码抛出一个服务端异常:

```js
// api/test.js
const Router = require('koa-router');

const router = new Router({
  prefix: '/test',
});

router.get('/', async (ctx) => {
  throw new Error('抛出异常');
  ctx.body = '测试';
});

module.exports = router;
```

刷新浏览器查看如果浏览器出现 Internal Server Error:

![](http://file.huabingtao.com/juejin/nodeKoa/11.jpeg)

打开控制台查看:

![](http://file.huabingtao.com/juejin/nodeKoa/12.jpeg)

我们已经成功捕获到了非**http 异常**，一般这样的异常是不曝露给用户看到的研发自己知道就可以了。接下来我们用测试代码演示抛出一个**http 异常**。

修改 **test.js** 修改后如下:

```js
// api/test.js
const Router = require('koa-router');
const { HttpException } = require('../../core/http-exception');

const router = new Router({
  prefix: '/test',
});

router.get('/', async (ctx) => {
  // throw new Error('抛出异常')
  throw new HttpException();
  ctx.body = '测试';
});

module.exports = router;
```

刷新 http://localhost:3000/test 如图:

![](http://file.huabingtao.com/juejin/nodeKoa/13.jpeg)

此时我们已经成功捕获到了异常并成功返回给了前端。

### 用户注册

> 前面做了那么多,比如异常处理、全局动态注册路由、都是为了接口做准备的。

##### 1）mysql 配置

打开**config**文件下的 config.js 新增 mysql 配置代码如下：

```js
// config.js
module.exports = {
  // prod
  environment: 'dev',
  database: {
    dbName: 'remind',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
  },
};
```

我们通过**sequelize.js**去操作数据库,在**core**目录下新增文件**db.js**:

```js
// db.js
const { Sequelize, Model } = require('sequelize');
const { unset, clone, isArray } = require('loadsh');

const {
  dbName,
  host,
  port,
  user,
  password,
} = require('../config/config').database;
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', // 连接数据库
  host,
  port,
  timezone: '+08:00',
  define: {
    logging: true,
    timestamps: true, // 时间字段
    paranoid: true, // 删除字段
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true, // 驼峰转化下划线
    freezeTableName: true,
  },
});

sequelize.sync({
  force: false,
});

Model.prototype.toJSON = function() {
  let data = clone(this.dataValues);
  unset(data, 'updated_at');
  unset(data, 'deleted_at');

  if (isArray(this.exclude)) {
    this.exclude.forEach((value) => {
      unset(data, value);
    });
  }

  return data;
};

module.exports = {
  sequelize,
};
```

在**api**目录下新建**user.js**删除之前用于测试的 test.js,新增代码:

```js
// user.js
const Router = require('koa-router');

const router = new Router({
  prefix: '/user',
});
router.post('/register', async (ctx) => {});
module.exports = router;
```

> 接着我们给用户注册写 **校验器**，校验器也是通过中间件的方式去实现的。如果发生异常会直接被我们的全局异常所捕获到

打来 core 目录的**http-exception.js**新增**ParameterException**异常修改如下:

```js
// http-exception.js
class HttpException extends Error {
  constructor(msg = '服务器异常', code = 400, errorCode = 10001) {
    super();
    this.msg = msg;
    this.code = code;
    this.errorCode = errorCode;
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误', errorCode) {
    super();
    this.msg = msg;
    this.errorCode = errorCode || 10001;
  }
}

module.exports = {
  HttpException,
  ParameterException,
};
```

接下来在**app**目录下新建文件夹**validators**存放我们的校验器。在 validators 下新建**validator.js** 写入:

```js
// validator.js

const validator = require('validator');
const { ParameterException } = require('../../core/http-exception');

const RegisterValidator = async function(ctx, next) {
  const { email, password1, password2 } = ctx.request.body;
  let v = validator.isLength(email, { min: 6, max: 64 });
  if (!v) {
    throw new ParameterException('email长度必须在6~64个字符');
  }
  v = validator.isEmail(email);
  if (!v) {
    throw new ParameterException('email格式错误');
  }
  v = validator.isLength(password1, { min: 6, max: 32 });
  if (!v) {
    throw new ParameterException('密码至少6个字符，最多32个字符');
  }
  v = validator.isLength(password2, { min: 6, max: 32 });
  if (!v) {
    throw new ParameterException('密码至少6个字符，最多32个字符');
  }
  if (password1 !== password2) {
    throw new ParameterException('两个密码必须相同');
  }
  await next();
};

module.exports = {
  RegisterValidator,
};
```

最后我们修改下 api 目录下的**user.js**,把我们刚刚编写的校验器用上。修改后的 user.js:

```js
// user.js
const Router = require('koa-router');
const { RegisterValidator } = require('../validators/validator');

const router = new Router({
  prefix: '/user',
});

router.post('/register', RegisterValidator, async (ctx) => {});

module.exports = router;
```

运行 nodemon 在 postman 测试一下先输入一些错误的参数:

![](http://file.huabingtao.com/juejin/nodeKoa/14.jpeg)

可以看到校验器可以成功运行，接下来就是编写业务代码往数据库插入数据了。

我们通过模型的方式去操作数据库，在**api**目录下新建**models**文件夹，接着在 models 下新建**user.js**写入代码:

```js
// user.js
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'user',
  }
);

module.exports = {
  User,
};
```

先把异常类补充完整 **http-exception.js** 完整代码如下:

```js
// http-exception.js
class HttpException extends Error {
  constructor(msg = '服务器异常', code = 400, errorCode = 10001) {
    super();
    this.msg = msg;
    this.code = code;
    this.errorCode = errorCode;
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误', errorCode) {
    super();
    this.msg = msg;
    this.errorCode = errorCode || 10001;
  }
}

class Success extends HttpException {
  constructor(msg = 'ok') {
    super();
    this.msg = msg;
    this.code = 201;
    this.errorCode = 0;
  }
}

class NotFound extends HttpException {
  constructor(msg = '资源未找到', errorCode) {
    super();
    this.msg = msg;
    this.code = 401;
    this.errorCode = errorCode || 10002;
  }
}

class EmailRepetition extends HttpException {
  constructor(msg = '用户已存在') {
    super();
    this.msg = msg;
    this.code = 402;
    this.errorCode = 10003;
  }
}

class LikeError extends HttpException {
  constructor(msg = '你已经点过赞了', errorCode) {
    super();
    this.msg = msg;
    this.code = 402;
    this.errorCode = errorCode || 10004;
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  EmailRepetition,
  LikeError,
};
```

模型创建好之后打开**api 目录下的 user.js** 修改后代码如下:

```js
// user.js
const Router = require('koa-router');
const { RegisterValidator } = require('../validators/validator');
const { EmailRepetition } = require('../../core/http-exception');
const { User } = require('../models/user');

const router = new Router({
  prefix: '/user',
});

router.post('/register', RegisterValidator, async (ctx) => {
  const { email, nickname, password1 } = ctx.request.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    throw new EmailRepetition();
  }
  await User.create({ email, nickname, password: password1 });
});

module.exports = router;
```

用 postman 调用一下:

![](http://file.huabingtao.com/juejin/nodeKoa/15.jpeg)

返回 Not Found 刷新下 user 表:

![](http://file.huabingtao.com/juejin/nodeKoa/16.jpeg)

这条记录已经产生我们还需要给客户端一个明确的成功提示

在**app**目录下新建**lib**文件夹新建帮助函数:

```js
// lib/helper.js
const { Success } = require('../../core/http-exception');
function success(msg) {
  throw new Success(msg);
}

function formatDate(timeObj) {
  const date = new Date(timeObj);
  const y = date.getFullYear();
  const m =
    (date.getMonth() + 1).toString().length === 1
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const d =
    date.getDate().toString().length === 1
      ? '0' + date.getDate()
      : date.getDate();
  return y + '年' + m + '月' + d + '日';
}

module.exports = {
  success,
  formatDate,
};
```

返回两个函数**success**是这次我们需要的，formatDate 我们后面做日期格式化的时候会用到

改写**api 文件夹下的 user.js**在操作成功后返回**success**函数:

```js
// api/user.js
const Router = require('koa-router');
const { RegisterValidator } = require('../validators/validator');
const { EmailRepetition } = require('../../core/http-exception');
const { success } = require('../lib/helper');
const { User } = require('../models/user');

const router = new Router({
  prefix: '/user',
});

router.post('/register', RegisterValidator, async (ctx) => {
  const { email, nickname, password1 } = ctx.request.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    throw new EmailRepetition();
  }
  await User.create({ email, nickname, password: password1 });
  success();
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await User.validatorEmail(email, password);
  ctx.body = {
    user,
  };
});

module.exports = router;
```

接着我们改变点参数通过**postman**调用一下结果应该能正确返回:

![](http://file.huabingtao.com/juejin/nodeKoa/17.jpeg)

ok 成功地返回出了 **message errorCode 和 requestUrl**

到目前为止我们终于写好了一个接口不容易啊 😂

### 用户登录

> 用户登录除了对用户邮箱和密码的校验，首先查询邮箱是否存在，其次再进行密码的比对。有兴趣的同学可以对密码进行加密更符合真实的开发场景。

我们把对数据库的操作写在模型上,打开**models 目录下的 user.js** 代码如下:

新增了两个静态方法，*validatorUser*验证用户 id 是否存在 _validatorEmail_ 验证用户邮箱是否存在

```js
// models/user.js
const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../core/db');
const { NotFound } = require('../../core/http-exception');

class User extends Model {
  static async validatorUser(id) {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFound('账号不存在');
    }
    return user;
  }

  static async validatorEmail(email, password) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFound('账号不存在');
    }
    if (user.password !== password) {
      throw new NotFound('密码错误');
    }
    return user;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'user',
  }
);

module.exports = {
  User,
};
```

接着打开**api**目录下的 user.js 新增**路由 login**:

这个路由就是调用了**User**模型上的*validatorEmail*方法把查询到的 User 返回给前端。

```js
// api/user.js
const Router = require('koa-router');
const { RegisterValidator } = require('../validators/validator');
const { EmailRepetition } = require('../../core/http-exception');
const { success } = require('../lib/helper');
const { User } = require('../models/user');

const router = new Router({
  prefix: '/user',
});

router.post('/register', RegisterValidator, async (ctx) => {
  const { email, nickname, password1 } = ctx.request.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    throw new EmailRepetition();
  }
  await User.create({ email, nickname, password: password1 });
  success();
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await User.validatorEmail(email, password);
  ctx.body = {
    user,
  };
});

module.exports = router;
```

### 新增日记

> 新增日记只需要前端传用户 id 和 content 内容，用户昵称我们可以根据用户 id 去 user 表里面去读，阅读数量和点赞数都是 0 可以设置默认值。

#### 1）新建 diary 模型

打开**models**下新建**diary.js**：

定义表名和字段需要注意的是设置**favor_nums**和**look_nums**的默认值为 0，**content**的长度大家可视情况。

```js
// models/diary.js

const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');

class Diary extends Model {}

Diary.init(
  {
    uid: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    content: DataTypes.STRING(2000),
    create_time: DataTypes.DATE,
    favor_nums: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    look_nums: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'diary',
  }
);

module.exports = {
  Diary,
};
```

#### 2）编写 diary 校验器

> diary 对应的接口就比较多了因此校验器也比较多，日记的增删改查我们都要对参数进行校验。

打开**validators**目录下的**validator.js** 完整代码如下:

```js
// validators/validator.js
const validator = require('validator');
const { ParameterException } = require('../../core/http-exception');

const RegisterValidator = async function(ctx, next) {
  const { email, password1, password2 } = ctx.request.body;
  let v = validator.isLength(email, { min: 6, max: 64 });
  if (!v) {
    throw new ParameterException('email长度必须在6~64个字符');
  }
  v = validator.isEmail(email);
  if (!v) {
    throw new ParameterException('email格式错误');
  }
  v = validator.isLength(password1, { min: 6, max: 32 });
  if (!v) {
    throw new ParameterException('密码至少6个字符，最多32个字符');
  }
  v = validator.isLength(password2, { min: 6, max: 32 });
  if (!v) {
    throw new ParameterException('密码至少6个字符，最多32个字符');
  }
  if (password1 !== password2) {
    throw new ParameterException('两个密码必须相同');
  }
  await next();
};

const DiaryValidator = async (ctx, next) => {
  const { content } = ctx.request.body;
  if (content.length > 1000) {
    throw new ParameterException('内容超过1000字');
  }
  await next();
};

const GetDiaryValidator = async (ctx, next) => {
  const { start, count } = ctx.request.query;
  if (!start || !count) {
    await next();
    return;
  }
  let v = validator.isInt(start);
  if (!v) {
    throw new ParameterException('start不符合规范');
  }
  v = validator.isInt(count);
  if (!v) {
    throw new ParameterException('count不符合规范');
  }
  await next();
};

const PutDiaryValidator = async (ctx, next) => {
  const { content } = ctx.request.body;
  let v = validator.isEmpty(content);
  if (v) {
    throw new ParameterException('content不能为空');
  }
  await next();
};

const PostFavorValidator = async (ctx, next) => {
  const { uid, diary_id } = ctx.request.body;
  let v = validator.isInt(uid.toString());
  if (!v) {
    throw new ParameterException('uid 不符合规范');
  }
  v = validator.isInt(diary_id.toString());
  if (!v) {
    throw new ParameterException('diary_id 不符合规范');
  }
  await next();
};

module.exports = {
  RegisterValidator,
  DiaryValidator,
  GetDiaryValidator,
  PutDiaryValidator,
  PostFavorValidator,
};
```

#### 3）编写 diary 接口

接着在**api**目录下新建**diary.js**,新增日记的接口比较简单就是把用户输入的内容插到 diary 表里去。

```js
// api/diary.js

const Router = require('koa-router');
const { DiaryValidator } = require('../validators/validator');
const { success } = require('../lib/helper');
const { User } = require('../models/user');
const { Diary } = require('../models/diary');

const router = new Router({
  prefix: '/diary',
});

router.post('/', DiaryValidator, async (ctx) => {
  const { id, content } = ctx.request.body;
  const user = await User.validatorUser(id);
  const date = new Date();
  await Diary.create({
    uid: id,
    content,
    nickname: user.nickname,
    create_time: date,
    favor_num: 0,
  });
  success();
});

module.exports = router;
```

**postman**调用一下:

![](http://file.huabingtao.com/juejin/nodeKoa/18.jpeg)

刷新 Navicat 后新增一条记录

![](http://file.huabingtao.com/juejin/nodeKoa/19.jpeg)

### 查看日记

查看日记的功能比较简单，就是根据日记的 id 去 diary 表里取对应的记录就 ok。

> 需要注意的是我们还有一个阅读次数的功能。所以每查看一次我们就在对应记录下 look_nums 递增 1 次。

打开**api**目录下的 diaryl.js 新增代码如下:

**formatDate**函数对输出的时间戳转化为**xxxx 年 xx 月 xx 日**格式。

```js
// api/diary.js
const Router = require('koa-router');
const { DiaryValidator } = require('../validators/validator');
const { success } = require('../lib/helper');
const { User } = require('../models/user');
const { Diary } = require('../models/diary');
const { formatDate } = require('../lib/helper');

const router = new Router({
  prefix: '/diary',
});

router.post('/', DiaryValidator, async (ctx) => {
  const { id, content } = ctx.request.body;
  const user = await User.validatorUser(id);
  const date = new Date();
  await Diary.create({
    uid: id,
    content,
    nickname: user.nickname,
    create_time: date,
    favor_num: 0,
  });
  success();
});

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const diary = await Diary.findOne({
    where: {
      id: parseInt(id),
    },
  });
  if (!diary) {
    throw new NotFound('文章未找到');
  }
  await diary.increment('look_nums', {
    by: 1,
  });
  diary.setDataValue('create_time', formatDate(diary.create_time));
  ctx.body = diary;
});

module.exports = router;
```

使用**postman**调用一下:

![](http://file.huabingtao.com/juejin/nodeKoa/20.jpeg)

ok 成功查出日记并且**look_nums**也增加了 1。

### 点赞日记

我们需要一个表来记录谁对这条日记进行的点赞，并且在日记的列表页面需要把这篇日记的点赞数量统计出来。

#### 1）编写 favor 模型

打开**models**目录新建**favor.js**，并创建静态方法**increment**。
首先查询是否这篇日记已经被点赞了，如果是**则抛出异常**。如果没有被点赞则往**favor**表里增加一条记录且为**diary**表里的**favor_nums**字段加 1，为了保持数据库数据一致性用了**数据库事务**的方式。

```js
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');
const { NotFound, LikeError } = require('../../core/http-exception');
const { User } = require('./user');

class Favor extends Model {
  static async increment(uid, diary_id) {
    await User.validatorUser(uid);
    const f = await Favor.findOne({
      where: {
        uid,
        diary_id,
      },
    });
    if (f) {
      throw new LikeError();
    }
    return sequelize.transaction(async (t) => {
      await Favor.create(
        {
          uid,
          diary_id,
        },
        { transaction: t }
      );
      const { Diary } = require('./diary');
      const diary = await Diary.findOne({
        where: {
          id: diary_id,
        },
      });
      if (!diary) {
        throw new NotFound('日记不存在');
      }
      await diary.increment('favor_nums', { by: 1, transaction: t });
    });
  }
}

Favor.init(
  {
    uid: DataTypes.INTEGER,
    diary_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: 'favor',
  }
);

module.exports = {
  Favor,
};
```

#### 2) 编写点赞接口

老样子在**api**目录下新建**favor.js**:

```js
// api/favor.js
const Router = require('koa-router');
const { PostFavorValidator } = require('../validators/validator');
const { success } = require('../lib/helper');
const { Favor } = require('../models/favor');

const router = new Router({
  prefix: '/favor',
});

router.post('/', PostFavorValidator, async (ctx) => {
  const { uid, diary_id } = ctx.request.body;
  await Favor.increment(uid, diary_id);
  success();
});

module.exports = router;
```

用**postman**调试一下:

![](http://file.huabingtao.com/juejin/nodeKoa/21.jpeg)

**Navicate** 刷新**favor**表查看:

![](http://file.huabingtao.com/juejin/nodeKoa/22.jpeg)

### 日记列表

分为两个列表，一个是所有的日记列表，一个是我的日记列表。需要注意的是前端的显示页面需要显示日记的点赞状态，点赞状态从**favor**表里得到。

#### 我的日记列表

我的日记列表逻辑需要用户**id**查询，并且从 favor 表里查出当前用户 id 的点赞的日记然后取到 diary_id，再与从我的日记列表进行对比如果有纪录则说明这条日记被点赞了。

打开**models**目录下的**diary.js**新增静态方法**getDiary** 改变后的代码如下:

```js
const { Model, DataTypes, Op } = require('sequelize');
const { sequelize } = require('../../core/db');
const { NotFound } = require('../../core/http-exception');
const { formatDate } = require('../lib/helper');
const { User } = require('./user');
const { Favor } = require('./favor');

class Diary extends Model {
  static async getDiary(id, start = 0, count = 10) {
    await User.validatorUser(id);
    const favors = await Favor.findAll({
      where: {
        uid: id,
      },
    });
    const diaryIds = favors.map((f) => {
      return f.diary_id;
    });
    const diary = await Diary.findAll({
      order: [['id', 'DESC']],
      where: {
        uid: id,
      },
      offset: parseInt(start),
      limit: parseInt(count),
    });
    diary.forEach((item) => {
      item.dataValues.create_time = formatDate(item.dataValues.create_time);
      if (diaryIds.includes(item.id)) {
        item.dataValues.isFavor = 1;
      } else {
        item.dataValues.isFavor = 0;
      }
    });
    return diary;
  }
}

Diary.init(
  {
    uid: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    content: DataTypes.STRING(2000),
    create_time: DataTypes.DATE,
    favor_nums: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    look_nums: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'diary',
  }
);

module.exports = {
  Diary,
};
```

打开**api**目录下的**diary.js** 修改如下:

```js
// api/diary.js
const Router = require('koa-router');
const {
  DiaryValidator,
  GetDiaryValidator,
} = require('../validators/validator');
const { NotFound } = require('../../core/http-exception');
const { success } = require('../lib/helper');
const { User } = require('../models/user');
const { Diary } = require('../models/diary');
const { formatDate } = require('../lib/helper');

const router = new Router({
  prefix: '/diary',
});

router.post('/', DiaryValidator, async (ctx) => {
  const { id, content } = ctx.request.body;
  const user = await User.validatorUser(id);
  const date = new Date();
  await Diary.create({
    uid: id,
    content,
    nickname: user.nickname,
    create_time: date,
    favor_num: 0,
  });
  success();
});

router.get('/myDiary', GetDiaryValidator, async (ctx) => {
  const { id, start, count } = ctx.request.query;
  const diarys = await Diary.getDiary(id, start, count);
  ctx.body = diarys;
});

router.get('/:id', async (ctx) => {
  xq;
  const { id } = ctx.params;
  const diary = await Diary.findOne({
    where: {
      id: parseInt(id),
    },
  });
  if (!diary) {
    throw new NotFound('文章未找到');
  }
  await diary.increment('look_nums', {
    by: 1,
  });
  diary.setDataValue('create_time', formatDate(diary.create_time));
  ctx.body = diary;
});

module.exports = router;
```

用**postman**测试一下:

![](http://file.huabingtao.com/juejin/nodeKoa/23.jpeg)

其中 **isFavor** 就是点赞状态：0 为没点赞 1 为点赞

#### 广场日记列表

其实这俩日记列表功能比较类似，我们把逻辑比较复杂的写在模型上。

打开**models**目录下**diary.js**,新增**getAllDiary**静态方法 更改后如下:

```js
// models/diary.js

const { Model, DataTypes, Op } = require('sequelize');
const { sequelize } = require('../../core/db');
const { NotFound } = require('../../core/http-exception');
const { formatDate } = require('../lib/helper');
const { User } = require('./user');
const { Favor } = require('./favor');

class Diary extends Model {
  static async getDiary(id, start = 0, count = 10) {
    await User.validatorUser(id);
    const favors = await Favor.findAll({
      where: {
        uid: id,
      },
    });
    const diaryIds = favors.map((f) => {
      return f.diary_id;
    });
    const diary = await Diary.findAll({
      order: [['id', 'DESC']],
      where: {
        uid: id,
      },
      offset: parseInt(start),
      limit: parseInt(count),
    });
    diary.forEach((item) => {
      item.dataValues.create_time = formatDate(item.dataValues.create_time);
      if (diaryIds.includes(item.id)) {
        item.dataValues.isFavor = 1;
      } else {
        item.dataValues.isFavor = 0;
      }
    });
    return diary;
  }

  static async getAllDiary(start, count, uid) {
    const diary = await Diary.findAll({
      order: [['id', 'DESC']],
      offset: parseInt(start),
      limit: parseInt(count),
    });

    const favors = await Favor.findAll({
      where: {
        uid,
      },
    });

    const diaryIds = favors.map((f) => {
      return f.diary_id;
    });

    diary.forEach((item) => {
      item.dataValues.create_time = formatDate(item.dataValues.create_time);
      if (diaryIds.includes(item.id)) {
        item.dataValues.isFavor = 1;
      } else {
        item.dataValues.isFavor = 0;
      }
    });
    return diary;
  }
}

Diary.init(
  {
    uid: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    content: DataTypes.STRING(2000),
    create_time: DataTypes.DATE,
    favor_nums: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    look_nums: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'diary',
  }
);

module.exports = {
  Diary,
};
```

打开**api**目录下**diary.js**新增查询广场日记的路由:

```js
router.get('/', GetDiaryValidator, async (ctx) => {
  const { start = 0, count = 10, uid } = ctx.request.query;
  const diarys = await Diary.getAllDiary(start, count, uid);
  ctx.body = diarys;
});
```

**postman**跑一下:

![](http://file.huabingtao.com/juejin/nodeKoa/24.jpeg)

到这里日记列表开发完成了还剩下删除日记更新日记两个功能大家加油！

### 更新日记

更新日记的逻辑比较简单直接看代码:

打开**models**目录下**diary.js**新增 updateDiary 方法:

```js
static async updateDiary(uid, id, content) {
await User.validatorUser(uid)
const diary = await Diary.update(
  {
    content
  },
  {
    where: {
      id
    }
  }
)
return diary
}
```

接着新增接口在**api**目录下的**diary.js**新增:

```js
// api/diary.js
router.put('/', PutDiaryValidator, async (ctx) => {
  const { uid, id, content } = ctx.request.body;
  await Diary.updateDiary(uid, id, content);
  success();
});
```

用 postman 运行:

![](http://file.huabingtao.com/juejin/nodeKoa/25.jpeg)

更新成功

### 删除日记

删除日记的逻辑就比较简单了，只要找到对应日记 id 删除就行。需要注意的是数据库有**软删除和硬删除两种** 。软删除是不删除记录另外给此条记录增加一个删除日期，硬删除就是去真正的删除这条记录，我们选择硬删除。

创建模型打开**models**目录下的**diary.js**增加删除方法:

```js
// models/diary.js

static async deleteDiary(uid, id) {
    await User.validatorUser(uid)
    const diary = await Diary.destroy({
      force: true, // 硬删除
      where: {
        id
      }
    })
    return diary
}
```

打开**api**目录下 diary.js 新增:

```js
router.delete('/', async (ctx) => {
  const { uid, id } = ctx.request.body;
  await Diary.deleteDiary(uid, id);
  success();
});
```

运行 postman 调用接口:

![](http://file.huabingtao.com/juejin/nodeKoa/26.jpeg)

刷新 Navicate:

![](http://file.huabingtao.com/juejin/nodeKoa/27.jpeg)

删除日记成功！

## 总结

到这里后端部分已经结束了，我相信如果你认真看完肯定会有收获的。我们简单总结下学到了哪些东西：

- 全局动态注册路由
- 使用中间件去处理异常
- 使用 Sequelize 操作数据库
- 使用 async 语法，同步的方式处理异步
- 结构化组件化开发项目

最后，感谢您阅读这篇文章，有任何问题或反馈请给我留言。
