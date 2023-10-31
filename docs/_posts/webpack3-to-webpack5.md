---
  title: 手把手教你把公司老项目从 webpack 3 升级到 webpack 5
  date: 2023-10-9
  tags:
    - webpack
    - webpack5
    - 升级webpack
  author: Link
  location: ShangHai
---

## 背景

众所周知把一个大象装冰箱需要三步，升级一个老项目的webpack需要几步？由于是4年的老项目用的vue2和webpack3构建的，随着时间的推移项目的不断迭代，页面文件数量日益增长打包和运行耗费的时间也逐渐增加，已经严重影响到了开发体验和开发效率，所以优化也就被提上日程。但是一次性把所有的地方都升级一遍不太现实风险也比较大，所以选择逐步升级和优化是一个很好的解决办法。

## 准备工作

- 备份项目（备份永远是最重要的哪怕没做成也不至于项目搞黄）。
- 记录之前项目中的 node 版本。
- 升级 Node.js Webpack 5 对 Node.js 的版本要求至少是 10.13.0。

## 依赖配置表

<table border="2" >
	<tr>
		<td>Package Name</td>
		<td>Old Version</td>
		<td>New Version</td>
		<td>Status</td>
	</tr>
	<tr>
		<td>webpack</td>
		<td>3.12.0</td>
		<td>5.88.2</td>
		<td>升级</td>
	</tr>
	<tr>
		<td>webpack-cli</td>
		<td>3.2</td>
		<td>5.1.4</td>
		<td>升级</td>
	</tr>
	<tr>
		<td>webpack-dev-server</td>
		<td>2.11.5</td>
		<td>4.15.1</td>
		<td>升级</td>
	</tr>
	<tr>
		<td>webpack-merge</td>
		<td>4.1.0</td>
		<td>5.9.0</td>
		<td>升级</td>
	</tr>
	<tr>
		<td>css-loader</td>
		<td>0.28.0</td>        
		<td>6.8.1</td>
		<td>升级</td>
	</tr>
	<tr>
		<td>friendly-errors-webpack-plugin</td>
		<td>1.6.1</td>
		<td>1.7.0</td>
		<td>升级</td>
	</tr>
	<tr>
		<td>html-webpack-plugin</td>
		<td>2.30.1</td>
		<td>5.5.3</td>
		<td>升级</td>
	</tr>
	<tr>
		<td>style-loader</td>
		<td>1.2.1</td>
		<td>3.3.3</td>
		<td>升级</td>
	</tr>
	<tr>
		<td>vue-loader</td>
		<td>13.3.0</td>
		<td>15.10.1</td>
		<td>升级</td>
	</tr>
	<tr>
		<td>vue-template-compiler</td>
		<td>2.6.10</td>
		<td>2.7.14</td>
		<td>升级</td>
	</tr>	
	<tr>
		<td>clean-webpack-plugin</td>
        <td>--</td>
		<td>4.0.0</td>
		<td>新增</td>
	</tr>
	<tr>
		<td>cross-env</td>
        <td>--</td>
		<td>7.0.3</td>
		<td>新增</td>
	</tr>
	<tr>
		<td>css-minimizer-webpack-plugin</td>
        <td>--</td>
		<td>5.0.1</td>
		<td>新增</td>
	</tr>
	<tr>
		<td>speed-measure-webpack-plugin</td>
        <td>--</td>
		<td>1.5.0</td>
		<td>新增</td>
	</tr>
	<tr>
		<td>mini-css-extract-plugin</td>
        <td>--</td>
		<td>2.4.0</td>
		<td>新增</td>
	</tr>
	<tr>
		<td>url-loader</td>
		<td>--</td>
		<td>--</td>
		<td>删除</td>
	</tr>
	<tr>
		<td>file-loader</td>
		<td>--</td>
		<td>--</td>
		<td>删除</td>
	</tr>
	<tr>
		<td>optimize-css-assets-webpack-plugin</td>
		<td>--</td>
		<td>--</td>
		<td>删除</td>
	</tr>
	<tr>
		<td>extract-text-webpack-plugin</td>
		<td>--</td>
		<td>--</td>
		<td>删除</td>
	</tr>
	<tr>
		<td>vue-style-loader</td>
		<td>--</td>
		<td>--</td>
		<td>删除</td>
	</tr>
</table>

## 升级 webpack5 

### 升级 webpack 至最新的可用版本。
当前 webpack 最新版本 5.88.2。

### 升级 webpack-cli 到最新的可用版本。
当前 webpack-cli 最新版本 5.1.4。

### 升级所有使用到的 plugin 和 loader 为最新的可用版本。
- webpack-dev-server 2.11.5 -> 4.15.1
- webpack-merge 4.1.0 -> 5.9.0
- css-loader 0.28.0 -> 6.8.1
- friendly-errors-webpack-plugin 1.6.1 -> 1.7.0
- html-webpack-plugin	2.30.1 -> 5.5.3
- style-loader	1.2.1 -> 3.3.3
- vue-loader	13.3.0 -> 15.10.1
- vue-template-compiler	2.6.10	-> 2.7.14

###  移除所有废弃的 plugin 和 loader。
- url-loader
- file-loader
- optimize-css-assets-webpack-plugin
- extract-text-webpack-plugin
- vue-style-loader

### 新增所有使用到的 plugin 和 loader。
- clean-webpack-plugin 4.0.0
- cross-env 7.0.3
- css-minimizer-webpack-plugin 5.0.1
- speed-measure-webpack-plugin 1.5.0
- mini-css-extract-plugin 7.0.3

## 具体配置

### webpack.base.conf.js 配置
#### 清理配置
- 移除 utils （之前的utils工具文件基本都是对图片文件的一些处理升级到webpack 5 之后用处不大建议移除）。
- 移除 context 配置项。
- 新增 mode 设置 mode: 'development'。
- 移除 node 配置项。

#### 配置 rules
- 引入 vue-loader 并使用，移除 vue-loader.conf.js 配置文件 （最新版本 vue-loader 用默认配置所以移除）。
- 移除 url-loader 使用 webpack5自带 asset/resource 模块解析图片字体等静态资源。
- 使用 MiniCssExtractPlugin 压缩 css（开发环境下不使用此配置）。
- 使用 dart-sass 替换 node-sass（解决Node.js版本必须和node-sass对应问题，以及经常因为网络问题经常安装失败问题）。

### webpack.dev.conf.js 配置

#### 清理配置
- 改变 webpack-merge 引入方式  const merge = require('webpack-merge') -> const { merge } = require('webpack-merge')。
- 设置 mode = 'development'。
- 配置 watchOptions.poll = 1000 。

#### 配置 devServer 
- publicPath 迁移到 devServer.static对象下。
- overlay 属性移动到 devServer.client对象中。
- 移除 watch、hot、module.rules、clientLogLevel、contentBase、quiet 配置。

#### 配置 plugins 
- 弃用 webpack.NamedModulesPlugin。
- 移除 webpack.DefinePlugin 环境变量通过 cross-env 在 package.json 的 scripts 对象下设置。
- 新增 MiniCssExtractPlugin 将 CSS 提取到单独的文件中。

#### 配置 optimization
-  在 minimizer 对象下新增 CssMinimizerPlugin 这个插件使用 cssnano 优化和压缩 CSS。

### webpack.prod.conf.js 配置
#### 清理配置
- 配置 devtool = 'cheap-module-source-map'
#### 配置 plugins
- 移除 uglifyjs-webpack-plugin 插件使用 terser-webpack-plugin 压缩js

#### 配置 optimization
- 在 optimization.minimizer 对象下使用 terser-webpack-plugin 插件开启多线程压缩 js 并配置删除注释和日志。
- 在 optimization.minimizer 对象下使用 css-minimizer-webpack-plugin 插件压缩 css

## 升级后表现

开发环境运行表现: 升级前运行时间 32s 升级后运行时间 20s 总时间减少了12s 运行速度提升 37%

![开发环境运行效果对比](../image/webpack3-5/image-1.png)

热替换表现: 升级前改动代码 1760ms 升级后改动代码运行时间 699ms 总时间减少 1061ms 速度提升 60%

![热替换效果对比](../image/webpack3-5/image-2.png)

打包表现: 升级前打包用时 1m12s 升级后打包用时 19s 总时间减少 53s 速度提升 73%

![打包效果对比](../image/webpack3-5/image-3.png)
