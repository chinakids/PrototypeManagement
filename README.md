# 产品原型(HTML)管理工具 v1.0.0
一个产品原型(HTML)管理工具基于nodejs&amp;mongodb&amp;redis

[![npm version](https://badge.fury.io/js/engine.io.svg)](http://badge.fury.io/js/engine.io)
[![Build Status](https://travis-ci.org/chinakids/PrototypeManagement.svg?branch=master)](https://travis-ci.org/chinakids/PrototypeManagement)

###1.安装

#####1.1 环境配置（mac为例）

-  *、基础环境：node、git、brew(其他平台请参照其他包管理工具)、ruby(brew依赖)

-  1、安装redis并启动服务  :   `brew install redis`  &   `redis-server`

-  2、安装mongodb并启动服务:   `brew install mongodb`   &   `mongod --config /home/mongodb/conf/mongod.conf`(配置文件每个人路径可能不同)

#####1.2 加载启动

- 1、 `git clone https://github.com/chinakids/PrototypeManagement.git`

- 2、 `npm install`

- 3、 `node app`


###2.备注

-   1.可能需要修改mongodb连接地址，请在app.js中修改

-   2.数据库字段配置请参照schemas目录文件

-   3.上传工具使用的webuploader(fex团队出品)

###3.涉及技能

- jade
- node
- express
- formdata
- unzip
- mongodb
- redis

###4.缺陷

- 未做录入表单数据格式验证
- 后台流程未整理
- ~~添加产品第二次会重复录入(new form位置的问题)~~
- window下压缩文件在unix环境下解压乱码
- 其他未知问题

###5.PR说明
- 欢迎各种PR
- 提交代码一定要说清楚修改哦~

