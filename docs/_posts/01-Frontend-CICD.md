---
title: 从 0 到 1：前端 CI/CD 实战  (第一篇： 云服务器环境搭建)
date: 2025-12-24
show: true
tags:
  - Docker
  - CI/CD
author: Link
location: ShangHai
---

## 前言

本系列将用四篇文章带你从0 到 1搭建前端 CI/CD发布环境。本篇我们将聚焦**云服务器环境搭建**，从云服务器准备、Docker 安装，到镜像获取和容器运行，让你在最短时间内在云端拥有可运行的 Docker 环境，为后续 GitLab、Runner 和前端 CI/CD 的搭建打下基础。

## 服务器配置

本次使用的云服务器配置如下：

*   **CPU**：4 核
*   **内存**：4 GB
*   **硬盘**：40 GB SSD 云硬盘
*   **操作系统**：Ubuntu Server 22.04 LTS（64 位）

这个配置对于个人学习和中小型前端项目来说完全足够，也能支撑后续 GitLab + Runner 的运行需求，当时我购买这台云主机的价格是 79 元一年性价比极很高，👉 相关产品可参考：[腾讯云云服务器](https://curl.qcloud.com/oSSjKaYH)。

## 安装 Vim

推荐用 vim 编辑文件后面的内容我将会用 vim 在命令行中处理文件。

安装 vim:

    apt install -y vim

查看 vim 版本：

    vim --version

## 创建项目目录结构

为了后续 **GitLab**、**Runner**、**Nginx** 部署更清晰，先在服务器上规划一个合理的目录结构。

我们要创建的目录结构如下

```text
/apps
├── infra/          # 基础设施
│   ├── gitlab
│   └── gitlab-runner
├── deploy/         # 项目部署
│   ├── dev
│   ├── test
│   ├── prod
│   └── uat
└── nginx-conf/     # nginx 配置

```

创建目录:

    mkdir -p /apps/infra
    mkdir -p /apps/deploy/{dev,test,prod,uat}
    mkdir -p /apps/nginx-conf

> 本文中演示的目录结构，是在同一台服务器上同时部署多个环境（dev / test / prod）项目的示例场景，仅用于学习和演示。真实生产环境中，通常会将开发、测试、生产环境进行物理或逻辑隔离（如不同服务器、不同集群或不同云资源），以保证稳定性和安全性。

## 安装 docker:

我用的是 **root** 用户命所以命令前省去了 **sudo**。

下载 **docker**：

    curl -fsSL https://get.docker.com -o install-docker.sh

执行安装脚本:

    sh install-docker.sh

等待安装完成。

下载好 docker 之后查看 docker 版本：

    docker --version

## 配置镜像站

> 配置 Docker 镜像站可以显著提升镜像拉取速度，减少网络波动带来的失败，保证构建和部署过程更稳定可靠。

打开文件

    vim /etc/docker/daemon.json

粘贴下列内容，最后按ESC，输入 :wq! 保存退出。

    {
        "registry-mirrors": [
            "https://docker.m.daocloud.io",
            "https://docker.1panel.live",
            "https://hub.rat.dev"
        ]
    }

重启 docker

    service docker restart

## 测试 Docker 服务

### 运行 hello-world 容器

用一个最简单的 Demo 确认 Docker 能正常运行。

    docker run hello-world

如果看到类似输出：

    Hello from Docker!

恭喜你：

*   Docker 服务正常
*   镜像可以被正常拉取且容器能够正确运行

### 运行一个 Nginx 容器

接下来运行一个 Nginx 容器。

拉取 **nginx** 镜像：

    docker pull nginx

你会看到 Docker 正在下载镜像：

```text
Using default tag: latest
latest: Pulling from library/nginx
1733a4cd5954: Downloading
```

查看镜像：

    docker images

你会看到：

```text
IMAGE             ID             DISK USAGE   CONTENT SIZE   EXTRA
nginx:latest      fb01117203ff        228MB         62.6MB
```

接下来执行

    docker run -d \
      --name nginx-demo \
      -p 80:80 \
      nginx

参数说明：

*   \-d：后台运行
*   \--name：容器名称
*   \-p 80:80：端口映射
*   nginx：官方镜像

用命令验证容器是否运行

    docker ps

如果能看到 nginx-demo，说明容器已成功启动。

此时在浏览器中访问：

http\://<你的服务器 IP>

如果看到 **Welcome to nginx!** 页面，说明 Docker 环境完全可用。

如果碰到了类似这样的报错

```text
docker: Error response from daemon: 
failed to set up container networking: driver failed programming external connectivity on endpoint nginx-demo (3a624ed5e2eb8135b6be13): 
Bind for :::80 failed: port is already allocated
```

说明你服务器的 80 端口已经被占用了

删除容器

    docker rm nginx-demo

换个 8989端口：

    docker run -d \
      --name nginx-demo \
      -p 8989:80 \
      nginx

查看容器状态：

    docker ps

可以看到 nginx-demo 出现在列表中。

如果访问http\://<你的服务器 IP>看不到页面的话说明你服务器 8989 的端口防火墙没有打开去你的云服务器控制台添加一条规则

![添加防火墙](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b4957274ba904867b8e64f403bc183d4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6aW86aW86aW8:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiODQ1MTgyMjk5Mjg1NSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1778744211&x-orig-sign=k7H8uzKi8DXfDXLG9NOCDqm9NMY%3D)

访问 http\://<你的服务器 IP:8989>

可以看到 nginx 的欢迎页面了

![03.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/21f33beb701548cca3759781f1515091~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6aW86aW86aW8:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiODQ1MTgyMjk5Mjg1NSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1778744211&x-orig-sign=UP8vxxrFZLh25Atj3CprEbKmPvU%3D)

## 本篇小结

到这里，我们已经完成了 CI/CD 的第一步准备工作：

*   云服务器基础环境已就绪
*   vim 安装完成，可以正常编辑配置文件
*   docker 镜像站配置完成
*   docker 成功安装并运行
*   成功运行了第一个 Nginx 容器

从下一篇开始，我们将基于这套环境，**部署 GitLab，并逐步引入 GitLab Runner**。
  