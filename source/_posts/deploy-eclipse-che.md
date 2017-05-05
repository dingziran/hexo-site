---
title: 在服务器上安装eclipse che
date: 2016-03-29 11:34:06
tags:
  - IDE
  - Linux
categories:
  - Tools
thumbnail: /uploads/577.jpg
---

## 基本环境
首先要保证服务器上安装有java环境并设置JAVA_HOME环境变量

下载eclipse che的文件并解压缩
创建一个uid大于1000的用户用来运行eclipse che，否则启动的时候会提示
```
This Linux user was launched with a UID != 1000. Che must run under UID 1000. See https://eclipse-che.readme.io/docs/usage#section-cannot-create-projects
```

## 安装docker和docker registry用来维护workspace
docker安装参考官网，docker registry安装命令如下
```shell
docker run -d -p 5000:5000 --restart=always --name registry \
  -v `pwd`/data:/var/lib/registry \
  registry:2
```
安装registry，并且将数据放在/data目录下，默认本来是放在/var/lib/registry，这里使用data，因为是系统挂载的大硬盘

国内安装地址
```shell
docker run -d -p 5000:5000 --restart=always --name registry   -v `pwd`/data:/var/lib/registry   pub.domeos.org/domeos/docker-registry-driver-sohustorage:1.0
```

修改che配置文件，指定registry地址
```
docker.registry.auth.url=http://localhost:5000
```

## 运行

```
bin/che.sh start -r:<ip>
```
ip为服务器的外网地址，服务器才能被外网访问

## 访问方式

### 方案一： 使用eclipse che client
eclipse che client 基于electron的本地应用程序，通过启动时参数指定到eclipse che server。下载地址参考https://eclipse-che.readme.io/docs/usage-windows  

启动命令为
```shell
# Windows
eclipse-che . <che-server-url>

# Mac
open eclipse-che.app . <che-server-url>

# Linux
./eclipse-che . <che-server-url>
```
### 方案二： 浏览器直接访问

打开浏览器，使用`http://<ip>:8080/`访问
