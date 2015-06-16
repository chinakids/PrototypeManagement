var express = require('express');
var crypto = require('crypto');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var usermodel = require('../models/users');
var router = express.Router();

/* md5加密 */
function md5(str){
  var md5 = crypto.createHash('md5');
  var d2 = md5.update(str).digest('hex');
  //console.log(d2);
  return d2;
}

/* 列表展示项目以及演示地址 */
router.get('/', function(req, res, next) {
  var name = req.cookies.name;
  var connectid = req.cookies['connect.id'];
  var singename = req.cookies['name_sig'];
  if(name != undefined){
    if(md5(name+'this_is_mixin_string'+connectid) == singename){
      usermodel.findByName(name,function(err,user){
        if(err){
          console.log(err);
        }
        console.log(user)
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
          ],
          login : user[0]
        });
      })
    }else{
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
        ],
        login:false
      });
    }
  }
});
module.exports = router;
