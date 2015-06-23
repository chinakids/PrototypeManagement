var exec = require('child_process').exec;
var path = require('path');

var cmd = {
  exec : function(cmdStr){
    console.log('解压命令：'+cmdStr);
    exec(cmdStr, function(err,stdout,stderr){
        if(err) {
            console.log('解压错误:'+stderr);
        } else {
            console.log('解压成功')
        }
    });
  },
  unzip : function(input,output){
    var cmdStr = 'python '+path.join(__dirname, '../tools/unzip.py')+' '+input+' '+output;
    this.exec(cmdStr);
  }
}

module.exports = cmd;