(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{436:function(t,a,v){t.exports=v.p+"assets/img/image-4.3100287f.png"},437:function(t,a,v){t.exports=v.p+"assets/img/image-1.0e074019.png"},438:function(t,a,v){t.exports=v.p+"assets/img/image-2.e061f44f.png"},439:function(t,a,v){t.exports=v.p+"assets/img/image-3.8516f698.png"},473:function(t,a,v){"use strict";v.r(a);var e=v(9),s=Object(e.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"背景"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[t._v("#")]),t._v(" 背景")]),t._v(" "),e("p",[t._v("众所周知把一个大象装冰箱需要三步，升级一个老项目的webpack需要几步呢？由于是4年的老项目采用 vue2 和 webpack3 构建的，随着时间的推移项目的不断迭代，页面文件数量日益增长打包和运行耗费的时间也逐渐增加，已经严重影响到了开发体验和开发效率，所以优化也就被提上日程。但一次把所有的地方都升级一遍不太现实而且风险也比较大，所以选择逐步升级和优化是一个很好的解决办法。我打算先将打包工具进行升级，毕竟过去了4年 webpack 已经迭代了很多个版本让我们看看 webpack5 会有怎样的表现吧。")]),t._v(" "),e("h2",{attrs:{id:"升级流程图"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#升级流程图"}},[t._v("#")]),t._v(" 升级流程图")]),t._v(" "),e("p",[e("img",{attrs:{src:v(436),alt:"升级流程导图"}})]),t._v(" "),e("h2",{attrs:{id:"准备工作"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#准备工作"}},[t._v("#")]),t._v(" 准备工作")]),t._v(" "),e("ul",[e("li",[t._v("备份项目（备份永远是最重要的哪怕没做成也不至于项目搞黄）。")]),t._v(" "),e("li",[t._v("记录之前项目中的 Node 版本（方便在回滚的时候知道当时的Node环境）。")]),t._v(" "),e("li",[t._v("升级 Node.js Webpack 5 对 Node.js 的版本要求至少是 10.13.0。")])]),t._v(" "),e("h2",{attrs:{id:"依赖配置表"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#依赖配置表"}},[t._v("#")]),t._v(" 依赖配置表")]),t._v(" "),e("table",{attrs:{border:"2"}},[e("tr",[e("td",[t._v("Package Name")]),t._v(" "),e("td",[t._v("Old Version")]),t._v(" "),e("td",[t._v("New Version")]),t._v(" "),e("td",[t._v("Version Status")])]),t._v(" "),e("tr",[e("td",[t._v("webpack")]),t._v(" "),e("td",[t._v("3.12.0")]),t._v(" "),e("td",[t._v("5.88.2")]),t._v(" "),e("td",[t._v("升级")])]),t._v(" "),e("tr",[e("td",[t._v("webpack-cli")]),t._v(" "),e("td",[t._v("3.2")]),t._v(" "),e("td",[t._v("5.1.4")]),t._v(" "),e("td",[t._v("升级")])]),t._v(" "),e("tr",[e("td",[t._v("webpack-dev-server")]),t._v(" "),e("td",[t._v("2.11.5")]),t._v(" "),e("td",[t._v("4.15.1")]),t._v(" "),e("td",[t._v("升级")])]),t._v(" "),e("tr",[e("td",[t._v("webpack-merge")]),t._v(" "),e("td",[t._v("4.1.0")]),t._v(" "),e("td",[t._v("5.9.0")]),t._v(" "),e("td",[t._v("升级")])]),t._v(" "),e("tr",[e("td",[t._v("css-loader")]),t._v(" "),e("td",[t._v("0.28.0")]),t._v(" "),e("td",[t._v("6.8.1")]),t._v(" "),e("td",[t._v("升级")])]),t._v(" "),e("tr",[e("td",[t._v("friendly-errors-webpack-plugin")]),t._v(" "),e("td",[t._v("1.6.1")]),t._v(" "),e("td",[t._v("1.7.0")]),t._v(" "),e("td",[t._v("升级")])]),t._v(" "),e("tr",[e("td",[t._v("html-webpack-plugin")]),t._v(" "),e("td",[t._v("2.30.1")]),t._v(" "),e("td",[t._v("5.5.3")]),t._v(" "),e("td",[t._v("升级")])]),t._v(" "),e("tr",[e("td",[t._v("style-loader")]),t._v(" "),e("td",[t._v("1.2.1")]),t._v(" "),e("td",[t._v("3.3.3")]),t._v(" "),e("td",[t._v("升级")])]),t._v(" "),e("tr",[e("td",[t._v("vue-loader")]),t._v(" "),e("td",[t._v("13.3.0")]),t._v(" "),e("td",[t._v("15.10.1")]),t._v(" "),e("td",[t._v("升级")])]),t._v(" "),e("tr",[e("td",[t._v("vue-template-compiler")]),t._v(" "),e("td",[t._v("2.6.10")]),t._v(" "),e("td",[t._v("2.7.14")]),t._v(" "),e("td",[t._v("升级")])]),t._v(" "),e("tr",[e("td",[t._v("clean-webpack-plugin")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("4.0.0")]),t._v(" "),e("td",[t._v("新增")])]),t._v(" "),e("tr",[e("td",[t._v("cross-env")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("7.0.3")]),t._v(" "),e("td",[t._v("新增")])]),t._v(" "),e("tr",[e("td",[t._v("css-minimizer-webpack-plugin")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("5.0.1")]),t._v(" "),e("td",[t._v("新增")])]),t._v(" "),e("tr",[e("td",[t._v("speed-measure-webpack-plugin")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("1.5.0")]),t._v(" "),e("td",[t._v("新增")])]),t._v(" "),e("tr",[e("td",[t._v("mini-css-extract-plugin")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("2.4.0")]),t._v(" "),e("td",[t._v("新增")])]),t._v(" "),e("tr",[e("td",[t._v("url-loader")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("删除")])]),t._v(" "),e("tr",[e("td",[t._v("file-loader")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("删除")])]),t._v(" "),e("tr",[e("td",[t._v("optimize-css-assets-webpack-plugin")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("删除")])]),t._v(" "),e("tr",[e("td",[t._v("extract-text-webpack-plugin")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("删除")])]),t._v(" "),e("tr",[e("td",[t._v("vue-style-loader")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("--")]),t._v(" "),e("td",[t._v("删除")])])]),t._v(" "),e("h2",{attrs:{id:"升级-webpack5"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#升级-webpack5"}},[t._v("#")]),t._v(" 升级 webpack5")]),t._v(" "),e("h3",{attrs:{id:"升级-webpack-至最新的可用版本。"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#升级-webpack-至最新的可用版本。"}},[t._v("#")]),t._v(" 升级 webpack 至最新的可用版本。")]),t._v(" "),e("p",[t._v("当前 webpack 最新版本 5.88.2。")]),t._v(" "),e("h3",{attrs:{id:"升级-webpack-cli-到最新的可用版本。"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#升级-webpack-cli-到最新的可用版本。"}},[t._v("#")]),t._v(" 升级 webpack-cli 到最新的可用版本。")]),t._v(" "),e("p",[t._v("当前 webpack-cli 最新版本 5.1.4。")]),t._v(" "),e("h3",{attrs:{id:"升级所有使用到的-plugin-和-loader-为最新的可用版本。"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#升级所有使用到的-plugin-和-loader-为最新的可用版本。"}},[t._v("#")]),t._v(" 升级所有使用到的 plugin 和 loader 为最新的可用版本。")]),t._v(" "),e("ul",[e("li",[t._v("webpack-dev-server 2.11.5 -> 4.15.1")]),t._v(" "),e("li",[t._v("webpack-merge 4.1.0 -> 5.9.0")]),t._v(" "),e("li",[t._v("css-loader 0.28.0 -> 6.8.1")]),t._v(" "),e("li",[t._v("friendly-errors-webpack-plugin 1.6.1 -> 1.7.0")]),t._v(" "),e("li",[t._v("html-webpack-plugin\t2.30.1 -> 5.5.3")]),t._v(" "),e("li",[t._v("style-loader\t1.2.1 -> 3.3.3")]),t._v(" "),e("li",[t._v("vue-loader\t13.3.0 -> 15.10.1")]),t._v(" "),e("li",[t._v("vue-template-compiler\t2.6.10\t-> 2.7.14")])]),t._v(" "),e("h3",{attrs:{id:"移除所有废弃的-plugin-和-loader。"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#移除所有废弃的-plugin-和-loader。"}},[t._v("#")]),t._v(" 移除所有废弃的 plugin 和 loader。")]),t._v(" "),e("ul",[e("li",[t._v("url-loader")]),t._v(" "),e("li",[t._v("file-loader")]),t._v(" "),e("li",[t._v("optimize-css-assets-webpack-plugin")]),t._v(" "),e("li",[t._v("extract-text-webpack-plugin")]),t._v(" "),e("li",[t._v("vue-style-loader")])]),t._v(" "),e("h3",{attrs:{id:"新增所有使用到的-plugin-和-loader。"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#新增所有使用到的-plugin-和-loader。"}},[t._v("#")]),t._v(" 新增所有使用到的 plugin 和 loader。")]),t._v(" "),e("ul",[e("li",[t._v("clean-webpack-plugin 4.0.0")]),t._v(" "),e("li",[t._v("cross-env 7.0.3")]),t._v(" "),e("li",[t._v("css-minimizer-webpack-plugin 5.0.1")]),t._v(" "),e("li",[t._v("speed-measure-webpack-plugin 1.5.0")]),t._v(" "),e("li",[t._v("mini-css-extract-plugin 7.0.3")])]),t._v(" "),e("h2",{attrs:{id:"具体配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#具体配置"}},[t._v("#")]),t._v(" 具体配置")]),t._v(" "),e("h3",{attrs:{id:"修改webpack运行方式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#修改webpack运行方式"}},[t._v("#")]),t._v(" 修改webpack运行方式")]),t._v(" "),e("p",[t._v("webpack 运行方式需要改为 webpack server，并在打包命令的同时通过 cross-env 注入环境变量。")]),t._v(" "),e("div",{staticClass:"language-json line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"scripts"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"dev"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"cross-env NODE_ENV=development npx webpack server --config build/webpack.dev.conf.js"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"build"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"webpack --config ./build/webpack.prod.js"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"build:testb"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"cross-env NODE_ENV=develop-testb node --no-warnings build/build.js"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br")])]),e("h3",{attrs:{id:"webpack-base-conf-js-配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#webpack-base-conf-js-配置"}},[t._v("#")]),t._v(" webpack.base.conf.js 配置")]),t._v(" "),e("h4",{attrs:{id:"清理配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#清理配置"}},[t._v("#")]),t._v(" 清理配置")]),t._v(" "),e("ul",[e("li",[t._v("移除 context 配置项。")]),t._v(" "),e("li",[t._v("新增 mode 设置 mode = 'development'。")]),t._v(" "),e("li",[t._v("移除 node 配置项。")])]),t._v(" "),e("h4",{attrs:{id:"配置-rules"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置-rules"}},[t._v("#")]),t._v(" 配置 rules")]),t._v(" "),e("ul",[e("li",[t._v("引入 vue-loader，移除 vue-loader.conf.js 配置文件。")]),t._v(" "),e("li",[t._v("移除 url-loader 使用 webpack5自带 asset/resource 模块解析图片字体等静态资源。")]),t._v(" "),e("li",[t._v("使用 mini-css-extract-plugin 压缩 css（开发环境下关闭）。")]),t._v(" "),e("li",[t._v("使用 dart-sass 替换 node-sass（解决 Node.js 版本必须和 node-sass 对应问题常常因为项目较多在多个项目切换过程中需要频繁切换 NodeJS 版本，以及经常因为网络不稳定导致安装失败等问题）。")])]),t._v(" "),e("h3",{attrs:{id:"webpack-dev-conf-js-配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#webpack-dev-conf-js-配置"}},[t._v("#")]),t._v(" webpack.dev.conf.js 配置")]),t._v(" "),e("h4",{attrs:{id:"清理配置-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#清理配置-2"}},[t._v("#")]),t._v(" 清理配置")]),t._v(" "),e("ul",[e("li",[t._v("改变 webpack-merge 引入方式。")]),t._v(" "),e("li",[t._v("设置 mode = 'development'。")]),t._v(" "),e("li",[t._v("配置 watchOptions.poll = 1000 （每秒监听一次文件变化）。")])]),t._v(" "),e("h4",{attrs:{id:"配置-devserver"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置-devserver"}},[t._v("#")]),t._v(" 配置 devServer")]),t._v(" "),e("ul",[e("li",[t._v("publicPath 迁移到 devServer.static 对象下。")]),t._v(" "),e("li",[t._v("overlay 属性移动到 devServer.client 对象下。")]),t._v(" "),e("li",[t._v("移除 watch、hot、module.rules、clientLogLevel、contentBase、quiet 等配置。")])]),t._v(" "),e("h4",{attrs:{id:"配置-plugins"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置-plugins"}},[t._v("#")]),t._v(" 配置 plugins")]),t._v(" "),e("ul",[e("li",[t._v("弃用 webpack.NamedModulesPlugin。")]),t._v(" "),e("li",[t._v("移除 webpack.DefinePlugin 环境变量通过 cross-env 在 package.json 的 scripts 对象下设置。")]),t._v(" "),e("li",[t._v("新增 MiniCssExtractPlugin 将 CSS 提取到单独的文件中。")])]),t._v(" "),e("h4",{attrs:{id:"配置-optimization"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置-optimization"}},[t._v("#")]),t._v(" 配置 optimization")]),t._v(" "),e("ul",[e("li",[t._v("在 minimizer 对象下新增 CssMinimizerPlugin 这个插件使用 cssnano 优化和压缩 CSS。")])]),t._v(" "),e("h3",{attrs:{id:"webpack-prod-conf-js-配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#webpack-prod-conf-js-配置"}},[t._v("#")]),t._v(" webpack.prod.conf.js 配置")]),t._v(" "),e("h4",{attrs:{id:"清理配置-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#清理配置-3"}},[t._v("#")]),t._v(" 清理配置")]),t._v(" "),e("ul",[e("li",[t._v("为了追求生产打包速度配置 devtool = 'eval'。")])]),t._v(" "),e("h4",{attrs:{id:"配置-plugins-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置-plugins-2"}},[t._v("#")]),t._v(" 配置 plugins")]),t._v(" "),e("ul",[e("li",[t._v("移除 uglifyjs-webpack-plugin 插件使用 terser-webpack-plugin 压缩js。")]),t._v(" "),e("li",[t._v("移除 extract-text-webpack-plugin 和 optimize-css-assets-webpack-plugin。")]),t._v(" "),e("li",[t._v("配置 mini-css-extract-plugin 压缩 css。")]),t._v(" "),e("li",[t._v("新增 speed-measure-webpack-plugin 插件查看打包花费时长。")])]),t._v(" "),e("h4",{attrs:{id:"配置-optimization-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置-optimization-2"}},[t._v("#")]),t._v(" 配置 optimization")]),t._v(" "),e("ul",[e("li",[t._v("在 optimization.minimizer 对象下使用 terser-webpack-plugin 插件开启多线程压缩 js 并配置删除注释和日志。")]),t._v(" "),e("li",[t._v("在 optimization.minimizer 对象下使用 css-minimizer-webpack-plugin 插件压缩 css。")])]),t._v(" "),e("h2",{attrs:{id:"升级后表现"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#升级后表现"}},[t._v("#")]),t._v(" 升级后表现")]),t._v(" "),e("p",[t._v("开发环境运行表现: 升级前运行时间 32s 升级后运行时间 20s 总时间减少了12s 运行速度提升 37%")]),t._v(" "),e("p",[e("img",{attrs:{src:v(437),alt:"开发环境运行效果对比"}})]),t._v(" "),e("p",[t._v("热替换表现: 升级前改动代码 1760ms 升级后改动代码运行时间 699ms 总时间减少 1061ms 速度提升 60%")]),t._v(" "),e("p",[e("img",{attrs:{src:v(438),alt:"热替换效果对比"}})]),t._v(" "),e("p",[t._v("打包表现: 升级前打包用时 1m12s 升级后打包用时 19s 总时间减少 53s 速度提升 73%")]),t._v(" "),e("p",[e("img",{attrs:{src:v(439),alt:"打包效果对比"}})]),t._v(" "),e("h2",{attrs:{id:"写在最后"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#写在最后"}},[t._v("#")]),t._v(" 写在最后")]),t._v(" "),e("p",[t._v("那么回到文章开始时我提出的问题，升级一个老项目的 webpack 需要几步呢？如果你耐心看完的话相信你肯定可以不假思索的回答上来。我们从备份项目和 Node.js 版本到升级 webpack 接着升级了和 webpack 相关的 plugin 和 loader 最后修改了 webpack 的配置文件至此我们完成了整个 webpack 的升级，想想还有点小激动呢。\n如果你所参与的项目恰好和博主有类似的情况不妨可以尝试一下喔。")]),t._v(" "),e("p",[t._v("最后，感谢您阅读这篇文章，有任何问题或反馈请给我留言，如果这篇文章对你有所帮助请给我一个三连支持一下，哪怕是一个免费的赞呢。")])])}),[],!1,null,null,null);a.default=s.exports}}]);