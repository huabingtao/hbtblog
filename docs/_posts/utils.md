---
  show: false
  title: 工具
  date: 2021-04-13
  tags:
    - js
  author: Link
  location: ShangHai
---

## 安装homebrew

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## nvm
安装命令: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash`
看一下node有哪些版本可以安装
```
nvm ls-remote
```
安装版本 
```
nvm install v4.5.0
```
查看版本
```
nvm ls
```

nvm 轻松切换 node 版本
```
nvm use v4.5.0
```
查看当前版本
```
nvm current
```

## yarn
macOs
### 安装
by Homebrew
```
brew install yarn
```
### by curl
```
curl -o- -L https://yarnpkg.com/install.sh | bash
```
查看版本 `yarn --version`
## nrm

## Mac下查看隐藏文件

### show

```sh
defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder
```

### hide

```sh
defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
```
[参考文章](https://www.zhihu.com/question/24635640/answer/127004307)

### vscode 设置双击可以选中减号连接的文字
```json
  "editor.wordSeparators": "`~!@#$%^&*()=+[{]}\\|;:'\",.<>/?",
```