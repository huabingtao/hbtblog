Mac 系统操作

show 隐藏文件
```sh
defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder
```

hiden 隐藏文件
```sh
defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
```