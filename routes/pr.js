var express = require('express');
var path = require('path');
var http = require('http');
var router = express.Router();
var mongoose = require('mongoose');
var productmodel = require('../models/products');

/* 原型模块 */
router.get('/', function(req, res, next) {
  var id = req.query.pr;
  productmodel.findNewPr(id,function(err,product){
    if(err){
      //console.log(err)
      res.status(404);
    }else{
      res.redirect(product[0].url);
    }
  })
});

module.exports = router;
