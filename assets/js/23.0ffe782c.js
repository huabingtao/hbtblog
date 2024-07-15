(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{501:function(s,a,e){"use strict";e.r(a);var t=e(9),r=Object(t.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h2",{attrs:{id:"安装homebrew"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装homebrew"}},[s._v("#")]),s._v(" 安装homebrew")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("/bin/bash -c "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh"),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v('"')]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"nvm"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#nvm"}},[s._v("#")]),s._v(" nvm")]),s._v(" "),e("p",[s._v("安装命令: "),e("code",[s._v("curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash")]),s._v("\n看一下node有哪些版本可以安装")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("nvm ls-remote\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("安装版本")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("nvm install v4.5.0\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("查看版本")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("nvm ls\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("nvm 轻松切换 node 版本")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("nvm use v4.5.0\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("查看当前版本")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("nvm current\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"yarn"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#yarn"}},[s._v("#")]),s._v(" yarn")]),s._v(" "),e("p",[s._v("macOs")]),s._v(" "),e("h3",{attrs:{id:"安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),e("p",[s._v("by Homebrew")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("brew install yarn\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h3",{attrs:{id:"by-curl"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#by-curl"}},[s._v("#")]),s._v(" by curl")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("curl -o- -L https://yarnpkg.com/install.sh | bash\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("查看版本 "),e("code",[s._v("yarn --version")])]),s._v(" "),e("h2",{attrs:{id:"nrm"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#nrm"}},[s._v("#")]),s._v(" nrm")]),s._v(" "),e("h2",{attrs:{id:"mac下查看隐藏文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mac下查看隐藏文件"}},[s._v("#")]),s._v(" Mac下查看隐藏文件")]),s._v(" "),e("h3",{attrs:{id:"show"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#show"}},[s._v("#")]),s._v(" show")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("defaults "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("write")]),s._v(" com.apple.finder AppleShowAllFiles -boolean "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("killall")]),s._v(" Finder\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h3",{attrs:{id:"hide"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#hide"}},[s._v("#")]),s._v(" hide")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("defaults "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("write")]),s._v(" com.apple.finder AppleShowAllFiles -boolean "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("killall")]),s._v(" Finder\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[e("a",{attrs:{href:"https://www.zhihu.com/question/24635640/answer/127004307",target:"_blank",rel:"noopener noreferrer"}},[s._v("参考文章"),e("OutboundLink")],1)]),s._v(" "),e("h3",{attrs:{id:"vscode-设置双击可以选中减号连接的文字"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vscode-设置双击可以选中减号连接的文字"}},[s._v("#")]),s._v(" vscode 设置双击可以选中减号连接的文字")]),s._v(" "),e("div",{staticClass:"language-json line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[s._v("  "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v('"editor.wordSeparators"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"`~!@#$%^&*()=+[{]}\\\\|;:\'\\",.<>/?"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])])}),[],!1,null,null,null);a.default=r.exports}}]);