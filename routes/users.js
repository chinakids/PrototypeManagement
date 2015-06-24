var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var router = express.Router();
var rule = require('../tools/rule');
var querystring = require('querystring');
var _ = require('underscore');
var formidable = require("formidable");
var fs = require('fs');
var unzip = require('unzip');
var moment = require('moment');
var usermodel = require('../models/users');
var productmodel = require('../models/products');
var listmodel = require('../models/list')
var cmd = require('../tools/cmd');

// function writeFile(files){
//   var zip = fs.createReadStream(path.join(__dirname, '../tmp/'+files.file.path.split('/').pop()));
//   zip.pipe(unzip.Extract({ path: path.join(__dirname, '../public/web/'+files.file.path.split('/').pop())}));
//   zip.on('end', function() {
//     zip.unpipe(path.join(__dirname, '../public/web/'+files.file.path.split('/').pop()));
//   });
// }


/* 用户模块 */
router.get('/', function(req, res, next) {
  var queryId = req.query.i || '',queryName = req.query.n;
  var name = req.cookies.name;
  var connectid = req.cookies['connect.id'];
  var singename = req.cookies['name_sig'];
  //console.log(queryId);
  if(name != undefined){
    if(rule.pw(name,connectid,singename)){
      listmodel.find(function(err,list){
        if(err){
          console.log(err);
        }
        //console.log(product);
        if(queryId == ''){
          productmodel.findByAuthor(name,function(err,product){
            if(err){
              console.log(err);
            }
            //console.log(list);
            res.render('users', {
              title : '您的产品原型列表',
              data  : product,
              list  : list
            });
          })
        }else{
          console.log('start')
          productmodel.userFindByListId(name,queryId,function(err,product){
            if(err){
              console.log(err);
            }
            console.log(product);
            res.render('users', {
              title : '您的'+queryName+'原型列表',
              data  : product,
              list  : list
            });
          })
        }
      })
    }else{
      res.redirect('/users/login')
    }
  }else{
    res.redirect('/users/login')
  }
  console.log('users')
});
/* 用户数据提交 */
router.post('/editList',function(req, res, next) {
  /* 包含新增 */
  var name = req.cookies.name;
  var connectid = req.cookies['connect.id'];
  var singename = req.cookies['name_sig'];
  console.log(req.body)
  if(name != undefined){
    if(rule.pw(name,connectid,singename)){
        /* 新增 */
        //console.log(req.body)
        _list = new listmodel({
          name       : req.body.name,
          author     : name
        })
        _list.save(function(err, user){
          if(err){
            console.log(err);
          }
          res.send({status:1,info:'添加成功'});
        })
    }else{
      res.redirect('/login')
    }
  }else{
    res.send({status:0,info:'请登录'})
  }
});
router.post('/editProduct',function(req, res, next) {
      /* 包含新增 */
      var name = req.cookies.name;
      var connectid = req.cookies['connect.id'];
      var singename = req.cookies['name_sig'];
      var unm = 0;
      if(name != undefined){
        if(rule.pw(name,connectid,singename)){
          var form = new formidable.IncomingForm();
          form.uploadDir = path.join(__dirname, '../tmp');
          form.parse(req, function(err, fields, files) {

            //writeFile(files);
            var input = path.join(__dirname, '../tmp/'+files.file.path.split('/').pop());
            var output = path.join(__dirname, '../public/web/'+files.file.path.split('/').pop()+'/');
            cmd.unzip(input,output);

            if(fields.status == 1 || fields.status == 2){
              //新增项目非关闭状态则关闭之前所有PR再添加
              productmodel.findByListId(fields.infoId,function(err,product){
                if(err){
                  console.log(err)
                }else{
                  var s = {status:3};
                  for(var key in product){
                    _product = _.extend(product[key],s);
                    _product.save(function(err, user){
                      if(err){
                        console.log(err);
                      }
                      console.log('修改成功')
                    })
                  }
                }
              })
            }
            //关闭状态就如实添加
            _product = new productmodel({
              info       : {
                id       : fields.infoId,
                name     : fields.infoName
              },
              version    : fields.version,
              codeVersion: fields.codeVersion,
              status     : fields.status,
              author     : name,
              fs_name    : files.file.name,
              fs_path    : files.file.path,
              url        : '/web/'+files.file.path.split('/').pop()+'/index.html'
            })
            _product.save(function(err, product){
              if(err){
                res.status(200).send({status:0,info:'添加失败'}).end();
              }
              if(product){
                console.log('???')
                res.status(200).end();
              }
            })
          });
        }else{
          res.redirect('/users/login').end()
        }
      }else{
        res.send({status:0,info:'请登录'}).end()
      }

});
router.post('/editStatus',function(req, res, next) {
  /* 包含新增和修改 */
  var name = req.cookies.name;
  var connectid = req.cookies['connect.id'];
  var singename = req.cookies['name_sig'];
  if(name != undefined){
    if(rule.pw(name,connectid,singename)){
        //console.log('修改')
        /* 修改 */
        var newObj = {
          status       : req.body.status
        };
        //console.log(newObj)
        productmodel.findBy(req.body.id,function(err,product){
          if(err){
            console.log(err);
          }
          _list = _.extend(product[0],newObj);
          //console.log(_list);
          _list.save(function(err, user){
            if(err){
              console.log(err);
            }
            res.send({status:1,info:'修改成功'});
          })
        })
    }else{
      res.redirect('/login')
    }
  }else{
    res.send({status:0,info:'请登录'})
  }
  //res.status(200).send({'status':0}).end();
});
/* 登陆模块 */
router.get('/login', function(req, res, next) {
  //console.log('/login')
  //res.redirect('/');
  var name = req.cookies.name;
  var connectid = req.cookies['connect.id'];
  var singename = req.cookies['name_sig'];
  if(name != undefined){
    if(rule.pw(name,connectid,singename)){
      res.redirect('/users');
    }else{
      res.render('login', { title: 'logins' });
    }
  }else{
    res.render('login', { title: 'logins' });
  }
  console.log('login')
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
      if(rule.md5(req.body.password) == user[0].passWord){
        /* 设置登陆的cookie */
        res.cookie('name', user[0].name , { maxAge: 60 * 1000 * 60 * 24 * 30 });
        res.cookie('name_sig', rule.md5(user[0].name+'this_is_mixin_string'+req.cookies['connect.id']) , { maxAge: 60 * 1000 * 60 * 24 * 30 });
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
  userObj.password = rule.md5(userObj.password);
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
      res.send({status:0,info:'此帐号已存在或者存在重名帐号'});
    }
  })
});

module.exports = router;
