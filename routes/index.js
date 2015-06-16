var express = require('express');
var router = express.Router();

/* 列表展示项目以及演示地址 */
router.get('/', function(req, res, next) {
  res.render('index', {
    title : '全部产品原型列表',
    data  : [
      {
        createTime : '2015-08-01',
        name       : '亿房宝',
        version    : '1.2.1',
        codeVersion: '90',
        status     : '0',
        author     : '怎进军',
        url        : '/pm/'
      },
      {
        createTime : '2015-08-01',
        name       : '亿房宝',
        version    : '1.2.1',
        codeVersion: '90',
        status     : '1',
        author     : '怎进军',
        url        : '/pm/'
      },
      {
        createTime : '2015-08-01',
        name       : '亿房宝',
        version    : '1.2.2',
        codeVersion: '91',
        status     : '2',
        author     : '怎进军',
        url        : '/pm/'
      },
      {
        createTime : '2015-08-01',
        name       : '亿房宝',
        version    : '1.2.3',
        codeVersion: '96',
        status     : '0',
        author     : '怎进军',
        url        : '/pm/'
      },
      {
        createTime : '2015-08-01',
        name       : '亿房宝',
        version    : '1.1.1',
        codeVersion: '80',
        status     : '2',
        author     : '怎进军',
        url        : '/pm/'
      }
    ]
  });
});
/*
th.col-xs-1 时间
th.col-xs-5 名称
th.col-xs-1 项目版本
th.col-xs-1 原型版本
th.col-xs-1 状态
th.col-xs-1 作者
th.col-xs-2 操作
 */
module.exports = router;
