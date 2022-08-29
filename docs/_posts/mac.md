---
  title: Mac 系统操作 常用命令
  date: 2021-08-10
  show: false
  tags:
    - MAC
  author: BingBing
  location: ShangHai
---



## show 隐藏文件
```sh
defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder
```

## hiden 隐藏文件
```sh
defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
```