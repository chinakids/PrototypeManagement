/**
 * Unicorn Admin Template
 * Version 2.2.0
 * Diablo9983 -> diablo9983@gmail.com
**/

$(document).ready(function(){
	
	$('.data-table').dataTable({
		"bJQueryUI": true,
		"sPaginationType": "full_numbers",
		"sDom": '<""l>t<"F"fp>',
		"aaSorting": [[0,'desc']]
	});
	
	// var checkboxClass = 'icheckbox_flat-blue';
	// var radioClass = 'iradio_flat-blue';
	// $('input[type=checkbox],input[type=radio]').iCheck({
 //    	checkboxClass: checkboxClass,
 //    	radioClass: radioClass
	// });
	
	// $('select').select2();
	

	$("span.icon input:checkbox, th input:checkbox").on('ifChecked || ifUnchecked',function() {
		var checkedStatus = this.checked;
		var checkbox = $(this).parents('.widget-box').find('tr td:first-child input:checkbox');		
		checkbox.each(function() {
			this.checked = checkedStatus;
			if (checkedStatus == this.checked) {
				$(this).closest('.' + checkboxClass).removeClass('checked');
			}
			if (this.checked) {
				$(this).closest('.' + checkboxClass).addClass('checked');
			}
		});
	});


	function formatTime(s,bool){
    var t = new Date(s);
    var str;
    if(bool){
      str = t.getFullYear() +"年"+(t.getMonth()+1)+"月"+t.getDate()+"日 "+(parseInt(t.getHours())<10 ? ('0'+t.getHours()) : t.getHours())+":"+(parseInt(t.getMinutes())<10 ? ('0'+t.getMinutes()) : t.getMinutes());
    }else{
    str = t.getFullYear() +"年"+(t.getMonth()+1)+"月"+t.getDate()+"日 ";
    }
    return str;
  }
  $('.re-time').each(function(){
    var time = $(this).attr('data-time');
    if($(this).hasClass('no-hour')){
        $(this).text(formatTime(time,false));
    }else{
        $(this).text(formatTime(time,true));
    }
  })
  $('.dataTables_paginate .ui-button,.dataTables_length select').click(function(){
    $('.re-time').each(function(){
      var time = $(this).attr('data-time');
      if($(this).hasClass('no-hour')){
        $(this).text(formatTime(time,false));
      }else{
        $(this).text(formatTime(time,true));
      }
    })
  })
  //- $('.jq-add-list').click(function(){
  //-   $('input[name=listId]').val('');
  //-   $('input[name=listName]').val('');
  //- })
  var uploader;
  $('.jq-add-product').click(function(){
    $('select[name=productList]').val('');
    $('select[name=productList] option').eq(0).attr('selected',true);
    $('input[name=productVersion]').val('');
    $('input[name=productCodeVersion]').val('');
    $('input[name=productStatus]:checked').val('');
    $('.jq-file').show();
    setTimeout(function(){
      uploader = WebUploader.create({
        // swf文件路径
        swf:'/lib/fex-webuploader/dist/Uploader.swf',
        // 文件接收服务端。
        server: '/users/editProduct',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
          id : '#picker',
          multiple : false
        },
        accept:{
          title: 'Zip',
          extensions: 'zip',
          mimeTypes: 'application/x-zip-compressed'
        },
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false
      });
      uploader.on( 'fileQueued', function( file ) {
       $('.webuploader-pick').text(file.name)
      });

    },500)
  })
  $('.jq-edit-status').click(function(){
    var id = $(this).attr('data-id'),
        status = $(this).attr('data-status');
    $('input[name=editStatusId]').val(id);
    $('input[name=editStatus]').each(function(){
      if($(this).val() == status){
        $(this).prop('checked',true);
      }
    })
  })
  $('.jq-submit-editStatus').click(function(){
    var status=$('input[name=editStatus]:checked').val() || 1,
        id = $('input[name=editStatusId]').val();
      $.post('/users/editStatus', {
        'id': id,
        'status': status
      }, function(data, textStatus, xhr) {
        if(data.status == 1){
          window.location.reload();
        }else{
          alert(data.info);
        }
      }
    )
  })
  //- $('.jq-edit-list').click(function(){
  //-   var _id = $(this).attr('data-id'),
  //-       name = $(this).parent().siblings('.jq-list-name').text();
  //-   $('input[name=listId]').val(_id);
  //-   $('input[name=listName]').val(name);
  //- })
  //- $('.jq-edit-product').click(function(){
  //-   var _id = $(this).attr('data-id'),
  //-       infoId = $(this).parent().siblings('.jq-product-name').attr("data-id"),
  //-       version = $(this).parent().siblings('.jq-product-version').text(),
  //-       codeVersion = $(this).parent().siblings('.jq-product-codeVersion').text(),
  //-       status = $(this).parent().siblings('.jq-product-status').attr('data-status');
  //-   $('.jq-file').hide();
  //-   $('input[name=productId]').val(_id);
  //-   $('select[name=productList] option[value='+infoId+']').attr('selected',true);
  //-   $('input[name=productVersion]').val(version);
  //-   $('input[name=productCodeVersion]').val(codeVersion);
  //-   $('input[name=productStatus]').eq(status-1).prop('checked',true);
  //- })
  $('.jq-submit-list').click(function(){
    var id = $('input[name=listId]').val(),
        name = $('input[name=listName]').val();
    if($('input[name=listName]').val() == ''){
    	alert('请填写项目名称')
    	return false;
    }
    $.post('/users/editList', {
        'id': id,
        'name': name
      }, function(data, textStatus, xhr) {
        if(data.status == 1){
          window.location.reload();
        }else{
          alert(data.info)
        }
      }
    )
  })
  $('.jq-submit-product').click(function(){
    var infoId = $('select[name=productList]').val();
    if($('select[name=productList]').val() == '' || $('input[name=productVersion]').val() == '' || $('input[name=productCodeVersion]').val() ==''){
      alert('请填写完整信息');
      return false;
    }
    if($('.webuploader-pick').text() == '选择文件'){
      alert('请选择文件')
      return false;
    }

    uploader.options.formData.id = $('input[name=productId]').val();
    uploader.options.formData.infoId = $('select[name=productList]').val(),
    uploader.options.formData.infoName = $('select[name=productList]').find('option[value='+infoId+']').text(),
    uploader.options.formData.version = $('input[name=productVersion]').val(),
    uploader.options.formData.codeVersion = $('input[name=productCodeVersion]').val(),
    uploader.options.formData.status = $('input[name=productStatus]:checked').val() || 1;
    uploader.upload();
    //- var id = $('input[name=productId]').val(),
    //-     infoId = $('select[name=productList]').val(),
    //-     infoName = $('select[name=productList]').find('option[value='+infoId+']').text(),
    //-     version = $('input[name=productVersion]').val(),
    //-     codeVesion = $('input[name=productCodeVersion]').val(),
    //-     status = $('input[name=productStatus]:checked').val();
    //- $.post('/users/editProduct', {
    //-       'id'         : id,
    //-       'info'       : {
    //-         'id'       : infoId,
    //-         'name'     : infoName
    //-       },
    //-       'version'    : version,
    //-       'codeVersion': codeVesion,
    //-       'status'     : status
    //-     }, function(data, textStatus, xhr) {
    //-       if(data.status == 1){
    //-         window.location.reload();
    //-       }else{
    //-         alert(data.info)
    //-       }
    //-   }
    //- )
    uploader.on( 'uploadProgress', function( file, percentage ) {
      $('.webuploader-pick').text('上传中···('+(parseInt(percentage * 1000)/10)+'%)')
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on( 'uploadSuccess', function( file , response ) {
      $('.webuploader-pick').text('上传成功')
    	uploader.reset();
    	window.location.reload();
    });

    // 文件上传失败，显示上传出错。
    uploader.on( 'uploadError', function( file ) {
      $('.webuploader-pick').text('上传失败')
    });

  })

});
