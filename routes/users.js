var express = require('express');
var session = require('express-session');
var router = express.Router();
var crypto = require('crypto');
var querystring = require('querystring');
var _ = require('underscore');
var mongoose = require('mongoose');
var usermodel = require('../models/users');

mongoose.connect('mongodb://127.0.0.1:27017/test');

function md5(str){
  var md5 = crypto.createHash('md5');
  var d2 = md5.update(str).digest('hex');
  console.log(d2);
  return d2;
}

/* 用户模块 */
router.get('/', function(req, res, next) {
  if(req.session.isVisit) {
    req.session.isVisit++;
    res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
  } else {
    req.session.isVisit = 1;
    res.send("欢迎第一次来这里");
    console.log(req.session);
  }
  //res.render('users', { title: 'user' });
});
/* 用户数据提交 */
router.post('/edit',function(req, res, next) {
  /* 包含新增和修改 */
  console.log(req.body);
  //res.status(200).send({'status':0}).end();
})
/* 登陆模块 */
router.get('/login', function(req, res, next) {
  //res.redirect('/');
  res.render('login', { title: 'logins' });

});
router.post('/login', function(req, res, next) {
  //res.send();
  //console.log(crypto)
  /* 查询用户名并验证密码 */
  //var content = '111111';
  var d = '96e79218965eb72c92a549dd5a330112';
  console.log(d);
  var status = false;
  if(md5(req.body.password) == d){
    status = true;
  }else{
    status = false;
  }

  if(status){
    /* 登录成功返回 */
    res.status(200).send({status:1,data:{name:'戴捷'}});
  }else{
    /* 登录失败返回 */
    res.status(200).send({status:0,info:'帐号或密码错误'});
  }
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
