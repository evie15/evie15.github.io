window.onload=function(){
    var token=localStorage.getItem("token");
    var xhr=new XMLHttpRequest()
        xhr.open('get','http://43.140.247.80:8080/index/block'); 
        xhr.setRequestHeader("Content-Type", "application/json");
        if(token!=='undefined'){
            xhr.setRequestHeader("Authorization",token);
        }
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res);
                addPlate(res.data);
          if(token!=='undefined'){
        var navi=`<ul>
        <li>
            <div class="user_ph"><img src="${res.data.idPhoto}" alt="">
            <p>${res.data.nickName}</p> 
            </div>
        </li>
        
        <li><a href="../../user/loginhome/login.html"><button id="chosed">首 页</button></a></li>
        <li><a href="plate.html"><button id="chosed">板 块</button></a>  </li>
        <li></li>
        <li><a href="alluser.html"><button>用 户</button></a>  </li>
        <li></li>
        <li></li>
        <li><p class="out" onclick="out()">退出登录</p></li>
        <li></li>
    </ul>`
    document.getElementsByClassName('navi')[0].innerHTML=navi;
    }
            }
        }
}
function addPlate(res){
    document.getElementsByClassName('content')[0].innerHTML=``;
    for(var i=0;i<`${res.list.length}`;i++){
        var html=`<div class="part">
        <div class="par">
            <div class="title">
                ${res.list[i].blockName}<span class="glyphicon glyphicon-trash" onclick="deletePlate(this,${res.list[i].id})"></span>
                <span class="platemanager">贴数:<span>${res.list[i].postsNumber}</span></span>
            </div>
                <div class="post">
                ${res.list[i].blockDescribe}
                </div>
        </div>
    </div>`
    document.getElementsByClassName('content')[0].innerHTML+=html;
    }
    
}
function turnPlate(num){
    console.log(num);
    url="../../user/show plate/showPlate.html?id="+num;
    window.location.href=url;
}
function deletePlate(e,id){
    var token=localStorage.getItem("token");
    var xhr=new XMLHttpRequest()
        xhr.open('get','http://43.140.247.80:8080/block/delete/'+id); 
        xhr.setRequestHeader("Content-Type", "application/json");
        if(token!=='undefined'){
            xhr.setRequestHeader("Authorization",token);
        }
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res);
                e.parentNode.parentNode.remove();
                window.location.reload();
            }
        }
}
function add(){
    var token=localStorage.getItem("token");
    var title=document.getElementsByClassName('platetitle')[0].value;
    var describe=document.getElementsByClassName('platedescribe')[0].innerHTML;
    console.log(describe)
    var xhr=new XMLHttpRequest()
        xhr.open('post','http://43.140.247.80:8080/block/add'); 
        xhr.setRequestHeader("Content-Type", "application/json");
        if(token!=='undefined'){
            xhr.setRequestHeader("Authorization",token);
        }
        xhr.send(JSON.stringify({
            blockName:title,  
            blockDescribe:describe
        }));
        console.log(JSON.stringify({
            blockName:title,  
            describe:describe
        }))
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res);
                window.location.reload();
            }
        }
}
function out(){
    localStorage.removeItem("token");
    window.location.href='../../user/loginhome/login.html';
}