var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var router = express.Router();
var crypto = require('crypto');
var querystring = require('querystring');
var _ = require('underscore');
var usermodel = require('../models/users');
var productmodel = require('../models/products');
var listmodel = require('../models/list');


/* md5加密 */
function md5(str){
  var md5 = crypto.createHash('md5');
  var d2 = md5.update(str).digest('hex');
  //console.log(d2);
  return d2;
}

/* 用户模块 */
router.get('/', function(req, res, next) {
  console.log('/')
  var name = req.cookies.name;
  var connectid = req.cookies['connect.id'];
  var singename = req.cookies['name_sig'];
  if(name != undefined){
    if(md5(name+'this_is_mixin_string'+connectid) == singename){
      productmodel.find(function(err,product){
        if(err){
          console.log(err);
        }
        res.render('users', {
          title : '您的产品原型列表',
          data  : product
        });
      })
    }else{
      res.redirect('/login')
    }
  }else{
    res.redirect('/login')
  }
  // if(req.session.isVisit) {
  //   req.session.isVisit++;
  //   res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
  // } else {
  //   req.session.isVisit = 1;
  //   res.send("欢迎第一次来这里");
  //   console.log(req.session);
  // }
  //res.render('users', { title: 'user' });
});
/* 用户数据提交 */
router.post('/editList',function(req, res, next) {
  /* 包含新增和修改 */
  console.log(req.body);
  //res.status(200).send({'status':0}).end();
})
router.post('/editProduct',function(req, res, next) {
  /* 包含新增和修改 */
  console.log(req.body);
  //res.status(200).send({'status':0}).end();
})
/* 登陆模块 */
router.get('/login', function(req, res, next) {
  //console.log('/login')
  //res.redirect('/');
  var name = req.cookies.name;
  var connectid = req.cookies['connect.id'];
  var singename = req.cookies['name_sig'];
  if(name != undefined){
    if(md5(name+'this_is_mixin_string'+connectid) == singename){
      res.redirect('/users');
    }else{
      res.render('login', { title: 'logins' });
    }
  }else{
    res.render('login', { title: 'logins' });
  }

});
router.post('/login', function(req, res, next) {
  /* 查询用户名并验证密码 */
  usermodel.findByName(req.body.username,function(err,user){
    if(err){
      console.log(err);
    }
    console.log(user);
    if(user.length<=0){
      res.status(200).send({status:0,info:'帐号或密码错误'});
    }else{
      if(md5(req.body.password) == user[0].passWord){
        /* 设置登陆的cookie */
        res.cookie('name', user[0].name , { maxAge: 60 * 1000 * 60 * 24 * 30 });
        res.cookie('name_sig', md5(user[0].name+'this_is_mixin_string'+req.cookies['connect.id']) , { maxAge: 60 * 1000 * 60 * 24 * 30 });
        res.status(200).send({status:1,data:{name:user[0].name}});
      }else{
        res.status(200).send({status:0,info:'帐号或密码错误'});
      }
    }
  })
});
/* 登出模块 */
router.get('/logout', function(req, res, next) {
  res.clearCookie('name');
  res.clearCookie('name_sig');
  res.redirect('/../');
});
/* 注册模块 */
router.get('/register', function(req, res, next) {
  res.render('register', { title: '注册' });
});
router.post('/register', function(req, res, next) {
  var userObj = req.body;
  var _user;
  userObj.password = md5(userObj.password);
  /* 存入数据,先判断是否存在用户 */
  usermodel.findByName(userObj.username,function(err,user){
    if(err){
      console.log(err);
    }
    /* 判断用户是否存在 */
    if(user.length<=0){
      _user = new usermodel({
        userName   : userObj.username,
        passWord   : userObj.password,
        name       : userObj.username
      })
      _user.save(function(err, user){
        if(err){
          console.log(err);
        }
        res.send({status:1,info:'注册成功'});
      })
    }else{
      res.send({status:0,info:'此帐号已存在'});
    }
  })

});
/* 登出模块 */
/* 管理模块（列表展示，处理文件上传，目录操作，url生成，修改） */

module.exports = router;
