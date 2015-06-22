var express = require('express');
var rule = require('../tools/rule');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var usermodel = require('../models/users');
var productmodel = require('../models/products');
var router = express.Router();

/* 列表展示项目以及演示地址 */
router.get('/', function(req, res, next) {
  //res.status(200).end();
  var name = req.cookies.name;
  var connectid = req.cookies['connect.id'];
  var singename = req.cookies['name_sig'];

  /* 查找数据 */
  productmodel.find(function(err,product){
    if(err){
      console.log(err);
    }
    //console.log(product)
    if(name != undefined){
      if(rule.md5(name+'this_is_mixin_string'+connectid) == singename){
        usermodel.findByName(name,function(err,user){
          if(err){
            console.log(err);
          }
          console.log(user)
          res.render('index', {
            title : '全部产品原型列表',
            data  : product,
            login : user[0]
          });
        })
      }else{
        res.render('index', {
          title : '全部产品原型列表',
          data  : product,
          login:false
        });
      }
    }else{
      res.render('index', {
          title : '全部产品原型列表',
          data  : product,
          login:false
        });
    }
  })
});
module.exports = router;
