window.onload=function(){

    var token=localStorage.getItem("token");
    console.log(token);
    if(token==null){
        window.location.href='../login/login.html';
    }
    var url=decodeURI(window.location.href);
    var url2=url.split("?id=");
    var url3=url2[1];
    var xhr=new XMLHttpRequest();
        xhr.open('POST','http://43.140.247.80:8080/user/user/main/'+url3+'/1');
        xhr.setRequestHeader("Authorization",token);
        xhr.withCredentials=true;
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res);
                adddata(res);
                mypost(res);
            }
        }
        xhr.send();
    
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
         </div>
    <div class="post_content mypost">${res.data.postsList[i].body}</div>
    </div>`
    }
    document.getElementsByClassName('post_layer')[0].innerHTML=person_post;
}

function out(){
    localStorage.removeItem("token");
    window.location.href='../loginhome/login.html';
}
