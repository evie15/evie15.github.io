
    function example_image_upload_handler (blobInfo, success, failure, progress) {
        var formData=new FormData();
        var token=localStorage.getItem("token");
        var file = blobInfo.blob();
        formData.append('file', file, file.name );
        var xhr1=new XMLHttpRequest();
            xhr1.open('post','http://43.140.247.80:8080/file/add');
            xhr1.setRequestHeader("Authorization",token);
            xhr1.withCredentials=true;
            // xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
            xhr1.send(formData);
            xhr1.onreadystatechange=function(){
                 if(xhr1.readyState===4&&xhr1.status===200){
                        console.log("yes");
                }
        
            }
    };
    function example_file_picker_callback() {
        var token=localStorage.getItem("token");
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.onchange = function() {
            var file = this.files[0];
            var form = new FormData();
            form.append("file", file);
            console.log(form)
            var xhr1=new XMLHttpRequest();
                xhr1.open('post','http://43.140.247.80:8080/file/add');
                xhr1.setRequestHeader("Authorization",token);
                xhr1.withCredentials=true;
                // xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
                xhr1.send(form);
                xhr1.onreadystatechange=function(){
                     if(xhr1.readyState===4&&xhr1.status===200){
                        var res=JSON.parse(xhr1.responseText);
                        var id=res.data.fileId;
                       var fileId=localStorage.getItem("fileId");
                       var  file=JSON.parse(fileId);
                       file.push(id);
                        localStorage.setItem('fileId',JSON.stringify(file));
                        var name=res.data.msg.split("：");
                        console.log(name[1]);
                            var h1=`<div><span>${name[1]}</span><button onclick="cancelLoad()" class="downLoad">取消上传</button></div>`
                            document.getElementById('file').innerHTML+=h1;
                    }
            
                }
        };
        input.click();
    }
    $(function() {
    tinymce.init({
        selector: '#content',
        body_class: 'TinyMCE_class',
        language:'zh-Hans',
        //插件列表：indent2em（首行缩进，这个插件需要去上面的链接下载） 
        plugins : 'lists advlist autolink autoresize link image image preview autosave charmap emoticons code ' +
            'codesample fullscreen insertdatetime pagebreak quickbars searchreplace table wordcount help',
        //工具栏
        toolbar:['undo redo | fontsizeselect | styleselect | forecolor backcolor |bold italic superscript subscript|alignleft aligncenter alignright alignjustify | outdent indent indent2em | code removeformat charmap insertdatetime emoticons| numlist bullist|codesample fullscreen pagebreak quickbars searchreplace| table wordcount help| image link preview |'],
        fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',//fontsize选择范围
        max_height: 900,
        min_height:550,
        menubar:false,
        statusbar:false,
        branding: false,//隐藏右下角技术支持
        pagebreak_split_block: true,//插入分页符时拆分块元素
        quickbars_insert_toolbar: false,//快速插入 触发提供的工具栏
        quickbars_selection_toolbar: 'bold | h1 h2 h3',//快速选择 触发提供的工具栏
        images_upload_handler: example_image_upload_handler,//拖动图片上传方法
        file_picker_callback: example_file_picker_callback,//选择图片上传方法
        
    });
    });
    window.onload=function(){
        var fileId=new Array();
        localStorage.setItem("fileId",JSON.stringify(fileId));
        var token=localStorage.getItem("token");
        console.log(token)
        var xhrr=new XMLHttpRequest()
            xhrr.open('get','http://43.140.247.80:8080/posts/show/drafts'); 
            xhrr.setRequestHeader("Content-Type", "application/json");
            if(token!=='undefined'){
                xhrr.setRequestHeader("Authorization",token);
            }
            xhrr.send();
            xhrr.onreadystatechange=function(){
                if(xhrr.readyState===4&&xhrr.status===200){
                    var res=JSON.parse(xhrr.responseText);
                    console.log(res);
                    document.getElementsByClassName('post_layer')[0].innerHTML=``
                    for(var i=0;i<`${res.data.list.length}`;i++){
                       var ht=`<div class="post">
                    <div class="post_title" >${res.data.list[i].head}
                    </div>
                    
                    <div class="post_content">
                    ${res.data.list[i].body}
                    </div>
                    <button class="postMessage" onclick="turnPost(${res.data.list[i].id})">编 辑</button>
                </div>`
                document.getElementsByClassName('post_layer')[0].innerHTML+=ht;
                    }
                    
                }
            }

        var xhr=new XMLHttpRequest()
            xhr.open('get','http://43.140.247.80:8080/index/block'); 
            xhr.setRequestHeader("Content-Type", "application/json");
            if(token!==null){
                xhr.setRequestHeader("Authorization",token);
            }
            xhr.send();
            xhr.onreadystatechange=function(){
                if(xhr.readyState===4&&xhr.status===200){
                    var res=JSON.parse(xhr.responseText);
                    console.log(res);
                    add(res.data);
              if(token!==null){
            var navi=`
            <ul>
                <li><a href="../loginhome/login.html"><button id="chosed">BBS</button></a>  </li>
                <li> </li>
                <li></li>
                <li></li>
                <li><a href=""><button> <span class="glyphicon glyphicon-bell"></span><span class="font">消 息</span> </button></a>  </li>
                <li><a href="../publish posts/pub_post.html"><button><span class="glyphicon glyphicon-edit"></span> <span class="font">创作中心</span>  </button></a>
                </li>
                <li><a href="../personal/person.html">
                <div class="user_ph" onclick="Show()"><img src="${res.data.idPhoto}" alt="">
                          <span class="login" s>${res.data.nickName}</span>
                       </div></a>
                       <span class="outlogin" onclick="out()">退出登陆</span>
                
                        
                </li>
            </ul>`
        document.getElementsByClassName('navi')[0].innerHTML=navi;
        }
                }
            }
            //tab切换
            document.getElementById('second').onclick=function(){
                document.getElementById('drafts').style.display='none';
                document.getElementById('writing').style.display='block'
            }
            document.getElementById('first').onclick=function(){
                document.getElementById('writing').style.display='none';
                document.getElementById('drafts').style.display='block';
            }

    }
    function add(res){
        var plate=``
        for(let i=0;i<`${res.list.length}`;i++){
             plate+=`<option id="${res.list[i].id}">${res.list[i].blockName}</option>`
        }
        document.getElementsByClassName('form-control')[0].innerHTML=plate;
    }
    function postMessege(){
        var index=document.getElementsByClassName('form-control')[0].selectedIndex;
        var block=document.getElementsByClassName('form-control')[0].options[index].id;
        var head=document.getElementsByClassName('post-title')[0].innerHTML;
        // var body=document.getElementsByClassName('post-content')[0].innerHTML;
        var body=tinymce.activeEditor.getContent();
        var token=localStorage.getItem("token");
        var fileId=JSON.parse(localStorage.getItem('fileId'));
        console.log(token)
        console.log(JSON.stringify({
            blockId: Number(block),  
            head:head,
            body:body,
            list:fileId
        }))
        var xhr=new XMLHttpRequest()
            xhr.open('post','http://43.140.247.80:8080/posts/add'); 
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization",token);
            xhr.send(JSON.stringify({
                blockId: Number(block),  
                head:head,
                body:body,
                list:fileId
            }));
            xhr.onreadystatechange=function(){
                if(xhr.readyState===4&&xhr.status===200){
                    var res=JSON.parse(xhr.responseText);
                var alert=document.getElementsByClassName('alert-warning')[0];
                alert.style.display='block';
                setTimeout(function(){
                    var alert=document.getElementsByClassName('alert-warning')[0];
                alert.style.display='none';
               // window.location.reload();
                },1000)
                }
            }
    }
    function draftspost(){
        var index=document.getElementsByClassName('form-control')[0].selectedIndex;
            var block=document.getElementsByClassName('form-control')[0].options[index].id;
            console.log(block)
            var head=document.getElementsByClassName('post-title')[0].innerHTML;
        // var body=document.getElementsByClassName('post-content')[0].innerHTML;
        var body=tinymce.activeEditor.getContent();
            var token=localStorage.getItem("token");
            console.log(token)
            console.log(JSON.stringify({
                blockId: block,  
                head:head,
                body:body,
            }))
        var token=localStorage.getItem("token");
                    var xhr=new XMLHttpRequest();
                    xhr.open('post','http://43.140.247.80:8080/posts/draft/add');
                    xhr.withCredentials=true;
                    xhr.setRequestHeader("Content-Type", "application/json"); 
                    xhr.setRequestHeader("Authorization",token);
                    xhr.send(JSON.stringify({
                        blockId: block,  
                        head:head,
                        body:body,
                    }));
                    xhr.onreadystatechange=function(){
                    if(xhr.readyState===4&&xhr.status===200){
                    var res=JSON.parse(xhr.responseText);
                    window.location.href='../publish posts/pub_post.html'
                }
                }
    }
    function turnPost(num){
        url="../show posts/prepost.html?id="+num;
        window.location.href=url;
    }