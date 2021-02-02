#!/usr/bin/env sh
###
 # @Author: huabingtao
 # @Date: 2021-02-02 22:38:46
 # @LastEditTime: 2021-02-02 22:55:06
 # @LastEditors: huabingtao
 # @Description: 
 # @FilePath: /vue-press/deploy.sh
 # @可以输入预定的版权声明、个性签名、空行等
### 

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:huabingtao/hbtblog.git master:gh-pages
git push -f https://${access_token}@github.com/huabingtao/hbtblog.git master:gh-pages

cd -