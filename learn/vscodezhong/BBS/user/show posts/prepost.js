window.onload=function(){
    var token=localStorage.getItem("token");
    console.log(token);
    
    var url=decodeURI(window.location.href);
    var url2=url.split("?id=");
    var url3=url2[1];
    console.log(url3);
    var xhr=new XMLHttpRequest();
    xhr.open('GET','http://43.140.247.80:8080/posts/show/'+url3);
    xhr.setRequestHeader("Authorization",token);
    xhr.withCredentials=true;
    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            var res=JSON.parse(xhr.responseText);
            console.log(res);
            adddata(res);
            if(token!==null){
        
                var navi=`<ul>
                <li><a href="../login&&home/login.html"><button id="chosed">BBS</button></a>  </li>
                <li> </li>
                <li></li>
                <li></li>
                <li><a href=""><button> <span class="glyphicon glyphicon-bell"></span><span class="font">消 息</span> </button></a>  </li>
                <li><a href="../publish posts/pub_post.html"><button><span class="glyphicon glyphicon-edit"></span> <span class="font">创作中心</span>  </button></a>
                </li>
                <li>
                <a href="../personal/person.html">
                <div class="user_ph" onclick="Show()"><img src="${res.data.idPhoto}" alt="">
                          <span class="login" s>${res.data.nickName}</span>
                       </div>
                </a>      
                       <span class="outlogin" onclick="out()">退出登陆</span>
                </li>
            </ul>`
            document.getElementsByClassName('navi')[0].innerHTML=navi;
            
            }
        }
    }
    xhr.send();

    var token=localStorage.getItem("token");
        console.log(token)
        var xhr2=new XMLHttpRequest()
            xhr2.open('get','http://43.140.247.80:8080/index/block'); 
            xhr2.setRequestHeader("Content-Type", "application/json");
            if(token!==null){
                xhr2.setRequestHeader("Authorization",token);
            }
            xhr2.send();
            xhr2.onreadystatechange=function(){
                if(xhr2.readyState===4&&xhr2.status===200){
                    var res2=JSON.parse(xhr2.responseText);
                    console.log(res2);
                    add(res2.data);
                }
            }
}
function adddata(res){
    localStorage.setItem("head",res.data.posts.head);
    localStorage.setItem("body",res.data.posts.body);
    console.log(res);
    var user_ph2=`<img src="${res.data.idPhoto}" alt="">
    <p>${res.data.nickName}</p> `
    document.getElementsByClassName('urser_ph')[0]=user_ph2;
    var post_urser=`<img src="${res.data.posts.user.idPhoto}" alt="">`;
    document.getElementById('post_urser').innerHTML=post_urser;
    var post_header=`<ul>
    <li style="font-size: 25px; font-weight:bold;">${res.data.posts.user.nickName}</li>
    <li></li>
    <li></li>
    <li>发布于 ${res.data.posts.date}</li>
</ul>`
    document.getElementById('post_header').innerHTML=post_header;
    if(`${res.data.posts.likeStatus}`==0){
        var post_text=`<p>${res.data.blockName}  正文> <span class="post_like">
   </span>
</p>  
    <div id="post_title">
        <h2 contenteditable="true">${res.data.posts.head} 
        </h2>
    </div>
    <div class="text1" contenteditable="true">
        ${res.data.posts.body} 
        <div class="glyphicon glyphicon-inbox" style="color: black;"></div>
    </div>
   `
    }
    else{
        var post_text=`<p>${res.data.blockName}  正文> <span class="post_like">
    <span class="likenumber likenumberactive" id="${res.data.posts.id}"> <span class="like"> ${res.data.posts.likeNumber}</span></span>
    <span class="glyphicon glyphicon-comment com-btn"><span class="commentnumber">${res.data.posts.scanNumber}</span></span>
   </span>
</p>  
    <div id="post_title">
        <h2 contenteditable="true">${res.data.posts.head} 
        </h2>
    </div>
    <div class="text1" contenteditable="true">
        ${res.data.posts.body}
        <div class="glyphicon glyphicon-inbox" style="color: black;"></div>
    </div>
    `
    }
    
    document.getElementById('post_text').innerHTML=post_text;
    for(let i=0;i<`${res.data.fileList.length}`;i++){
      var downloadfile=`
    <span class="downloadcontainer">${res.data.fileList[i].fileName}<button onclick="downLoad('${res.data.fileList[i].fileName}',${res.data.fileList[i].id})" class="downLoad">点击下载</button></span>`
    document.getElementById('post_text').innerHTML+=downloadfile;  
    }
    
}

function firstLike(event){
    if(event.className=="likenumber"){
        event.classList.add("likenumberactive");    
        var num=event.getElementsByTagName('span')[0].innerHTML;
        //console.log(num);
        var num2=Number(num)+1
        event.getElementsByTagName('span')[0].innerHTML=num2;
    }
   else if(event.classList.contains('likenumberactive')){
    event.classList.remove("likenumberactive");
    var numm=event.getElementsByTagName('span')[0].innerHTML;
    console.log(numm)
    event.getElementsByTagName('span')[0].innerHTML=Number(numm)-1;
 }
 var postId=event.id;
 var token=localStorage.getItem("token");
                var xhr=new XMLHttpRequest();
                xhr.open('get','http://43.140.247.80:8080/comment/update/like/one/'+postId);
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
function secondLike(event){
    if(event.className=="likenumber"){
        event.classList.add("likenumberactive");    
        var num=event.getElementsByTagName('span')[0].innerHTML;
        //console.log(num);
        var num2=Number(num)+1
        event.getElementsByTagName('span')[0].innerHTML=num2;
    }
   else if(event.classList.contains('likenumberactive')){
    event.classList.remove("likenumberactive");
    var numm=event.getElementsByTagName('span')[0].innerHTML;
    console.log(numm)
    event.getElementsByTagName('span')[0].innerHTML=Number(numm)-1;
 }
 var postId=event.id;
 console.log(postId);
 var token=localStorage.getItem("token");
                var xhr=new XMLHttpRequest();
                xhr.open('get','http://43.140.247.80:8080/comment/update/like/two/'+postId);
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
function add(res){
    var plate=``
    for(let i=0;i<`${res.list.length}`;i++){
         plate+=`<option id="${res.list[i].id}">${res.list[i].blockName}</option>`
    }
    document.getElementsByClassName('form-control')[0].innerHTML=plate;
}
function postMessege(){
    var url=decodeURI(window.location.href);
    var url2=url.split("?id=");
    var url3=url2[1];
    var token=localStorage.getItem("token");
                var xhr=new XMLHttpRequest();
                xhr.open('get','http://43.140.247.80:8080/posts/draft/send/'+url3);
                xhr.withCredentials=true;
                xhr.setRequestHeader("Content-Type", "application/json"); 
                xhr.setRequestHeader("Authorization",token);
                xhr.send();
                xhr.onreadystatechange=function(){
                if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                window.location.href='../publish posts/pub_post.html'
            }
            }
}
function deletepost(){
    var url=decodeURI(window.location.href);
    var url2=url.split("?id=");
    var url3=url2[1];
    var token=localStorage.getItem("token");
                var xhr=new XMLHttpRequest();
                xhr.open('get','http://43.140.247.80:8080/posts/delete/'+url3);
                xhr.withCredentials=true;
                xhr.setRequestHeader("Content-Type", "application/json"); 
                xhr.setRequestHeader("Authorization",token);
                xhr.send();
                xhr.onreadystatechange=function(){
                if(xhr.readyState===4&&xhr.status===200){
                var res=JSON.parse(xhr.responseText);
                window.location.href='../publish posts/pub_post.html'
            }
            }
}
function draftspost(){
    var index=document.getElementsByClassName('form-control')[0].selectedIndex;
        var block=document.getElementsByClassName('form-control')[0].options[index].id;
        console.log(block)
        var head=document.getElementsByClassName('post-title')[0].innerHTML;
        var body=document.getElementsByClassName('post-content')[0].innerHTML;
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