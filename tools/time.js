var time = {
  default : function(s,bool){
    var t = new Date(s);
    var str;
    if(bool){
      str = t.getFullYear() +"年"+(t.getMonth()+1)+"月"+t.getDate()+"日 "+(parseInt(t.getHours())<10 ? ('0'+t.getHours()) : t.getHours())+":"+(parseInt(t.getMinutes())<10 ? ('0'+t.getMinutes()) : t.getMinutes());
    }else{
      str = t.getFullYear() +"年"+(t.getMonth()+1)+"月"+t.getDate()+"日 ";
    }
    return str;
  }
}

module.exports = time;