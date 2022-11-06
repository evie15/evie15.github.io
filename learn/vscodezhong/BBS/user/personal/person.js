window.onload=function(){

    var token=localStorage.getItem("token");
    console.log(token);
    if(token==null){
        window.location.href='../login/login.html';
    }
    
    var xhr=new XMLHttpRequest();
        xhr.open('POST','http://43.140.247.80:8080/user/success/main',true);
        xhr.setRequestHeader("Authorization",token);
        xhr.withCredentials=true;
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res);
                adddata(res);
                adddate (res);
                mypost(res);
            }
        }
        xhr.send();
    // var post_layer=document.getElementsByClassName('post_layer')[0];
    // post_layer.onclick=function(event){
    //     if(event.target.classList.contains('mypost')){
    //         var id=event.target.parentNode.id;
    //         var xhr=new XMLHttpRequest()
    //         url="../show posts/post.html?id="+id;
    //         console.log(url);
    //         window.location.href=url;
    //     }
    //     if(event.target.classList.contains('myplate')){
    //         var id=event.target.parentNode.id;
    //         console.log(id);
    //         url="../show plate/showPlate.html?id="+id;
    //         window.location.href=url;
    //     }
    // }
    var total_title=document.getElementsByClassName("total_title")[0];
    total_title.addEventListener('click', function(event){
        console.log(event.target.tagName)
        //展示板块关注
        if(event.target.className=='showplate'){
            var del=this.getElementsByClassName('chosed')[0];
            del.classList.remove('chosed');
            event.target.classList.add('chosed'); 
    var xhr=new XMLHttpRequest();
    xhr.open('get','http://43.140.247.80:8080/user/show/follow/block',true);
    xhr.setRequestHeader("Authorization",token);
    xhr.withCredentials=true;
    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            var resplate=JSON.parse(xhr.responseText);
            addshowplate(resplate.data);
        }
    }
    xhr.send();
        }
        //展示帖子
        if(event.target.className=='mypost'){
            var del=this.getElementsByClassName('chosed')[0];
            del.classList.remove('chosed');
            event.target.classList.add('chosed');
            var xhr=new XMLHttpRequest();
        xhr.open('POST','http://43.140.247.80:8080/user/success/main',true);
        xhr.setRequestHeader("Authorization",token);
        xhr.withCredentials=true;
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                mypost(res);
            }
        }
        xhr.send();
        }
        //展示关注
        if(event.target.className=='showFollow'){
            var del=this.getElementsByClassName('chosed')[0];
            del.classList.remove('chosed');
            event.target.classList.add('chosed');
            var xhr=new XMLHttpRequest();
        xhr.open('POST','http://43.140.247.80:8080/user/show/follower',true);
        xhr.setRequestHeader("Authorization",token);
        xhr.withCredentials=true;
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res)
                addFollow(res.data);
            }
        }
        xhr.send();
        }
        //展示粉丝
        if(event.target.className=='showFans'){
            var del=this.getElementsByClassName('chosed')[0];
            del.classList.remove('chosed');
            event.target.classList.add('chosed');
            var xhr=new XMLHttpRequest();
        xhr.open('POST','http://43.140.247.80:8080/user/show/fans',true);
        xhr.setRequestHeader("Authorization",token);
        xhr.withCredentials=true;
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                addFans(res.data);
            }
        }
        xhr.send();
        }
        //管理板块
        if(event.target.className=='plate'){
            var del=this.getElementsByClassName('chosed')[0];
            del.classList.remove('chosed');
            event.target.classList.add('chosed');
            var xhr=new XMLHttpRequest();
        xhr.open('POST','http://43.140.247.80:8080/user/show/fans',true);
        xhr.setRequestHeader("Authorization",token);
        xhr.withCredentials=true;
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                Manageplate(res.data);
            }
        }
        xhr.send();
        }
    })
}
function adddate (res){
    var second=`
            <ul>
                <li>
                    <div id="edit_ph">
                    <label><img  src="${res.data.user.idPhoto}" alt="" class="sending"><input type="file" id="photo" onchange="uploadImg(this)" style="display: none;"></label>
                    </div>
                </li>
                <li>昵称: <input type="text" value="${res.data.user.nickName}" class="sending"> </li>
                <li>手机: <input type="text" value="${res.data.user.telephone}" class="sending"></li>
                <li>密码: <input type="password" value="${res.data.user.password}" class="sending"></li>
                <li><button class="saving" onclick="changedata()">保存</button></li>
            </ul>`
    document.getElementById('second').innerHTML=second;
}
function adddata(res){
        // var container=document.getElementById('container');
        // container.style.display='none';
        var navi=`
        <ul>
        <li><a href="../loginhome/login.html"><button id="chosed">BBS</button></a>  </li>
        <li> </li>
        <li></li>
        <li></li>
        <li><a href="../inform/inform.html"><button> <span class="glyphicon glyphicon-bell"></span><span class="font">消 息</span> </button></a>  </li>
        <li><a href="../publish posts/pub_post.html"><button><span class="glyphicon glyphicon-edit"></span> <span class="font">创作中心</span>  </button></a>
        </li>
        <li>
        <a href="../personal/person.html" style="text-decoration: none;">
        <div class="user_ph" onclick="Show()"><img src="${res.data.user.idPhoto}" alt="">
                  <span class="login">${res.data.user.nickName}</span>
               </div>
        </a> 
               <span class="outlogin" onclick="out()">退出登陆</span>
        </li>
    </ul>`
    document.getElementsByClassName('navi')[0].innerHTML=navi;
    
    var person_detail=document.getElementById('person_detail');
        var pdh=` <div id="person_inform">
        <div id="image"><img src="${res.data.user.idPhoto}" alt="" srcset=""></div> 
        <div class="person_outer">
            <div id="person_name">${res.data.user.nickName}
            <button onclick="edit()" id="edit">编辑资料</button>
            </div>
            
        <ul>
            <li>账号：${res.data.user.userName}</li>
            <li>手机号：${res.data.user.telephone}</li>
            <li>帖子数：${res.data.postsNumber}</li>
        </ul>
        </div> 
    </div>`
    person_detail.innerHTML=pdh;
}
function mypost(res){
    var person_post='';
    for(let i=0;i<`${res.data.postsList.length}`;i++){
         person_post+=` <div class="person_post" id="${res.data.postsList[i].id}">
         <div class="post_title mypost">${res.data.postsList[i].head}
         <span class="scanbox">
         <span class="scannumber"></span><span class="scan">${res.data.postsList[i].scanNumber}</span></span>
         <span class="deletComment glyphicon glyphicon-trash"></span>
         </div>
    <div class="post_content mypost">${res.data.postsList[i].body}</div>
    <button class="cancel" onclick="turnPrepost(${res.data.postsList[i].id})">编 辑</button>
    </div>`
    }
    document.getElementsByClassName('post_layer')[0].innerHTML=person_post;
}
function edit(){
    var container=document.getElementById('container');
    container.style.display="block";
}
function del(){
    var con=document.getElementById('container');
    con.style.display='none';
}
function uploadImg(obj){
    var file=obj.files[0];
    var reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=function(e){
      var img=document.getElementsByClassName('sending')[0];
      img.src=e.target.result;
    }
    var token=localStorage.getItem('token');
    var photo=document.getElementById('photo');
    var formdata=new FormData();
        formdata.append('photo',photo.files[0]);
        var xhr1=new XMLHttpRequest();
            xhr1.open('post','http://43.140.247.80:8080/user/success/update');
            xhr1.setRequestHeader("Authorization",token);
            xhr1.withCredentials=true;
            // xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
            xhr1.send(formdata);
            xhr1.onreadystatechange=function(){
                 if(xhr1.readyState===4&&xhr1.status===200){
                        console.log("yes");
                }
        
            }
  }
function changedata(){
    console.log("dng");
    var token=localStorage.getItem("token");
    console.log(token)
    var data=document.getElementsByClassName('sending');
    var xhr=new XMLHttpRequest();
        xhr.open('post','http://43.140.247.80:8080/user/nickName/update');
        xhr.withCredentials=true;
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.setRequestHeader("Authorization",token);
        console.log(data[1].value);
        xhr.send(JSON.stringify({
            nickName:data[1].value
        }))
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res1=xhr.responseText;
                console.log(res1);
                //window.localStorage.getItem("token",res1.msg);
                window.location.reload();
            }
        }
        
        var xhr1=new XMLHttpRequest();
        xhr1.open('post','http://43.140.247.80:8080/user/password/update');
        xhr1.withCredentials=true;
        xhr1.setRequestHeader("Content-Type", "application/json"); 
        xhr1.setRequestHeader("Authorization",token);
        console.log(data[3].value);
        xhr1.send(JSON.stringify({
            password:data[3].value
        }))
        xhr1.onreadystatechange=function(){
            if(xhr1.readyState===4&&xhr1.status===200){
                var res2=xhr1.responseText;
                console.log(res2);
                //window.localStorage.getItem("token",res2.msg);
                window.location.reload();
            }
        }
        var xhr=new XMLHttpRequest();
        xhr.open('post','http://43.140.247.80:8080/user/telephone/update');
        xhr.withCredentials=true;
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.setRequestHeader("Authorization",token);
        console.log(data[2].value);
        xhr.send(JSON.stringify({
            telephone:data[2].value
        }))
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res3=xhr.responseText;
                console.log(res3);
                //window.localStorage.getItem("token",res3.msg);
                window.location.reload();
            }
        }
var container=document.getElementById('container');
        container.style.display='none';
}
function out(){
    localStorage.removeItem("token");
    window.location.href='../loginhome/login.html';
}
function addshowplate(res){
    var person_post=``;
    for(var i=0;i<`${res.list.length}`;i++){
         person_post+=` <div class="person_post" id="${res.list[i].block.id}">
         <div class="post_title myplate">${res.list[i].block.blockName}
         <span class="scanbox"><span class="scannumber"></span><span class="scan">${res.list[i].block.scanNumber}</span></span>
         </div>
    <div class="post_content myplate">${res.list[i].block.blockDescribe}</div>
    <button class="cancel">取消关注</button>
    </div>`
    }
    document.getElementsByClassName('post_layer')[0].innerHTML=person_post;
}
function addFollow(res){
    var person_post2=``;
    for(var i=0;i<`${res.personMessage.list.length}`;i++){
        person_post2 +=`<div class="person_post2">
        <div class="col-md-1">
            <img src="../show posts/user.jpg" />
        </div>
        <div class="col-md-11">
            <div class="post_title">${res.personMessage.list[i].user.nickName}
                <button class="cancel">取消关注</button>
            </div>
            <span class="friend">电话 ${res.personMessage.list[i].user.telephone}</span> 
        </div>
</div>`
   }
   document.getElementsByClassName('post_layer')[0].innerHTML=person_post2;
}
function addFans(res){
    var person_post2=``;
    for(var i=0;i<`${res.personMessage.list.length}`;i++){
        if(`${res.personMessage.list[i].user.followStatus}`==0){
            person_post2+=`<div class="person_post2">
        <div class="col-md-1">
            <img src="../show posts/user.jpg" />
        </div>
        <div class="col-md-11">
            <div class="post_title">${res.personMessage.list[i].user.nickName}
                <button class="cancel">回 关</button>
            </div>
            <span class="friend">电话 ${res.personMessage.list[i].user.telephone}</span> 
        </div>
</div>`
        }
        else{
            person_post2+=`<div class="person_post2">
        <div class="col-md-1">
            <img src="../show posts/user.jpg" />
        </div>
        <div class="col-md-11">
            <div class="post_title">${res.personMessage.list[i].user.nickName}
                <button class="cancel">取消关注</button>
            </div>
            <span class="friend">电话 ${res.personMessage.list[i].user.telephone}</span> 
        </div>
</div>`
        }
        
   }
   document.getElementsByClassName('post_layer')[0].innerHTML=person_post2;
}
function Manageplate(res){
    var person_post='';
    for(let i=0;i<`${res.data.postsList.length}`;i++){
         person_post+=` <div class="person_post" id="${res.data.postsList[i].id}">
         <div class="post_title mypost">${res.data.postsList[i].head}
         <span class="scanbox">
         <span class="scannumber"></span><span class="scan">${res.data.postsList[i].scanNumber}</span></span>
         <span class="deletComment glyphicon glyphicon-trash"></span>
         </div>
    <div class="post_content mypost">${res.data.postsList[i].body}</div>
    <button class="cancel">通过</button>
    </div>`
    }
    document.getElementsByClassName('post_layer')[0].innerHTML=person_post;
}
function turnPrepost(num){
    console.log(num)
    url="../show posts/prepost.html?id="+num;
    window.location.href=url;
}