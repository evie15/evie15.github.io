window.onload=function(){
    var one=document.getElementById('one');
    var two=document.getElementById('two');
    var first=document.getElementById('first');
    var second=document.getElementById('second');
    one.addEventListener('click',function(){//切换登录页面
        first.style.display="block";
        second.style.display="none";
        one.style.borderBottom="4px solid rgb(40, 40, 211)";
        two.style.borderBottom="none";
    })
    two.addEventListener('click',function(){//切换注册页面
        first.style.display="none";
        second.style.display="block";
        two.style.borderBottom="4px solid rgb(40, 40, 211)";
        one.style.borderBottom="none";
    })
    var phoneNumber=document.getElementById('phoneNumber');
    var phonetip=document.getElementById('phonetip');
    phoneNumber.addEventListener('change',function(){
        if(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.exec(phoneNumber.value))
        {
            phonetip.style.display='none';
            var btn2=document.getElementById('btn2');
            btn2.disabled=false;
        }
        
        else{
            phonetip.style.display='block';
            var btn2=document.getElementById('btn2');
            btn2.disabled=true;
        }
        
    })

    //确定密码格式
    var password2=document.getElementById('password2');
    var tip=document.getElementById('tip');
        checkPass=function(){
        if(/(?=.*[0-9])(?=.*[A-Z])|(?=.*[0-9])(?=.*[a-z])|(?=.*[a-z])(?=.*[A-Z])^[0-9a-zA-Z]{6,12}$/.exec(password2.value))
        
        {tip.style.display='none';
        var btn2=document.getElementById('btn2');
            btn2.disabled=false;
        }
        else{
            tip.style.display='block';
            var btn2=document.getElementById('btn2');
            btn2.disabled=true;
        }
        
    }
    password2.addEventListener('change',checkPass);
    var repassword=document.getElementById('repassword');
    var tip1=document.getElementById('tip1');
    repassword.addEventListener('change',function(){
       if(repassword.value!=password2.value){
       tip1.style.display='block';
       var btn2=document.getElementById('btn2');
       btn2.disabled=true;
       }
       else{
        tip1.style.display='none'; 
        var btn2=document.getElementById('btn2');
            btn2.disabled=false;
       }
       
    })
    
    
    //登录交接
    var btn1=document.getElementById('btn1');//登录
    btn1.onclick=function(){
        var idNumber=document.getElementById('username').value;
        var password=document.getElementById('password').value;
        console.log(idNumber);
        if(idNumber!=='undefined'&&password!=='undefined'){
            var xhr=new XMLHttpRequest();
        xhr.open('post','http://43.140.247.80:8080/user/login');
        xhr.withCredentials=true;
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.send(JSON.stringify({
            idNumber:idNumber,  
            password:password
        }))
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res);
                if(res.data.status==0){
                    alert(res.data.msg);
                }
                else{
                    var con=document.getElementById('container');
                    con.style.display='none';
                    window.localStorage.setItem("token",res.data.msg);
                    console.log(localStorage.getItem("token"));
                    if(res.data.id==1){
                        window.location.href='../../manager/plate/alluser.html'
                    }
                    else{
                        window.location.href='../loginhome/login.html';
                    }
                    
                }
            }
        }}
        
    }

    //注册交接
    var btn2=document.getElementById('btn2');
    btn2.onclick=function(){
        var nickName=document.getElementById('username2').value;
        var password=document.getElementById('password2').value;
        var telephone=document.getElementById('phoneNumber').value;
        if(nickName!==null&&password!==null&&telephone!==null){
            var xhr=new XMLHttpRequest()
        xhr.open('post','http://43.140.247.80:8080/user/add'); 
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            nickName:nickName, 
            password:password,
            telephone:telephone
        }))
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText)
                console.log(res.data.status);
                if(res.data.status==0){
                    alert(res.data.msg);
                }
                else if(res.data.status==1){
                    first.style.display="block";
                    second.style.display="none";
                    one.style.borderBottom="4px solid rgb(40, 40, 211)";
                    two.style.borderBottom="none";
                }
            }
        }
        
        }
        else{
            alert("不能为空");
            btn2.disabled=true;
        }
    }

    //渲染页面

    var token=localStorage.getItem("token");
    console.log(token)
    var xhr=new XMLHttpRequest()
        xhr.open('get','http://43.140.247.80:8080/index/main'); 
        xhr.setRequestHeader("Content-Type", "application/json");
        if(token!==null){
            xhr.setRequestHeader("Authorization",token);
        }
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res);
                add(res);
          if(token!==null){
        var container=document.getElementById('container');
        container.style.display='none';
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
                  <a href="../personal/person.html">
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

        //点赞功能
        document.getElementsByClassName("hot")[0].addEventListener('click',function(event){
            var token=localStorage.getItem("token");
            if(event.target.className=="likenumber"){
                    event.target.classList.add("likenumberactive");    
                    var num=event.target.getElementsByTagName('span')[0].innerHTML;
                    //console.log(num);
                    var num2=Number(num)+1
                    event.target.getElementsByTagName('span')[0].innerHTML=num2;
                    var postId=event.target.id;
                    var xhr=new XMLHttpRequest();
                    xhr.open('get','http://43.140.247.80:8080/posts/like/update/'+postId);
                   xhr.withCredentials=true;
                   xhr.setRequestHeader("Content-Type", "application/json"); 
                   xhr.setRequestHeader("Authorization",token);
                   xhr.send();
                   xhr.onreadystatechange=function(){
                if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res)
                }
            }}
               else if(event.target.classList.contains('likenumberactive')){
                event.target.classList.remove("likenumberactive");
                var numm=event.target.getElementsByTagName('span')[0].innerHTML;
                console.log(numm)
                event.target.getElementsByTagName('span')[0].innerHTML=Number(numm)-1;
                var postId=event.target.id;
                var xhr=new XMLHttpRequest();
                xhr.open('get','http://43.140.247.80:8080/posts/like/update/'+postId);
                xhr.withCredentials=true;
                xhr.setRequestHeader("Content-Type", "application/json"); 
                xhr.setRequestHeader("Authorization",token);
                xhr.send();
                xhr.onreadystatechange=function(){
                if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                console.log(res)
             }
            }
        }
    })

        document.getElementsByClassName("navi3")[0].addEventListener('click',function(event){
            var token=localStorage.getItem("token");
            if(event.target.className=="likenumber"){
                var postId=event.target.id;
                var xhr=new XMLHttpRequest();
                xhr.open('get','http://43.140.247.80:8080/posts/like/update/'+postId);
                xhr.withCredentials=true;
                xhr.setRequestHeader("Content-Type", "application/json"); 
                xhr.setRequestHeader("Authorization",token);
                xhr.send();
                xhr.onreadystatechange=function(){
                       if(xhr.readyState===4&&xhr.status===200){
                              var res=JSON.parse(xhr.responseText);
                        }
                }
            }   

        })
}
function Show(){
    var con=document.getElementById('container');
    con.style.display='block';
}
function del(){
    var con=document.getElementById('container');
    con.style.display='none';
}
function add(res){
    var parc=``;
    var parc2=``;
    for(let i=0;i<`${res.data.blockList.length}`;i++){
        if(i<9){
            parc+=` <li class="plate" id="${res.data.blockList[i].id}" onclick="turnPlate(${res.data.blockList[i].id})">${res.data.blockList[i].blockName}</li> `
        } 
        if(i>=9){
            parc2+=`<li class="list-group-item plate" id="${res.data.blockList[i].id}" onclick="turnPlate(${res.data.blockList[i].id})">${res.data.blockList[i].blockName}</li>`
        }    
    }
    if(`${res.data.blockList.length}`>9){
        var ul=document.createElement('ul');
        ul.className='list-group';
        ul.innerHTML=parc2;
        var span=document.createElement('span');
        span.dataset.content=span.outerHTML;
        span.dataset.toggle='popover';
        span.dataset.container='body';
        span.dataset.placement='right';
        span.title='板块';
        span.innerHTML="更多";
        var ninthli=document.createElement('li');
        ninthli.innerHTML=span.outerHTML;
        parc=parc+ninthli.outerHTML;
        
    }
    var ul2=document.createElement('ul');
        ul2.innerHTML=parc;
        document.getElementsByClassName('navi3')[0].innerHTML=ul2.outerHTML;
    //热门帖
    document.getElementsByClassName('post_layer')[0].innerHTML=``;
    for(let i=0;i<`${res.data.postsList.length}`;i++){
        console.log(`${res.data.postsList[i].likeStatus}`)
        if(`${res.data.postsList[i].likeStatus}`==0){
            var hotpost=`
        <div class="post">
                <div class="post_title" >${res.data.postsList[i].head}
                    <span class="scanbox"><span class="scannumber"></span><span class="scan">${res.data.postsList[i].scanNumber}</span></span>
                    <span class="likenumber" id="${res.data.postsList[i].id}"> <span>${res.data.postsList[i].likeNumber}</span></span>
                </div>
                
                <div class="post_content" onclick="turnPage(${res.data.postsList[i].id})">
                ${res.data.postsList[i].body}
                </div>
            </div>`
        }
        else{
            var hotpost=`
        <div class="post">
                <div class="post_title" >${res.data.postsList[i].head}
                    <span class="scanbox"><span class="scannumber"></span><span class="scan">${res.data.postsList[i].scanNumber}</span></span>
                    <span class="likenumber likenumberactive" id="${res.data.postsList[i].id}"> <span>${res.data.postsList[i].likeNumber}</span></span>
                </div>
                
                <div class="post_content" onclick="turnPage(${res.data.postsList[i].id})">
                ${res.data.postsList[i].body}
                </div>
            </div>`
        }
        document.getElementsByClassName('post_layer')[0].innerHTML+=hotpost;
    }
   
    
}
function turnPage(num){
    url="../show posts/post.html?id="+num;
    window.location.href=url;
}
function out(){
    localStorage.removeItem("token");
    window.location.href='../loginhome/login.html';
}
function search(){
    var token=localStorage.getItem('token');
    var value=document.getElementById('value').value;
    var xhr=new XMLHttpRequest()
    xhr.open('get','http://43.140.247.80:8080/index/search/'+value); 
    xhr.setRequestHeader("Content-Type", "application/json");
    if(token!==null){
        xhr.setRequestHeader("Authorization",token);
    }
    xhr.send()
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            var res=JSON.parse(xhr.responseText)
            console.log(res.data);
            showResult(res,value);
        }
    }
}
function showResult(res,value){
    var hotpost=``
document.getElementsByClassName('content')[0].innerHTML=`<div class="search">
<input type="text" id="value" placeholder="搜搜看你想知道的" value="${value}">
<img src="../home/搜索.png" alt="" onclick="search()">
</div>`;
    if(`${res.data.postsList.length}`!==0){
    for(let i=0;i<`${res.data.postsList.length}`;i++){
        if(`${res.data.postsList[i].likeStatus}`==0){
             hotpost+=`
        <div class="post2">
                <div class="post_title" >${res.data.postsList[i].head}
                    <span class="scanbox"><span class="scannumber"></span><span class="scan">${res.data.postsList[i].scanNumber}</span></span>
                    <span class="likenumber" id="${res.data.postsList[i].id}"> <span>${res.data.postsList[i].likeNumber}</span></span>
                </div>
                
                <div class="post_content2">
                ${res.data.postsList[i].body}
                </div>
            </div>`
        }
        else{
             hotpost+=`
        <div class="post2">
                <div class="post_title" >${res.data.postsList[i].head}
                    <span class="scanbox"><span class="scannumber"></span><span class="scan">${res.data.postsList[i].scanNumber}</span></span>
                    <span class="likenumber likenumberactive" id="${res.data.postsList[i].id}"> <span>${res.data.postsList[i].likeNumber}</span></span>
                </div>
                
                <div class="post_content2" onclick="turnPage(${res.data.postsList[i].id})">
                ${res.data.postsList[i].body}
                </div>
            </div>`
        }
    }
    }
    if(`${res.data.blockList.length}`!==0){
        for(let j=0;j<`${res.data.blockList.length}`;j++){
            hotpost+=`
       <div class="post2">
               <div class="post_title" >${res.data.blockList[j].blockName}
               <span class="postNum"> 共${res.data.blockList[j].postsNumber}贴</span>
                   <span class="scanbox"><span class="scannumber"></span><span class="scan">${res.data.blockList[j].scanNumber}</span></span>
                </div>
               
               <div class="post_content2" onclick="turnPlate(${res.data.blockList[j].id})">
               ${res.data.blockList[j].describe}
               </div>
           </div>`
        }
     }
     if(`${res.data.userList.length}`!==0){
        for(let j=0;j<`${res.data.userList.length}`;j++){
            hotpost+=`
            <div class="person_post2 post2" onclick="turnPerson(${res.data.userList[j].id})">
            <div class="col1">
                <img src="${res.data.userList[j].idPhoto}" />
            </div>
            <div class="col2">
                <div class="post_title">${res.data.userList[j].nickName}</div>
            </div>
         </div>`
        }
     }
    document.getElementsByClassName('content')[0].innerHTML+=hotpost;
}
function turnPlate(num){
    console.log(num);
    url="../show plate/showPlate.html?id="+num;
    window.location.href=url;
}
function turnPerson(num){
    url="../personal/other.html?id="+num;
    window.location.href=url;
}
