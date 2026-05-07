---
title: 从 0 到 1：前端 CI/CD 实战 (第二篇：用Docker 部署 GitLab)
date: 2025-12-29
show: true
tags:
  - Docker
  - CI/CD
author: Link
location: ShangHai
---

## **前言**

在完成云服务器的 **Docker** 环境搭建后，下一步就是部署整个 CI/CD 体系中最核心的组件 —— **GitLab**。本篇将继续通过 Docker 的方式，在云服务器上部署一套**稳定、可维护**的 GitLab 服务，涵盖容器运行、端口映射、数据持久化以及虚拟内存配置等关键步骤。完成本篇后，你将拥有一套真正可以长期使用的 GitLab 服务，为后续接入 CI/CD 流水线打下基础。

## **Docker Compose 简介**

虽然可以直接使用 docker run 启动 GitLab，但实际操作中命令会非常冗长，而且端口、数据目录、环境变量等配置分散在命令行里，后期维护成本很高。为了解决这些问题，本文使用 **Docker Compose** 来统一管理容器。

Docker Compose 允许将一个或多个 docker run 命令的配置集中写入一个 **YAML 文件**，一次性定义镜像、端口映射、数据挂载、环境变量和重启策略。这样做有三个明显好处：

-   **配置集中**：所有关键配置都在一个文件中，清晰可读
-   **易于维护**：修改配置只需要改文件，不必反复敲命令
-   **可复现性强**：换服务器或重建环境，只需一条命令即可恢复


常用命令如下：

```
# 启动服务（后台运行）
docker compose up -d

# 停止并删除容器
docker compose down

# 查看服务运行状态
docker compose ps
```

相比直接使用 docker run，Docker Compose 更适合**长期运行的基础服务**，也是实际生产环境中的常见选择。

* * *

## **GitLab 容器目录规划**

### **规划宿主机目录**

在部署 GitLab 之前提前规划宿主机目录，并不是为了“规范好看”，而是为了**数据安全、后期维护和可迁移性**。GitLab 属于典型的有状态服务，如果不将配置、日志和数据明确挂载到宿主机，一旦容器被删除或服务器重装，仓库和用户数据都会一起丢失。清晰的目录结构也是生产环境中的常见做法，后续无论是升级、迁移服务器，还是接入 GitLab Runner 和其他基础服务，都可以直接复用这套结构，一次规划，长期受益。

  
### **创建目录**

本文将 GitLab 安装在宿主机的 /apps/infra/gitlab 目录下，用于存放 GitLab 的所有相关数据，并按 **配置、日志、数据** 三类进行拆分。

在服务器上执行以下命令创建目录：

```
mkdir -p /apps/infra/gitlab/{config,logs,data}
```

目录说明如下：

-   config：GitLab 核心配置文件目录（如 gitlab.rb）
-   logs：GitLab 运行日志目录，用于排查启动和运行问题
-   data：仓库、数据库、CI 产物等核心数据目录

后续将在 docker-compose.yml 中，将这三个目录分别挂载到容器内对应位置，实现数据持久化。

* * *

## **编写 docker-compose.yml**

### **基础服务定义**

在 docker-compose.yml 中，image、container_name 和 restart 是最基础但也最重要的配置。

-   image 使用 GitLab 官方社区版 gitlab/gitlab-ce，功能完整、社区成熟，对中小规模团队和学习环境已经完全足够
-   container_name 明确指定为 gitlab，避免 Docker 自动生成随机名称，方便后续查看状态和排查问题
-   restart: always 用于保证容器在异常退出或服务器重启后能够自动拉起，是长期运行服务的必选项


示例配置如下：

```
gitlab:
  image: gitlab/gitlab-ce:latest
  container_name: gitlab
  restart: always
```

### **端口映射设计思路**

GitLab 对外主要提供三类访问能力：**Web 页面、HTTPS 服务以及 Git SSH**，因此端口映射需要提前规划。

-   80：HTTP 访问 GitLab Web 页面
-   443：预留 HTTPS 端口，后续接入证书时无需改配置
-   2222：宿主机 SSH 端口，映射到容器内的 22

将 SSH 端口映射为 2222，一方面可以避免与宿主机自身 SSH 服务冲突，另一方面也能降低被自动化脚本扫描的概率。需要注意的是，端口映射修改后，GitLab 内部的 SSH 端口配置也必须同步修改，否则会导致 git clone 或 git push 失败。


示例配置如下：

```
ports:
  - "80:80"
  - "443:443"
  - "2222:22"
```

> 提醒：2222 端口默认未放行，需要在云服务器安全组中手动放行。


### **volumes 挂载与数据持久化**

GitLab 是一个**强依赖数据的有状态服务**，数据持久化不是可选项，而是必选项。本文中将 GitLab 的数据按用途拆分为三类并分别挂载：

-   /etc/gitlab：核心配置目录
-   /var/log/gitlab：运行日志目录
-   /var/opt/gitlab：仓库、数据库和 CI 产物等核心数据


配置如下：

```
volumes:
  - /apps/infra/gitlab/config:/etc/gitlab
  - /apps/infra/gitlab/logs:/var/log/gitlab
  - /apps/infra/gitlab/data:/var/opt/gitlab
```

只要宿主机目录仍然存在，即使容器被删除，也可以通过重新启动容器快速恢复整套 GitLab 服务。

### **资源限制与性能取舍**

默认情况下 Docker 不会限制容器的资源使用，而 GitLab 在启动和运行过程中会主动占用可用资源。如果不加限制，在 4G 或 8G 的服务器上很容易导致系统响应变慢甚至不可用。

本文中通过 deploy.resources.limits 对资源进行限制：

-   CPU：2.5 核
-   内存：3200M

示例配置：

```
deploy:
  resources:
    limits:
      cpus: "2.5"
      memory: "3200M"
```

资源限制的目的不是压榨性能，而是**保证服务器整体稳定性**，这对学习环境和中小团队来说更加重要。


### **共享内存与稳定性**

GitLab 内部包含数据库和缓存组件，对共享内存（shm）比较敏感。Docker 默认的共享内存较小，容易引发一些难以定位的异常问题，因此建议显式设置：

```
shm_size: '1gb'
```

* * *

## **配置并启动 GitLab 容器**


在 /apps/infra/gitlab 目录下创建 docker-compose.yml 文件，并写入完整配置内容后，执行以下命令启动服务：

```yml
services:
  gitlab:
    image: gitlab/gitlab-ce:latest
    container_name: gitlab
    restart: always
    # 填写真实云服务器ip 地址
    hostname: "xxx.xxx.195.160"
    ports:
      - "80:80"
      - "443:443"
      - "2222:22"
    volumes:
      - /apps/infra/gitlab/config:/etc/gitlab
      - /apps/infra/gitlab/logs:/var/log/gitlab
      - /apps/infra/gitlab/data:/var/opt/gitlab
    deploy:
      resources:
        limits:
          cpus: "2.5"
          memory: "3200M"
    shm_size: '1gb'
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        # 填写真实云服务器ip 地址
        external_url "http://xxx.xxx.195.160"
        gitlab_rails['gitlab_shell_ssh_port'] = 2222
        unicorn['worker_processes'] = 1
        sidekiq['concurrency'] = 2
        prometheus_monitoring['enable'] = false
        registry['enable'] = false
        node_exporter['enable'] = false
        gitlab_exporter['enable'] = false
        mattermost['enable'] = false

```
运行
```
docker compose up -d
```

首次启动会拉取镜像并初始化 GitLab，通常需要 3～5 分钟。完成后，在浏览器中访问：

```
http://<你的服务器 IP>
```

即可看到 GitLab 登录页面。


如果发现页面加载缓慢或服务器内存占用接近上限，这是 GitLab 初始化阶段的正常现象，下一节将通过配置虚拟内存进行优化。

* * *

## **配置虚拟内存（Swap）**


在内存较小的服务器上，为 GitLab 配置 Swap 可以显著提升稳定性。

```
fallocate -l 8G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

验证是否生效：

```
free -h
```

当出现 Swap: 8.0Gi 证明配置成功


设置开机自动挂载：

```
echo '/swapfile swap swap defaults 0 0' >> /etc/fstab
```

* * *

## **GitLab 初始化**


确认容器运行状态：

```
docker ps
```

获取初始 root 密码：

```
docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password
```

成功登录后点击右上角头像 > Edit profile > Password 中修改初始密码

* * *

## **本篇小结**

本篇完成了使用 Docker Compose 在云服务器上部署 GitLab 的全过程，包括目录规划、资源限制、数据持久化以及虚拟内存优化。通过这些配置，即使在低配服务器上，也可以稳定运行一套可长期使用的 GitLab 服务。

在下一篇中，我们将部署 **GitLab Runner**，把这套 GitLab 真正变成一条可以自动构建和发布的 CI/CD 流水线。
